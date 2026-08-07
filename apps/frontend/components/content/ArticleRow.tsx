import Link from "next/link";

import type { Article } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { CmsPicture } from "@/components/ui/CmsPicture";

const categoryTones = {
	news: "neutral",
	event: "social",
	project: "environment",
	solidarity: "infrastructure",
} as const;

type ArticleRowProps = {
	article: Article;
	locale: Locale;
	dictionary: Dictionary;
};

/**
 * A news item as a compact list row.
 *
 * Dense and scannable, with a small thumbnail rather than a full cover — the
 * counterpart to the lead story above it, and visually distinct from the
 * project rows so the two sections of the home page no longer look identical.
 *
 * Rendered as a list item; the caller supplies the `<ul>` and its dividers.
 */
export function ArticleRow({ article, locale, dictionary }: ArticleRowProps) {
	const href = localizePath(`/actualites/${article.slug}`, locale);
	const published = formatDate(article.publishedAt, locale);

	return (
		<article className="group/card relative flex items-start gap-5 py-6">
			<CmsPicture
				image={article.cover}
				ratio="1/1"
				zoomOnHover
				sizes="112px"
				className="w-20 shrink-0 rounded-card sm:w-28"
			/>

			<div className="flex min-w-0 flex-col gap-2">
				<div className="flex flex-wrap items-center gap-3">
					<Badge tone={categoryTones[article.category]}>
						{dictionary.news.categories[article.category]}
					</Badge>
					{published ? (
						<time dateTime={article.publishedAt ?? undefined} className="text-xs text-sand-600">
							{published}
						</time>
					) : null}
				</div>

				<h3 className="text-lg leading-snug text-forest-900 sm:text-xl">
					<Link
						href={href}
						className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover/card:text-forest-700">
						{article.title}
					</Link>
				</h3>

				{article.summary ? (
					<p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">
						{article.summary}
					</p>
				) : null}
			</div>
		</article>
	);
}
