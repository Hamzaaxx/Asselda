import Image from "next/image";
import { ImageOff } from "lucide-react";

import type { CmsImage } from "@/lib/cms/types";
import { cn } from "@/lib/cn";

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
 * Handles the two cases the previous implementation crashed on: a missing
 * `imageCover` (`API_URL + undefined`) and a null `alternativeText` rendering as
 * `alt="null"`. A null image becomes a neutral placeholder instead of a broken
 * icon, and `alt` is guaranteed to be a string by the normaliser.
 */
export function CmsPicture({
	image,
	ratio = "3/2",
	priority = false,
	zoomOnHover = false,
	sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
	className,
}: CmsPictureProps) {
	if (!image) {
		return (
			<div
				className={cn(
					"flex items-center justify-center bg-sand-200 text-sand-500",
					ratios[ratio],
					className,
				)}>
				<ImageOff className="size-8" aria-hidden="true" />
			</div>
		);
	}

	return (
		<div className={cn("relative overflow-hidden bg-sand-200", ratios[ratio], className)}>
			<Image
				src={image.url}
				alt={image.alt}
				fill
				sizes={sizes}
				priority={priority}
				className={cn(
					"object-cover",
					zoomOnHover &&
						"transition-transform duration-500 ease-out-soft " +
							"group-hover/card:scale-105 group-focus-within/card:scale-105 " +
							"motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
				)}
			/>
		</div>
	);
}
