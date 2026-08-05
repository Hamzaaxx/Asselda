import type { StaticImageData } from "next/image";

import bannerImage from "@/public/Images/banner.jpeg";
import treatmentImage from "@/public/Images/eau.jpeg";
import earthquakeImage from "@/public/Images/seisme.jpg";
import aidImage from "@/public/Images/recons1.jpg";
import reliefImage from "@/public/Images/recons2.jpg";
import medicalImage from "@/public/Images/Ev2.png";

import type { CmsImage } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";

/**
 * Photographs shipped in `public/Images`.
 *
 * Only images that genuinely depict the association's work and region are listed
 * here. `public/Images` also contains stock photography of European streets,
 * corporate meeting rooms and a tropical beach clean-up, plus a watermarked
 * Getty comp file — none of which show Douar Asselda, and none of which are
 * referenced by the site. See the README for the full audit.
 *
 * These are static imports rather than string paths, which buys three things at
 * build time: intrinsic width and height (so no hand-maintained numbers can
 * drift from the files), a generated `blurDataURL`, and a hashed filename that
 * can be cached immutably.
 */
export type LocalPhotoId = "valley" | "treatment" | "earthquake" | "aid" | "relief" | "medical";

export const localPhotos: Record<LocalPhotoId, StaticImageData> = {
	valley: bannerImage,
	treatment: treatmentImage,
	earthquake: earthquakeImage,
	aid: aidImage,
	relief: reliefImage,
	medical: medicalImage,
};

/** Resolve a local photo into the same shape CMS media uses. */
export function localImage(id: LocalPhotoId, dictionary: Dictionary): CmsImage {
	const photo = localPhotos[id];
	return {
		url: photo.src,
		alt: dictionary.media.alt[id],
		width: photo.width,
		height: photo.height,
		thumbnailUrl: null,
	};
}

/**
 * The association's own photographs, offered in the gallery alongside CMS
 * albums so the page shows the full record rather than only what has been
 * uploaded to Strapi so far.
 */
export const galleryPhotoOrder: LocalPhotoId[] = [
	"valley",
	"treatment",
	"medical",
	"aid",
	"relief",
	"earthquake",
];

export function localGalleryImages(dictionary: Dictionary): CmsImage[] {
	return galleryPhotoOrder.map((id) => localImage(id, dictionary));
}
