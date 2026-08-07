import { getDictionary } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { FeatureAndRowsSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";

/**
 * Shown while a route's data resolves.
 *
 * Without this, clicking a nav link left the previous page on screen with no
 * feedback until the CMS responded — each Strapi call takes roughly half a
 * second, so navigation felt broken. Next renders this shell the instant a link
 * is clicked and streams the real content in behind it.
 *
 * `loading.tsx` cannot read route params, so the announcement uses the default
 * locale. It is the only string here, and it is not shown visually.
 */
export default function Loading() {
	const dictionary = getDictionary(defaultLocale);

	return (
		<>
			<span role="status" aria-live="polite" className="sr-only">
				{dictionary.common.loading}
			</span>

			<HeroSkeleton />

			<Container size="wide" className="py-16 sm:py-24">
				<FeatureAndRowsSkeleton />
			</Container>
		</>
	);
}
