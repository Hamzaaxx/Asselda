"use client";

import { useCallback, useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithFallbackProps = Omit<ImageProps, "onError" | "ref"> & {
	/** Rendered in the image's place if the file fails to load. */
	fallback: React.ReactNode;
};

/**
 * An image that degrades to a fallback when the file cannot be loaded.
 *
 * The server components using this already handle a *missing* media field. This
 * handles the other case: a URL that is present but errors — the live situation
 * for every partner logo and news cover, because Strapi's database references
 * files that no longer exist on the server (see docs/AUDIT-AND-ROADMAP.md).
 * Without it the browser shows its own broken-image icon.
 *
 * Two detection paths are needed, and `onError` alone is not enough:
 *
 *   - `onError` catches failures that happen after React has hydrated.
 *   - The ref callback catches images that had *already* failed by then. On a
 *     server-rendered page the browser starts fetching from the HTML, so the
 *     error event can fire before React attaches any listener — and a DOM event
 *     that has already fired is gone. Testing `complete && naturalWidth === 0`
 *     on mount recovers exactly that case, which is what happens here in
 *     practice: every partner logo failed before hydration and the fallback
 *     never appeared until this check was added.
 */
export function ImageWithFallback({ fallback, src, alt, ...rest }: ImageWithFallbackProps) {
	// Keyed by src rather than a boolean, so reusing this component for a
	// different image resets the failure state during render — no effect needed.
	const [failedSrc, setFailedSrc] = useState<string | null>(null);

	const currentSrc = typeof src === "string" ? src : "src" in src ? src.src : String(src);

	const detectAlreadyFailed = useCallback(
		(node: HTMLImageElement | null) => {
			// `complete` with zero intrinsic width means the fetch finished and
			// produced no image — i.e. it errored. A still-loading image reports
			// `complete === false`, and a lazy one that has not started reports the
			// same, so neither is mistaken for a failure.
			if (node?.complete && node.naturalWidth === 0) setFailedSrc(currentSrc);
		},
		[currentSrc],
	);

	if (failedSrc === currentSrc) return <>{fallback}</>;

	return (
		<Image
			{...rest}
			src={src}
			alt={alt}
			ref={detectAlreadyFailed}
			onError={() => setFailedSrc(currentSrc)}
		/>
	);
}
