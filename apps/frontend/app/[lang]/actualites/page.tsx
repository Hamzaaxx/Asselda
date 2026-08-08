import type { Metadata } from "next";

import { getArticles } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ArticlesExplorer } from "@/components/articles/ArticlesExplorer";
import { generateLocaleParams } from "@/lib/i18n/static-params";
import { localPhotos } from "@/lib/media";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/actualites">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "news", "/actualites");
}

/**
 * Note: the previous version of this page also rendered an "Événements à venir"
 * grid from the `events` collection. That collection is empty in every locale,
 * so the section only ever showed "Aucun événement trouvé". Events are published
 * as articles with the `event` category, which the category filter surfaces.
 */
export default async function NewsPage({ params }: PageProps<"/[lang]/actualites">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const articles = await getArticles(locale);

	return (
		<>
			{/* Post-earthquake aid distribution — the subject of two of the articles. */}
			<PageHero
				title={dictionary.news.title}
				lead={dictionary.news.lead}
				image={{ photo: localPhotos.aid, alt: dictionary.media.alt.aid }}
			/>

			<Section tone="canvas" size="wide">
				<ArticlesExplorer articles={articles} locale={locale} dictionary={dictionary} />
			</Section>
		</>
	);
}
