import Image from "next/image";

import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";

/**
 * Who the association is, legally and practically.
 *
 * An asymmetric split rather than a card: the emblem sits on a sand disc at a
 * size that lets its detail read, and the legal text keeps a comfortable
 * measure instead of stretching the full column.
 */
export function AboutIdentity({ dictionary }: { dictionary: Dictionary }) {
	const { about } = dictionary;

	return (
		<section className="bg-sand-50 py-20 sm:py-28">
			<Container>
				<div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
					<div className="flex flex-col gap-6">
						<span aria-hidden="true" className="h-1 w-12 rounded-full bg-clay-500" />
						<h2 className="text-3xl text-forest-900">{about.identity.title}</h2>
						<p className="text-lg leading-relaxed text-ink-muted">{about.identity.body1}</p>
						<p className="max-w-prose text-base leading-relaxed text-sand-700">
							{about.identity.body2}
						</p>
					</div>

					<div className="relative mx-auto flex size-64 items-center justify-center sm:size-80">
						<span
							aria-hidden="true"
							className="absolute inset-0 rounded-full bg-linear-to-br from-forest-100 to-clay-100"
						/>
						<span
							aria-hidden="true"
							className="texture-contour absolute inset-0 rounded-full opacity-[0.15]"
						/>
						<Image
							src="/Images/logo.png"
							alt={about.identity.logoAlt}
							width={320}
							height={320}
							sizes="(max-width: 640px) 256px, 320px"
							className="relative size-44 object-contain sm:size-56"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}

/**
 * Vision and mission.
 *
 * The vision is set as a statement at display size — it is the association's
 * one sentence about why it exists, and a card would bury it. The mission
 * follows as an indented supporting column, so the two read as a hierarchy
 * rather than a matched pair.
 */
export function AboutManifesto({ dictionary }: { dictionary: Dictionary }) {
	const { about } = dictionary;

	return (
		<section className="relative overflow-hidden bg-forest-900 py-20 text-forest-50 sm:py-28">
			<span
				aria-hidden="true"
				className="texture-contour pointer-events-none absolute inset-0 opacity-[0.07]"
			/>
			<span
				aria-hidden="true"
				className="absolute -end-32 top-1/4 size-96 rounded-full bg-clay-600/15 blur-3xl"
			/>

			<Container className="relative">
				<span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-300">
					{about.manifestoEyebrow}
				</span>

				<div className="mt-10 border-s-2 border-clay-500 ps-6 sm:ps-10">
					<h2 className="text-sm font-semibold uppercase tracking-wider text-clay-300">
						{about.vision.title}
					</h2>
					<p className="mt-4 max-w-4xl font-serif text-2xl leading-snug text-white sm:text-3xl">
						{about.vision.body}
					</p>
				</div>

				<div className="mt-14 grid gap-6 border-t border-forest-700 pt-10 lg:grid-cols-[auto_1fr] lg:gap-16">
					<h2 className="text-sm font-semibold uppercase tracking-wider text-clay-300 lg:w-40">
						{about.mission.title}
					</h2>
					<p className="max-w-3xl text-lg leading-relaxed text-forest-100">
						{about.mission.body}
					</p>
				</div>
			</Container>
		</section>
	);
}
