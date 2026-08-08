import { ArrowRight, Droplets, HeartHandshake, Leaf } from "lucide-react";

import { getArticles, getPartners, getProjects } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { FOUNDING_YEAR, IMPACT_BENEFICIARIES } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TranslationNotice } from "@/components/ui/TranslationNotice";
import { HomeHero } from "@/components/home/HomeHero";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ArticleRow } from "@/components/articles/ArticleRow";
import { PartnerMarquee } from "@/components/partners/PartnerMarquee";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

const domainIcons = [Leaf, Droplets, HeartHandshake] as const;

/** Tints the icon chip to match each column's accent. */
const domainIconChips = [
	"bg-forest-100 text-forest-700",
	"bg-sky-brand/10 text-sky-brand",
	"bg-gold-brand/10 text-gold-brand",
] as const;

/** Short rule under each heading, in the same three colours. */
const domainRules = ["bg-forest-600", "bg-sky-brand", "bg-gold-brand"] as const;

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
				{/*
				 * Columns divided by hairlines rather than boxed cards. The sections
				 * below are card-based; keeping this one open stops the homepage
				 * reading as one long grid.
				 */}
				<ul className="grid gap-10 md:grid-cols-3 md:gap-0">
					{domains.map((domain, index) => {
						const Icon = domainIcons[index];
						return (
							<li
								key={domain.title}
								className="flex flex-col gap-3 md:border-e md:border-sand-300 md:px-8 md:first:ps-0 md:last:border-e-0 md:last:pe-0">
								<span
									className={`flex size-12 items-center justify-center rounded-card ${domainIconChips[index]}`}>
									<Icon className="size-6" aria-hidden="true" />
								</span>
								<h3 className="text-xl text-forest-900">{domain.title}</h3>
								<span
									aria-hidden="true"
									className={`h-0.5 w-8 rounded-full ${domainRules[index]}`}
								/>
								<p className="text-base leading-relaxed text-ink-muted">{domain.body}</p>
							</li>
						);
					})}
				</ul>
			</Section>

			{/* Flagship projects */}
			<Section tone="white" size="wide">
				{/* Said once here, covering the project and news sections below. */}
				<TranslationNotice
					items={[...featuredProjects, ...latestArticles]}
					dictionary={dictionary}
					className="mb-8"
				/>

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

				{/*
				 * One project at full weight rather than three equal cards. The
				 * flagship sorts first, so this is the 12 MDH sanitation station —
				 * the association's landmark work, and a far stronger opening than a
				 * row of thumbnails.
				 */}
				{featuredProjects.length > 0 ? (
					<FeaturedProject
						project={featuredProjects[0]}
						locale={locale}
						dictionary={dictionary}
					/>
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

				{/* A divided list, so this section does not repeat the shape of the
				    project feature immediately above it. */}
				{latestArticles.length > 0 ? (
					<ul className="divide-y divide-sand-300 border-y border-sand-300">
						{latestArticles.map((article) => (
							<li key={article.documentId}>
								<ArticleRow article={article} locale={locale} dictionary={dictionary} />
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
