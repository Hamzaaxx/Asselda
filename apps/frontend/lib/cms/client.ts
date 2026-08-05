import "server-only";

import type { Locale } from "@/lib/i18n/config";
import type {
	RawActivity,
	RawAlbum,
	RawArticle,
	RawMedia,
	RawPartner,
	RawProject,
	RawTimelineEvent,
} from "./raw";
import type {
	Activity,
	Album,
	Article,
	CmsImage,
	Partner,
	Project,
	TimelineEntry,
} from "./types";

/**
 * Public origin of the Strapi instance. Also used to build absolute media URLs,
 * so it must stay public rather than server-only.
 */
export const CMS_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * How long a cached CMS response stays fresh, in seconds.
 *
 * The association publishes a handful of times a year, so an hour is generous
 * while still keeping every page statically served between edits.
 */
const REVALIDATE_SECONDS = 3600;

type Query = Record<string, string | number | boolean | undefined>;

function buildUrl(endpoint: string, query: Query = {}): string {
	const url = new URL(`${CMS_URL}/api/${endpoint}`);
	for (const [key, value] of Object.entries(query)) {
		if (value !== undefined) url.searchParams.set(key, String(value));
	}
	return url.toString();
}

/**
 * Fetch and unwrap a Strapi collection.
 *
 * Never throws: a CMS outage degrades a section to its empty state instead of
 * taking down the whole page. The error is logged for the server operator.
 */
async function fetchCollection<T>(endpoint: string, query: Query = {}): Promise<T[]> {
	if (!CMS_URL) {
		console.error(`[cms] NEXT_PUBLIC_API_URL is not set; skipping "${endpoint}"`);
		return [];
	}

	try {
		const response = await fetch(buildUrl(endpoint, query), {
			next: { revalidate: REVALIDATE_SECONDS, tags: [endpoint] },
		});

		if (!response.ok) {
			console.error(`[cms] ${endpoint} responded ${response.status}`);
			return [];
		}

		const payload = (await response.json()) as { data?: unknown };
		return Array.isArray(payload.data) ? (payload.data as T[]) : [];
	} catch (error) {
		console.error(`[cms] ${endpoint} request failed`, error);
		return [];
	}
}

// ---------------------------------------------------------------------------
// Normalisers
// ---------------------------------------------------------------------------

function absoluteUrl(path: string | undefined | null): string | null {
	if (!path) return null;
	return path.startsWith("http") ? path : `${CMS_URL}${path}`;
}

/**
 * Turn a Strapi media object into something `next/image` can render.
 *
 * `fallbackAlt` is the parent entry's title: every asset in this CMS has a null
 * `alternativeText`, and an image of a project is better described by that
 * project's name than by nothing at all.
 */
function toImage(media: RawMedia | null | undefined, fallbackAlt = ""): CmsImage | null {
	if (!media) return null;

	const url = absoluteUrl(media.url);
	if (!url) return null;

	return {
		url,
		alt: media.alternativeText?.trim() || fallbackAlt,
		width: media.width ?? 1200,
		height: media.height ?? 800,
		thumbnailUrl:
			absoluteUrl(media.formats?.small?.url) ?? absoluteUrl(media.formats?.thumbnail?.url),
	};
}

/** Strapi `string` fields in this instance carry stray leading/trailing spaces. */
function text(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

/**
 * Narrow a CMS enum to a known member.
 *
 * Editors can add an enum value in Strapi that the frontend has no label or
 * colour for. Falling back keeps the page rendering instead of producing an
 * `undefined` dictionary lookup, and the warning tells the operator to add it.
 */
function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
	if (typeof value === "string" && (allowed as readonly string[]).includes(value)) {
		return value as T;
	}
	if (value !== undefined) {
		console.warn(`[cms] unknown enum value "${String(value)}"; falling back to "${fallback}"`);
	}
	return fallback;
}

const PROJECT_STATUSES = ["inProgress", "done", "operational", "planned"] as const;
const PROJECT_DOMAINS = ["environment", "sanitation", "infrastructure", "social"] as const;
const ACTIVITY_DOMAINS = ["environment", "infrastructure", "social", "formation"] as const;
const ARTICLE_CATEGORIES = ["news", "event", "project", "solidarity"] as const;
const PARTNER_CATEGORIES = ["international", "institutional", "national"] as const;
const ALBUM_CATEGORIES = [
	"environment",
	"sanitation",
	"roads",
	"earthquake",
	"formation",
	"events",
	"volunteers",
] as const;

function normalizeProject(raw: RawProject): Project {
	const title = text(raw.title);
	return {
		id: raw.id,
		documentId: raw.documentId,
		slug: text(raw.slug),
		title,
		status: oneOf(raw.statusType, PROJECT_STATUSES, "done"),
		domain: oneOf(raw.domain, PROJECT_DOMAINS, "environment"),
		flagship: Boolean(raw.flagship),
		budget: raw.budget != null && raw.budget !== "" ? Number(raw.budget) : null,
		description: text(raw.description),
		results: text(raw.results) || null,
		cover: toImage(raw.imageCover, title),
		partners: (raw.partners ?? []).map((partner) => ({
			documentId: partner.documentId,
			name: text(partner.name),
		})),
		images: (raw.album?.images ?? [])
			.map((image) => toImage(image, title))
			.filter(Boolean) as CmsImage[],
	};
}

