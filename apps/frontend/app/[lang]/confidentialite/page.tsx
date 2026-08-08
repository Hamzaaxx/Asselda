import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/confidentialite">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "privacy", "/confidentialite", {
		robots: { index: false, follow: true },
	});
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/confidentialite">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const { privacy } = getDictionary(locale);

	return (
		<>
			<PageHero title={privacy.title} />

			<LegalDocument
				reviewNotice={privacy.reviewNotice}
				intro={privacy.intro}
				blocks={[
					{
						heading: privacy.collectedTitle,
						body: (
							<div className="flex flex-col gap-4">
								<p>{privacy.collectedIntro}</p>
								<div>
									<h3 className="font-semibold text-forest-900">
										{privacy.contactFormTitle}
									</h3>
									<p>{privacy.contactFormBody}</p>
								</div>
								<div>
									<h3 className="font-semibold text-forest-900">
										{privacy.membershipFormTitle}
									</h3>
									<p>{privacy.membershipFormBody}</p>
								</div>
							</div>
						),
					},
					{ heading: privacy.purposeTitle, body: <p>{privacy.purposeBody}</p> },
					{ heading: privacy.recipientsTitle, body: <p>{privacy.recipientsBody}</p> },
					{ heading: privacy.recaptchaTitle, body: <p>{privacy.recaptchaBody}</p> },
					{ heading: privacy.retentionTitle, body: <p>{privacy.retentionBody}</p> },
					{
						heading: privacy.rightsTitle,
						body: (
							<p>
								{privacy.rightsBody}{" "}
								<a
									href={`mailto:${contact.email}`}
									className="text-forest-700 underline underline-offset-4">
									{contact.email}
								</a>
							</p>
						),
					},
					{ heading: privacy.cookiesTitle, body: <p>{privacy.cookiesBody}</p> },
				]}
			/>
		</>
	);
}
