import { cn } from "@/lib/cn";

/**
 * Category colours.
 *
 * Domains are colour-coded consistently across projects, activities and albums,
 * so "environment" looks the same wherever a visitor meets it. The blue and gold
 * come from the association's emblem.
 */
export type BadgeTone =
	| "environment"
	| "sanitation"
	| "infrastructure"
	| "social"
	| "formation"
	| "neutral"
	| "status"
	| "flagship";

const tones: Record<BadgeTone, string> = {
	environment: "bg-forest-100 text-forest-900 ring-forest-800/15",
	sanitation: "bg-sky-brand/10 text-sky-brand ring-sky-brand/20",
	infrastructure: "bg-clay-100 text-clay-800 ring-clay-700/20",
	social: "bg-gold-brand/10 text-gold-brand ring-gold-brand/25",
	formation: "bg-sand-200 text-sand-800 ring-sand-700/20",
	neutral: "bg-sand-100 text-sand-700 ring-sand-500/25",
	status: "bg-white text-forest-800 ring-forest-800/25",
	flagship: "bg-clay-600 text-white ring-clay-700/30",
};

/**
 * Solid version of each tone, for the accent rule along the top of a card.
 *
 * Keeping it beside `tones` means a category can never be one colour on its
 * badge and another on its card.
 */
export const accentBars: Record<BadgeTone, string> = {
	environment: "bg-forest-600",
	sanitation: "bg-sky-brand",
	infrastructure: "bg-clay-600",
	social: "bg-gold-brand",
	formation: "bg-sand-500",
	neutral: "bg-sand-400",
	status: "bg-forest-700",
	flagship: "bg-clay-600",
};

type BadgeProps = {
	children: React.ReactNode;
	tone?: BadgeTone;
	className?: string;
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-pill px-3 py-1",
				"text-xs font-semibold tracking-wide ring-1 ring-inset",
				tones[tone],
				className,
			)}>
			{children}
		</span>
	);
}
