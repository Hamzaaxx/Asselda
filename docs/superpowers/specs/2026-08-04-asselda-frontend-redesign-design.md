# Asselda frontend redesign — design

**Date:** 2026-08-04
**Scope:** Full rewrite of `apps/frontend`. `apps/backend` (Strapi) is untouched.

## Context

The Association Asselda pour l'Environnement, le Développement Rural et la Famille
(AAEDRF) was founded in 1996 in Douar Asselda, commune d'Asni, Province d'Al Haouz.
The association was not satisfied with the previous frontend. This document records
the redesign decisions.

There is no reachable live frontend (`www.association-asselda.org` does not resolve).
The references are the repository source and the live Strapi backend at
`projet-site-web-asselda-production.up.railway.app`, which holds the real content:
4 projects, 7 activities, 5 articles, 10 partners, 6 timeline events, 1 album,
0 events — in `fr` and `ar` only.

## Problems in the current implementation

**Architecture**

- `app/fr`, `app/en`, `app/ar` are copy-pasted folders. ~2,000 lines triplicated,
  already drifting (`fr/partenaires` 228 lines vs 65 for en/ar).
- `lib/translations.ts` exists but pages hardcode strings instead of using it.
- `/` is a 404: no root layout, no root page, no middleware. `negotiator` and
  `@formatjs/intl-localematcher` are installed but never imported.
- Three parallel styling systems: Tailwind utilities, 12 CSS modules, inline styles.
  No shared primitives — the filter-pill class string is pasted 6+ times.
- `next-auth` installed and unused; `docs/` documents a NextAuth+RBAC integration
  that does not exist in the code.

**Correctness**

- Footer links to `/actuatites` (typo), `/mentions`, `/confidentialite` — all 404.
  Partners link missing from the footer.
- `/images/logo.png` referenced; file is `/Images/logo.png`. Breaks on
  case-sensitive hosts.
- Several home partner logos omit the leading slash, breaking on nested routes.
- `buildLocalizedLink()` calls a hook from a plain function. `usePathname()` is
  called inside JSX and inside a `.map()` callback. Rules-of-Hooks violations.
- `getProjects(...)`/`getPartners(...)` invoked during render and passed to `use()`,
  creating a new promise every render — full refetch on every filter click.
- Timeline renders unsorted: 2012, 1996, 2000, 2022, 2024, 2023.
- `ArticlesGrid.extractImage` is `item || item.attributes` (always first branch);
  `a.imageCover.url` throws when an article has no cover.
- `alt={imageCover.alternativeText}` — null for every CMS asset.

**Content integrity**

- Home claims 250 projects / 10 000 beneficiaries / 15 years / 45 partners. CMS has
  4 projects and 10 partners; "15 years" contradicts "depuis 1996" on the same screen.
- Home carousel and news cards are hardcoded and contradict the CMS.
- All 4 CMS projects are `done`, so three of the four status filters always return empty.
- The earthquake response project is tagged `sanitation` (Eau & Assainissement).
- Facebook and YouTube links are `href="#"`.

**Accessibility / performance**

- Every page is `"use client"`, including static ones. Raw `<img>` throughout.
- Fonts loaded twice: `next/font` plus a render-blocking Google Fonts `@import`
  that pulls "Noto Sans Math" (almost certainly meant to be Noto Kufi Arabic).
- Arabic pages never set `dir="rtl"`. No skip link, no focus-visible styling.
  Mobile nav does not trap focus or close on Escape.

## Decisions

| Question | Decision |
|---|---|
| Reference for the redesign | Repo source + live Strapi content. No live frontend exists. |
| English locale (near-empty in CMS) | Keep all three languages; render designed empty states, not blank pages. |
| Fabricated homepage stats | Derive projects/partners counts from the CMS; compute years from 1996. Beneficiaries stays one hand-entered constant, flagged for the association. |
| Visual direction | Warm institutional: deep green from the logo, warmed with Atlas terracotta and sand neutrals. |

## Target architecture

```
app/
  [lang]/
    layout.tsx            root layout: <html lang dir>, fonts, Header/Footer
    page.tsx              accueil
    a-propos/ activites/ projets/ projets/[slug]/
    actualites/ actualites/[slug]/ galerie/ partenaires/
    rejoindre/ contact/ mentions-legales/ confidentialite/
  middleware.ts           / → negotiated locale
lib/
  cms/                    typed Strapi client + normalizers
  i18n/                   dictionaries fr|en|ar, typed
components/
  ui/                     Button Card Badge FilterPill SectionHeading
                          Container EmptyState Skeleton Prose
  layout/                 Header Footer SkipLink LanguageSwitcher
  content/                ProjectCard ActivityCard ArticleCard PartnerCard
                          Timeline Gallery StatsBand PartnerMarquee Hero
  forms/                  ContactForm MembershipForm Field Fieldset
```

