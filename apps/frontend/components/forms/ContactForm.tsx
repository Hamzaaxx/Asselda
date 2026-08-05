"use client";

import { useActionState, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Send } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { submitContactForm } from "@/lib/forms/actions";
import { MESSAGE_MAX, idleState, type FormState } from "@/lib/forms/validation";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { FormStatus } from "./FormStatus";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type ContactFormProps = {
	locale: Locale;
	dictionary: Dictionary;
};

function ContactFormFields({ dictionary }: { dictionary: Dictionary }) {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const formRef = useRef<HTMLFormElement>(null);
	const [charCount, setCharCount] = useState(0);

	const [state, formAction, isPending] = useActionState<FormState, FormData>(
		async (previous, formData) => {
			/*
			 * The reCAPTCHA token must be minted in the browser, then verified by
			 * Strapi. Attaching it here keeps the token out of the markup and lets
			 * the Server Action stay a plain function of its FormData.
			 *
			 * A failure to mint one is not short-circuited: the action validates
			 * fields before it looks at the token, so someone with both a typo and
			 * a blocked reCAPTCHA is told about the typo first — the fixable
			 * problem — rather than only about the anti-spam check.
			 */
			if (executeRecaptcha) {
				try {
					formData.set("recaptchaToken", await executeRecaptcha("contact_form"));
				} catch {
					formData.delete("recaptchaToken");
				}
			}

			const result = await submitContactForm(previous, formData);
			if (result.status === "success") {
				formRef.current?.reset();
				setCharCount(0);
			}
			return result;
		},
		idleState,
	);

	const t = dictionary.contact.form;
	const fieldError = (name: string) =>
		state.fieldErrors?.[name]
			? dictionary.forms.errors[state.fieldErrors[name]!].replace("{max}", String(MESSAGE_MAX))
			: undefined;

	return (
		<form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
			<div className="flex flex-col gap-1">
				<h2 className="font-serif text-2xl text-forest-900">{t.title}</h2>
				<p className="text-sm text-ink-muted">{t.subtitle}</p>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<Field
					label={t.fullName}
					name="fullName"
					hint={t.fullNameHint}
					error={fieldError("fullName")}
					required
					requiredLabel={dictionary.forms.requiredMark}>
					{(props) => (
						<input
							{...props}
							type="text"
							autoComplete="name"
							placeholder={t.fullNamePlaceholder}
							disabled={isPending}
						/>
					)}
				</Field>

				<Field
					label={t.phone}
					name="phone"
					hint={t.phoneHint}
					error={fieldError("phone")}
					requiredLabel={dictionary.forms.requiredMark}>
					{(props) => (
						<input
							{...props}
							type="tel"
							inputMode="tel"
							dir="ltr"
							autoComplete="tel"
							placeholder={t.phonePlaceholder}
							disabled={isPending}
						/>
					)}
				</Field>
			</div>

			<Field
				label={t.email}
				name="email"
				error={fieldError("email")}
				required
				requiredLabel={dictionary.forms.requiredMark}>
				{(props) => (
					<input
						{...props}
						type="email"
						dir="ltr"
						autoComplete="email"
						placeholder={t.emailPlaceholder}
						disabled={isPending}
					/>
				)}
			</Field>

			<Field
				label={t.subject}
				name="subject"
				error={fieldError("subject")}
				required
				requiredLabel={dictionary.forms.requiredMark}>
				{(props) => (
					<select {...props} defaultValue="" disabled={isPending}>
						<option value="" disabled>
							{t.subjectPlaceholder}
						</option>
						{Object.entries(dictionary.contact.subjects).map(([key, label]) => (
							<option key={key} value={key}>
								{label}
							</option>
						))}
					</select>
				)}
			</Field>

			<Field
				label={t.message}
				name="message"
				hint={`${t.messageHint} · ${format(t.charCount, { count: charCount, max: MESSAGE_MAX })}`}
				error={fieldError("message")}
				required
				requiredLabel={dictionary.forms.requiredMark}>
				{(props) => (
					<textarea
						{...props}
						rows={6}
						maxLength={MESSAGE_MAX}
						placeholder={t.messagePlaceholder}
						disabled={isPending}
						// Counter lives in React state rather than the previous direct
						// document.getElementById mutation.
						onChange={(event) => setCharCount(event.target.value.length)}
					/>
				)}
			</Field>

			<FormStatus
				state={state}
				dictionary={dictionary}
				successMessage={t.success}
				maxLength={MESSAGE_MAX}
			/>

			<div className="flex flex-col gap-3">
				<Button type="submit" disabled={isPending} className="self-start">
					<Send className="size-4" aria-hidden="true" />
					{isPending ? t.submitting : t.submit}
				</Button>
				<p className="text-xs leading-relaxed text-sand-600">{t.recaptchaNotice}</p>
			</div>
		</form>
	);
}

export function ContactForm({ dictionary }: ContactFormProps) {
	// Without a key the provider renders but never mints tokens, so the form
	// reports the reCAPTCHA problem rather than failing at the API boundary.
	return (
		<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY} useEnterprise={false}>
			<ContactFormFields dictionary={dictionary} />
		</GoogleReCaptchaProvider>
	);
}
