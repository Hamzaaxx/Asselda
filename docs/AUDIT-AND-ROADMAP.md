# Asselda — audit and improvement roadmap

**Date:** 5 August 2026
**Scope:** the whole project (`apps/frontend`, `apps/backend`, hosting, content)

Every finding below was verified by measurement against the live Railway backend
and a running build, not by inspection alone. Commands are given so anything here
can be re-checked.

---

## 0. What to do first

| # | Item | Severity | Who | Effort |
|---|---|---|---|---|
| 1 | 63% of CMS media returns 404 — all news covers, all partner logos | **Critical** | Backend / hosting | Half a day |
| 2 | Broken images render as broken icons instead of a fallback | High | Frontend | 1 hour |
| 3 | Four source photos are ~10× oversized | Medium | Content | 30 min |
| 4 | Seven pages still use the generic hero + card-grid template | Medium | Frontend | 2–3 days |
| 5 | English CMS content is empty | Medium | Association | Ongoing |
| 6 | `docs/` describes a NextAuth/RBAC system that does not exist | Low | Cleanup | 30 min |

---

## 1. CRITICAL — most CMS images are missing from the server

### What is happening

Strapi's database references media files that **no longer exist on the Railway
server**. The API returns a URL; requesting that URL from the same host gives a
404.

```
GET /api/partners → logo.url = "/uploads/amsed_14f8708760.png"
GET /uploads/amsed_14f8708760.png → 404
```

### Measured scope

Every media URL referenced by the CMS, including Strapi's generated
`thumbnail_`/`small_`/`medium_`/`large_` variants:

```
93 distinct media URLs referenced
34 return 200
59 return 404   (63%)
 0 timed out
```

Per content type:

| Content type | Images loading |
|---|---|
| Projects | **4 / 4** ✅ |
| Activities | **7 / 7** ✅ |
| Album "Images" | **4 / 4** ✅ |
| **Articles (news)** | **0 / 5** ❌ |
| **Partners** | **0 / 10** ❌ (6 now restored from bundled files — see below) |

> **Partially mitigated.** Six of the ten partner logos also exist in
> `apps/frontend/public/Images/partners`, and the site now prefers those bundled
> files over the CMS. Those six render correctly today, server-side, with no
> request to Railway. The other four, and all five article covers, still depend
> on the CMS and fall back to initials or a neutral placeholder. **This does not
> remove the need to fix the storage layer** — it only stops the site looking
> broken while that happens.

So every news article and every partner logo is broken, while projects and
activities are fine. The failures are concentrated in two batches, which is
consistent with those files having been uploaded at a different time from the
ones that survive.

### Root cause

Railway gives containers an **ephemeral filesystem**. Strapi's default upload
provider writes to local disk at `apps/backend/public/uploads`. The Postgres
database is persistent, but the container disk is wiped on every redeploy — so
the database rows survive while the files they point at are deleted.

This is confirmed by the pattern: files are missing regardless of whether they
were committed to git, and no amount of frontend work can recover them.

### Fix — backend (required)

The uploads must move off the container disk. In order of preference:

1. **Cloudinary** (`@strapi/provider-upload-cloudinary`) — free tier is ample for
   this volume, gives CDN delivery and its own image transformations. Configure
   in `apps/backend/config/plugins.js`.
2. **S3-compatible storage** (`@strapi/provider-upload-aws-s3`) — works with AWS,
   Backblaze B2 or Cloudflare R2. More setup, no vendor lock-in.
3. **A Railway persistent volume** mounted at `public/uploads` — smallest change,
   but keeps files on one host with no CDN and no backup.

After switching the provider, the missing files must be **re-uploaded through the
Strapi admin**, because the originals are gone. The database rows will need to be
re-pointed at the new URLs (re-uploading via the admin does this automatically).

Once `NEXT_PUBLIC_API_URL` no longer serves the media, add the new host to
`images.remotePatterns` in `apps/frontend/next.config.ts` — `next/image` refuses
to optimise hosts that are not listed.

### Fix — frontend (mitigation, worth doing regardless)

`CmsPicture` and `PartnerCard` already fall back gracefully when a media field is
**null**. They do not handle a URL that is present but **fails to load** — which
is exactly this case, so the browser shows a broken-image icon.

Add an `onError` fallback so a failed load degrades to the same neutral
placeholder (and, for partners, to the existing initials block). This requires
making the image wrapper a client component. It does not fix the data, but it
stops the site looking broken while the backend is sorted out.

### How to re-check

```bash
node docs/scripts/check-media.mjs   # if the scripts are added
```

