import type { Metadata } from "next";

import { getActivities } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ActivitiesExplorer } from "@/components/activities/ActivitiesExplorer";
import { generateLocaleParams } from "@/lib/i18n/static-params";
import { localPhotos } from "@/lib/media";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/activites">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "activities", "/activites");
}

export default async function ActivitiesPage({ params }: PageProps<"/[lang]/activites">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const activities = await getActivities(locale);

	return (
		<>
			{/* A medical caravan — one of the activities listed on this page. */}
			<PageHero
				title={dictionary.activities.title}
				lead={dictionary.activities.lead}
				image={{ photo: localPhotos.medical, alt: dictionary.media.alt.medical }}
			/>

			<Section tone="canvas" size="wide">
				<ActivitiesExplorer activities={activities} locale={locale} dictionary={dictionary} />
			</Section>
		</>
	);
}