function normalizePartner(raw: RawPartner): Partner {
	const name = text(raw.name);
	return {
		id: raw.id,
		documentId: raw.documentId,
		order: raw.order ?? Number.MAX_SAFE_INTEGER,
		category: oneOf(raw.category, PARTNER_CATEGORIES, "national"),
		name,
		role: text(raw.role),
		description: text(raw.description),
		website: text(raw.website) || null,
		logo: toImage(raw.logo, name),
		projectCount: (raw.projects ?? []).length,
	};
}

function normalizeActivity(raw: RawActivity): Activity {
	const title = text(raw.title);
	return {
		id: raw.id,
		documentId: raw.documentId,
		slug: text(raw.slug),
		title,
		domain: oneOf(raw.domain, ACTIVITY_DOMAINS, "social"),
		description: text(raw.description),
		impact: text(raw.impact),
		cover: toImage(raw.imageCover, title),
	};
}

function normalizeArticle(raw: RawArticle): Article {
	const title = text(raw.title);
	return {
		id: raw.id,
		documentId: raw.documentId,
		slug: text(raw.slug),
		title,
		summary: text(raw.summary),
		content: text(raw.content),
		category: oneOf(raw.category, ARTICLE_CATEGORIES, "news"),
		publishedAt: raw.publishedAt ?? null,
		cover: toImage(raw.imageCover, title),
	};
}

function normalizeAlbum(raw: RawAlbum): Album {
	const title = text(raw.title);
	return {
		id: raw.id,
		documentId: raw.documentId,
		slug: text(raw.slug),
		title,
		category: oneOf(raw.category, ALBUM_CATEGORIES, "events"),
		date: raw.date ?? null,
		images: (raw.images ?? [])
			.map((image) => toImage(image, title))
			.filter(Boolean) as CmsImage[],
	};
}

function normalizeTimelineEntry(raw: RawTimelineEvent): TimelineEntry {
	return {
		id: raw.id,
		documentId: raw.documentId,
		startYear: raw.startYear ?? 0,
		endYear: raw.endYear ?? null,
		description: text(raw.description),
	};
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

const collectionQuery = (locale: Locale) => ({
	locale,
	populate: "*",
	"pagination[pageSize]": 100,
});

export async function getProjects(locale: Locale): Promise<Project[]> {
	const raw = await fetchCollection<RawProject>("projects", {
		locale,
		"pagination[pageSize]": 100,
		// Explicit populate rather than `*`, so a detail page can reach the
		// project's album images — `populate=*` stops one level deep.
		"populate[imageCover]": "true",
		"populate[partners]": "true",
		"populate[album][populate][images]": "true",
	});
	// Flagship projects lead, then newest first — the CMS has no explicit ordering.
	return raw
		.map(normalizeProject)
		.sort((a, b) => Number(b.flagship) - Number(a.flagship) || b.id - a.id);
}

export async function getProjectBySlug(slug: string, locale: Locale): Promise<Project | null> {
	const projects = await getProjects(locale);
	return projects.find((project) => project.slug === slug) ?? null;
}

export async function getActivities(locale: Locale): Promise<Activity[]> {
	const raw = await fetchCollection<RawActivity>("activities", collectionQuery(locale));
	return raw.map(normalizeActivity).sort((a, b) => a.title.localeCompare(b.title, locale));
}

export async function getArticles(locale: Locale): Promise<Article[]> {
	const raw = await fetchCollection<RawArticle>("articles", collectionQuery(locale));
	return raw.map(normalizeArticle).sort((a, b) => {
		const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
		const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
		return bTime - aTime;
	});
}

export async function getArticleBySlug(slug: string, locale: Locale): Promise<Article | null> {
	const articles = await getArticles(locale);
	return articles.find((article) => article.slug === slug) ?? null;
}

export async function getPartners(locale: Locale): Promise<Partner[]> {
	const raw = await fetchCollection<RawPartner>("partners", collectionQuery(locale));
	return raw.map(normalizePartner).sort((a, b) => a.order - b.order);
}

export async function getAlbums(locale: Locale): Promise<Album[]> {
	const raw = await fetchCollection<RawAlbum>("albums", collectionQuery(locale));
	return raw.map(normalizeAlbum).sort((a, b) => {
		const aTime = a.date ? Date.parse(a.date) : 0;
		const bTime = b.date ? Date.parse(b.date) : 0;
		return bTime - aTime;
	});
}

/**
 * Chronological, oldest first.
 *
 * The API returns these in insertion order (2012, 1996, 2000, 2022, 2024, 2023),
 * which the previous implementation rendered verbatim.
 */
export async function getTimeline(locale: Locale): Promise<TimelineEntry[]> {
	const raw = await fetchCollection<RawTimelineEvent>("timeline-events", collectionQuery(locale));
	return raw.map(normalizeTimelineEntry).sort((a, b) => a.startYear - b.startYear);
}
