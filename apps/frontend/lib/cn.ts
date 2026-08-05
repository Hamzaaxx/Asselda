/**
 * Join class names, dropping falsy entries.
 *
 * Deliberately not `clsx` + `tailwind-merge`: nothing here relies on later
 * classes overriding earlier ones, so a four-line helper avoids two dependencies.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}
