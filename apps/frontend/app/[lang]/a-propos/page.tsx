import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { getTimeline } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { generateLocaleParams } from "@/lib/i18n/static-params";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Timeline } from "@/components/sections/Timeline";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIdentity, AboutManifesto } from "@/components/about/AboutManifesto";
import { AboutObjectives, AboutValues } from "@/components/about/AboutPrinciples";
import { AboutBureau } from "@/components/about/AboutBureau";
import { AboutDocuments } from "@/components/about/AboutDocuments";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/a-propos">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "about", "/a-propos");
}

/**
 * About page.
 *
 * Composed of purpose-built sections rather than the shared hero + card-grid
 * pattern the rest of the site uses. Every section here has a different shape —
 * statement, numbered list, typographic band, centred timeline, grouped roster,
 * register — so the page reads as a narrative instead of seven stacked grids.
 */
export default async function AboutPage({ params }: PageProps<"/[lang]/a-propos">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);
	const { about } = dictionary;

	const timeline = await getTimeline(locale);

	return (
		<>
			<AboutHero locale={locale} dictionary={dictionary} />

			<AboutIdentity dictionary={dictionary} />

			<AboutManifesto dictionary={dictionary} />

			<AboutObjectives dictionary={dictionary} />

			{/* The thirty-year arc, as the page's centrepiece. */}
			<section className="relative overflow-hidden bg-forest-950 py-20 sm:py-28">
				<span
					aria-hidden="true"
					className="texture-contour pointer-events-none absolute inset-0 opacity-[0.06]"
				/>
				<Container className="relative">
					<div className="flex flex-col items-center gap-4 text-center">
						<span aria-hidden="true" className="h-1 w-12 rounded-full bg-clay-500" />
						<h2 className="text-3xl text-white">{about.timeline.title}</h2>
						<p className="max-w-2xl text-lg text-forest-200">{about.timeline.subtitle}</p>
					</div>

					<div className="mt-16">
						<Timeline
							entries={timeline}
							dictionary={dictionary}
							variant="spine"
							tone="dark"
						/>
					</div>
				</Container>
			</section>

			<AboutValues dictionary={dictionary} />

			<AboutBureau dictionary={dictionary} />

			<AboutDocuments dictionary={dictionary} />

			{/* Closing invitation — the About page previously ended on a file list. */}
			<section className="bg-forest-800 py-16">
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
			</section>
		</>
	);
}
