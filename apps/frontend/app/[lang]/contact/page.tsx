import type { Metadata } from "next";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { contact, mapLinks } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "contact", "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);
	const t = dictionary.contact;

	const details = [
		{ icon: MapPin, label: t.addressLabel, value: t.address },
		{
			icon: Mail,
			label: t.emailLabel,
			value: contact.email,
			href: `mailto:${contact.email}`,
		},
		{
			icon: Phone,
			label: `${t.presidentLabel} (${t.presidentName})`,
			value: contact.presidentPhone,
			href: contact.presidentPhoneHref,
			ltr: true,
		},
		{
			icon: Phone,
			label: `${t.secretaryLabel} (${t.secretaryName})`,
			value: contact.secretaryPhone,
			href: contact.secretaryPhoneHref,
			ltr: true,
		},
		{ icon: Clock, label: t.hoursLabel, value: t.hours },
	];

	return (
		<>
			<PageHero title={t.title} lead={t.lead} />

			<Section tone="canvas" size="wide">
				<div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
					{/* Contact details */}
					<aside className="flex flex-col gap-6">
						<h2 className="font-serif text-2xl text-forest-900">{t.infoTitle}</h2>
						<ul className="flex flex-col gap-5">
							{details.map((detail) => {
								const Icon = detail.icon;
								return (
									<li key={detail.label} className="flex gap-3.5">
										<span className="flex size-10 shrink-0 items-center justify-center rounded-card bg-forest-100 text-forest-700">
											<Icon className="size-5" aria-hidden="true" />
										</span>
										<div className="flex min-w-0 flex-col gap-0.5">
											<span className="text-xs font-semibold uppercase tracking-wider text-sand-600">
												{detail.label}
											</span>
											{detail.href ? (
												<a
													href={detail.href}
													dir={detail.ltr ? "ltr" : undefined}
													className="break-words text-base text-forest-900 underline-offset-4 hover:underline rtl:text-end">
													{detail.value}
												</a>
											) : (
												<span className="text-base leading-relaxed text-ink-muted">
													{detail.value}
												</span>
											)}
										</div>
									</li>
								);
							})}
						</ul>
					</aside>

					{/* Form */}
					<Card className="p-6 sm:p-10">
						<ContactForm locale={locale} dictionary={dictionary} />
					</Card>
				</div>
			</Section>

			{/* Location */}
			<Section tone="white" size="wide">
				<SectionHeading title={t.locationTitle} subtitle={t.locationBody} />

				<div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,20rem)]">
					<div className="overflow-hidden rounded-card ring-1 ring-sand-300">
						<iframe
							src={mapLinks.embed}
							title={t.mapTitle}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="h-80 w-full border-0 lg:h-full lg:min-h-96"
						/>
					</div>

					<Card className="gap-4 p-6">
						<div className="flex items-start gap-3">
							<MapPin className="mt-0.5 size-5 shrink-0 text-clay-600" aria-hidden="true" />
							<div>
								<h3 className="text-lg text-forest-900">{dictionary.meta.siteName}</h3>
								<p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.address}</p>
							</div>
						</div>

						<dl className="flex gap-6 text-sm">
							<div>
								<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
									{t.latitude}
								</dt>
								<dd dir="ltr" className="tabular-nums text-forest-900 rtl:text-end">
									{contact.coordinates.latitude}
								</dd>
							</div>
							<div>
								<dt className="text-xs font-semibold uppercase tracking-wider text-sand-600">
									{t.longitude}
								</dt>
								<dd dir="ltr" className="tabular-nums text-forest-900 rtl:text-end">
									{contact.coordinates.longitude}
								</dd>
							</div>
						</dl>

						<ButtonLink href={mapLinks.search} external variant="ghost" className="mt-auto">
							{t.openInMaps}
							<ExternalLink className="size-4" aria-hidden="true" />
						</ButtonLink>
					</Card>
				</div>
			</Section>
		</>
	);
}
