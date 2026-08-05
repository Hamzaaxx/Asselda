import { cn } from "@/lib/cn";

type ContainerProps = {
	children: React.ReactNode;
	/** `narrow` for long-form reading, `wide` for gallery and card grids. */
	size?: "narrow" | "default" | "wide";
	className?: string;
};

const sizes = {
	narrow: "max-w-3xl",
	default: "max-w-6xl",
	wide: "max-w-7xl",
} as const;

/** The single source of horizontal rhythm. No page sets its own page gutters. */
export function Container({ children, size = "default", className }: ContainerProps) {
	return <div className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}>{children}</div>;
}