**Data.** Fetched in Server Components with ISR, normalized once so no component
touches `response.data[0].attributes`. Filtering moves client-side over the loaded
list — these are 4–10 item datasets, so refetch-per-click is pure latency. This also
removes the promise-created-during-render bug.

**Forms.** The browser still generates the reCAPTCHA v3 token; the POST moves into a
Server Action. Real validation errors reach the user instead of collapsing into one
generic message, and the API URL leaves the client bundle. Backend contracts unchanged.

**Styling.** Tailwind v4 only. All CSS modules and inline styles deleted; tokens in
`@theme`. One icon library (`lucide-react`, already a dependency) replacing
`react-icons`. `next-auth` removed.

**i18n.** Typed dictionaries — a missing key is a compile error rather than a silently
rendered key string. `dir` derived from locale; logical properties (`ms-`/`me-`/`ps-`/`pe-`)
throughout so RTL is structural rather than a patch layer.

## Visual language

- Surfaces: warm off-white `#FAF8F5`; white cards; deep-green sections as punctuation
- Primary deep green; accent terracotta; warm near-black text
- Logo blue and yellow retained for category coding only
- Type: serif headings + humanist sans body (FR/EN); Noto Kufi Arabic headings +
  Noto Sans Arabic body (AR). Loaded once via `next/font`.

## Content changes

- Stats band derives from CMS; years computed from 1996 (→ 30).
- Homepage carousel uses the CMS `flagship` flag; news pulls the 3 latest articles;
  partner marquee shows all 10 partners.
- New `/projets/[slug]` detail pages — the CMS already carries slugs, descriptions,
  results, budgets and partner relations the current single-list view flattens away.
- Legal pages built from facts already in the repo (AAEDRF legal name, Dahir 1-58-376,
  récépissé 11 Mar 2025, siège, contacts; for privacy, the data the forms actually
  collect plus reCAPTCHA). Flagged for the association's legal review — no invented
  legal text.
- `href="#"` social links removed until real URLs are supplied.
- Earthquake response project retagged off `sanitation`.

## Accessibility and performance

Skip link, visible focus rings, `aria-current` nav, focus-trapped mobile menu closing
on Escape, `aria-live` form results, `prefers-reduced-motion` honoured by counters,
carousel and marquee, alt-text fallback chain, AA contrast verified. Server Components
by default — only menu, carousel, filters and forms ship JS. `next/image` everywhere.

## Constraint

`apps/frontend/AGENTS.md` states this Next.js (16.2.9) differs from prior knowledge and
directs implementers to read `node_modules/next/dist/docs/` before writing code. That
read is a prerequisite to implementation, not optional.

## Out of scope

- `apps/backend` changes of any kind.
- Populating English CMS content (association's task).
- Supplying real Facebook/YouTube URLs, the beneficiaries figure, or legal review.

## Implementation notes

Recorded after the build, since three things differed from the plan.

**The installed Next.js is 16.3.0, not 16.2.9**, and two conventions moved:

- `middleware.ts` is now `proxy.ts`, exporting `proxy` from the project root.
- `params` is a Promise in pages, layouts and `generateMetadata`. `PageProps<…>`
  and `LayoutProps<…>` are global type helpers and are used throughout.

**`generateStaticParams` cannot live on `app/[lang]/layout.tsx`.** A layout-level
declaration takes precedence over one on a nested dynamic page: with it there,
`/[lang]/projets/[slug]` and `/[lang]/actualites/[slug]` were reported as static
in the build summary but produced zero prerendered paths. Locale params are
generated per page via `lib/i18n/static-params.ts`; the two `[slug]` routes
declare their own, returning `lang` and `slug` together and enumerating locales
themselves (slugs differ per locale, so the pairs cannot be derived by
multiplying two independent lists).

**Markdown line breaks.** CMS richtext separates list items with single newlines,
which Markdown collapses into one paragraph — visible on the solar water project,
whose five network components ran together. `Prose` promotes single newlines to
hard breaks while leaving paragraph breaks alone.

**Removed dependencies:** `next-auth` and `react-icons`, both unused after the
rewrite. `negotiator` and `@formatjs/intl-localematcher` were already installed
but never imported; they now back locale negotiation in `proxy.ts`. `server-only`
was added to guard the CMS client.

### Verified

- 53 pages prerender across three locales, deterministically.
- `/` returns 307 to the negotiated locale; `Accept-Language` of `ar-MA`, `en-US`,
  `fr-FR`, `de-DE` and `*` resolve to `/ar`, `/en`, `/fr`, `/fr`, `/fr`.
- Unknown locales and unknown slugs return 404.
- Timeline renders 1996 → 2024 in order.
- Project filtering runs client-side with no network request; `aria-pressed` and
  a live region track the result count.
- Contact form returns four distinct per-field errors plus a live-region summary.
- Mobile menu locks scroll, traps Tab, closes on Escape and restores focus.
- No horizontal overflow at 375 px; no console errors; `tsc` and ESLint clean.
