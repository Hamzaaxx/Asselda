"use server";

import {
	MEMBERSHIP_MESSAGE_MAX,
	MESSAGE_MAX,
	MESSAGE_MIN,
	firstError,
	normalizePhone,
	validateCin,
	validateEmail,
	validateFullName,
	validateMessage,
	validatePhone,
	type FormState,
} from "./validation";

const CMS_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const SUBJECTS = [
	"general",
	"partnership",
	"donation",
	"membership",
	"volunteering",
	"press",
	"other",
] as const;

const ENGAGEMENT_TYPES = ["active", "support", "occasional"] as const;
const DOMAINS = ["environment", "infrastructure", "social", "education"] as const;

/**
 * POST a payload to Strapi.
 *
 * Runs on the server, so the CMS origin never reaches the browser and a failing
 * request can be logged with detail while the visitor sees a plain message.
 */
async function postToCms(endpoint: string, data: unknown): Promise<FormState> {
	if (!CMS_URL) {
		console.error(`[forms] NEXT_PUBLIC_API_URL is not set; cannot submit ${endpoint}`);
		return { status: "error", errorKey: "server" };
	}

	try {
		const response = await fetch(`${CMS_URL}/api/${endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data }),
			cache: "no-store",
		});

		if (!response.ok) {
			const body = await response.text().catch(() => "");
			console.error(`[forms] ${endpoint} responded ${response.status}: ${body.slice(0, 500)}`);
			// A 400 here means Strapi rejected the payload — most often a failed
			// reCAPTCHA check, which is a client-fixable condition.
			return { status: "error", errorKey: response.status === 400 ? "recaptchaUnavailable" : "server" };
		}

		return { status: "success" };
	} catch (error) {
		console.error(`[forms] ${endpoint} request failed`, error);
		return { status: "error", errorKey: "network" };
	}
}

function readField(formData: FormData, name: string): string {
	const value = formData.get(name);
	return typeof value === "string" ? value : "";
}

export async function submitContactForm(
	_previous: FormState,
	formData: FormData,
): Promise<FormState> {
	const fullName = readField(formData, "fullName");
	const email = readField(formData, "email");
	const phone = readField(formData, "phone");
	const subject = readField(formData, "subject");
	const message = readField(formData, "message");
	const recaptchaToken = readField(formData, "recaptchaToken");

	const failure = firstError({
		fullName: validateFullName(fullName),
		email: validateEmail(email),
		phone: validatePhone(phone, false),
		subject: SUBJECTS.includes(subject as (typeof SUBJECTS)[number]) ? null : "subjectRequired",
		message: validateMessage(message, { min: MESSAGE_MIN, max: MESSAGE_MAX }),
	});

	if (failure) return { status: "error", ...failure };

	if (!recaptchaToken) {
		return { status: "error", errorKey: "recaptchaUnavailable" };
	}

	return postToCms("contact-submissions", {
		fullName: fullName.trim(),
		email: email.trim(),
		phone: normalizePhone(phone),
		subject,
		message: message.trim(),
		recaptchaToken,
	});
}

export async function submitMembershipForm(
	_previous: FormState,
	formData: FormData,
): Promise<FormState> {
	const fullName = readField(formData, "fullName");
	const cin = readField(formData, "cin");
	const email = readField(formData, "email");
	const phone = readField(formData, "phone");
	const address = readField(formData, "address");
	const message = readField(formData, "message");
	const engagementType = readField(formData, "engagementType");
	const consent = formData.get("consent") !== null;

	const selectedDomains = new Set(
		formData.getAll("domain").filter((value): value is string => typeof value === "string"),
	);

	const failure = firstError({
		fullName: validateFullName(fullName),
		cin: validateCin(cin),
		email: validateEmail(email),
		phone: validatePhone(phone, true),
		engagementType: ENGAGEMENT_TYPES.includes(engagementType as (typeof ENGAGEMENT_TYPES)[number])
			? null
			: "engagementRequired",
		message: validateMessage(message, { min: 0, max: MEMBERSHIP_MESSAGE_MAX }),
		consent: consent ? null : "consentRequired",
	});

	if (failure) return { status: "error", ...failure };

	return postToCms("memberships", {
		fullName: fullName.trim(),
		cin: cin.trim().toUpperCase(),
		email: email.trim(),
		phone: normalizePhone(phone),
		address: address.trim(),
		interestedInEnvironment: selectedDomains.has(DOMAINS[0]),
		interestedInInfrastructure: selectedDomains.has(DOMAINS[1]),
		interestedInSocial: selectedDomains.has(DOMAINS[2]),
		interestedInEducation: selectedDomains.has(DOMAINS[3]),
		engagementType,
		message: message.trim(),
	});
}
