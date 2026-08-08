import Image, { type StaticImageData } from "next/image";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type PageHeroProps = {
	title: string;
	lead?: string;
	/**
	 * Optional background photograph. Pages only pass one where a real image of
	 * the association's work exists and genuinely illustrates the page — the rest
	 * keep the plain wash rather than being given decorative filler.
	 */
	image?: { photo: StaticImageData; alt: string };
	/** Rendered under the lead — breadcrumb, badges or a call to action. */
	children?: React.ReactNode;
	className?: string;
};

/**
 * The heading band shared by every interior page.
 *
 * Left-aligned rather than centred: the previous flat-green centred block gave
 * nine pages an identical, weightless opening.
 */
export function PageHero({ title, lead, image, children, className }: PageHeroProps) {
	return (
		<div
			className={cn(
				"relative isolate overflow-hidden border-b border-forest-800/10 bg-forest-900",
				className,
			)}>
			{image ? (
				<>
					{/*
					 * Passing the static import (not its `.src`) gives Next the
					 * generated blur data, so the band fades up from a colour-accurate
					 * blur instead of flashing from empty to photo.
					 */}
					<Image
						src={image.photo}
						alt={image.alt}
						fill
						sizes="100vw"
						priority
						placeholder="blur"
						className="object-cover object-center"
					/>
					{/*
					 * Two-stop scrim. The photographs vary a lot in brightness, so the
					 * heading needs a guaranteed dark base rather than a single
					 * translucent overlay tuned to one image.
					 */}
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-linear-to-t from-forest-950 via-forest-950/85 to-forest-950/55"
					/>
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-linear-to-r from-forest-950/80 to-transparent rtl:bg-linear-to-l"
					/>
				</>
			) : (
				<>
					{/* Layered wash — cheap depth, no image request. */}
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-linear-to-br from-forest-700/70 via-forest-900 to-forest-950"
					/>
					<div
						aria-hidden="true"
						className="absolute -end-24 -top-24 size-96 rounded-full bg-clay-600/15 blur-3xl"
					/>
				</>
			)}

			<Container className="relative py-16 sm:py-24">
				<div className="flex max-w-3xl flex-col gap-5">
					<span aria-hidden="true" className="h-1 w-16 rounded-full bg-clay-500" />
					<h1 className="text-4xl text-white">{title}</h1>
					{lead ? (
						<p className="text-lg leading-relaxed text-forest-100 sm:text-xl">{lead}</p>
					) : null}
					{children}
				</div>
			</Container>
		</div>
	);
}
