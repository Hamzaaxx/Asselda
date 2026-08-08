import { Languages } from "lucide-react";

import type { Translatable } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** True when any entry in the list was borrowed from the default locale. */
export function hasUntranslated(items: Translatable[]): boolean {
	return items.some((item) => item.untranslated);
}

/**
 * Explains why some entries appear in French.
 *
 * The CMS holds French and Arabic; English is unpopulated. Rather than showing
 * an English visitor an empty page, the content falls back to French — and this
 * says so once at the top of the section, instead of badging every card.
 *
 * Renders nothing when everything is translated, so it disappears on its own as
 * the association fills the CMS in.
 */
export function TranslationNotice({
	items,
	dictionary,
	className,
}: {
	items: Translatable[];
	dictionary: Dictionary;
	className?: string;
}) {
	if (!hasUntranslated(items)) return null;

	return (
		<p
			className={cn(
				"flex items-start gap-3 rounded-card border border-sand-300 bg-sand-100",
				"px-4 py-3 text-sm leading-relaxed text-ink-muted",
				className,
			)}>
			<Languages className="mt-0.5 size-4 shrink-0 text-clay-600" aria-hidden="true" />
			{dictionary.common.translationNotice}
		</p>
	);
}
