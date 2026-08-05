"use client";

import { useMemo, useState } from "react";

import type { Project, ProjectDomain, ProjectStatus } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterPills, type FilterOption } from "@/components/ui/FilterPills";
import { ProjectCard } from "./ProjectCard";

type StatusFilter = ProjectStatus | "all";
type DomainFilter = ProjectDomain | "all";

type ProjectsExplorerProps = {
	projects: Project[];
	locale: Locale;
	dictionary: Dictionary;
};

/**
 * Status and domain filtering for the projects list.
 *
 * Filtering happens here, over data already fetched on the server. The previous
 * implementation re-requested the whole collection from Strapi on every filter
 * click, and built a fresh promise on each render while doing it.
 *
 * Only options that actually match something are offered, with their counts, so
 * a visitor can never select a filter that yields an empty page — every project
 * in the CMS is currently `done`, which made three of the four status filters
 * dead ends.
 */
export function ProjectsExplorer({ projects, locale, dictionary }: ProjectsExplorerProps) {
	const [status, setStatus] = useState<StatusFilter>("all");
	const [domain, setDomain] = useState<DomainFilter>("all");

	const statusOptions = useMemo<FilterOption<StatusFilter>[]>(() => {
		const present = new Map<ProjectStatus, number>();
		for (const project of projects) {
			present.set(project.status, (present.get(project.status) ?? 0) + 1);
		}
		return [
			{ value: "all", label: dictionary.common.all, count: projects.length },
			...[...present.entries()].map(([value, count]) => ({
				value: value as StatusFilter,
				label: dictionary.projects.statuses[value],
				count,
			})),
		];
	}, [projects, dictionary]);

	const domainOptions = useMemo<FilterOption<DomainFilter>[]>(() => {
		const present = new Map<ProjectDomain, number>();
		for (const project of projects) {
			present.set(project.domain, (present.get(project.domain) ?? 0) + 1);
		}
		return [
			{ value: "all", label: dictionary.common.all, count: projects.length },
			...[...present.entries()].map(([value, count]) => ({
				value: value as DomainFilter,
				label: dictionary.projects.domains[value],
				count,
			})),
		];
	}, [projects, dictionary]);

	const filtered = useMemo(
		() =>
			projects.filter(
				(project) =>
					(status === "all" || project.status === status) &&
					(domain === "all" || project.domain === domain),
			),
		[projects, status, domain],
	);

	if (projects.length === 0) {
		return (
			<EmptyState
				title={dictionary.empty.title}
				description={
					locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.projects
				}
			/>
		);
	}

	const filtersActive = status !== "all" || domain !== "all";

	return (
		<div className="flex flex-col gap-10">
			{/* A single-option filter row would be decoration, not a control. */}
			{statusOptions.length > 2 ? (
				<FilterPills
					label={dictionary.projects.filterStatus}
					options={statusOptions}
					value={status}
					onChange={setStatus}
				/>
			) : null}

			{domainOptions.length > 2 ? (
				<FilterPills
					label={dictionary.projects.filterDomain}
					options={domainOptions}
					value={domain}
					onChange={setDomain}
				/>
			) : null}

			{/* Announced so filtering is perceivable without seeing the grid change. */}
			<p aria-live="polite" className="sr-only">
				{format(dictionary.projects.resultCount, { count: filtered.length })}
			</p>

			{filtered.length > 0 ? (
				<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((project, index) => (
						<li key={project.documentId} className="flex">
							<ProjectCard
								project={project}
								locale={locale}
								dictionary={dictionary}
								priority={index < 3}
							/>
						</li>
					))}
				</ul>
			) : (
				<EmptyState
					title={dictionary.empty.title}
					description={dictionary.empty.projects}
					action={
						filtersActive ? (
							<Button
								variant="ghost"
								onClick={() => {
									setStatus("all");
									setDomain("all");
								}}>
								{dictionary.empty.resetFilters}
							</Button>
						) : null
					}
				/>
			)}
		</div>
	);
}
