"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import type { Article, ArticleCategory } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterPills, type FilterOption } from "@/components/ui/FilterPills";
import { ArticleCard } from "./ArticleCard";

type CategoryFilter = ArticleCategory | "all";

type ArticlesExplorerProps = {
	articles: Article[];
	locale: Locale;
	dictionary: Dictionary;
};

export function ArticlesExplorer({ articles, locale, dictionary }: ArticlesExplorerProps) {
	const [category, setCategory] = useState<CategoryFilter>("all");
	const [query, setQuery] = useState("");
	const searchId = useId();

	// Keeps typing responsive while the grid re-filters.
	const deferredQuery = useDeferredValue(query);

	const options = useMemo<FilterOption<CategoryFilter>[]>(() => {
		const present = new Map<ArticleCategory, number>();
		for (const article of articles) {
			present.set(article.category, (present.get(article.category) ?? 0) + 1);
		}
		return [
			{ value: "all", label: dictionary.common.all, count: articles.length },
			...[...present.entries()].map(([value, count]) => ({
				value: value as CategoryFilter,
				label: dictionary.news.categories[value],
				count,
			})),
		];
	}, [articles, dictionary]);

	const filtered = useMemo(() => {
		// Accent-insensitive, so "evenement" also matches "événement".
		const needle = deferredQuery
			.trim()
			.toLowerCase()
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "");

		return articles.filter((article) => {
			if (category !== "all" && article.category !== category) return false;
			if (!needle) return true;

			const haystack = `${article.title} ${article.summary}`
				.toLowerCase()
				.normalize("NFD")
				.replace(/\p{Diacritic}/gu, "");

			return haystack.includes(needle);
		});
	}, [articles, category, deferredQuery]);

	if (articles.length === 0) {
		return (
			<EmptyState
				title={dictionary.empty.title}
				description={locale === "en" ? dictionary.empty.notTranslatedHint : dictionary.empty.news}
			/>
		);
	}

	const filtersActive = category !== "all" || query.trim() !== "";

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col items-center gap-3">
				<label htmlFor={searchId} className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
					{dictionary.news.searchLabel}
				</label>
				<div className="relative w-full max-w-md">
					<Search
						className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-sand-500"
						aria-hidden="true"
					/>
					<input
						id={searchId}
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder={dictionary.news.searchPlaceholder}
						className="w-full rounded-pill border border-sand-300 bg-white py-3 pe-11 ps-11 text-base text-ink placeholder:text-sand-500 focus:border-forest-600 focus:outline-none"
					/>
					{query ? (
						<button
							type="button"
							onClick={() => setQuery("")}
							aria-label={dictionary.empty.resetFilters}
							className="absolute end-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-sand-600 hover:bg-sand-100 hover:text-ink">
							<X className="size-4" aria-hidden="true" />
						</button>
					) : null}
				</div>
			</div>

			{options.length > 2 ? (
				<FilterPills
					label={dictionary.news.filterLabel}
					options={options}
					value={category}
					onChange={setCategory}
				/>
			) : null}

			{filtered.length > 0 ? (
				<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((article, index) => (
						<li key={article.documentId} className="flex">
							<ArticleCard
								article={article}
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
					description={dictionary.empty.news}
					action={
						filtersActive ? (
							<Button
								variant="ghost"
								onClick={() => {
									setCategory("all");
									setQuery("");
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
