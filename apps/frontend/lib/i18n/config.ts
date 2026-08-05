/**
 * Locale configuration.
 *
 * Adding a language means adding it here and adding a dictionary file. Nothing
 * else in the app hardcodes a locale list.
 */

export const locales = ["fr", "ar", "en"] as const;

export type Locale = (typeof locales)[number];

/** Used when negotiation fails and as the fallback for unknown path prefixes. */
export const defaultLocale: Locale = "fr";

/** Endonyms — a language is always named in its own language. */
export const localeLabels: Record<Locale, string> = {
	fr: "Français",
	ar: "العربية",
	en: "English",
};

/** Short form for the compact language switcher. */
export const localeShortLabels: Record<Locale, string> = {
	fr: "FR",
	ar: "ع",
	en: "EN",
};

/** BCP 47 tags for <html lang> and Intl formatters. */
export const localeTags: Record<Locale, string> = {
	fr: "fr-MA",
	ar: "ar-MA",
	en: "en",
};

export type Direction = "ltr" | "rtl";

export const localeDirections: Record<Locale, Direction> = {
	fr: "ltr",
	ar: "rtl",
	en: "ltr",
};

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
	return localeDirections[locale];
}

/**
 * Strip a leading locale segment from a pathname.
 * "/fr/projets" -> "/projets", "/fr" -> "/"
 */
export function stripLocale(pathname: string): string {
	for (const locale of locales) {
		if (pathname === `/${locale}`) return "/";
		if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
	}
	return pathname;
}

/**
 * Prefix a locale-less path with a locale.
 * ("/projets", "ar") -> "/ar/projets"
 */
export function localizePath(path: string, locale: Locale): string {
	const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
	return `/${locale}${normalized}`;
}

/**
 * Read the locale out of a pathname, falling back to the default.
 * Safe to call on any string, including paths that carry no locale.
 */
export function localeFromPathname(pathname: string): Locale {
	const segment = pathname.split("/")[1] ?? "";
	return isLocale(segment) ? segment : defaultLocale;
}
