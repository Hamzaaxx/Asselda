import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { domainTone, formatBudget } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { CmsPicture } from "@/components/ui/CmsPicture";
import { cn } from "@/lib/cn";

type ProjectRowProps = {
	project: Project;
	locale: Locale;
	dictionary: Dictionary;
	/** Mirrors the layout so a list of rows alternates side to side. */
	reversed?: boolean;
};

/**
 * A project as a wide editorial row.
 *
 * Below the featured project, a grid of equal cards flattens everything to the
 * same weight and wastes the horizontal space these photographs deserve.
 * Alternating rows give each project a readable measure and a rhythm down the
 * page.
 *
 * `flex-row-reverse` is relative to the reading direction, so the alternation
 * mirrors correctly in Arabic without a separate rule.
 */
export function ProjectRow({ project, locale, dictionary, reversed = false }: ProjectRowProps) {
	const href = localizePath(`/projets/${project.slug}`, locale);

	return (
		<article
			className={cn(
				"group/card relative flex flex-col overflow-hidden rounded-card bg-white",
				"shadow-card ring-1 ring-sand-300/70 transition-shadow duration-300",
				"hover:shadow-card-hover focus-within:shadow-card-hover",
				"lg:flex-row",
				reversed && "lg:flex-row-reverse",
			)}>
			<CmsPicture
				image={project.cover}
				ratio="3/2"
				zoomOnHover
				sizes="(max-width: 1024px) 100vw, 42vw"
				className="lg:w-[42%] lg:shrink-0"
			/>

			<div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
				<div className="flex flex-wrap items-center gap-2">
					<Badge tone={domainTone(project.domain)}>
						{dictionary.projects.domains[project.domain]}
					</Badge>
					<Badge tone="status">{dictionary.projects.statuses[project.status]}</Badge>
				</div>

				<h3 className="text-2xl text-forest-900">
					<Link href={href} className="after:absolute after:inset-0 after:content-['']">
						{project.title}
					</Link>
				</h3>

				<p className="line-clamp-3 text-base leading-relaxed text-ink-muted">
					{project.description}
				</p>

				<div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
					{project.budget !== null ? (
						<p className="text-sm text-ink-muted">
							<span className="font-semibold text-forest-800">
								{dictionary.projects.budgetLabel}
							</span>{" "}
							<span dir="ltr" className="inline-block font-medium text-clay-700">
								{formatBudget(project.budget, locale)}
							</span>
						</p>
					) : (
						<span />
					)}

					<span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700">
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
