import type { Dictionary } from "@/lib/i18n";

/**
 * Error identifiers rather than messages.
 *
 * Server Actions must not depend on a locale, so they return a key and the
 * client resolves it against its dictionary. The previous forms collapsed every
 * failure — validation, network, server — into one generic French string, so a
 * visitor with a typo in their phone number was told only "an error occurred".
 */
export type FormErrorKey = keyof Dictionary["forms"]["errors"];

export type FormState = {
	status: "idle" | "success" | "error";
	/** Resolved against `dictionary.forms.errors` on the client. */
	errorKey?: FormErrorKey;
	/** Field name -> error key, for inline messages. */
	fieldErrors?: Partial<Record<string, FormErrorKey>>;
};

export const idleState: FormState = { status: "idle" };

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 1000;
export const MEMBERSHIP_MESSAGE_MAX = 300;
export const NAME_MIN = 3;

// Moroccan mobile: 06 or 07 followed by eight digits.
const PHONE_PATTERN = /^0[67]\d{8}$/;
// Moroccan CIN: one or two letters, then six digits.
const CIN_PATTERN = /^[A-Za-z]{1,2}\d{6}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizePhone(value: string): string {
	return value.replace(/[\s.-]/g, "");
}

export function validateFullName(value: string): FormErrorKey | null {
	if (!value.trim()) return "required";
	if (value.trim().length < NAME_MIN) return "fullNameTooShort";
	return null;
}

export function validateEmail(value: string): FormErrorKey | null {
	if (!value.trim()) return "required";
	if (!EMAIL_PATTERN.test(value.trim())) return "emailInvalid";
	return null;
}

/** Phone is optional on the contact form and required on the membership form. */
export function validatePhone(value: string, required: boolean): FormErrorKey | null {
	const normalized = normalizePhone(value);
	if (!normalized) return required ? "required" : null;
	if (!PHONE_PATTERN.test(normalized)) return "phoneInvalid";
	return null;
}

export function validateCin(value: string): FormErrorKey | null {
	if (!value.trim()) return "required";
	if (!CIN_PATTERN.test(value.trim())) return "cinInvalid";
	return null;
}

export function validateMessage(
	value: string,
	{ min, max }: { min: number; max: number },
): FormErrorKey | null {
	const trimmed = value.trim();
	if (min > 0 && !trimmed) return "required";
	if (trimmed.length > 0 && trimmed.length < min) return "messageTooShort";
	if (trimmed.length > max) return "messageTooLong";
	return null;
}

/** First error wins — forms surface one summary message plus inline field errors. */
export function firstError(
	fieldErrors: Partial<Record<string, FormErrorKey | null>>,
): { errorKey: FormErrorKey; fieldErrors: Partial<Record<string, FormErrorKey>> } | null {
	const cleaned: Partial<Record<string, FormErrorKey>> = {};
	for (const [field, key] of Object.entries(fieldErrors)) {
		if (key) cleaned[field] = key;
	}

	const keys = Object.values(cleaned);
	if (keys.length === 0) return null;

	return { errorKey: keys[0] as FormErrorKey, fieldErrors: cleaned };
}
