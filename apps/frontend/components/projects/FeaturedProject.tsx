import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import type { Project } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { domainTone, formatBudget } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { CmsPicture } from "@/components/ui/CmsPicture";

type FeaturedProjectProps = {
	project: Project;
	locale: Locale;
	dictionary: Dictionary;
	priority?: boolean;
};

/**
 * A single project at full editorial weight.
 *
 * The association's flagship is a 12 MDH sanitation station delivered with
 * AMSED — the first of its kind in the region. In a uniform card grid it
 * rendered at exactly the same size as a three-line news teaser. This gives it
 * the room its substance deserves: a large photograph, the budget as a display
 * figure, and its partners named.
 *
 * Used on the home page and at the head of the projects list.
 */
export function FeaturedProject({
	project,
	locale,
	dictionary,
	priority = false,
}: FeaturedProjectProps) {
	const href = localizePath(`/projets/${project.slug}`, locale);

	return (
		<article className="group/card relative overflow-hidden rounded-card bg-white shadow-card ring-1 ring-sand-300/70">
			<div className="grid lg:grid-cols-[1.15fr_1fr]">
				{/*
				 * `lg:aspect-auto` matters: keeping the 4/3 ratio while the element is
				 * also stretched to the row height makes the browser derive width from
				 * height, so the photograph overflowed its column and covered the
				 * heading. Above lg the frame simply stretches and the filled image
				 * covers it; `min-w-0` stops either column expanding past its track.
				 */}
				<CmsPicture
					image={project.cover}
					ratio="4/3"
					priority={priority}
					zoomOnHover
					sizes="(max-width: 1024px) 100vw, 55vw"
					className="min-w-0 lg:aspect-auto lg:min-h-[26rem]"
				/>

				<div className="flex min-w-0 flex-col gap-5 p-7 sm:p-10">
					<div className="flex flex-wrap items-center gap-2">
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

					<h3 className="text-3xl text-forest-900">
						<Link href={href} className="after:absolute after:inset-0 after:content-['']">
							{project.title}
						</Link>
					</h3>

					<p className="line-clamp-4 text-base leading-relaxed text-ink-muted">
						{project.description}
					</p>

					{/* Key facts as a description list — the numbers are the point. */}
					{project.budget !== null || project.partners.length > 0 ? (
						<dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-sand-200 pt-5">
							{project.budget !== null ? (
								<div className="flex flex-col gap-0.5">
									<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
										{dictionary.projects.budgetLabel}
									</dt>
									<dd
										dir="ltr"
										className="font-serif text-2xl font-semibold text-clay-700 rtl:text-end">
										{formatBudget(project.budget, locale)}
									</dd>
								</div>
							) : null}

							{project.partners.length > 0 ? (
								<div className="flex min-w-0 flex-col gap-0.5">
									<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
										{dictionary.projects.partnerLabel}
									</dt>
									<dd className="text-sm leading-snug text-forest-900">
										{project.partners.map((partner) => partner.name).join(" · ")}
									</dd>
								</div>
							) : null}
						</dl>
					) : null}

					<span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-forest-700">
						{dictionary.common.seeProject}
						<ArrowRight
							className="size-4 transition-transform duration-300 group-hover/card:translate-x-1 rtl:-scale-x-100 rtl:group-hover/card:-translate-x-1"
							aria-hidden="true"
						/>
					</span>
				</div>
			</div>
		</article>
	);
}
