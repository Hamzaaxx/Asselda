# Association Asselda — frontend

Next.js 16 (App Router) frontend for the Association Asselda pour l'Environnement,
le Développement Rural et la Famille. Content comes from the Strapi backend in
`apps/backend`.

## Running it

```bash
npm install
npm run dev --workspace=apps/frontend
```

Environment variables (`.env.local`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Strapi origin. `http://localhost:1337` locally, the Railway URL in production. Also used to build media URLs, so any new host must be added to `images.remotePatterns` in `next.config.ts`. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key for the contact form. Without it the form renders and validates, but submission reports that the anti-spam check is unavailable. |

## Structure

```
app/[lang]/          one tree for all three locales
  layout.tsx         root layout: <html lang dir>, fonts, header, footer
  <route>/page.tsx   one page per route, each re-exporting generateLocaleParams
proxy.ts             locale negotiation and redirect (Next 16's Middleware)
lib/
  cms/               Strapi client — raw.ts types the wire, client.ts normalises
  i18n/              locale config, typed dictionaries, static params helper
  forms/             Server Actions and shared validation
  navigation.ts      the site's information architecture, in one list
  site.ts            association facts not held in the CMS
components/
  ui/                Button Card Badge FilterPills Section EmptyState Prose …
  layout/            Header Footer LanguageSwitcher
  content/           cards, explorers, timeline, hero, marquee
  forms/             ContactForm MembershipForm Field FormStatus
```

### Adding a page

1. Create `app/[lang]/<route>/page.tsx`.
2. `export const generateStaticParams = generateLocaleParams;`
3. Add copy to all three dictionaries — TypeScript fails the build if a key is
   missing from `ar.ts` or `en.ts`.
4. Add the route to `lib/navigation.ts` so it appears in the header and footer.

### Things worth knowing

**`generateStaticParams` lives on the pages, not the layout.** A layout-level
`generateStaticParams` takes precedence over one on a nested dynamic page. With
it in the layout, `/[lang]/projets/[slug]` was reported as static in the build
summary but produced zero prerendered paths. See `lib/i18n/static-params.ts`.

**Middleware is `proxy.ts` in Next 16.** Same behaviour, new filename, project
root.

**Data is fetched on the server; filtering happens on the client.** Collections
are small (4–10 entries), so pages load the whole list once and the explorer
components filter in memory. Pressing a filter never issues a request.

**Dictionaries are typed against French.** `fr.ts` defines the shape; `ar.ts` and
`en.ts` are checked against it, so a missing key is a compile error rather than a
raw key path shown to a visitor.

**RTL is structural.** Layout uses logical properties (`ms-`, `me-`, `ps-`, `pe-`,
`start-`, `end-`) throughout, and `dir` comes from the locale. Arabic switches to
its own font stack in `globals.css` rather than relying on browser fallback.

## Image audit (`public/Images`)

Every file in the folder was reviewed before being used. The registry in
`lib/media.ts` lists only the photographs that genuinely show the association's
work and region.

**In use — genuine photographs of Asselda and its region**

| File | Where it appears |
|---|---|
| `banner.jpeg` | Home hero — the Asni valley, terraced fields, Atlas peaks |
| `eau.jpeg` | Projects hero + gallery — the wastewater treatment basins |
| `Ev2.png` | Activities hero + gallery — a medical caravan consultation |
| `recons1.jpg` | News hero + gallery — post-earthquake aid distribution |
| `recons2.jpg` | Gallery hero + gallery — blanket and mattress distribution |
| `seisme.jpg` | Gallery — aerial of a High Atlas village after the 2023 earthquake |
| `logo.png` | Header, footer, About |
| `icons/whatsapp.png` | Footer social link |

**Not used — stock photography that does not show Douar Asselda**

`ag1.jpg` and `ag2.jpg` (a Western co-working seminar and a corporate boardroom),
`awrach1.jpg` and `awrach2.jpg` (French Mediterranean streets, one with shop
signage in French — these were captioned as the Awrach road-paving programme in
Douar Asselda), `Ev1.png` (a litter pick-up in a temperate European park),
`Ev3.png` (a tropical beach clean-up), and `Ev4.png` (a university computer lab
with a K-means clustering lecture).

Presenting these as the association's work would misrepresent it, so none are
referenced. If the association wants generic imagery anyway, say so and they can
be wired in — but replacing them with real photographs would serve the site far
better.

**Do not publish — `image-actu.png`**

This is a watermarked Getty Images comp file: the overlay reads
`gettyimages · FilippoBacci · 1498170916`. Publishing it would be copyright
infringement. It should be deleted or replaced with a licensed image.

**Superseded** — `Images/partners/*.png` duplicates logos that the CMS already
serves, and the CMS set is larger (10 partners vs 6 files) and authoritative.
`icons/facebook.png` and `icons/youtube.png` are ready to use as soon as real
profile URLs are added to `socialLinks` in `lib/site.ts`. The create-next-app
leftovers (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) are
unused and can be deleted.

## Content notes for the association

These are content gaps, not code issues:

- **English is nearly empty in the CMS** (no projects, articles or albums). The
  English site renders designed empty states pointing readers to French and
  Arabic. It fills in automatically as entries are translated.
- **Media has no alternative text.** Every asset in Strapi has a null
  `alternativeText`, so images fall back to their parent entry's title. Adding
  alt text in Strapi improves accessibility immediately, with no code change.
- **Impact figures.** Projects, partners and years are computed from live data
  and the 1996 founding year. Beneficiaries has no data source and is a constant
  in `lib/site.ts` — confirm the figure before launch.
- **Institutional documents** in `lib/site.ts` have no files yet, so the About
  page shows them as "coming soon" rather than linking to 404s.
- **Social links.** Only profiles with a real URL are listed in `lib/site.ts`.
  Add Facebook and YouTube there and they appear in the footer automatically.
- **Legal pages** are written from documented facts and carry a visible notice
  that the association must review them before publication.
