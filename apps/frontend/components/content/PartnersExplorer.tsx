"use client";

import { useMemo, useState } from "react";

import type { Partner, PartnerCategory } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterPills, type FilterOption } from "@/components/ui/FilterPills";
import { TranslationNotice } from "@/components/ui/TranslationNotice";
import { PartnerCard } from "./PartnerCard";

type CategoryFilter = PartnerCategory | "all";

const categoryOrder: PartnerCategory[] = ["international", "institutional", "national"];

type PartnersExplorerProps = {
	partners: Partner[];
	locale: Locale;
	dictionary: Dictionary;
};

/**
 * Partners grouped by category, with a filter that scopes to one group.
 *
 * Groups are rendered as separate sections with their own headings rather than
 * one flat grid, so the institutional hierarchy is visible at a glance and
 * conveyed structurally to assistive technology.
 */
export function PartnersExplorer({ partners, locale, dictionary }: PartnersExplorerProps) {
	const [category, setCategory] = useState<CategoryFilter>("all");

	const options = useMemo<FilterOption<CategoryFilter>[]>(() => {
		const present = new Map<PartnerCategory, number>();
		for (const partner of partners) {
			present.set(partner.category, (present.get(partner.category) ?? 0) + 1);
		}
		return [
			{ value: "all", label: dictionary.common.all, count: partners.length },
			...categoryOrder
				.filter((value) => present.has(value))
				.map((value) => ({
					value: value as CategoryFilter,
					label: dictionary.partners.categories[value],
					count: present.get(value) ?? 0,
				})),
		];
	}, [partners, dictionary]);

	const groups = useMemo(
		() =>
			categoryOrder
				.filter((value) => category === "all" || category === value)
				.map((value) => ({
					category: value,
					items: partners.filter((partner) => partner.category === value),
				}))
				.filter((group) => group.items.length > 0),
		[partners, category],
	);

	if (partners.length === 0) {
		return (
			<EmptyState
				title={dictionary.empty.title}
				description={
					locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.partners
				}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-12">
			<TranslationNotice items={partners} dictionary={dictionary} />

			{options.length > 2 ? (
				<FilterPills
					label={dictionary.partners.filterLabel}
					options={options}
					value={category}
					onChange={setCategory}
				/>
			) : null}

			{groups.map((group) => (
				<section key={group.category} aria-labelledby={`partners-${group.category}`}>
					<div className="mb-6 flex items-center gap-4">
						<h2
							id={`partners-${group.category}`}
							className="font-serif text-2xl text-forest-900">
							{dictionary.partners.categories[group.category]}
						</h2>
						<span aria-hidden="true" className="h-px flex-1 bg-sand-300" />
					</div>

					<ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{group.items.map((partner) => (
							<li key={partner.documentId} className="flex">
								<PartnerCard partner={partner} dictionary={dictionary} />
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
}
