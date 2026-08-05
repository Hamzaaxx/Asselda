import type { Metadata } from "next";
import {
	ArrowRight,
	BookOpen,
	CalendarClock,
	HeartHandshake,
	Laptop,
	Megaphone,
	Truck,
	UserPlus,
	Wrench,
} from "lucide-react";

import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/content/PageHero";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

const volunteerIcons = [HeartHandshake, BookOpen, Laptop, Wrench, Megaphone, Truck] as const;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/rejoindre">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "join", "/rejoindre");
}

export default async function JoinPage({ params }: PageProps<"/[lang]/rejoindre">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);
	const { join } = dictionary;

	return (
		<>
			<PageHero title={join.title} lead={join.lead}>
				<div className="mt-2 flex flex-col gap-3 sm:flex-row">
					{/* In-page anchors: both destinations are on this page, so a link is
					    the correct control — the previous version used them too, but
					    without a scroll offset the target landed under the header. */}
					<ButtonLink href="#adhesion" variant="onDark">
						<UserPlus className="size-5" aria-hidden="true" />
						{join.becomeMember}
					</ButtonLink>
					<ButtonLink href="#benevolat" variant="secondary">
						<HeartHandshake className="size-5" aria-hidden="true" />
						{join.becomeVolunteer}
					</ButtonLink>
				</div>
			</PageHero>

			<Section tone="canvas" size="wide" id="adhesion">
				<Card className="p-6 sm:p-10">
					<MembershipForm dictionary={dictionary} />
				</Card>
			</Section>

			<Section tone="white" size="wide" id="benevolat">
				<SectionHeading title={join.volunteer.title} subtitle={join.volunteer.lead} />

				<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{join.volunteer.items.map((item, index) => {
						const Icon = volunteerIcons[index] ?? HeartHandshake;
						return (
							<li
								key={item}
								className="flex gap-4 rounded-card bg-sand-50 p-6 ring-1 ring-sand-200">
								<span className="flex size-11 shrink-0 items-center justify-center rounded-card bg-forest-100 text-forest-700">
									<Icon className="size-5" aria-hidden="true" />
								</span>
								<p className="text-base leading-relaxed text-ink-muted">{item}</p>
							</li>
						);
					})}
				</ul>

				<div className="mt-10 flex flex-col items-start gap-5 rounded-card bg-forest-800 p-8 text-forest-50 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-start gap-4">
						<span className="flex size-11 shrink-0 items-center justify-center rounded-card bg-forest-700">
							<CalendarClock className="size-5" aria-hidden="true" />
						</span>
						<div>
							<h3 className="text-lg text-white">{join.volunteer.availabilityTitle}</h3>
							<p className="mt-1 text-sm leading-relaxed text-forest-100">
								{join.volunteer.availabilityBody}
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-1.5">
						<ButtonLink href="#adhesion" variant="onDark">
							{join.volunteer.cta}
							<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
						</ButtonLink>
						<span className="text-xs text-forest-200">{join.volunteer.ctaHint}</span>
					</div>
				</div>
			</Section>
		</>
	);
}
