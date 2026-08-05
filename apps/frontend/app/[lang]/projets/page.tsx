import type { Metadata } from "next";

import { getProjects, getTimeline } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/content/PageHero";
import { ProjectsExplorer } from "@/components/content/ProjectsExplorer";
import { Timeline } from "@/components/content/Timeline";
import { generateLocaleParams } from "@/lib/i18n/static-params";
import { localPhotos } from "@/lib/media";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({ params }: PageProps<"/[lang]/projets">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "projects", "/projets");
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projets">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const [projects, timeline] = await Promise.all([getProjects(locale), getTimeline(locale)]);

	return (
		<>
			{/* The treatment station is the association's flagship project. */}
			<PageHero
				title={dictionary.projects.title}
				lead={dictionary.projects.lead}
				image={{ photo: localPhotos.treatment, alt: dictionary.media.alt.treatment }}
			/>

			<Section tone="canvas" size="wide">
				<ProjectsExplorer projects={projects} locale={locale} dictionary={dictionary} />
			</Section>

			<Section tone="white">
				<SectionHeading
					title={dictionary.projects.timeline.title}
					subtitle={dictionary.projects.timeline.subtitle}
				/>
				<Timeline entries={timeline} dictionary={dictionary} />
			</Section>
		</>
	);
}
