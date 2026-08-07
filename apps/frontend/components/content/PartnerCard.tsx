import { ExternalLink } from "lucide-react";

import type { Partner } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { localPartnerLogo } from "@/lib/media";

type PartnerCardProps = {
	partner: Partner;
	dictionary: Dictionary;
};

export function PartnerCard({ partner, dictionary }: PartnerCardProps) {
	/*
	 * Monogram shown when there is no logo, or when the logo fails to load.
	 * `aria-hidden` because the partner's full name is the adjacent heading, so
	 * announcing the initials as well would just be noise.
	 */
	const monogram = (
		<span aria-hidden="true" className="font-serif text-xl font-semibold text-forest-700">
			{partner.name.slice(0, 2).toUpperCase()}
		</span>
	);

	const logoAlt = `${partner.name} — ${dictionary.partners.title}`;

	/*
	 * A bundled logo is preferred over the CMS one where we have it.
	 *
	 * These files are the association's own logos, committed to the repository.
	 * Serving them is same-origin, hashed and immutably cacheable, and carries a
	 * blur placeholder — strictly better than proxying a remote CMS image. It
	 * also means the page works today: every CMS partner logo currently 404s, so
	 * preferring the CMS would make each visitor load ten doomed requests and
	 * watch empty boxes until the client-side fallback kicked in.
	 *
	 * Partners with no bundled file still use the CMS, then their initials.
	 */
	const bundled = localPartnerLogo(partner.name);

	/*
	 * `fill` + `object-contain` rather than `max-h-full w-auto`.
	 *
	 * These logos range from 170x202 portrait to 1147x627 landscape. Sizing by
	 * height alone makes the rendered box depend on each logo's aspect ratio, so
	 * wide marks overflow the frame while tall ones sit tiny inside it. Filling
	 * a fixed frame and containing within it gives every logo the same footprint
	 * whatever its proportions.
	 */
	const logoClass = "object-contain p-2";

	const logo = bundled ? (
		<ImageWithFallback
			src={bundled}
			alt={logoAlt}
			fill
			sizes="80px"
			/* No blur placeholder: with object-contain it paints a full-bleed
			   blurred rectangle behind a contained logo, which reads as a smear
			   in a white frame. These files are a few kilobytes optimised. */
			fallback={monogram}
			className={logoClass}
		/>
	) : partner.logo ? (
		<ImageWithFallback
			src={partner.logo.url}
			alt={logoAlt}
			fill
			sizes="80px"
			fallback={monogram}
			className={logoClass}
		/>
	) : (
		monogram
	);

	return (
		<Card as="article" className="h-full gap-4 p-6">
			<div className="flex items-start gap-4">
				{/* Logos are supplied at wildly different aspect ratios, so they sit in a
				    fixed white frame and scale to fit rather than being cropped. */}
				{/* `relative` anchors the filled logo; the frame keeps its size whether
				    a logo, a CMS image or the monogram ends up inside it. */}
				<div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-card border border-sand-200 bg-white">
					{logo}
				</div>

				<div className="flex min-w-0 flex-col gap-1">
					<h3 className="text-lg leading-snug text-forest-900">{partner.name}</h3>
					<p className="text-sm text-clay-700">{partner.role}</p>
				</div>
			</div>

			<p className="text-base leading-relaxed text-ink-muted">{partner.description}</p>

			{partner.website ? (
				<a
					href={partner.website}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-forest-700 underline-offset-4 hover:underline">
					{dictionary.partners.visitWebsite}
					<ExternalLink className="size-4" aria-hidden="true" />
					<span className="sr-only">{dictionary.common.externalLink}</span>
				</a>
			) : null}
		</Card>
	);
}
