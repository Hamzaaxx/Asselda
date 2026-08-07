import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { getProjects } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/content/PageHero";
import { ProjectsExplorer } from "@/components/content/ProjectsExplorer";
import { generateLocaleParams } from "@/lib/i18n/static-params";
import { localPhotos } from "@/lib/media";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({ params }: PageProps<"/[lang]/projets">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "projects", "/projets");
}

/**
 * Projects.
 *
 * The association's history timeline used to close this page. It now lives on
 * the About page, where it is the centrepiece — the entries are association
 * milestones (founding in 1996, the earthquake, the change of bureau) rather
 * than project records, and rendering the same six entries on both pages was
 * duplication. Restoring it here is a matter of re-adding `getTimeline` and a
 * `<Timeline>` section.
 */
export default async function ProjectsPage({ params }: PageProps<"/[lang]/projets">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const projects = await getProjects(locale);

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

			{/* Closing invitation, so the page does not simply stop after the list. */}
			<Section tone="forest">
				<Container className="flex flex-col items-center gap-6 text-center">
					<h2 className="max-w-2xl text-3xl text-white">{dictionary.home.cta.title}</h2>
					<p className="max-w-xl text-lg text-forest-100">{dictionary.home.cta.subtitle}</p>
					<div className="flex flex-col gap-3 sm:flex-row">
						<ButtonLink href={localizePath("/rejoindre", locale)} variant="onDark" size="lg">
							{dictionary.home.cta.primary}
							<ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
						</ButtonLink>
						<ButtonLink href={localizePath("/contact", locale)} variant="secondary" size="lg">
							{dictionary.home.cta.secondary}
						</ButtonLink>
					</div>
				</Container>
			</Section>
		</>
	);
}
