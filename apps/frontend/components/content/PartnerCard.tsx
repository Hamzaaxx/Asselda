import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { Partner } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";

type PartnerCardProps = {
	partner: Partner;
	dictionary: Dictionary;
};

export function PartnerCard({ partner, dictionary }: PartnerCardProps) {
	return (
		<Card as="article" className="h-full gap-4 p-6">
			<div className="flex items-start gap-4">
				{/* Logos are supplied at wildly different aspect ratios, so they sit in a
				    fixed white frame and scale to fit rather than being cropped. */}
				<div className="flex size-20 shrink-0 items-center justify-center rounded-card border border-sand-200 bg-white p-2">
					{partner.logo ? (
						<Image
							src={partner.logo.url}
							alt={`${partner.name} — ${dictionary.partners.title}`}
							width={partner.logo.width}
							height={partner.logo.height}
							sizes="80px"
							className="max-h-full w-auto object-contain"
						/>
					) : (
						<span
							aria-hidden="true"
							className="font-serif text-xl font-semibold text-forest-700">
							{partner.name.slice(0, 2).toUpperCase()}
						</span>
					)}
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
