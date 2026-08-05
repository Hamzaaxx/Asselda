import { Inbox } from "lucide-react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
	title: string;
	description?: string;
	/** Rendered under the text — typically a "reset filters" button. */
	action?: React.ReactNode;
	className?: string;
};

/**
 * Shown wherever a collection comes back empty.
 *
 * This carries real weight on this site: the CMS has almost no English content,
 * so for an English visitor this component *is* several pages. It is designed to
 * look deliberate rather than broken.
 */
export function EmptyState({ title, description, action, className }: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-4 rounded-card border border-dashed border-sand-400",
				"bg-white/60 px-6 py-16 text-center",
				className,
			)}>
			<span className="flex size-12 items-center justify-center rounded-full bg-sand-100 text-sand-600">
				<Inbox className="size-6" aria-hidden="true" />
			</span>
			<div className="flex flex-col gap-1.5">
				<p className="text-lg font-semibold text-forest-900">{title}</p>
				{description ? (
					<p className="max-w-md text-base text-ink-muted">{description}</p>
				) : null}
			</div>
			{action}
		</div>
	);
}
