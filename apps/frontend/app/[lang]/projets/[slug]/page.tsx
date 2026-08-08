import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";

import { getProjectBySlug, getProjects } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localeTags, localizePath, locales, type Locale } from "@/lib/i18n/config";
import { domainTone, formatBudget } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { CmsPicture } from "@/components/ui/CmsPicture";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";

/**
 * Detail pages are known at build time, so they prerender rather than rendering
 * on demand.
 *
 * This route owns both dynamic segments. No ancestor declares
 * `generateStaticParams` (see lib/i18n/static-params.ts for why), so this is
 * called once and must enumerate every locale itself. Slugs differ per locale,
 * so the pairs cannot be derived by multiplying two independent lists.
 */
export async function generateStaticParams() {
	const perLocale = await Promise.all(
		locales.map(async (locale) => {
			const projects = await getProjects(locale);
			return projects
				.filter((project) => project.slug)
				.map((project) => ({ lang: locale, slug: project.slug }));
		}),
	);

	return perLocale.flat();
}

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/projets/[slug]">): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!isLocale(lang)) return {};

	const project = await getProjectBySlug(slug, lang);
	if (!project) return {};

	const dictionary = getDictionary(lang);

	return {
		title: project.title,
		description: project.description.slice(0, 200),
		alternates: { canonical: localizePath(`/projets/${slug}`, lang) },
		openGraph: {
			type: "article",
			siteName: dictionary.meta.siteName,
			locale: localeTags[lang],
			title: project.title,
			description: project.description.slice(0, 200),
			images: project.cover ? [{ url: project.cover.url }] : undefined,
		},
	};
}

export default async function ProjectDetailPage({ params }: PageProps<"/[lang]/projets/[slug]">) {
	const { lang, slug } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const project = await getProjectBySlug(slug, locale);
	if (!project) notFound();

	const related = (await getProjects(locale))
		.filter((candidate) => candidate.documentId !== project.documentId)
		.slice(0, 3);

	return (
		<>
			<article>
				{/* Header */}
				<div className="border-b border-sand-200 bg-white">
					<Container className="py-10 sm:py-14">
						<Link
							href={localizePath("/projets", locale)}
							className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 underline-offset-4 hover:underline">
							<ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
							{dictionary.common.backToProjects}
						</Link>

						<div className="mt-6 flex flex-wrap items-center gap-2">
							{project.flagship ? (
								<Badge tone="flagship">
									<Star className="size-3" aria-hidden="true" />
									{dictionary.projects.flagship}
								</Badge>
							) : null}
							<Badge tone={domainTone(project.domain)}>
								{dictionary.projects.domains[project.domain]}
							</Badge>
							<Badge tone="status">{dictionary.projects.statuses[project.status]}</Badge>
						</div>

						<h1 className="mt-5 max-w-4xl text-4xl text-forest-900">{project.title}</h1>

						{/* Key facts, as a description list rather than loose paragraphs. */}
						{project.budget !== null || project.partners.length > 0 ? (
							<dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
								{project.budget !== null ? (
									<div className="flex flex-col gap-1">
										<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
											{dictionary.projects.budgetLabel}
										</dt>
										<dd
											dir="ltr"
											className="font-serif text-2xl font-semibold text-forest-900 rtl:text-end">
											{formatBudget(project.budget, locale)}
										</dd>
									</div>
								) : null}

								{project.partners.length > 0 ? (
									<div className="flex flex-col gap-1">
										<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
											{dictionary.projects.partnerLabel}
										</dt>
										<dd className="max-w-lg text-base text-forest-900">
											{project.partners.map((partner) => partner.name).join(" · ")}
										</dd>
									</div>
								) : null}
							</dl>
						) : null}
					</Container>
				</div>

				{/* Cover */}
				{project.cover ? (
					<Container className="py-10">
						<CmsPicture
							image={project.cover}
							ratio="16/9"
							priority
							sizes="(max-width: 1152px) 100vw, 1152px"
							className="rounded-card shadow-card"
						/>
					</Container>
				) : null}

				{/* Body */}
				<Container size="narrow" className="pb-16">
					<h2 className="sr-only">{dictionary.projects.descriptionLabel}</h2>
					<Prose className="text-lg">{project.description}</Prose>

					{project.results ? (
						<aside className="mt-10 rounded-card border-s-4 border-clay-500 bg-clay-50 p-6">
							<h2 className="font-serif text-lg font-semibold text-clay-900">
								{dictionary.projects.resultsLabel}
							</h2>
							<p className="mt-2 leading-relaxed text-clay-900/85">{project.results}</p>
						</aside>
					) : null}
				</Container>

				{/* Project album, when one is linked */}
				{project.images.length > 0 ? (
					<Section tone="white" size="wide">
						<SectionHeading title={dictionary.projects.galleryLabel} />
						<ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
							{project.images.map((image) => (
								<li key={image.url}>
									<CmsPicture
										image={image}
										ratio="1/1"
										sizes="(max-width: 768px) 50vw, 25vw"
										className="rounded-card"
									/>
								</li>
							))}
						</ul>
					</Section>
				) : null}
			</article>

			{related.length > 0 ? (
				<Section tone="canvas" size="wide">
					<SectionHeading title={dictionary.projects.relatedTitle} />
					<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{related.map((candidate) => (
							<li key={candidate.documentId} className="flex">
								<ProjectCard project={candidate} locale={locale} dictionary={dictionary} />
							</li>
						))}
					</ul>
				</Section>
			) : null}
		</>
	);
}