or manually:

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  https://projet-site-web-asselda-production.up.railway.app/uploads/amsed_14f8708760.png
```

---

## 2. Other things that need fixing

### Frontend

- **No error fallback for failed image loads** — see §1 above.
- **Four source photos are ~10× larger than needed.** Measured bytes-per-pixel
  (a well-compressed JPEG is around 0.2):

  | File | Size | Should be | bpp |
  |---|---|---|---|
  | `recons1.jpg` | 1783 KB | ~190 KB | 1.90 |
  | `seisme.jpg` | 770 KB | ~70 KB | 2.47 |
  | `Ev2.png` | 669 KB | ~70 KB | 1.88 |
  | `recons2.jpg` | 423 KB | ~35 KB | 2.48 |

  This does not affect visitors — `next/image` serves optimised versions — but it
  slows the first optimisation pass and adds ~3.5 MB to the repository. Re-encode
  with Squoosh or `npx @squoosh/cli`.
- **`image-actu.png` is a watermarked Getty Images comp file** (`gettyimages ·
  FilippoBacci · 1498170916` visible in the image). It is not referenced by the
  site, but it must not be published. Delete it or replace it with a licensed
  image.
- **Seven stock photographs** in `public/Images` show European streets, corporate
  meeting rooms and a tropical beach clean-up — not Douar Asselda. They are
  deliberately unreferenced. See the image audit in `apps/frontend/README.md`.

### Backend

- **`events` collection is empty in every locale.** The content type exists and
  the frontend originally rendered a section for it that could only ever say "no
  events found". That section was removed; events are published as articles with
  the `event` category. Either populate the collection and reinstate a dedicated
  view, or delete the content type.
- **No `alternativeText` on any media.** Every asset in Strapi has a null
  alternative text, so images fall back to their parent entry's title. Filling
  this in inside Strapi improves accessibility immediately with no code change.
- **Album titled "Images".** The single CMS album is called "Images", which is
  what screen readers announce for its four photos. Rename it descriptively.
- **Project taxonomy.** The earthquake response project is tagged `sanitation`
  ("Eau & assainissement"), which is not what it is. Retag it `social`.
- **All four projects have status `done`.** The status filter therefore offers
  one real option. The frontend already hides single-option filter rows, but if
  some projects are actually ongoing, the data should say so.

### Repository hygiene

- **`docs/NEXTAUTH_STRAPI_INTEGRATION.md`, `docs/RBAC_SETUP.md` and parts of
  `docs/IMPLEMENTATION_SUMMARY.md`** describe an authentication and
  role-permission system that was never built. `next-auth` was removed from
  `apps/frontend/package.json` during the redesign because nothing imported it.
  Delete these documents or mark them clearly as "planned, not implemented".
- **`docs/CONTACT_FORM_IMPLEMENTATION.md` and `docs/FOOTER_DOCUMENTATION.md`**
  describe the previous frontend. The contact form now posts through a Server
  Action in `lib/forms/actions.ts`, and the footer is generated from
  `lib/navigation.ts`.
- **Five create-next-app leftovers** in `public/` (`next.svg`, `vercel.svg`,
  `file.svg`, `globe.svg`, `window.svg`) are unused.

---

## 3. Design — what still needs work

An honest assessment of the current build.

### The biggest gap: seven pages still use one template

The About page was rebuilt as an editorial narrative — each section has a
different shape (statement, numbered list, typographic band, centred timeline,
grouped roster, register). **Projets, Activités, Actualités, Partenaires,
Galerie, Contact and Rejoindre have not been.** They are all still
`PageHero` + filter row + three-column card grid.

The consequence is that a project and a news teaser render at identical visual
weight, even though a project carries a budget, named partners, results and its
own detail page while an article is a headline and a summary. The flagship
12 MDH sanitation project should not look like a blog post.

**Suggested treatments:**

- **Projets** — lead with the flagship project as a full-width feature (cover,
  budget, partners, results), then the rest as a denser list. Not four equal cards.
- **Actualités** — an editorial layout: one lead story large, the rest as compact
  rows with dates. Currently a uniform grid.
- **Partenaires** — partners differ enormously in significance (AMSED funded a
  12 MDH project; others are administrative). Reflect that hierarchy.
- **Galerie** — with only ten photographs, a masonry grid looks sparse. Consider
  a curated editorial layout until there are more images.

### The homepage is competent but generic

Hero → stats → three icon cards → grid → grid → logo marquee → CTA is the default
NGO template. Nothing is wrong with it and nothing is memorable. It is the page
most visitors see first and the least designed thing in the build.

### Photography is the binding constraint

Six usable photographs exist. The contour texture, colour accents and typographic
treatments are partly compensating for thin visual assets, and that only goes so
far. **More real photographs from the association would improve this site more
than any further code.** Specifically wanted: the water network, the paved
alleyways, a general assembly, women's literacy classes, the preschool.

### Smaller design items

- The **alternating timeline** on About is a debatable pattern — zigzag reading is
  often criticised and it is the section most likely to feel awkward in Arabic.
- **Partner logos** arrive at wildly different aspect ratios and quality. They are
  normalised into fixed boxes, but the strip will still look ragged.
- The **membership form** is a two-column wall of fields. A stepped flow would
  likely convert better.
- **Icons** are the literal lucide choices (Leaf for environment, Droplets for
  water). Serviceable, unimaginative.
- **No scroll choreography** beyond the stat counters.
- The **Arabic type scale** inherits `clamp()` values tuned for Latin. Arabic
  display sizes need their own tuning.

### An important caveat

The visual design has been verified **structurally** — rendered HTML, compiled
CSS, heading hierarchy, RTL logical properties, contrast ratios chosen at the
token level. It has **not been reviewed on screen**, because screenshots were not
available in the environment where it was built. Spacing collisions, awkward line
breaks and real-world contrast should be checked by eye before launch.

---

## 4. Should the stack or languages change?

Short answer: **no rewrite is warranted.** The problems in this project are
hosting and content, not language choice. A rewrite would burn weeks and fix none
of §1.

### Current stack, and whether it is the right one

| Layer | Now | Verdict |
|---|---|---|
| Frontend | TypeScript, Next.js 16, React 19 | **Keep.** Right tool: static generation for a content site, first-class i18n routing, image optimisation, strong typing. ~9,900 lines. |
| Styling | Tailwind CSS v4 | **Keep.** One system, tokens in `@theme`, 248 lines of hand-written CSS for the whole site. |
| CMS | Strapi | **Keep the software, fix the hosting.** Strapi is fine; storing uploads on an ephemeral disk is not. |
| Backend language | JavaScript | **Optional migration.** See below. |
| Hosting | Railway (backend), undeployed (frontend) | **Change the storage layer.** See §1. |

### Worth considering

- **Migrate the Strapi backend to TypeScript.** Strapi supports it natively. The
  backend is only 976 lines across 35 files, so this is a contained job. It would
  give the API layer the same type safety the frontend has, and the generated
  types in `apps/backend/types/generated/` already exist. **Benefit: moderate.
  Risk: low.** Do it when someone next works on the backend, not as a standalone
  project.
- **Deploy the frontend to Vercel.** It is not deployed anywhere yet. Next.js on
  Vercel gets ISR, image optimisation and edge caching with no configuration. The
  build already produces 53 fully prerendered pages.
- **Add a smoke-test suite.** There are no tests. Given the site is mostly static
  rendering, the highest-value tests are a link checker and a media checker run in
  CI — exactly the checks that found §1. A full unit-test suite would be low value
  here; an automated media audit would have caught the broken images immediately.

### Not worth doing

- Rewriting the frontend in another framework. Nothing about the current problems
  is caused by Next.js.
- Replacing Strapi with a git-based CMS. It would fix the media problem by side
  effect, but the association's editors need a visual admin, and Strapi's
  three-locale support is already configured and populated.
- Adding a component library (MUI, shadcn). The design system is small, bespoke
  and already consistent; a library would add weight and dilute the visual identity.

---

## 5. What the association needs to supply

None of these are code problems.

- **Re-upload the missing media** once persistent storage is configured (§1).
- **English content.** The CMS has no English projects, articles or albums, so the
  English site renders designed empty states. It fills in automatically as entries
  are translated.
- **Alternative text** on every image in Strapi.
- **The beneficiaries figure.** Projects, partners and years are computed from live
  data; beneficiaries has no data source and is a constant in `lib/site.ts`
  (currently 10,000). Confirm it before launch.
- **Four institutional PDFs** — filing receipt, AG minutes, articles of
  association, fact sheet. The About page shows them as "coming soon" rather than
  linking to files that do not exist.
- **Facebook and YouTube URLs.** Placeholder entries are commented out in
  `lib/site.ts`; adding a real URL makes the icon appear automatically.
- **Legal review** of `/mentions-legales` and `/confidentialite`. Both are written
  from documented facts and carry a visible notice saying the association must
  approve them.

---

## 6. Already done (for reference)

So this list is not mistaken for outstanding work:

- One `app/[lang]` tree replacing three copy-pasted locale folders
- `/` no longer returns 404 — locale negotiation in `proxy.ts`
- Timeline sorted chronologically (previously 2012 → 1996 → 2000 → 2022 → 2024 → 2023)
- Homepage statistics derived from live data (previously "250 projects" and
  "15 years" printed beside "depuis 1996")
- Footer typo `/actuatites`, `/Images` casing, missing leading slashes
- `alt="null"` on every CMS image
- Rules-of-Hooks violations; promise recreated on every render causing refetches
- Dead `href="#"` social links
- Skip link, focus rings, `aria-current`, focus-trapped mobile menu, live-region
  form errors, per-field validation messages, `prefers-reduced-motion`
- Server Components by default — 14 client components, 53 prerendered pages
- Production pages serve in 11–25 ms

---

## 7. Suggested order of work

**Phase 1 — make the site truthful (1 day)**
1. Configure persistent media storage and re-upload the missing files (§1)
2. Add the frontend image error fallback (§1)
3. Re-encode the four oversized photos; delete the Getty comp (§2)

**Phase 2 — deploy (half a day)**
4. Deploy the frontend to Vercel with `NEXT_PUBLIC_API_URL` and the reCAPTCHA key
5. Add a media/link checker to CI so §1 cannot recur silently

**Phase 3 — design (3–5 days)**
6. Review the built site on screen and fix what only shows visually
7. Rework Projets and Actualités with the editorial treatment used on About
8. Rework the homepage

**Phase 4 — content and cleanup (ongoing)**
9. English translations, alt text, taxonomy corrections
10. Delete or flag the stale documentation
11. Optionally migrate the backend to TypeScript
