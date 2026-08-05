import { ImageOff } from "lucide-react";

import type { CmsImage } from "@/lib/cms/types";
import { cn } from "@/lib/cn";
import { ImageWithFallback } from "./ImageWithFallback";

type CmsPictureProps = {
	image: CmsImage | null;
	/** Aspect ratio of the frame. The image is cropped to fill it. */
	ratio?: "16/9" | "4/3" | "3/2" | "1/1";
	/** Set on the one above-the-fold image per page; everything else lazy-loads. */
	priority?: boolean;
	/**
	 * Scales the image slightly while an enclosing `group/card` is hovered or
	 * focused. Expressed as Tailwind group variants rather than a hand-written
	 * rule — an escaped `.group\/card:hover` selector in plain CSS gets collapsed
	 * by the minifier into an unconditional one, leaving every image zoomed.
	 */
	zoomOnHover?: boolean;
	sizes?: string;
	className?: string;
};

const ratios = {
	"16/9": "aspect-[16/9]",
	"4/3": "aspect-[4/3]",
	"3/2": "aspect-[3/2]",
	"1/1": "aspect-square",
} as const;

/**
 * CMS media in a fixed frame.
 *
 * Covers all three ways CMS media goes wrong:
 *   - the field is missing entirely (the previous code built `API_URL + undefined`)
 *   - `alternativeText` is null (previously rendered as the string "null")
 *   - the URL is present but the file 404s — currently true for every partner
 *     logo and news cover, see docs/AUDIT-AND-ROADMAP.md
 *
 * All three land on the same neutral placeholder, which keeps the frame's size
 * so a failure causes no layout shift.
 */
export function CmsPicture({
	image,
	ratio = "3/2",
	priority = false,
	zoomOnHover = false,
	sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
	className,
}: CmsPictureProps) {
	const placeholder = (
		<span className="absolute inset-0 flex items-center justify-center bg-sand-200 text-sand-500">
			<ImageOff className="size-8" aria-hidden="true" />
		</span>
	);

	return (
		<div className={cn("relative overflow-hidden bg-sand-200", ratios[ratio], className)}>
			{image ? (
				<ImageWithFallback
					src={image.url}
					alt={image.alt}
					fill
					sizes={sizes}
					priority={priority}
					fallback={placeholder}
					className={cn(
						"object-cover",
						zoomOnHover &&
							"transition-transform duration-500 ease-out-soft " +
								"group-hover/card:scale-105 group-focus-within/card:scale-105 " +
								"motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
					)}
				/>
			) : (
				placeholder
			)}
		</div>
	);
}
