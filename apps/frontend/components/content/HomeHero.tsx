import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localPhotos } from "@/lib/media";

type HomeHeroProps = {
	locale: Locale;
	dictionary: Dictionary;
};

export function HomeHero({ locale, dictionary }: HomeHeroProps) {
	const { hero } = dictionary.home;

	return (
		<section className="relative isolate overflow-hidden bg-forest-950">
			{/*
			 * The one priority image on the site — it is the LCP element. Served
			 * from /public rather than the CMS so the largest paint never waits on
			 * a third-party host.
			 */}
			<Image
				src={localPhotos.valley}
				alt={hero.imageAlt}
				fill
				priority
				sizes="100vw"
				placeholder="blur"
				className="object-cover object-center"
			/>

			{/* Two-stop scrim: keeps text contrast well past AA wherever the photo
			    happens to be light, without flattening the image to grey. */}
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-linear-to-t from-forest-950 via-forest-950/80 to-forest-950/40"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-linear-to-r from-forest-950/85 via-forest-950/40 to-transparent rtl:bg-linear-to-l"
			/>

			<Container className="relative py-24 sm:py-32 lg:py-40">
				<div className="flex max-w-3xl flex-col gap-6">
					<span aria-hidden="true" className="h-1 w-16 rounded-full bg-clay-500" />

					<h1 className="text-5xl text-white">{hero.title}</h1>

					{/* The Arabic line is a second voice on the French and English pages,
					    and would be a duplicate on the Arabic one. */}
					{locale !== "ar" ? (
						<p
							lang="ar"
							dir="rtl"
							className="font-arabic-display text-xl text-forest-200 sm:text-2xl">
							{hero.titleArabic}
						</p>
					) : null}

					<p className="max-w-2xl text-lg leading-relaxed text-forest-100">{hero.subtitle}</p>

					<div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
						<ButtonLink href={localizePath("/projets", locale)} variant="onDark" size="lg">
							{hero.primaryCta}
							<ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
						</ButtonLink>
						<ButtonLink href={localizePath("/rejoindre", locale)} variant="secondary" size="lg">
							{hero.secondaryCta}
						</ButtonLink>
					</div>
				</div>
			</Container>
		</section>
	);
}
