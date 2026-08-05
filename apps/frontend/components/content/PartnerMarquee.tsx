import type { Partner } from "@/lib/cms/types";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type PartnerMarqueeProps = {
	partners: Partner[];
};

/**
 * Continuous partner logo strip.
 *
 * The track holds the list twice so the animation can loop seamlessly; the
 * duplicate is `aria-hidden` so screen readers hear each partner once. The
 * previous version duplicated six `<img>` tags by hand in the JSX and showed
 * only six of the ten partners in the CMS.
 *
 * The animation is paused entirely under `prefers-reduced-motion` (see
 * globals.css), where the strip becomes a normal wrapping row.
 */
export function PartnerMarquee({ partners }: PartnerMarqueeProps) {
	if (partners.length === 0) return null;

	// Slower when there are more logos, so perceived speed stays constant.
	const durationSeconds = Math.max(24, partners.length * 4);

	return (
		<div
			className="relative overflow-hidden"
			style={{
				maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
			}}>
			<ul
				className="marquee-track flex w-max items-center gap-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
				style={{ animation: `marquee-scroll ${durationSeconds}s linear infinite` }}>
				{partners.map((partner) => (
					<LogoItem key={partner.documentId} partner={partner} />
				))}
				{/* Duplicate pass, so the loop has something to scroll into. */}
				{partners.map((partner) => (
					<LogoItem key={`echo-${partner.documentId}`} partner={partner} ariaHidden />
				))}
			</ul>
		</div>
	);
}

function LogoItem({ partner, ariaHidden = false }: { partner: Partner; ariaHidden?: boolean }) {
	/*
	 * When a logo is absent or fails to load, the partner's name stands in. The
	 * strip stays legible and on-brand rather than filling with broken-image
	 * icons — which is the live situation, as none of the ten logos currently
	 * resolve (see docs/AUDIT-AND-ROADMAP.md).
	 */
	const wordmark = (
		<span className="text-center text-sm font-semibold leading-tight text-sand-600">
			{partner.name}
		</span>
	);

	return (
		<li
			aria-hidden={ariaHidden || undefined}
			className={
				"flex h-20 w-36 shrink-0 items-center justify-center px-2" +
				// With the animation off the strip becomes a static row, so the
				// duplicate pass would just show every logo twice.
				(ariaHidden ? " motion-reduce:hidden" : "")
			}>
			{partner.logo ? (
				<ImageWithFallback
					src={partner.logo.url}
					alt={ariaHidden ? "" : partner.name}
					width={partner.logo.width}
					height={partner.logo.height}
					sizes="144px"
					fallback={wordmark}
					className="max-h-16 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
				/>
			) : (
				wordmark
			)}
		</li>
	);
}
