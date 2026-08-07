import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getArticleBySlug, getArticles } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localeTags, localizePath, locales, type Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { CmsPicture } from "@/components/ui/CmsPicture";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArticleCard } from "@/components/content/ArticleCard";
import { localArticlePhoto } from "@/lib/media";

const categoryTones = {
	news: "neutral",
	event: "social",
	project: "environment",
	solidarity: "infrastructure",
} as const;

/**
 * Owns both dynamic segments and enumerates every locale — see the matching
 * note in the project detail route.
 */
export async function generateStaticParams() {
	const perLocale = await Promise.all(
		locales.map(async (locale) => {
			const articles = await getArticles(locale);
			return articles
				.filter((article) => article.slug)
				.map((article) => ({ lang: locale, slug: article.slug }));
		}),
	);

	return perLocale.flat();
}

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/actualites/[slug]">): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!isLocale(lang)) return {};

	const article = await getArticleBySlug(slug, lang);
	if (!article) return {};

	const dictionary = getDictionary(lang);
	const description = article.summary || article.content.slice(0, 200);

	return {
		title: article.title,
		description,
		alternates: { canonical: localizePath(`/actualites/${slug}`, lang) },
		openGraph: {
			type: "article",
			siteName: dictionary.meta.siteName,
			locale: localeTags[lang],
			title: article.title,
			description,
			publishedTime: article.publishedAt ?? undefined,
			images: article.cover ? [{ url: article.cover.url }] : undefined,
		},
	};
}

export default async function ArticleDetailPage({
	params,
}: PageProps<"/[lang]/actualites/[slug]">) {
	const { lang, slug } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const article = await getArticleBySlug(slug, locale);
	// The previous version rendered a bare "Aucune actualité trouvée" div with a
	// 200 status, so missing articles were indexable. This returns a real 404.
	if (!article) notFound();

	const published = formatDate(article.publishedAt, locale);
	const coverImage = localArticlePhoto(article.slug, dictionary) ?? article.cover;

	const related = (await getArticles(locale))
		.filter((candidate) => candidate.documentId !== article.documentId)
		.slice(0, 3);

	return (
		<>
			<article>
				<div className="border-b border-sand-200 bg-white">
					<Container size="narrow" className="py-10 sm:py-14">
						<Link
							href={localizePath("/actualites", locale)}
							className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 underline-offset-4 hover:underline">
							<ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
							{dictionary.common.backToNews}
						</Link>

						<div className="mt-6 flex flex-wrap items-center gap-3">
							<Badge tone={categoryTones[article.category]}>
								{dictionary.news.categories[article.category]}
							</Badge>
							{published ? (
								<time
									dateTime={article.publishedAt ?? undefined}
									className="text-sm text-sand-600">
									{dictionary.news.publishedOn} {published}
								</time>
							) : null}
						</div>

						<h1 className="mt-5 text-4xl text-forest-900">{article.title}</h1>

						{article.summary ? (
							<p className="mt-5 text-lg leading-relaxed text-ink-muted">{article.summary}</p>
						) : null}
					</Container>
				</div>

				{/* Bundled photo preferred — see FeaturedArticle. */}
				{coverImage ? (
					<Container size="narrow" className="py-10">
						<CmsPicture
							image={coverImage}
							ratio="3/2"
							priority
							sizes="(max-width: 768px) 100vw, 768px"
							className="rounded-card shadow-card"
						/>
					</Container>
				) : null}

				<Container size="narrow" className="pb-16">
					<Prose className="text-lg">{article.content}</Prose>
				</Container>
			</article>

			{related.length > 0 ? (
				<Section tone="canvas" size="wide">
					<SectionHeading title={dictionary.home.news.title} />
					<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{related.map((candidate) => (
							<li key={candidate.documentId} className="flex">
								<ArticleCard article={candidate} locale={locale} dictionary={dictionary} />
							</li>
						))}
					</ul>
				</Section>
			) : null}
		</>
	);
}
