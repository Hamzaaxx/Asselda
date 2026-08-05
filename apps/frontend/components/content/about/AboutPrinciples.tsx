import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";

/**
 * The six statutory objectives.
 *
 * A numbered list with hairline rules rather than six boxes: they are a
 * sequence from the association's statutes, and a list says that where a grid
 * of equal cards does not. The oversized ghost numeral does the work the card
 * border used to.
 */
export function AboutObjectives({ dictionary }: { dictionary: Dictionary }) {
	const { about } = dictionary;

	return (
		<section className="bg-white py-20 sm:py-28">
			<Container>
				<div className="flex flex-col gap-4">
					<span aria-hidden="true" className="h-1 w-12 rounded-full bg-clay-500" />
					<h2 className="text-3xl text-forest-900">{about.goals.title}</h2>
				</div>

				<ol className="mt-12 grid gap-x-16 md:grid-cols-2">
					{about.goals.items.map((goal, index) => (
						<li
							key={goal.title}
							className="group flex gap-6 border-t border-sand-200 py-8 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
							<span
								aria-hidden="true"
								className="font-serif text-4xl font-semibold leading-none text-sand-300 transition-colors duration-300 group-hover:text-clay-400">
								{String(index + 1).padStart(2, "0")}
							</span>
							<div className="flex flex-col gap-2">
								<h3 className="text-lg text-forest-900">{goal.title}</h3>
								<p className="text-base leading-relaxed text-ink-muted">{goal.body}</p>
							</div>
						</li>
					))}
				</ol>
			</Container>
		</section>
	);
}

/**
 * The four values.
 *
 * Set as a typographic band — the words themselves are the design. Vertical
 * rules separate them on wide screens, so nothing needs a box.
 */
export function AboutValues({ dictionary }: { dictionary: Dictionary }) {
	const { about } = dictionary;

	return (
		<section className="bg-clay-50 py-20 sm:py-28">
			<Container size="wide">
				<div className="flex flex-col items-center gap-4 text-center">
					<span aria-hidden="true" className="h-1 w-12 rounded-full bg-clay-500" />
					<h2 className="text-3xl text-forest-900">{about.values.title}</h2>
				</div>

				<ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
					{about.values.items.map((value) => (
						<li
							key={value.title}
							className="flex flex-col gap-3 lg:border-e lg:border-clay-200 lg:px-8 lg:last:border-e-0">
							<h3 className="font-serif text-2xl text-clay-800">{value.title}</h3>
							<span aria-hidden="true" className="h-px w-10 bg-clay-400" />
							<p className="text-base leading-relaxed text-sand-700">{value.body}</p>
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
}
