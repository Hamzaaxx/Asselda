"use client";

import { useId } from "react";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/cn";

const controlClasses =
	"w-full rounded-card border bg-white px-4 py-3 text-base text-ink " +
	"placeholder:text-sand-500 transition-colors focus:outline-none " +
	"disabled:cursor-not-allowed disabled:bg-sand-100";

type FieldProps = {
	label: string;
	name: string;
	hint?: string;
	error?: string;
	required?: boolean;
	requiredLabel: string;
	children: (props: {
		id: string;
		name: string;
		"aria-describedby": string | undefined;
		"aria-invalid": boolean | undefined;
		className: string;
		required: boolean;
	}) => React.ReactNode;
	className?: string;
};

/**
 * Label, control, hint and error as one unit.
 *
 * Wiring `aria-describedby` and `aria-invalid` here means no form can forget it.
 * The render-prop shape lets the same wrapper serve inputs, selects and
 * textareas without a variant for each.
 */
export function Field({
	label,
	name,
	hint,
	error,
	required = false,
	requiredLabel,
	children,
	className,
}: FieldProps) {
	const id = useId();
	const hintId = hint ? `${id}-hint` : undefined;
	const errorId = error ? `${id}-error` : undefined;
	const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label htmlFor={id} className="text-sm font-semibold text-forest-900">
				{label}
				{required ? (
					<>
						<span aria-hidden="true" className="ms-1 text-clay-600">
							*
						</span>
						<span className="sr-only"> ({requiredLabel})</span>
					</>
				) : null}
			</label>

			{children({
				id,
				name,
				"aria-describedby": describedBy,
				"aria-invalid": error ? true : undefined,
				className: cn(
					controlClasses,
					error
						? "border-clay-600 focus:border-clay-700"
						: "border-sand-300 focus:border-forest-600",
				),
				required,
			})}

			{error ? (
				<p id={errorId} className="flex items-center gap-1.5 text-sm font-medium text-clay-700">
					<AlertCircle className="size-4 shrink-0" aria-hidden="true" />
					{error}
				</p>
			) : null}

			{hint ? (
				<p id={hintId} className="text-xs text-sand-600">
					{hint}
				</p>
			) : null}
		</div>
	);
}
