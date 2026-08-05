import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";
import { PageHero } from "@/components/content/PageHero";
import { LegalDocument } from "@/components/content/LegalDocument";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/mentions-legales">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "legal", "/mentions-legales", {
		// Not useful in search results, and it should not outrank real content.
		robots: { index: false, follow: true },
	});
}

export default async function LegalNoticePage({ params }: PageProps<"/[lang]/mentions-legales">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const { legal, contact: contactCopy } = getDictionary(locale);

	return (
		<>
			<PageHero title={legal.title} />

			<LegalDocument
				reviewNotice={legal.reviewNotice}
				blocks={[
					{ heading: legal.editorTitle, body: <p>{legal.editorBody}</p> },
					{ heading: legal.headquartersTitle, body: <p>{legal.headquartersBody}</p> },
					{ heading: legal.registrationTitle, body: <p>{legal.registrationBody}</p> },
					{ heading: legal.directorTitle, body: <p>{legal.directorBody}</p> },
					{
						heading: legal.contactTitle,
						body: (
							<ul className="flex flex-col gap-1">
								<li>
									<a
										href={`mailto:${contact.email}`}
										className="text-forest-700 underline underline-offset-4">
										{contact.email}
									</a>
								</li>
								<li dir="ltr" className="rtl:text-end">
									<a
										href={contact.presidentPhoneHref}
										className="text-forest-700 underline underline-offset-4">
										{contact.presidentPhone}
									</a>
								</li>
								<li>{contactCopy.address}</li>
							</ul>
						),
					},
					{ heading: legal.hostingTitle, body: <p>{legal.hostingBody}</p> },
					{ heading: legal.propertyTitle, body: <p>{legal.propertyBody}</p> },
				]}
			/>
		</>
	);
}
