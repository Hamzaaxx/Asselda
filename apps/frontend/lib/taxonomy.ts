import type { BadgeTone } from "@/components/ui/Badge";
import type { Locale } from "@/lib/i18n/config";

/**
 * Maps CMS enum values to badge colours.
 *
 * Kept in one place so "environment" is the same green on a project card, an
 * activity card and an album, rather than each grid inventing its own palette.
 */
export const domainTones: Record<string, BadgeTone> = {
	environment: "environment",
	sanitation: "sanitation",
	infrastructure: "infrastructure",
	social: "social",
	formation: "formation",
};

export function domainTone(domain: string): BadgeTone {
	return domainTones[domain] ?? "neutral";
}

/**
 * Format a budget for display.
 *
 * The CMS stores dirhams as a bigint string ("12000000"). Large figures read
 * better abbreviated — "12 MDH" rather than "12 000 000 DH" — while smaller ones
 * stay exact.
 */
export function formatBudget(amount: number, locale: Locale): string {
	const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale, {
		maximumFractionDigits: amount >= 1_000_000 ? 1 : 0,
	});

	if (amount >= 1_000_000) {
		return `${formatter.format(amount / 1_000_000)} ${locale === "ar" ? "مليون درهم" : "MDH"}`;
	}
	return `${formatter.format(amount)} ${locale === "ar" ? "درهم" : "DH"}`;
}

export function formatNumber(value: number, locale: Locale): string {
	return new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale).format(value);
}

export function formatDate(iso: string | null, locale: Locale): string | null {
	if (!iso) return null;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return null;

	return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}
