import { ArrowRight, Droplets, HeartHandshake, Leaf } from "lucide-react";

import { getArticles, getPartners, getProjects } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { FOUNDING_YEAR, IMPACT_BENEFICIARIES } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section, SectionHeading } from "@/components/ui/Section";
import { HomeHero } from "@/components/content/HomeHero";
import { StatsBand } from "@/components/content/StatsBand";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ArticleCard } from "@/components/content/ArticleCard";
import { PartnerMarquee } from "@/components/content/PartnerMarquee";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

const domainIcons = [Leaf, Droplets, HeartHandshake] as const;

/** Same colour coding the project and activity grids use for these domains. */
const domainAccents = ["environment", "sanitation", "social"] as const;

/** Tints the icon chip to match each card's accent rule. */
const domainIconChips = [
	"bg-forest-100 text-forest-700",
	"bg-sky-brand/10 text-sky-brand",
	"bg-gold-brand/10 text-gold-brand",
] as const;

export default async function HomePage({ params }: PageProps<"/[lang]">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	// Fetched in parallel: three sequential awaits would stack their latency.
	const [projects, articles, partners] = await Promise.all([
		getProjects(locale),
		getArticles(locale),
		getPartners(locale),
	]);

	const featuredProjects = projects.slice(0, 3);
	const latestArticles = articles.slice(0, 3);

	/*
	 * Impact figures.
	 *
	 * Projects and partners count themselves; years is derived from the founding
	 * year. Only beneficiaries is a hand-entered constant, because the CMS holds
	 * no data that could produce it.
	 */
	const stats = [
		{ value: projects.length, label: dictionary.home.stats.projects },
		{
			value: IMPACT_BENEFICIARIES,
			label: dictionary.home.stats.beneficiaries,
			approximate: true,
		},
		{ value: new Date().getFullYear() - FOUNDING_YEAR, label: dictionary.home.stats.years },
		{ value: partners.length, label: dictionary.home.stats.partners },
	];

	const domains = [
		dictionary.home.domains.environment,
		dictionary.home.domains.development,
		dictionary.home.domains.family,
	];

	return (
		<>
			<HomeHero locale={locale} dictionary={dictionary} />

			<StatsBand stats={stats} locale={locale} heading={dictionary.home.stats.title} />

			{/* Areas of work */}
			<Section tone="canvas">
				<SectionHeading
					title={dictionary.home.domains.title}
					subtitle={dictionary.home.domains.subtitle}
					align="center"
					className="items-center"
				/>
				<ul className="grid gap-6 md:grid-cols-3">
					{domains.map((domain, index) => {
						const Icon = domainIcons[index];
						return (
							<Card
								as="li"
								key={domain.title}
								accent={domainAccents[index]}
								className="items-start gap-4 p-8 pt-9">
								<span
									className={`flex size-12 items-center justify-center rounded-card ${domainIconChips[index]}`}>
									<Icon className="size-6" aria-hidden="true" />
								</span>
								<h3 className="text-xl text-forest-900">{domain.title}</h3>
								<p className="text-base leading-relaxed text-ink-muted">{domain.body}</p>
							</Card>
						);
					})}
				</ul>
			</Section>

			{/* Flagship projects */}
			<Section tone="white" size="wide">
				<div className="mb-10 flex flex-wrap items-end justify-between gap-4">
					<SectionHeading
						title={dictionary.home.projects.title}
						subtitle={dictionary.home.projects.subtitle}
						className="mb-0"
					/>
					<ButtonLink href={localizePath("/projets", locale)} variant="ghost">
						{dictionary.common.seeAllProjects}
						<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
					</ButtonLink>
				</div>

				{featuredProjects.length > 0 ? (
					<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{featuredProjects.map((project) => (
							<li key={project.documentId} className="flex">
								<ProjectCard project={project} locale={locale} dictionary={dictionary} />
							</li>
						))}
					</ul>
				) : (
					<EmptyState
						title={dictionary.empty.title}
						description={
							locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.projects
						}
					/>
				)}
			</Section>

			{/* News */}
			<Section tone="canvas" size="wide">
				<div className="mb-10 flex flex-wrap items-end justify-between gap-4">
					<SectionHeading
						title={dictionary.home.news.title}
						subtitle={dictionary.home.news.subtitle}
						className="mb-0"
					/>
					<ButtonLink href={localizePath("/actualites", locale)} variant="ghost">
						{dictionary.common.seeAllNews}
						<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
					</ButtonLink>
				</div>

				{latestArticles.length > 0 ? (
					<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{latestArticles.map((article) => (
							<li key={article.documentId} className="flex">
								<ArticleCard article={article} locale={locale} dictionary={dictionary} />
							</li>
						))}
					</ul>
				) : (
					<EmptyState
						title={dictionary.empty.title}
						description={
							locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.news
						}
					/>
				)}
			</Section>

			{/* Partners */}
			{partners.length > 0 ? (
				<Section tone="white" size="wide" compact>
					<SectionHeading
						title={dictionary.home.partners.title}
						subtitle={dictionary.home.partners.subtitle}
						align="center"
						className="items-center"
					/>
					<PartnerMarquee partners={partners} />
					<div className="mt-10 flex justify-center">
						<ButtonLink href={localizePath("/partenaires", locale)} variant="ghost">
							{dictionary.common.seeAllPartners}
							<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
						</ButtonLink>
					</div>
				</Section>
			) : null}

			{/* Closing call to action */}
			<Section tone="forest" size="default">
				<div className="flex flex-col items-center gap-6 text-center">
					<SectionHeading
						title={dictionary.home.cta.title}
						subtitle={dictionary.home.cta.subtitle}
						align="center"
						tone="light"
						className="mb-0 items-center"
					/>
					<div className="flex flex-col gap-3 sm:flex-row">
						<ButtonLink href={localizePath("/rejoindre", locale)} variant="onDark" size="lg">
							{dictionary.home.cta.primary}
							<ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
						</ButtonLink>
						<ButtonLink href={localizePath("/contact", locale)} variant="secondary" size="lg">
							{dictionary.home.cta.secondary}
						</ButtonLink>
					</div>
				</div>
			</Section>
		</>
	);
}
