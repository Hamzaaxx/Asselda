import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
	"inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
	"transition-[background-color,color,box-shadow,transform] duration-200 ease-out-soft " +
	"disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px " +
	"whitespace-nowrap text-center";

const variants: Record<Variant, string> = {
	primary: "bg-forest-800 text-white hover:bg-forest-700 shadow-card hover:shadow-card-hover",
	secondary: "bg-clay-600 text-white hover:bg-clay-700 shadow-card hover:shadow-card-hover",
	ghost: "border border-forest-800/25 text-forest-900 hover:bg-forest-50 hover:border-forest-800/40",
	// For placement on a deep-green band, where the primary green would vanish.
	onDark: "bg-white text-forest-900 hover:bg-forest-50 shadow-card",
};

const sizes: Record<Size, string> = {
	sm: "px-4 py-2 text-sm",
	md: "px-5 py-2.5 text-base",
	lg: "px-7 py-3.5 text-lg",
};

type CommonProps = {
	variant?: Variant;
	size?: Size;
	className?: string;
	children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	variant = "primary",
	size = "md",
	className,
	children,
	type = "button",
	...rest
}: ButtonProps) {
	return (
		<button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
			{children}
		</button>
	);
}

type ButtonLinkProps = CommonProps & {
	href: string;
	/** Renders an <a> with the external-link affordances instead of next/link. */
	external?: boolean;
	"aria-label"?: string;
};

export function ButtonLink({
	href,
	external = false,
	variant = "primary",
	size = "md",
	className,
	children,
	...rest
}: ButtonLinkProps) {
	const classes = cn(base, variants[variant], sizes[size], className);

	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={classes} {...rest}>
			{children}
		</Link>
	);
}
