"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

import { getDictionary } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Route-level error boundary.
 *
 * The CMS client already degrades a failed fetch to an empty state, so this
 * catches genuine render faults. The previous app had no boundary at all — any
 * thrown error (a null `imageCover`, for instance) took out the whole page.
 */
export default function LocaleError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const dictionary = getDictionary(defaultLocale);

	useEffect(() => {
		console.error("[route error]", error);
	}, [error]);

	return (
		<Container size="narrow" className="flex flex-col items-center gap-6 py-28 text-center">
			<h1 className="text-3xl text-forest-900">{dictionary.error.title}</h1>
			<p className="text-lg text-ink-muted">{dictionary.error.body}</p>
			<Button onClick={reset} size="lg">
				<RotateCcw className="size-4" aria-hidden="true" />
				{dictionary.error.retry}
			</Button>
		</Container>
	);
}
