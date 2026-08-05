import { accentBars, type BadgeTone } from "./Badge";
import { cn } from "@/lib/cn";

type CardProps = {
	children: React.ReactNode;
	/** Adds hover lift. Only set on cards that are entirely clickable. */
	interactive?: boolean;
	/**
	 * Draws a category-coloured rule along the top edge, so a grid of cards can
	 * be scanned by domain without reading each badge.
	 */
	accent?: BadgeTone;
	as?: "div" | "article" | "li";
	className?: string;
};

export function Card({
	children,
	interactive = false,
	accent,
	as: Tag = "div",
	className,
}: CardProps) {
	return (
		<Tag
			className={cn(
				"group/card relative flex flex-col overflow-hidden rounded-card bg-white",
				"ring-1 ring-sand-300/70 shadow-card",
				interactive &&
					"transition-[box-shadow,transform] duration-300 ease-out-soft " +
						"hover:-translate-y-1 hover:shadow-card-hover focus-within:-translate-y-1 " +
						"focus-within:shadow-card-hover",
				className,
			)}>
			{accent ? (
				<span
					aria-hidden="true"
					className={cn("absolute inset-x-0 top-0 z-10 h-1", accentBars[accent])}
				/>
			) : null}
			{children}
		</Tag>
	);
}

/**
 * Stretches a link over its whole card so the entire surface is clickable while
 * only the link text is announced. Requires a `relative` ancestor — `Card`
 * provides one.
 */
export function CardOverlayLink({ className }: { className?: string }) {
	return <span className={cn("absolute inset-0 z-10", className)} aria-hidden="true" />;
}
