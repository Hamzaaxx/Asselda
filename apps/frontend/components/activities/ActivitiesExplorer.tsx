"use client";

import { useMemo, useState } from "react";

import type { Activity, ActivityDomain } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterPills, type FilterOption } from "@/components/ui/FilterPills";
import { TranslationNotice } from "@/components/ui/TranslationNotice";
import { ActivityCard } from "./ActivityCard";

type DomainFilter = ActivityDomain | "all";

type ActivitiesExplorerProps = {
	activities: Activity[];
	locale: Locale;
	dictionary: Dictionary;
};

export function ActivitiesExplorer({ activities, locale, dictionary }: ActivitiesExplorerProps) {
	const [domain, setDomain] = useState<DomainFilter>("all");

	const options = useMemo<FilterOption<DomainFilter>[]>(() => {
		const present = new Map<ActivityDomain, number>();
		for (const activity of activities) {
			present.set(activity.domain, (present.get(activity.domain) ?? 0) + 1);
		}
		return [
			{ value: "all", label: dictionary.common.all, count: activities.length },
			...[...present.entries()].map(([value, count]) => ({
				value: value as DomainFilter,
				label: dictionary.activities.domains[value],
				count,
			})),
		];
	}, [activities, dictionary]);

	const filtered = useMemo(
		() => activities.filter((activity) => domain === "all" || activity.domain === domain),
		[activities, domain],
	);

	if (activities.length === 0) {
		return (
			<EmptyState
				title={dictionary.empty.title}
				description={
					locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.activities
				}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-10">
			<TranslationNotice items={activities} dictionary={dictionary} />

			{options.length > 2 ? (
				<FilterPills
					label={dictionary.activities.filterLabel}
					options={options}
					value={domain}
					onChange={setDomain}
				/>
			) : null}

			{filtered.length > 0 ? (
				<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((activity, index) => (
						<li key={activity.documentId} className="flex">
							<ActivityCard activity={activity} dictionary={dictionary} priority={index < 3} />
						</li>
					))}
				</ul>
			) : (
				<EmptyState
					title={dictionary.empty.title}
					description={dictionary.empty.activities}
					action={
						<Button variant="ghost" onClick={() => setDomain("all")}>
							{dictionary.empty.resetFilters}
						</Button>
					}
				/>
			)}
		</div>
	);
}
