import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

type FeaturedArticleProps = {
	article: Article;
	locale: Locale;
	dictionary: Dictionary;
	priority?: boolean;
};

/**
 * The lead story.
 *
 * A newsroom does not print every story at the same size, and neither should
 * this page. The most recent article gets a wide photograph and a display-size
 * headline; everything else follows as compact rows.
 */
export function FeaturedArticle({
	article,
	locale,
	dictionary,
	priority = false,
}: FeaturedArticleProps) {
	const href = localizePath(`/actualites/${article.slug}`, locale);
	const published = formatDate(article.publishedAt, locale);

	return (
		<article className="group/card relative overflow-hidden rounded-card bg-white shadow-card ring-1 ring-sand-300/70">
			<CmsPicture
				image={article.cover}
				ratio="16/9"
				priority={priority}
				zoomOnHover
				sizes="(max-width: 1152px) 100vw, 1152px"
			/>

			<div className="flex flex-col gap-4 p-7 sm:p-10">
				<div className="flex flex-wrap items-center gap-3">
					<Badge tone={categoryTones[article.category]}>
						{dictionary.news.categories[article.category]}
					</Badge>
					{published ? (
						<time dateTime={article.publishedAt ?? undefined} className="text-sm text-sand-600">
							{published}
						</time>
					) : null}
				</div>

				<h3 className="max-w-3xl text-3xl text-forest-900">
					<Link href={href} className="after:absolute after:inset-0 after:content-['']">
						{article.title}
					</Link>
				</h3>

				{article.summary ? (
					<p className="max-w-3xl text-lg leading-relaxed text-ink-muted">{article.summary}</p>
				) : null}

				<span className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-forest-700">
					{dictionary.common.readMore}
					<ArrowRight
						className="size-4 transition-transform duration-300 group-hover/card:translate-x-1 rtl:-scale-x-100 rtl:group-hover/card:-translate-x-1"
						aria-hidden="true"
					/>
				</span>
			</div>
		</article>
	);
}
