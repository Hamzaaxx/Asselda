import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n";
import { localeTags, locales, localizePath, type Locale } from "@/lib/i18n/config";

type PageMetaKey = keyof ReturnType<typeof getDictionary>["meta"] &
	("about" | "activities" | "projects" | "news" | "gallery" | "partners" | "join" | "contact" | "legal" | "privacy");

/**
 * Build page metadata, including the hreflang set.
 *
 * Every page needs the same alternates block; generating it here means a new
 * route cannot forget it, and the locale list stays in one place.
 */
export function buildPageMetadata(
	locale: Locale,
	key: PageMetaKey,
	path: string,
	overrides: Partial<Metadata> = {},
): Metadata {
	const dictionary = getDictionary(locale);
	const meta = dictionary.meta[key];

	return {
		title: meta.title,
		description: meta.description,
		alternates: {
			canonical: localizePath(path, locale),
			languages: Object.fromEntries(
				locales.map((option) => [localeTags[option], localizePath(path, option)]),
			),
		},
		openGraph: {
			type: "website",
			siteName: dictionary.meta.siteName,
			locale: localeTags[locale],
			title: meta.title,
			description: meta.description,
		},
		...overrides,
	};
}
