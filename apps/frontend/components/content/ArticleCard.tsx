import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Article } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CmsPicture } from "@/components/ui/CmsPicture";
import { localArticlePhoto } from "@/lib/media";

const categoryTones = {
	news: "neutral",
	event: "social",
	project: "environment",
	solidarity: "infrastructure",
} as const;

type ArticleCardProps = {
	article: Article;
	locale: Locale;
	dictionary: Dictionary;
	priority?: boolean;
};

export function ArticleCard({ article, locale, dictionary, priority }: ArticleCardProps) {
	const href = localizePath(`/actualites/${article.slug}`, locale);
	const published = formatDate(article.publishedAt, locale);

	return (
		<Card as="article" interactive accent={categoryTones[article.category]} className="h-full">
			{/* Bundled photo preferred — see FeaturedArticle. */}
			<CmsPicture
				image={localArticlePhoto(article.slug, dictionary) ?? article.cover}
				ratio="16/9"
				priority={priority}
				zoomOnHover
			/>

			<div className="flex flex-1 flex-col gap-3 p-6">
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

				<h3 className="text-xl text-forest-900">
					<Link href={href} className="after:absolute after:inset-0 after:content-['']">
						{article.title}
					</Link>
				</h3>

				{article.summary ? (
					<p className="line-clamp-3 text-base leading-relaxed text-ink-muted">
						{article.summary}
					</p>
				) : null}

				<span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-forest-700">
					{dictionary.common.readMore}
					<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
				</span>
			</div>
		</Card>
	);
}
