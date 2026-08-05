/**
 * Domain types for CMS content.
 *
 * These describe what components consume, not what Strapi returns. Normalisation
 * happens once in `client.ts`, so nothing downstream deals with raw payloads,
 * nullable media, or relation wrappers.
 */

export type ProjectStatus = "inProgress" | "done" | "operational" | "planned";
export type ProjectDomain = "environment" | "sanitation" | "infrastructure" | "social";
export type ActivityDomain = "environment" | "infrastructure" | "social" | "formation";
export type ArticleCategory = "news" | "event" | "project" | "solidarity";
export type PartnerCategory = "international" | "institutional" | "national";
export type AlbumCategory =
	| "environment"
	| "sanitation"
	| "roads"
	| "earthquake"
	| "formation"
	| "events"
	| "volunteers";

/**
 * An image ready to hand to `next/image`.
 *
 * `alt` is always a string. Strapi's `alternativeText` is null on every asset in
 * this instance, so the normaliser falls back to the parent entry's title and
 * finally to an empty string — which is the correct value for decorative images
 * and never renders the literal "null" a screen reader would announce.
 */
export type CmsImage = {
	url: string;
	alt: string;
	width: number;
	height: number;
	/** Largest available preview, used as a blur/low-quality placeholder source. */
	thumbnailUrl: string | null;
};

export type Project = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	status: ProjectStatus;
	domain: ProjectDomain;
	flagship: boolean;
	/** Raw integer in dirhams, or null. Format at render time with the locale. */
	budget: number | null;
	/** Markdown. */
	description: string;
	results: string | null;
	cover: CmsImage | null;
	partners: PartnerSummary[];
	images: CmsImage[];
};

export type PartnerSummary = {
	documentId: string;
	name: string;
};

export type Partner = {
	id: number;
	documentId: string;
	order: number;
	category: PartnerCategory;
	name: string;
	role: string;
	description: string;
	website: string | null;
	logo: CmsImage | null;
	projectCount: number;
};

export type Activity = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	domain: ActivityDomain;
	/** Markdown. */
	description: string;
	/** Markdown. */
	impact: string;
	cover: CmsImage | null;
};

export type Article = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	summary: string;
	/** Markdown. */
	content: string;
	category: ArticleCategory;
	publishedAt: string | null;
	cover: CmsImage | null;
};

export type Album = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	category: AlbumCategory;
	date: string | null;
	images: CmsImage[];
};

export type TimelineEntry = {
	id: number;
	documentId: string;
	startYear: number;
	endYear: number | null;
	description: string;
};
