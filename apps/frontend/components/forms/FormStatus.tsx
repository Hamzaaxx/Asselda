"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import type { FormState } from "@/lib/forms/validation";

type FormStatusProps = {
	state: FormState;
	dictionary: Dictionary;
	successMessage: string;
	/** Substituted into `messageTooLong`, which is the only parameterised error. */
	maxLength?: number;
};

/**
 * Submission outcome.
 *
 * Wrapped in a live region so the result is announced — the previous forms
 * rendered a plain paragraph that a screen reader user would never learn about
 * unless they happened to navigate back to it.
 */
export function FormStatus({
	state,
	dictionary,
	successMessage,
	maxLength,
}: FormStatusProps) {
	const message =
		state.status === "error" && state.errorKey
			? dictionary.forms.errors[state.errorKey].replace("{max}", String(maxLength ?? ""))
			: null;

	return (
		<div role="status" aria-live="polite" className="empty:hidden">
			{state.status === "success" ? (
				<p className="flex items-start gap-2.5 rounded-card border border-forest-300 bg-forest-50 p-4 text-sm leading-relaxed text-forest-900">
					<CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest-700" aria-hidden="true" />
					<span>
						<strong className="block font-semibold">{dictionary.forms.successTitle}</strong>
						{successMessage}
					</span>
				</p>
			) : null}

			{message ? (
				<p className="flex items-start gap-2.5 rounded-card border border-clay-300 bg-clay-50 p-4 text-sm leading-relaxed text-clay-900">
					<AlertCircle className="mt-0.5 size-5 shrink-0 text-clay-700" aria-hidden="true" />
					<span>
						<strong className="block font-semibold">{dictionary.forms.errorTitle}</strong>
						{message}
					</span>
				</p>
			) : null}
		</div>
	);
}
