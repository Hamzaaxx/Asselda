"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Check, Globe } from "lucide-react";

import {
	localeLabels,
	localeShortLabels,
	locales,
	localizePath,
	stripLocale,
	type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
	locale: Locale;
	dictionary: Dictionary;
	className?: string;
};

/**
 * Language menu.
 *
 * Renders real `<Link>`s rather than the previous `<select>` + `router.push`,
 * so a language is crawlable, middle-clickable and works without JavaScript.
 * Each link points at the *equivalent* page in the target language, keeping the
 * visitor where they were instead of returning them to the home page.
 */
export function LanguageSwitcher({ locale, dictionary, className }: LanguageSwitcherProps) {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const basePath = stripLocale(pathname);

	useEffect(() => {
		if (!open) return;

		function onPointerDown(event: MouseEvent) {
			if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
		}
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}

		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	return (
		<div ref={containerRef} className={cn("relative", className)}>
			<button
				type="button"
				onClick={() => setOpen((previous) => !previous)}
				aria-expanded={open}
				aria-haspopup="menu"
				aria-label={`${dictionary.nav.language} — ${dictionary.nav.languageCurrent}: ${localeLabels[locale]}`}
				className={cn(
					"inline-flex items-center gap-1.5 rounded-pill border border-sand-300 bg-white",
					"px-3 py-2 text-sm font-semibold text-forest-900 transition-colors",
					"hover:border-forest-400 hover:bg-forest-50",
				)}>
				<Globe className="size-4" aria-hidden="true" />
				<span>{localeShortLabels[locale]}</span>
			</button>

			{open ? (
				<ul
					role="menu"
					className={cn(
						"absolute end-0 z-50 mt-2 min-w-44 overflow-hidden rounded-card",
						"border border-sand-200 bg-white py-1 shadow-card-hover",
					)}>
					{locales.map((option) => {
						const current = option === locale;
						return (
							<li key={option} role="none">
								<Link
									role="menuitem"
									href={localizePath(basePath, option)}
									hrefLang={option}
									lang={option}
									onClick={() => setOpen(false)}
									aria-current={current ? "true" : undefined}
									className={cn(
										"flex items-center justify-between gap-3 px-4 py-2.5 text-sm",
										"transition-colors hover:bg-forest-50",
										current ? "font-semibold text-forest-900" : "text-ink-muted",
									)}>
									{localeLabels[option]}
									{current ? <Check className="size-4 text-forest-700" aria-hidden="true" /> : null}
								</Link>
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}
