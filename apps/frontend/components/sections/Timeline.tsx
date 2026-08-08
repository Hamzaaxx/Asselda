import type { TimelineEntry } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

type TimelineProps = {
	entries: TimelineEntry[];
	dictionary: Dictionary;
	/**
	 * `rail` is the compact single-column list used on the projects page.
	 * `spine` centres the line and alternates entries on wide screens — used on
	 * the About page, where the thirty-year arc is the story rather than a
	 * supporting detail.
	 */
	variant?: "rail" | "spine";
	/** Inverts the palette for placement on a deep-green band. */
	tone?: "light" | "dark";
};

/**
 * Chronological history.
 *
 * Entries arrive sorted from the CMS client; the previous implementation
 * rendered them in API order, which read 2012 → 1996 → 2000 → 2022 → 2024 → 2023.
 *
 * Markup is an ordered list in both variants, so the sequence is conveyed to
 * screen readers and not only by the visual line.
 */
export function Timeline({ entries, dictionary, variant = "rail", tone = "light" }: TimelineProps) {
	if (entries.length === 0) {
		return <EmptyState title={dictionary.empty.title} description={dictionary.empty.timeline} />;
	}

	const dark = tone === "dark";

	if (variant === "spine") {
		return (
			<ol className="relative flex flex-col gap-10 md:gap-0">
				{/* The spine: hard against the start edge on phones, centred above md. */}
				<span
					aria-hidden="true"
					className={cn(
						"absolute inset-y-0 start-[7px] w-px md:start-1/2 md:-translate-x-1/2",
						dark ? "bg-forest-600" : "bg-sand-300",
					)}
				/>

				{entries.map((entry, index) => {
					const alignEnd = index % 2 === 1;
					return (
						<li
							key={entry.id}
							className={cn(
								"relative ps-8 md:flex md:w-full md:ps-0",
								alignEnd ? "md:justify-end" : "md:justify-start",
							)}>
							<span
								aria-hidden="true"
								className={cn(
									"absolute start-0 top-1.5 size-[15px] rounded-full border-2",
									"md:start-1/2 md:top-8 md:-translate-x-1/2",
									dark ? "border-clay-400 bg-forest-900" : "border-clay-500 bg-sand-50",
								)}
							/>

							<div
								className={cn(
									"flex flex-col gap-2 md:w-1/2 md:py-8",
									alignEnd ? "md:ps-12 md:text-start" : "md:pe-12 md:text-end",
								)}>
								<p
									dir="ltr"
									className={cn(
										"font-serif text-2xl font-semibold leading-none",
										dark ? "text-clay-300" : "text-clay-700",
										alignEnd ? "md:text-start" : "md:text-end",
										"rtl:text-end md:rtl:text-inherit",
									)}>
									{entry.endYear ? `${entry.startYear} – ${entry.endYear}` : entry.startYear}
								</p>
								<p
									className={cn(
										"text-base leading-relaxed",
										dark ? "text-forest-100" : "text-ink-muted",
									)}>
									{entry.description}
								</p>
							</div>
						</li>
					);
				})}
			</ol>
		);
	}

	return (
		<ol className="relative flex flex-col gap-8">
			{/* The rail. Hidden from assistive tech — the list already conveys order. */}
			<span
				aria-hidden="true"
				className="absolute inset-y-2 start-[7px] w-px bg-linear-to-b from-forest-300 via-forest-300 to-transparent sm:start-[9px]"
			/>

			{entries.map((entry) => (
				<li key={entry.id} className="relative flex gap-5 ps-8 sm:ps-10">
					<span
						aria-hidden="true"
						className="absolute start-0 top-1.5 size-[15px] rounded-full border-2 border-forest-600 bg-sand-50 sm:size-[19px]"
					/>
					<div className="flex flex-col gap-1.5">
						<p dir="ltr" className="font-serif text-lg font-semibold text-clay-700 rtl:text-end">
							{entry.endYear ? `${entry.startYear} – ${entry.endYear}` : entry.startYear}
						</p>
						<p className="text-base leading-relaxed text-ink-muted">{entry.description}</p>
					</div>
				</li>
			))}
		</ol>
	);
}
