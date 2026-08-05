"use client";

import { useActionState, useId, useRef, useState } from "react";
import { BookOpen, Building2, Heart, Leaf, Send } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import { submitMembershipForm } from "@/lib/forms/actions";
import { MEMBERSHIP_MESSAGE_MAX, idleState, type FormState } from "@/lib/forms/validation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Field } from "./Field";
import { FormStatus } from "./FormStatus";

const domainIcons = {
	environment: Leaf,
	infrastructure: Building2,
	social: Heart,
	education: BookOpen,
} as const;

type DomainKey = keyof typeof domainIcons;
type EngagementKey = "active" | "support" | "occasional";

const domainKeys = Object.keys(domainIcons) as DomainKey[];
const engagementKeys: EngagementKey[] = ["active", "support", "occasional"];

export function MembershipForm({ dictionary }: { dictionary: Dictionary }) {
	const formRef = useRef<HTMLFormElement>(null);
	const [charCount, setCharCount] = useState(0);
	const domainsLabelId = useId();
	const engagementLabelId = useId();

	const [state, formAction, isPending] = useActionState<FormState, FormData>(
		async (previous, formData) => {
			const result = await submitMembershipForm(previous, formData);
			if (result.status === "success") {
				formRef.current?.reset();
				setCharCount(0);
			}
			return result;
		},
		idleState,
	);

	const t = dictionary.join.form;
	const fieldError = (name: string) =>
		state.fieldErrors?.[name]
			? dictionary.forms.errors[state.fieldErrors[name]!].replace(
					"{max}",
					String(MEMBERSHIP_MESSAGE_MAX),
				)
			: undefined;

	return (
		<form ref={formRef} action={formAction} noValidate className="flex flex-col gap-8">
			<div className="flex flex-col gap-1">
				<h2 className="font-serif text-2xl text-forest-900">{t.title}</h2>
				<p className="text-sm text-ink-muted">{t.subtitle}</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				{/* Identity */}
				<fieldset className="flex flex-col gap-5">
					<legend className="mb-1 text-sm font-semibold uppercase tracking-wider text-clay-700">
						{t.identitySection}
					</legend>

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
						label={t.cin}
						name="cin"
						hint={t.cinHint}
						error={fieldError("cin")}
						required
						requiredLabel={dictionary.forms.requiredMark}>
						{(props) => (
							<input
								{...props}
								type="text"
								dir="ltr"
								autoCapitalize="characters"
								placeholder={t.cinPlaceholder}
								disabled={isPending}
							/>
						)}
					</Field>

					<Field
						label={t.phone}
						name="phone"
						hint={t.phoneHint}
						error={fieldError("phone")}
						required
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
						label={t.address}
						name="address"
						requiredLabel={dictionary.forms.requiredMark}>
						{(props) => (
							<input
								{...props}
								type="text"
								autoComplete="street-address"
								placeholder={t.addressPlaceholder}
								disabled={isPending}
							/>
						)}
					</Field>
				</fieldset>

				{/* Interests and commitment */}
				<div className="flex flex-col gap-8">
					<fieldset aria-labelledby={domainsLabelId}>
						<legend
							id={domainsLabelId}
							className="mb-1 text-sm font-semibold uppercase tracking-wider text-clay-700">
							{t.interestSection}
						</legend>
						<p className="mb-3 text-xs text-sand-600">{t.interestHint}</p>

						{/*
						 * Native checkboxes, visually styled as cards. The previous version
						 * kept a parallel Map in React state and a "select all" control
						 * driven by `Map.values().every(...)`, an iterator-helper method
						 * that is not available in every browser this site targets.
						 */}
						<div className="grid grid-cols-2 gap-3">
							{domainKeys.map((key) => {
								const Icon = domainIcons[key];
								return (
									<label
										key={key}
										className={cn(
											"group flex cursor-pointer items-center gap-2.5 rounded-card border",
											"border-sand-300 bg-white px-4 py-3 text-sm font-medium text-forest-900",
											"transition-colors hover:border-forest-400 hover:bg-forest-50",
											"has-checked:border-forest-700 has-checked:bg-forest-50",
											"has-focus-visible:outline has-focus-visible:outline-2",
											"has-focus-visible:outline-offset-2 has-focus-visible:outline-forest-700",
										)}>
										<input
											type="checkbox"
											name="domain"
											value={key}
											disabled={isPending}
											className="size-4 accent-forest-700"
										/>
										<Icon className="size-4 text-forest-700" aria-hidden="true" />
										{dictionary.join.domains[key]}
									</label>
								);
							})}
						</div>
					</fieldset>

					<fieldset aria-labelledby={engagementLabelId}>
						<legend
							id={engagementLabelId}
							className="mb-1 text-sm font-semibold uppercase tracking-wider text-clay-700">
							{t.engagementSection}
							<span aria-hidden="true" className="ms-1 text-clay-600">
								*
							</span>
						</legend>
						<p className="mb-3 text-xs text-sand-600">{t.engagementHint}</p>

						<div className="flex flex-col gap-3">
							{engagementKeys.map((key) => (
								<label
									key={key}
									className={cn(
										"flex cursor-pointer items-start gap-3 rounded-card border border-sand-300",
										"bg-white px-4 py-3 transition-colors hover:border-forest-400 hover:bg-forest-50",
										"has-checked:border-forest-700 has-checked:bg-forest-50",
										"has-focus-visible:outline has-focus-visible:outline-2",
										"has-focus-visible:outline-offset-2 has-focus-visible:outline-forest-700",
									)}>
									<input
										type="radio"
										name="engagementType"
										value={key}
										disabled={isPending}
										className="mt-1 size-4 accent-forest-700"
									/>
									<span className="flex flex-col gap-0.5">
										<span className="text-sm font-semibold text-forest-900">
											{dictionary.join.engagementTypes[key]}
										</span>
										<span className="text-xs text-ink-muted">
											{dictionary.join.engagementTypes[`${key}Hint` as const]}
										</span>
									</span>
								</label>
							))}
						</div>
						{fieldError("engagementType") ? (
							<p className="mt-2 text-sm font-medium text-clay-700">
								{fieldError("engagementType")}
							</p>
						) : null}
					</fieldset>

					<Field
						label={t.message}
						name="message"
						hint={`${t.messageHint} · ${format(dictionary.contact.form.charCount, {
							count: charCount,
							max: MEMBERSHIP_MESSAGE_MAX,
						})}`}
						error={fieldError("message")}
						requiredLabel={dictionary.forms.requiredMark}>
						{(props) => (
							<textarea
								{...props}
								rows={4}
								maxLength={MEMBERSHIP_MESSAGE_MAX}
								placeholder={t.messagePlaceholder}
								disabled={isPending}
								onChange={(event) => setCharCount(event.target.value.length)}
							/>
						)}
					</Field>
				</div>
			</div>

			<div className="flex flex-col gap-4 border-t border-sand-200 pt-6">
				<label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-muted">
					<input
						type="checkbox"
						name="consent"
						disabled={isPending}
						className="mt-0.5 size-4 shrink-0 accent-forest-700"
					/>
					<span>
						{t.consent}
						<span aria-hidden="true" className="ms-1 text-clay-600">
							*
						</span>
					</span>
				</label>

				<FormStatus
					state={state}
					dictionary={dictionary}
					successMessage={t.success}
					maxLength={MEMBERSHIP_MESSAGE_MAX}
				/>

				<Button type="submit" disabled={isPending} size="lg" className="self-start">
					<Send className="size-4" aria-hidden="true" />
					{isPending ? t.submitting : t.submit}
				</Button>
			</div>
		</form>
	);
}
