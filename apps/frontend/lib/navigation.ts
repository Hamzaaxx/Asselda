import type { Dictionary } from "@/lib/i18n";

/**
 * The site's information architecture, in one place.
 *
 * Header, footer and sitemap all read from this list, so a route can never
 * appear in one and be missing (or misspelled) in another — the previous footer
 * linked to `/actuatites` and omitted Partners entirely.
 */
export type NavKey =
	| "home"
	| "about"
	| "activities"
	| "projects"
	| "news"
	| "gallery"
	| "partners"
	| "contact"
	| "join";

export type NavItem = {
	key: NavKey;
	/** Locale-less path; prefix with `localizePath` before use. */
	path: string;
	label: (dictionary: Dictionary) => string;
	/** Rendered as a call-to-action button rather than a plain link. */
	cta?: boolean;
};

export const navItems: NavItem[] = [
	{ key: "home", path: "/", label: (d) => d.nav.home },
	{ key: "about", path: "/a-propos", label: (d) => d.nav.about },
	{ key: "activities", path: "/activites", label: (d) => d.nav.activities },
	{ key: "projects", path: "/projets", label: (d) => d.nav.projects },
	{ key: "news", path: "/actualites", label: (d) => d.nav.news },
	{ key: "gallery", path: "/galerie", label: (d) => d.nav.gallery },
	{ key: "partners", path: "/partenaires", label: (d) => d.nav.partners },
	{ key: "contact", path: "/contact", label: (d) => d.nav.contact },
	{ key: "join", path: "/rejoindre", label: (d) => d.nav.join, cta: true },
];

export const legalNavItems = [
	{ key: "legal" as const, path: "/mentions-legales", label: (d: Dictionary) => d.footer.legal },
	{ key: "privacy" as const, path: "/confidentialite", label: (d: Dictionary) => d.footer.privacy },
];

/**
 * Whether a nav entry should be marked current.
 *
 * Home matches only exactly; every other entry also matches its sub-routes, so
 * an article detail page still highlights "Actualités".
 */
export function isCurrentPath(pathWithoutLocale: string, itemPath: string): boolean {
	if (itemPath === "/") return pathWithoutLocale === "/";
	return pathWithoutLocale === itemPath || pathWithoutLocale.startsWith(`${itemPath}/`);
}
