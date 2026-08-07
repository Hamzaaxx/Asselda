import type { StaticImageData } from "next/image";

import bannerImage from "@/public/Images/banner.jpeg";
import treatmentImage from "@/public/Images/eau.jpeg";
import earthquakeImage from "@/public/Images/seisme.jpg";
import aidImage from "@/public/Images/recons1.jpg";
import reliefImage from "@/public/Images/recons2.jpg";
import medicalImage from "@/public/Images/Ev2.png";

import alOmraneLogo from "@/public/Images/partners/al-omrane.png";
import amsedLogo from "@/public/Images/partners/amsed.png";
import communeAsniLogo from "@/public/Images/partners/commune-asni.png";
import entraideNationaleLogo from "@/public/Images/partners/entraide-nationale.png";
import fmpsLogo from "@/public/Images/partners/fmps.png";
import indhLogo from "@/public/Images/partners/indh.jpg";
import ministereInterieurLogo from "@/public/Images/partners/ministere-interieur.png";
import provinceAlHaouzLogo from "@/public/Images/partners/province-alhaouz.png";
import regionMarrakechLogo from "@/public/Images/partners/region-marrakech.png";
import rimLogo from "@/public/Images/partners/rim.jpg";

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

/**
 * Locally bundled partner logos, matched to CMS partners by name.
 *
 * These are used only when the CMS logo cannot be loaded — which is currently
 * always, because every partner logo referenced by Strapi 404s (see
 * docs/AUDIT-AND-ROADMAP.md). Keeping the CMS as the first choice means the
 * moment those uploads are restored, the CMS logo wins again with no code
 * change.
 *
 * Matching is on a distinctive fragment of the partner's name rather than an id,
 * so it survives an editor renaming or re-creating an entry. All ten partners
 * now have a bundled logo; anything unmatched falls back to its initials.
 *
 * Patterns are deliberately narrow. "Nationale" for instance appears in both
 * "L'INDH (Initiative Nationale...)" and "Entraide Nationale", so each is keyed
 * on a word unique to it.
 */
const partnerLogoMatchers: { pattern: RegExp; logo: StaticImageData }[] = [
	{ pattern: /amsed/, logo: amsedLogo },
	{ pattern: /asni/, logo: communeAsniLogo },
	{ pattern: /haouz/, logo: provinceAlHaouzLogo },
	{ pattern: /marrakech|wilaya/, logo: regionMarrakechLogo },
	{ pattern: /interieur/, logo: ministereInterieurLogo },
	{ pattern: /fmps|prescolaire/, logo: fmpsLogo },
	{ pattern: /indh/, logo: indhLogo },
	{ pattern: /omrane/, logo: alOmraneLogo },
	{ pattern: /\brim\b/, logo: rimLogo },
	{ pattern: /entraide/, logo: entraideNationaleLogo },
];

/**
 * Stand-in photographs for articles whose CMS cover is unavailable.
 *
 * Only mapped where a bundled photograph genuinely depicts the article's
 * subject — the treatment station for the article about the treatment station,
 * the earthquake-damaged village for the article about reconstruction. The
 * other articles have no honest match in `public/Images` (the only Awrach and
 * general-assembly images there are stock photographs of a French street and a
 * corporate boardroom), so they show the placeholder panel instead.
 *
 * This is a stopgap for the missing CMS media, not a replacement for it: a CMS
 * cover always wins when one loads.
 */
const articlePhotoMatchers: { pattern: RegExp; id: LocalPhotoId }[] = [
	{ pattern: /seisme|reconstruction/, id: "earthquake" },
	{ pattern: /assainissement|station/, id: "treatment" },
];

export function localArticlePhoto(slug: string, dictionary: Dictionary): CmsImage | null {
	const normalized = slug.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
	const match = articlePhotoMatchers.find(({ pattern }) => pattern.test(normalized));
	return match ? localImage(match.id, dictionary) : null;
}

export function localPartnerLogo(partnerName: string): StaticImageData | null {
	// Strip accents and case so "préScolaire" and "Intérieur" match plain ASCII
	// patterns, and Arabic names simply find no match.
	const normalized = partnerName
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "");

	return partnerLogoMatchers.find(({ pattern }) => pattern.test(normalized))?.logo ?? null;
}
