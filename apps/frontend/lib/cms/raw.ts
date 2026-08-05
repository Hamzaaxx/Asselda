/**
 * Shapes as Strapi actually returns them.
 *
 * These exist so `any` stops at the network boundary: `client.ts` reads raw
 * entries through these types and hands the rest of the app the clean domain
 * types in `types.ts`. Fields are optional or nullable wherever the live API has
 * been observed to omit them — `alternativeText` is null on every asset in this
 * instance, and `album` is null on every project.
 */

export type RawMediaFormat = {
	url?: string;
	width?: number;
	height?: number;
};

export type RawMedia = {
	url?: string;
	alternativeText?: string | null;
	width?: number | null;
	height?: number | null;
	formats?: {
		large?: RawMediaFormat;
		medium?: RawMediaFormat;
		small?: RawMediaFormat;
		thumbnail?: RawMediaFormat;
	} | null;
};

type RawEntry = {
	id: number;
	documentId: string;
	locale?: string;
	publishedAt?: string | null;
};

export type RawPartner = RawEntry & {
	order?: number | null;
	category?: string;
	name?: string;
	role?: string;
	description?: string;
	website?: string | null;
	logo?: RawMedia | null;
	projects?: unknown[] | null;
};

export type RawProject = RawEntry & {
	slug?: string;
	title?: string;
	statusType?: string;
	domain?: string;
	flagship?: boolean | null;
	/** Strapi `biginteger` arrives as a string. */
	budget?: string | number | null;
	description?: string;
	results?: string | null;
	imageCover?: RawMedia | null;
	partners?: RawPartner[] | null;
	album?: { images?: RawMedia[] | null } | null;
};

export type RawActivity = RawEntry & {
	slug?: string;
	title?: string;
	domain?: string;
	description?: string;
	impact?: string;
	imageCover?: RawMedia | null;
};

export type RawArticle = RawEntry & {
	slug?: string;
	title?: string;
	summary?: string | null;
	content?: string;
	category?: string;
	imageCover?: RawMedia | null;
};

export type RawAlbum = RawEntry & {
	slug?: string;
	title?: string;
	category?: string;
	date?: string | null;
	images?: RawMedia[] | null;
};

export type RawTimelineEvent = RawEntry & {
	startYear?: number;
	endYear?: number | null;
	description?: string;
};
