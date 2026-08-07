import { cn } from "@/lib/cn";

/**
 * Placeholder block shown while a route's data resolves.
 *
 * Marked `aria-hidden`: the surrounding `loading.tsx` announces the wait once,
 * so a screen reader is not read a list of empty boxes.
 */
export function Skeleton({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn("animate-pulse rounded-card bg-sand-200/80", className)}
		/>
	);
}

/** Matches the proportions of a `Card` with a cover image. */
export function CardSkeleton() {
	return (
		<div className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-sand-300/70">
			<Skeleton className="aspect-[3/2] rounded-none" />
			<div className="flex flex-col gap-3 p-6">
				<Skeleton className="h-5 w-24 rounded-pill" />
				<Skeleton className="h-6 w-4/5" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		</div>
	);
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }, (_, index) => (
				<CardSkeleton key={index} />
			))}
		</div>
	);
}

/**
 * Mirrors the feature-plus-rows layout the content pages actually use.
 *
 * A loading state that resolves into a different shape reads as a jump. This
 * one lands roughly where the real content does.
 */
export function FeatureAndRowsSkeleton({ rows = 3 }: { rows?: number }) {
	return (
		<div className="flex flex-col gap-8">
			{/* Feature: image beside a block of text on wide screens. */}
			<div className="overflow-hidden rounded-card bg-white ring-1 ring-sand-300/70">
				<div className="grid lg:grid-cols-[1.15fr_1fr]">
					<Skeleton className="aspect-[4/3] rounded-none" />
					<div className="flex flex-col gap-4 p-7 sm:p-10">
						<Skeleton className="h-5 w-28 rounded-pill" />
						<Skeleton className="h-9 w-4/5" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-11/12" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				</div>
			</div>

			{Array.from({ length: rows }, (_, index) => (
				<div
					key={index}
					className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-sand-300/70 lg:flex-row">
					<Skeleton className="aspect-[3/2] rounded-none lg:w-[42%]" />
					<div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
						<Skeleton className="h-5 w-24 rounded-pill" />
						<Skeleton className="h-7 w-3/4" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
}

/**
 * The hero band, drawn in its final colour rather than as grey boxes.
 *
 * The header and hero are identical on every page, so painting them
 * immediately makes navigation feel instant even while the body loads.
 */
export function HeroSkeleton() {
	return (
		<div className="relative overflow-hidden border-b border-forest-800/10 bg-forest-900">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-linear-to-br from-forest-700/70 via-forest-900 to-forest-950"
			/>
			<div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
				<div className="flex max-w-3xl flex-col gap-5">
					<span aria-hidden="true" className="h-1 w-16 rounded-full bg-clay-500" />
					<Skeleton className="h-11 w-2/3 bg-white/15" />
					<Skeleton className="h-5 w-full bg-white/10" />
					<Skeleton className="h-5 w-4/5 bg-white/10" />
				</div>
			</div>
		</div>
	);
}
