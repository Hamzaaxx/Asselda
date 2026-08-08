import { ArrowDownToLine, FileText } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { institutionalDocuments } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/**
 * Institutional documents.
 *
 * A register rather than a card grid — these are files, and a list is how
 * files are read. Entries with no file are shown greyed and non-clickable; the
 * previous page linked all four to /documents/*.pdf, none of which exist.
 */
export function AboutDocuments({ dictionary }: { dictionary: Dictionary }) {
	const { about } = dictionary;

	return (
		<section className="bg-sand-50 py-20 sm:py-28">
			<Container>
				<div className="flex flex-col gap-4">
					<span aria-hidden="true" className="h-1 w-12 rounded-full bg-clay-500" />
					<h2 className="text-3xl text-forest-900">{about.documents.title}</h2>
					<p className="max-w-2xl text-lg text-ink-muted">{about.documents.subtitle}</p>
				</div>

				<ul className="mt-10">
					{about.documents.items.map((document, index) => {
						const href = institutionalDocuments[index]?.href ?? null;

						const body = (
							<>
								<span
									className={
										"flex size-11 shrink-0 items-center justify-center rounded-card " +
										(href ? "bg-forest-100 text-forest-700" : "bg-sand-200 text-sand-500")
									}>
									<FileText className="size-5" aria-hidden="true" />
								</span>

								<span className="flex flex-1 flex-col gap-0.5">
									<span
										className={
											"font-medium " + (href ? "text-forest-900" : "text-sand-700")
										}>
										{document.title}
									</span>
									<span className="text-sm text-ink-muted">{document.body}</span>
								</span>

								{href ? (
									<span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-forest-700">
										{about.documents.pdfLabel}
										<ArrowDownToLine className="size-4" aria-hidden="true" />
									</span>
								) : (
									<span className="shrink-0 rounded-pill bg-sand-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sand-600">
										{about.documents.unavailable}
									</span>
								)}
							</>
						);

						return (
							<li key={document.title} className="border-t border-sand-300 last:border-b">
								{href ? (
									<a
										href={href}
										className="flex items-center gap-4 py-5 transition-colors hover:bg-white">
										{body}
									</a>
								) : (
									<div className="flex items-center gap-4 py-5">{body}</div>
								)}
							</li>
						);
					})}
				</ul>

				<p className="mt-6 text-sm text-ink-muted">{about.documents.unavailableHint}</p>
			</Container>
		</section>
	);
}
