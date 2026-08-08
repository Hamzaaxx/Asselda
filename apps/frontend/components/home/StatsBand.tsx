"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n/config";
import { formatNumber } from "@/lib/taxonomy";
import { cn } from "@/lib/cn";

export type Stat = {
	value: number;
	label: string;
	/** Shows a "+" after the number for figures that are a floor, not a count. */
	approximate?: boolean;
};

type StatsBandProps = {
	stats: Stat[];
	locale: Locale;
	heading: string;
};

const COUNT_DURATION_MS = 1600;

function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Counter({ stat, locale }: { stat: Stat; locale: Locale }) {
	// Starts at the final value so the number is correct before hydration and for
	// anyone who never triggers the animation.
	const [displayed, setDisplayed] = useState(stat.value);
	const ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element || prefersReducedMotion()) return;

		let frame = 0;
		let start: number | null = null;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();

				setDisplayed(0);
				const step = (now: number) => {
					start ??= now;
					// easeOutCubic — fast start, gentle settle.
					const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					setDisplayed(Math.round(stat.value * eased));
					if (progress < 1) frame = requestAnimationFrame(step);
				};
				frame = requestAnimationFrame(step);
			},
			{ threshold: 0.4 },
		);

		observer.observe(element);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [stat.value]);

	return (
		<p
			ref={ref}
			className="font-serif text-4xl font-semibold tabular-nums text-white sm:text-5xl">
			{formatNumber(displayed, locale)}
			{stat.approximate ? <span aria-hidden="true">+</span> : null}
		</p>
	);
}

/**
 * Impact figures.
 *
 * Projects and partners are counted from live CMS data and years is computed
 * from the founding year, so the band can no longer contradict itself the way
 * "250 projects / 15 years / since 1996" did.
 */
export function StatsBand({ stats, locale, heading }: StatsBandProps) {
	return (
		<section className="relative overflow-hidden bg-forest-800 py-16" aria-labelledby="stats-heading">
			<span
				aria-hidden="true"
				className="texture-contour pointer-events-none absolute inset-0 opacity-[0.07]"
			/>

			<div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
				<h2 id="stats-heading" className="sr-only">
					{heading}
				</h2>
				<dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className={cn(
								"flex flex-col items-center gap-2.5 text-center",
								"lg:border-e lg:border-forest-700/70 lg:last:border-e-0",
							)}>
							<dd className="order-1">
								<Counter stat={stat} locale={locale} />
							</dd>
							{/* Clay rule under each figure, echoing the motif used on the
							    heroes and section headings. */}
							<span aria-hidden="true" className="order-2 h-0.5 w-8 rounded-full bg-clay-500" />
							<dt className="order-3 text-sm font-medium tracking-wide text-forest-200">
								{stat.label}
							</dt>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
