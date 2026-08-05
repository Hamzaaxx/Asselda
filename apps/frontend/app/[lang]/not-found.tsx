import Link from "next/link";
import { Home } from "lucide-react";

import { getDictionary } from "@/lib/i18n";
import { defaultLocale, localizePath } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";

/**
 * `not-found` cannot read route params, so it uses the default locale.
 *
 * Navigation links still resolve correctly because the header and footer around
 * it come from the locale layout.
 */
export default function LocaleNotFound() {
	const dictionary = getDictionary(defaultLocale);

	return (
		<Container size="narrow" className="flex flex-col items-center gap-6 py-28 text-center">
			<p className="font-serif text-6xl font-semibold text-forest-200">404</p>
			<h1 className="text-3xl text-forest-900">{dictionary.error.notFoundTitle}</h1>
			<p className="text-lg text-ink-muted">{dictionary.error.notFoundBody}</p>
			<Link
				href={localizePath("/", defaultLocale)}
				className="inline-flex items-center gap-2 rounded-pill bg-forest-800 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-forest-700">
				<Home className="size-4" aria-hidden="true" />
				{dictionary.error.backHome}
			</Link>
		</Container>
	);
}
