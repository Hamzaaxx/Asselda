import type { Metadata } from "next";

import { getPartners } from "@/lib/cms/client";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/content/PageHero";
import { PartnersExplorer } from "@/components/content/PartnersExplorer";
import { generateLocaleParams } from "@/lib/i18n/static-params";

/** Prerender this page in every locale. */
export const generateStaticParams = generateLocaleParams;

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/partenaires">): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	return buildPageMetadata(lang, "partners", "/partenaires");
}

export default async function PartnersPage({ params }: PageProps<"/[lang]/partenaires">) {
	const { lang } = await params;
	const locale = (isLocale(lang) ? lang : "fr") as Locale;
	const dictionary = getDictionary(locale);

	const partners = await getPartners(locale);

	return (
		<>
			<PageHero title={dictionary.partners.title} lead={dictionary.partners.lead} />

			<Section tone="canvas" size="wide">
				<PartnersExplorer partners={partners} locale={locale} dictionary={dictionary} />
			</Section>
		</>
	);
}
