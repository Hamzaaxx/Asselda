import { NextResponse, type NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Locale routing.
 *
 * Next.js 16 renamed Middleware to Proxy; the file must sit at the project root
 * alongside `app/`. Without this, `/` had no route at all and returned a 404 —
 * the single worst bug in the previous implementation.
 *
 * `negotiator` and `@formatjs/intl-localematcher` were already dependencies but
 * had never been imported anywhere.
 */

function resolveLocale(request: NextRequest): string {
	const header = request.headers.get("accept-language");
	if (!header) return defaultLocale;

	try {
		const requested = new Negotiator({
			headers: { "accept-language": header },
		}).languages();

		// Negotiator returns "*" for a wildcard header, which the matcher rejects.
		const candidates = requested.filter((language) => language !== "*");
		if (candidates.length === 0) return defaultLocale;

		return match(candidates, [...locales], defaultLocale);
	} catch {
		// A malformed Accept-Language header must not break the request.
		return defaultLocale;
	}
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const hasLocale = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);
	if (hasLocale) return;

	const locale = resolveLocale(request);
	const url = request.nextUrl.clone();
	url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

	return NextResponse.redirect(url);
}

export const config = {
	/*
	 * Skip Next internals and anything that looks like a file, so static assets
	 * in /public (logo.png, robots.txt, favicon.ico) are never given a locale
	 * prefix.
	 */
	matcher: ["/((?!_next|api|.*\\..*).*)"],
};
