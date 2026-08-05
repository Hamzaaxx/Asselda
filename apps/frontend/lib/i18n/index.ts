import { fr, type Dictionary } from "./dictionaries/fr";
import { ar } from "./dictionaries/ar";
import { en } from "./dictionaries/en";
import { defaultLocale, isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { fr, ar, en };

/**
 * Dictionaries are plain modules rather than dynamic imports: the whole set is a
 * few kilobytes of strings, they are only ever read in Server Components, and
 * static imports keep `getDictionary` synchronous at every call site.
 */
export function getDictionary(locale: Locale | string): Dictionary {
	return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

/**
 * Substitute `{name}` placeholders in a dictionary string.
 *
 *   format(d.common.slideOf, { current: 2, total: 5 }) // "Élément 2 sur 5"
 *
 * Unknown placeholders are left in place so a missing value is visible in review
 * rather than silently rendering an empty gap.
 */
export function format(template: string, values: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, key: string) =>
		key in values ? String(values[key]) : match,
	);
}

export type { Dictionary };
export * from "./config";
