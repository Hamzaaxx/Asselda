import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "canvas" | "white" | "forest" | "sand";

const tones: Record<Tone, string> = {
	canvas: "bg-sand-50 text-ink",
	white: "bg-white text-ink",
	sand: "bg-sand-100 text-ink",
	forest: "bg-forest-800 text-forest-50",
};

type SectionProps = {
	children: React.ReactNode;
	tone?: Tone;
	size?: "narrow" | "default" | "wide";
	/** Tightens vertical padding for dense strips such as the partner marquee. */
	compact?: boolean;
	id?: string;
	className?: string;
};

/**
 * A full-bleed band with a constrained inner column.
 *
 * Alternating `tone` is how the page gets its rhythm — sections never carry
 * their own background or padding utilities.
 */
export function Section({
	children,
	tone = "canvas",
	size = "default",
	compact = false,
	id,
	className,
}: SectionProps) {
	return (
		<section
			id={id}
			className={cn(
				"relative",
				tones[tone],
				compact ? "py-10 sm:py-12" : "py-16 sm:py-24",
				className,
			)}>
			{/* Contour texture, so the deep-green bands read as a surface. */}
			{tone === "forest" ? (
				<span
					aria-hidden="true"
					className="texture-contour pointer-events-none absolute inset-0 opacity-[0.06]"
				/>
			) : null}
			<Container size={size} className="relative">
				{children}
			</Container>
		</section>
	);
}

type SectionHeadingProps = {
	title: string;
	subtitle?: string;
	/** `h1` only on the page's leading heading; everything else stays `h2`. */
	as?: "h1" | "h2";
	align?: "start" | "center";
	tone?: "dark" | "light";
	className?: string;
};

export function SectionHeading({
	title,
	subtitle,
	as: Tag = "h2",
	align = "start",
	tone = "dark",
	className,
}: SectionHeadingProps) {
	return (
		<div
			className={cn(
				"mb-10 flex flex-col gap-3",
				align === "center" && "items-center text-center",
				className,
			)}>
			{/* The same clay rule that opens every page hero — a small repeating
			    motif that ties the sections to the top of the page. */}
			<span
				aria-hidden="true"
				className={cn(
					"h-1 w-12 rounded-full",
					tone === "dark" ? "bg-clay-500" : "bg-clay-400",
				)}
			/>
			<Tag
				className={cn(
					Tag === "h1" ? "text-4xl" : "text-3xl",
					tone === "dark" ? "text-forest-900" : "text-white",
				)}>
				{title}
			</Tag>
			{subtitle ? (
				<p
					className={cn(
						"max-w-2xl text-lg leading-relaxed",
						tone === "dark" ? "text-ink-muted" : "text-forest-100",
					)}>
					{subtitle}
				</p>
			) : null}
		</div>
	);
}
