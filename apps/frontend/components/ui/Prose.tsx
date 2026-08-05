import Markdown from "react-markdown";
import { cn } from "@/lib/cn";

type ProseProps = {
	/** Markdown from a Strapi richtext field. */
	children: string;
	size?: "sm" | "base";
	className?: string;
};

/**
 * Renders CMS richtext.
 *
 * Styling is applied through element selectors here rather than
 * `@tailwindcss/typography`, which would be a further dependency for the four
 * element types this CMS actually produces.
 *
 * `react-markdown` does not render raw HTML unless explicitly configured with
 * `rehype-raw`, so editor input cannot inject markup.
 */
/**
 * Preserve authored line breaks.
 *
 * Editors in this CMS separate items with single newlines — the solar water
 * project lists five network components that way. Markdown treats a lone newline
 * as a soft break and collapses them into one run-on paragraph, which is how the
 * previous site rendered them. Promoting single newlines to hard breaks (two
 * trailing spaces) keeps the author's line structure while leaving real
 * paragraph breaks (`\n\n`) untouched.
 */
function preserveLineBreaks(markdown: string): string {
	return markdown.replace(/([^\n])\n(?!\n)/g, "$1  \n");
}

export function Prose({ children, size = "base", className }: ProseProps) {
	if (!children) return null;

	return (
		<div
			className={cn(
				"max-w-none text-ink-muted",
				size === "sm" ? "text-sm" : "text-base",
				"[&_p]:leading-relaxed [&_p+p]:mt-4",
				"[&_strong]:font-semibold [&_strong]:text-forest-900",
				"[&_a]:font-medium [&_a]:text-forest-700 [&_a]:underline [&_a]:underline-offset-2",
				"hover:[&_a]:text-forest-800",
				"[&_ul]:mt-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:ps-5",
				"[&_ol]:mt-4 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:ps-5",
				"[&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-forest-900",
				"[&_h3]:mt-6 [&_h3]:text-xl [&_h3]:text-forest-900",
				"[&_blockquote]:border-s-4 [&_blockquote]:border-forest-300 [&_blockquote]:ps-4 [&_blockquote]:italic",
				className,
			)}>
			<Markdown>{preserveLineBreaks(children)}</Markdown>
		</div>
	);
}
