"use client";

import { useMemo, useState } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

import type { Album, CmsImage } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterPills, type FilterOption } from "@/components/ui/FilterPills";

type GalleryExplorerProps = {
	albums: Album[];
	/** Photographs shipped in `public/Images`, shown as their own album. */
	localImages?: CmsImage[];
	localAlbumTitle?: string;
	locale: Locale;
	dictionary: Dictionary;
};

/** Sentinel id for the bundled photographs, which have no CMS document. */
const LOCAL_ALBUM_ID = "__local__";

/**
 * Masonry photo grid with a lightbox.
 *
 * All albums are loaded once on the server; switching albums filters in memory
 * rather than issuing a new request per selection as the previous version did
 * (which also fetched the album list client-side in a `useEffect`, so the grid
 * was empty on first paint).
 */
export function GalleryExplorer({
	albums,
	localImages = [],
	localAlbumTitle,
	locale,
	dictionary,
}: GalleryExplorerProps) {
	const [albumId, setAlbumId] = useState<string>("all");
	const [index, setIndex] = useState(-1);

	/*
	 * CMS albums and the bundled photographs are merged into one list so the rest
	 * of the component treats both sources identically. The local set leads,
	 * because it is currently the larger and better-captioned of the two.
	 */
	const sources = useMemo(() => {
		const cms = albums.map((album) => ({
			id: album.documentId,
			title: album.title,
			images: album.images,
		}));

		if (localImages.length === 0) return cms;

		return [
			{ id: LOCAL_ALBUM_ID, title: localAlbumTitle ?? "", images: localImages },
			...cms,
		];
	}, [albums, localImages, localAlbumTitle]);

	const options = useMemo<FilterOption<string>[]>(
		() => [
			{
				value: "all",
				label: dictionary.gallery.allAlbums,
				count: sources.reduce((total, source) => total + source.images.length, 0),
			},
			...sources.map((source) => ({
				value: source.id,
				label: source.title,
				count: source.images.length,
			})),
		],
		[sources, dictionary],
	);

	const photos = useMemo(() => {
		const selected =
			albumId === "all" ? sources : sources.filter((source) => source.id === albumId);

		return selected
			.flatMap((source) => source.images)
			.map((image) => ({
				src: image.url,
				alt: image.alt,
				width: image.width,
				height: image.height,
				// Lets the browser pick a smaller file for grid thumbnails.
				srcSet: image.thumbnailUrl
					? [
							{
								src: image.thumbnailUrl,
								width: 500,
								height: Math.round((500 / image.width) * image.height),
							},
						]
					: undefined,
			}));
	}, [sources, albumId]);

	if (photos.length === 0) {
		return (
			<EmptyState
				title={dictionary.empty.title}
				description={
					locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.gallery
				}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-10">
			{options.length > 2 ? (
				<FilterPills
					label={dictionary.gallery.filterLabel}
					options={options}
					value={albumId}
					onChange={setAlbumId}
				/>
			) : null}

			<p aria-live="polite" className="sr-only">
				{format(dictionary.gallery.photoCount, { count: photos.length })}
			</p>

			<MasonryPhotoAlbum
				photos={photos}
				spacing={16}
				columns={(width) => (width < 480 ? 2 : width < 900 ? 3 : 4)}
				/*
				 * Without this the grid measures its container on the client and
				 * renders nothing on the server, so the page ships with an empty
				 * gallery until hydration. Seeding the desktop container width lets
				 * the markup arrive with the photos already laid out.
				 */
				defaultContainerWidth={1152}
				onClick={({ index: clicked }) => setIndex(clicked)}
				/*
				 * Supplying `onClick` makes the library wrap each photo in a real
				 * <button>, so opening a photo works from the keyboard. Styling and
				 * the accessible name are attached to that button rather than to a
				 * custom wrapper.
				 */
				componentsProps={{
					button: ({ photo }) => ({
						"aria-label": photo.alt || dictionary.gallery.openPhoto,
						className:
							"block w-full cursor-zoom-in overflow-hidden rounded-card " +
							"ring-1 ring-sand-300/70 transition-transform duration-300 hover:scale-[1.02]",
					}),
				}}
			/>

			<Lightbox
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				slides={photos}
				plugins={[Counter, Fullscreen, Zoom]}
				carousel={{ finite: false }}
				styles={{ container: { backgroundColor: "rgba(15, 36, 24, 0.94)" } }}
				labels={{ Close: dictionary.gallery.closePhoto }}
			/>
		</div>
	);
}
