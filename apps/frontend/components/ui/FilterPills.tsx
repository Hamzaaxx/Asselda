"use client";

import { cn } from "@/lib/cn";

export type FilterOption<T extends string> = {
	value: T;
	label: string;
	/** Rendered as a subdued count next to the label. */
	count?: number;
};

type FilterPillsProps<T extends string> = {
	label: string;
	options: FilterOption<T>[];
	value: T;
	onChange: (value: T) => void;
	className?: string;
};

/**
 * Single-select filter row.
 *
 * Replaces the pasted 90-character class string that appeared six times across
 * the previous pages. Filtering happens in the parent over already-loaded data,
 * so pressing a pill no longer refetches the collection.
 *
 * Toggle-button semantics (`aria-pressed`) rather than a radiogroup: the control
 * is a row of independent buttons visually, and this keeps arrow-key behaviour
 * matching what sighted users expect from the same widget.
 */
export function FilterPills<T extends string>({
	label,
	options,
	value,
	onChange,
	className,
}: FilterPillsProps<T>) {
	return (
		<div className={cn("flex flex-col items-center gap-3", className)}>
			<span className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
				{label}
			</span>
			<div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
				{options.map((option) => {
					const active = option.value === value;
					return (
						<button
							key={option.value}
							type="button"
							aria-pressed={active}
							onClick={() => onChange(option.value)}
							className={cn(
								"inline-flex items-center gap-2 rounded-pill border px-4 py-2",
								"text-sm font-medium transition-colors duration-200",
								active
									? "border-forest-800 bg-forest-800 text-white"
									: "border-sand-300 bg-white text-forest-900 hover:border-forest-400 hover:bg-forest-50",
							)}>
							{option.label}
							{option.count !== undefined ? (
								<span
									className={cn(
										"text-xs tabular-nums",
										active ? "text-forest-200" : "text-sand-500",
									)}>
									{option.count}
								</span>
							) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
}
