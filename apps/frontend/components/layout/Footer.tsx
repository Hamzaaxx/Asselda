import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { localizePath, type Locale } from "@/lib/i18n/config";
import { format, type Dictionary } from "@/lib/i18n";
import { legalNavItems, navItems } from "@/lib/navigation";
import { contact, socialLinks } from "@/lib/site";

type FooterProps = {
	locale: Locale;
	dictionary: Dictionary;
};

/**
 * Site footer.
 *
 * Navigation is generated from `navItems`, so it can no longer drift from the
 * header — the previous footer linked to a misspelled `/actuatites`, omitted
 * Partners, and pointed at two legal pages that did not exist.
 */
export function Footer({ locale, dictionary }: FooterProps) {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto bg-forest-900 text-forest-100">
			<div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
					{/* Identity */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3">
							<Image
								src="/Images/logo.png"
								alt=""
								width={56}
								height={56}
								className="size-14 shrink-0 object-contain"
							/>
							<span className="font-serif text-lg font-semibold text-white">
								{dictionary.meta.siteName}
							</span>
						</div>
						<p className="text-sm leading-relaxed text-forest-200">{dictionary.meta.tagline}</p>
					</div>

					{/* Navigation */}
					<nav aria-labelledby="footer-nav-heading">
						<h2
							id="footer-nav-heading"
							className="font-serif text-base font-semibold text-white">
							{dictionary.footer.navigation}
						</h2>
						<ul className="mt-4 flex flex-col gap-2.5">
							{navItems.map((item) => (
								<li key={item.key}>
									<Link
										href={localizePath(item.path, locale)}
										className="text-sm text-forest-200 underline-offset-4 transition-colors hover:text-white hover:underline">
										{item.label(dictionary)}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Contact */}
					<div>
						<h2 className="font-serif text-base font-semibold text-white">
							{dictionary.footer.info}
						</h2>
						<ul className="mt-4 flex flex-col gap-3.5 text-sm text-forest-200">
							<li className="flex items-start gap-2.5">
								<MapPin className="mt-0.5 size-4 shrink-0 text-forest-300" aria-hidden="true" />
								<span>{dictionary.footer.location}</span>
							</li>
							<li className="flex items-start gap-2.5">
								<Mail className="mt-0.5 size-4 shrink-0 text-forest-300" aria-hidden="true" />
								<a
									href={`mailto:${contact.email}`}
									className="break-all underline-offset-4 transition-colors hover:text-white hover:underline">
									{contact.email}
								</a>
							</li>
							<li className="flex items-start gap-2.5">
								<Phone className="mt-0.5 size-4 shrink-0 text-forest-300" aria-hidden="true" />
								<a
									href={contact.presidentPhoneHref}
									dir="ltr"
									className="underline-offset-4 transition-colors hover:text-white hover:underline">
									{contact.presidentPhone}
								</a>
							</li>
						</ul>
					</div>

					{/* Social — only profiles with a real URL are listed. */}
					{socialLinks.length > 0 ? (
						<div>
							<h2 className="font-serif text-base font-semibold text-white">
								{dictionary.footer.social}
							</h2>
							<p className="mt-4 text-sm text-forest-200">{dictionary.footer.followUs}</p>
							<ul className="mt-4 flex flex-wrap gap-3">
								{socialLinks.map((link) => (
									<li key={link.id}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex size-11 items-center justify-center rounded-full bg-forest-800 transition-colors hover:bg-forest-700">
											<Image
												src={link.icon}
												alt=""
												width={24}
												height={24}
												className="size-6 object-contain"
											/>
											<span className="sr-only">
												{link.label} — {dictionary.common.externalLink}
											</span>
										</a>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</div>

				<div className="mt-14 flex flex-col gap-4 border-t border-forest-800 pt-8">
					<ul className="flex flex-wrap gap-x-6 gap-y-2">
						{legalNavItems.map((item) => (
							<li key={item.key}>
								<Link
									href={localizePath(item.path, locale)}
									className="text-sm text-forest-300 underline-offset-4 transition-colors hover:text-white hover:underline">
									{item.label(dictionary)}
								</Link>
							</li>
						))}
					</ul>
					<p className="text-sm text-forest-300">
						{format(dictionary.footer.copyright, { year })}
					</p>
					<p className="text-xs text-forest-400">{dictionary.footer.credits}</p>
				</div>
			</div>
		</footer>
	);
}
