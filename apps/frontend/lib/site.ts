/**
 * Facts about the association that are not editable in the CMS.
 *
 * Everything a maintainer might need to change without touching a component
 * lives here: contact details, social profiles, map coordinates, the executive
 * board roster, and the one impact figure that has no data source.
 */

/** Year of foundation. Drives the "years of service" figure — never hardcode 30. */
export const FOUNDING_YEAR = 1996;

export const contact = {
	email: "associationasselda@gmail.com",
	/** Display form, French/Latin digits. */
	presidentPhone: "06 60 01 57 30",
	presidentPhoneHref: "tel:+212660015730",
	secretaryPhone: "06 63 04 61 67",
	secretaryPhoneHref: "tel:+212663046167",
	postalCode: "42152",
	coordinates: { latitude: 31.249, longitude: -7.984 },
} as const;

export const mapLinks = {
	search: `https://www.google.com/maps/search/?api=1&query=${contact.coordinates.latitude},${contact.coordinates.longitude}`,
	embed: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3412.3!2d-7.984!3d31.249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sma!4v1700000000000",
} as const;

export type SocialLink = {
	id: "whatsapp" | "facebook" | "youtube";
	label: string;
	href: string;
	/** Brand mark from `public/icons`. lucide ships no brand icons. */
	icon: string;
};

/**
 * Only profiles with a real URL are listed. The previous site rendered Facebook
 * and YouTube icons pointing at `href="#"`; a link that goes nowhere is worse
 * than no link.
 *
 * To add one, uncomment the entry and drop in the real URL — the icon is already
 * in `public/icons` and it appears in the footer automatically.
 */
export const socialLinks: SocialLink[] = [
	{
		id: "whatsapp",
		label: "WhatsApp",
		href: "https://wa.me/212663046167",
		icon: "/icons/whatsapp.png",
	},
	// { id: "facebook", label: "Facebook", href: "", icon: "/icons/facebook.png" },
	// { id: "youtube", label: "YouTube", href: "", icon: "/icons/youtube.png" },
];

/**
 * Beneficiaries has no source in the CMS, unlike projects and partners which are
 * counted from live data. It stays here as a single reviewable number.
 *
 * TODO(association): confirm this figure before launch.
 */
export const IMPACT_BENEFICIARIES = 10_000;

export type BureauRoleKey =
	| "president"
	| "vicePresident1"
	| "vicePresident2"
	| "secretary"
	| "deputySecretary"
	| "treasurer"
	| "deputyTreasurer"
	| "advisor";

export type BureauMember = {
	nameFr: string;
	nameAr: string;
	role: BureauRoleKey;
};

/** Elected at the general assembly of 3 February 2025. */
export const bureauMembers: BureauMember[] = [
	{ nameFr: "Samir Ahram", nameAr: "سمير أهرام", role: "president" },
	{ nameFr: "Moulay Lahcen Maroi", nameAr: "مولاي لحسن مروة", role: "vicePresident1" },
	{ nameFr: "Yassine Baouti", nameAr: "ياسين باوتي", role: "vicePresident2" },
	{ nameFr: "Abderrahim Darrih", nameAr: "عبد الرحيم الضارح", role: "secretary" },
	{ nameFr: "Abdelaziz Benzaina", nameAr: "عبد العزيز بنزينة", role: "deputySecretary" },
	{ nameFr: "Mohamed Baouti", nameAr: "محمد باوتي", role: "treasurer" },
	{ nameFr: "Youssef Id Braim", nameAr: "يوسف إد برايم", role: "deputyTreasurer" },
	{ nameFr: "Hassan Ait Elmokef", nameAr: "حسن أيت موقف", role: "advisor" },
	{ nameFr: "Lahcen Ouarbane", nameAr: "لحسن واعربان", role: "advisor" },
	{ nameFr: "Rachid Id Abdellah", nameAr: "رشيد إد عبد الله", role: "advisor" },
	{ nameFr: "Abderrahim Agzoul", nameAr: "عبد الرحيم أكزول", role: "advisor" },
	{ nameFr: "Hamid Iznagen", nameAr: "حميد إزناكن", role: "advisor" },
	{ nameFr: "Abdellah Amadid", nameAr: "عبد الله أمديد", role: "advisor" },
];

/**
 * Institutional documents. `href` is null until the association supplies the PDF;
 * the UI renders a non-clickable "coming soon" card rather than a broken link.
 * The previous site linked to four /documents/*.pdf files that do not exist.
 */
export type InstitutionalDocument = { href: string | null };

export const institutionalDocuments: InstitutionalDocument[] = [
	{ href: null },
	{ href: null },
	{ href: null },
	{ href: null },
];
