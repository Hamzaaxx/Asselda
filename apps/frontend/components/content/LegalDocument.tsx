import { Info } from "lucide-react";

import { Container } from "@/components/ui/Container";

export type LegalBlock = {
	heading: string;
	body: React.ReactNode;
};

type LegalDocumentProps = {
	/** Shown above the content — these pages await the association's approval. */
	reviewNotice: string;
	intro?: string;
	blocks: LegalBlock[];
};

/**
 * Shared layout for the legal notice and privacy policy.
 *
 * Both are built from facts already documented in the repository — the legal
 * name, the governing dahir, the filing date, the data each form actually
 * collects. Nothing here is invented boilerplate, and the notice at the top says
 * plainly that the association still has to sign it off.
 */
export function LegalDocument({ reviewNotice, intro, blocks }: LegalDocumentProps) {
	return (
		<Container size="narrow" className="py-14">
			<p className="flex items-start gap-3 rounded-card border border-clay-200 bg-clay-50 p-4 text-sm leading-relaxed text-clay-900">
				<Info className="mt-0.5 size-5 shrink-0 text-clay-600" aria-hidden="true" />
				{reviewNotice}
			</p>

			{intro ? <p className="mt-10 text-lg leading-relaxed text-ink-muted">{intro}</p> : null}

			<div className="mt-10 flex flex-col gap-9">
				{blocks.map((block) => (
					<section key={block.heading} className="flex flex-col gap-2">
						<h2 className="font-serif text-xl text-forest-900">{block.heading}</h2>
						<div className="text-base leading-relaxed text-ink-muted">{block.body}</div>
					</section>
				))}
			</div>
		</Container>
	);
}
