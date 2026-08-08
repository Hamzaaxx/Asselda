import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import type { Project } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { domainTone, formatBudget } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CmsPicture } from "@/components/ui/CmsPicture";

type ProjectCardProps = {
	project: Project;
	locale: Locale;
	dictionary: Dictionary;
	priority?: boolean;
};

export function ProjectCard({ project, locale, dictionary, priority }: ProjectCardProps) {
	const href = localizePath(`/projets/${project.slug}`, locale);

	return (
		<Card as="article" interactive accent={domainTone(project.domain)} className="h-full">
			<CmsPicture image={project.cover} ratio="3/2" priority={priority} zoomOnHover />

			<div className="flex flex-1 flex-col gap-4 p-6">
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

				<h3 className="text-xl text-forest-900">
					{/* The link stretches over the card; the heading stays the accessible name. */}
					<Link href={href} className="after:absolute after:inset-0 after:content-['']">
						{project.title}
					</Link>
				</h3>

				{project.budget !== null ? (
					<p className="text-sm text-ink-muted">
						<span className="font-semibold text-forest-800">
							{dictionary.projects.budgetLabel}
						</span>{" "}
						<span dir="ltr" className="inline-block">
							{formatBudget(project.budget, locale)}
						</span>
					</p>
				) : null}

				<p className="line-clamp-3 text-base leading-relaxed text-ink-muted">
					{project.description}
				</p>

				<span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-forest-700">
					{dictionary.common.seeProject}
					<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
				</span>
			</div>
		</Card>
	);
}
