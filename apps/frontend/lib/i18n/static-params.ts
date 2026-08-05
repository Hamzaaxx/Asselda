import { locales } from "./config";

/**
 * Prerender one copy of a page per locale.
 *
 * Every page under `app/[lang]` re-exports this as its `generateStaticParams`.
 * It lives on the pages rather than on `app/[lang]/layout.tsx` because a
 * layout-level `generateStaticParams` takes precedence over the one on a nested
 * dynamic page: with it in the layout, `/[lang]/projets/[slug]` and
 * `/[lang]/actualites/[slug]` were reported as static in the build summary but
 * produced zero prerendered paths.
 *
 * The two `[slug]` routes therefore define their own, returning both `lang` and
 * `slug` together.
 */
export function generateLocaleParams() {
	return locales.map((lang) => ({ lang }));
}
