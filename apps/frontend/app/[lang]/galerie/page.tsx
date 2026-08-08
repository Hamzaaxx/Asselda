import type { Metadata } from "next";

import { getAlbums } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { generateLocaleParams } from "@/lib/i18n/static-params";
import { localGalleryImages, localPhotos } from "@/lib/media";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/galerie">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "gallery", "/galerie");
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/galerie">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const albums = await getAlbums(locale);

	return (
		<>
			<PageHero
				title={dictionary.gallery.title}
				lead={dictionary.gallery.lead}
				image={{ photo: localPhotos.relief, alt: dictionary.media.alt.relief }}
			/>

			<Section tone="canvas" size="wide">
				{/*
				 * The association's own photographs are offered alongside the CMS
				 * albums, so the gallery shows the whole record rather than only what
				 * has been uploaded to Strapi so far.
				 */}
				<GalleryExplorer
					albums={albums}
					localImages={localGalleryImages(dictionary)}
					localAlbumTitle={dictionary.media.albumTitle}
					locale={locale}
					dictionary={dictionary}
				/>
			</Section>
		</>
	);
}
