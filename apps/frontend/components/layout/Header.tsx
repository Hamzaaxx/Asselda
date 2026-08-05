"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { localizePath, stripLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { isCurrentPath, navItems } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HeaderProps = {
	locale: Locale;
	dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
	const pathname = usePathname();
	const basePath = stripLocale(pathname);

	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	/*
	 * Close the menu whenever navigation happens, including via browser
	 * back/forward. Adjusted during render rather than in an effect, so the panel
	 * never paints for a frame on the new route before closing.
	 */
	const [renderedPath, setRenderedPath] = useState(pathname);
	if (pathname !== renderedPath) {
		setRenderedPath(pathname);
		setMenuOpen(false);
	}

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	/*
	 * Mobile menu behaviour: lock the background, close on Escape, and keep Tab
	 * inside the panel. The previous menu did none of this — keyboard focus fell
	 * straight through to the page behind an open overlay.
	 */
	useEffect(() => {
		if (!menuOpen) return;

		const { body } = document;
		const previousOverflow = body.style.overflow;
		body.style.overflow = "hidden";

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setMenuOpen(false);
				toggleRef.current?.focus();
				return;
			}

			if (event.key !== "Tab" || !panelRef.current) return;

			const focusable = panelRef.current.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
			);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			body.style.overflow = previousOverflow;
		};
	}, [menuOpen]);

	const homeHref = localizePath("/", locale);

	return (
		<header
			className={cn(
				"sticky top-0 z-40 border-b bg-sand-50/85 backdrop-blur-md transition-shadow duration-300",
				scrolled ? "border-sand-300 shadow-card" : "border-transparent",
			)}>
			<div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
				<Link
					href={homeHref}
					aria-label={dictionary.nav.brandHome}
					className="flex shrink-0 items-center gap-3">
					<Image
						src="/Images/logo.png"
						alt=""
						width={48}
						height={48}
						priority
						className="size-11 object-contain"
					/>
					<span className="flex flex-col leading-tight">
						<span className="font-serif text-base font-semibold text-forest-900 sm:text-lg">
							{dictionary.meta.siteName}
						</span>
						<span className="hidden text-2xs text-ink-muted sm:block">
							{dictionary.home.stats.since}
						</span>
					</span>
				</Link>

				{/* Desktop navigation */}
				<nav
					aria-label={dictionary.footer.navigation}
					className="ms-auto hidden items-center gap-1 lg:flex">
					{navItems.map((item) => {
						const current = isCurrentPath(basePath, item.path);
						const label = item.label(dictionary);

						if (item.cta) {
							return (
								<Link
									key={item.key}
									href={localizePath(item.path, locale)}
									aria-current={current ? "page" : undefined}
									className={cn(
										"ms-2 rounded-pill bg-forest-800 px-4 py-2 text-sm font-semibold text-white",
										"transition-colors hover:bg-forest-700",
									)}>
									{label}
								</Link>
							);
						}

						return (
							<Link
								key={item.key}
								href={localizePath(item.path, locale)}
								aria-current={current ? "page" : undefined}
								className={cn(
									"relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
									current
										? "text-forest-900"
										: "text-ink-muted hover:bg-forest-50 hover:text-forest-900",
								)}>
								{label}
								{current ? (
									<span
										aria-hidden="true"
										className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-clay-600"
									/>
								) : null}
							</Link>
						);
					})}
				</nav>

				<div className="ms-auto flex items-center gap-2 lg:ms-2">
					<LanguageSwitcher locale={locale} dictionary={dictionary} />

					<button
						ref={toggleRef}
						type="button"
						onClick={() => setMenuOpen((previous) => !previous)}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
						className={cn(
							"inline-flex size-10 items-center justify-center rounded-pill border border-sand-300",
							"bg-white text-forest-900 transition-colors hover:border-forest-400 hover:bg-forest-50",
							"lg:hidden",
						)}>
						{menuOpen ? (
							<X className="size-5" aria-hidden="true" />
						) : (
							<Menu className="size-5" aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile navigation */}
			{menuOpen ? (
				<div className="lg:hidden">
					<button
						type="button"
						tabIndex={-1}
						aria-hidden="true"
						onClick={() => setMenuOpen(false)}
						className="fixed inset-0 top-[4.5rem] z-30 cursor-default bg-forest-950/30"
					/>
					<div
						ref={panelRef}
						id="mobile-navigation"
						className={cn(
							"relative z-40 max-h-[calc(100dvh-4.5rem)] overflow-y-auto",
							"border-t border-sand-200 bg-sand-50 px-5 pb-8 pt-4 shadow-card-hover",
						)}>
						<nav aria-label={dictionary.footer.navigation}>
							<ul className="flex flex-col gap-1">
								{navItems.map((item) => {
									const current = isCurrentPath(basePath, item.path);
									return (
										<li key={item.key}>
											<Link
												href={localizePath(item.path, locale)}
												aria-current={current ? "page" : undefined}
												className={cn(
													"flex items-center justify-between rounded-card px-4 py-3",
													"text-base font-medium transition-colors",
													item.cta && "mt-2 bg-forest-800 text-white hover:bg-forest-700",
													!item.cta && current && "bg-forest-100 text-forest-900",
													!item.cta && !current && "text-ink-muted hover:bg-white",
												)}>
												{item.label(dictionary)}
												{!item.cta && current ? (
													<span
														aria-hidden="true"
														className="size-1.5 rounded-full bg-clay-600"
													/>
												) : null}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>
					</div>
				</div>
			) : null}
		</header>
	);
}
