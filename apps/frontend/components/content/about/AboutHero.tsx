import Image from "next/image";

import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { FOUNDING_YEAR, bureauMembers } from "@/lib/site";
import { localPhotos } from "@/lib/media";
import { formatNumber } from "@/lib/taxonomy";
import { Container } from "@/components/ui/Container";

type AboutHeroProps = {
	locale: Locale;
	dictionary: Dictionary;
};

/**
 * Opening of the About page.
 *
 * Built around the one fact that carries the most weight — the association has
 * been working in the same village for thirty years — rather than repeating the
 * generic heading band the other pages use. The identity strip overlaps the
 * photograph's lower edge, which gives the page a start with depth instead of a
 * flat coloured block.
 */
export function AboutHero({ locale, dictionary }: AboutHeroProps) {
	const { about, media } = dictionary;
	const years = new Date().getFullYear() - FOUNDING_YEAR;

	const facts = [
		{ label: about.facts.foundedLabel, value: String(FOUNDING_YEAR), ltr: true },
		{ label: about.facts.locationLabel, value: about.facts.locationValue },
		{ label: about.facts.boardLabel, value: formatNumber(bureauMembers.length, locale) },
		{ label: about.facts.statusLabel, value: about.facts.statusValue },
	];

	return (
		<header className="relative">
			<div className="relative isolate overflow-hidden bg-forest-950 pb-40 sm:pb-48">
				<Image
					src={localPhotos.valley}
					alt={media.alt.valley}
					fill
					priority
					placeholder="blur"
					sizes="100vw"
					className="object-cover object-center"
				/>
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-linear-to-t from-forest-950 via-forest-950/85 to-forest-950/55"
				/>
				<span
					aria-hidden="true"
					className="texture-contour pointer-events-none absolute inset-0 opacity-[0.08]"
				/>

				<Container className="relative pt-20 sm:pt-28">
					<div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
						<div className="flex max-w-2xl flex-col gap-5">
							<span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-300">
								{about.eyebrow}
							</span>
							<h1 className="text-5xl text-white">{about.title}</h1>
							<p className="text-lg leading-relaxed text-forest-100 sm:text-xl">{about.lead}</p>
						</div>

						{/*
						 * The span itself as a graphic element. `aria-hidden` because the
						 * founding year and duration are both stated in the facts strip
						 * and the lead — this is typography, not new information.
						 */}
						<p aria-hidden="true" className="flex items-baseline gap-3 lg:flex-col lg:items-end">
							<span
								dir="ltr"
								className="font-serif text-7xl font-semibold leading-none text-white/95 sm:text-8xl">
								{formatNumber(years, locale)}
							</span>
							<span className="max-w-32 text-sm font-medium uppercase tracking-wider text-clay-300 lg:text-end">
								{about.yearsSuffix}
							</span>
						</p>
					</div>
				</Container>
			</div>

			{/* Identity strip, lifted over the photograph's lower edge. */}
			<Container className="relative -mt-28 sm:-mt-32">
				<dl className="grid gap-px overflow-hidden rounded-card bg-sand-300 shadow-card-hover sm:grid-cols-2 lg:grid-cols-4">
					{facts.map((fact) => (
						<div key={fact.label} className="flex flex-col gap-1.5 bg-white p-6">
							<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
								{fact.label}
							</dt>
							<dd
								dir={fact.ltr ? "ltr" : undefined}
								className="font-serif text-lg leading-snug text-forest-900 rtl:text-start">
								{fact.value}
							</dd>
						</div>
					))}
				</dl>
			</Container>
		</header>
	);
}
