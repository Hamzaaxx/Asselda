import type { Dictionary } from "@/lib/i18n";
import { bureauMembers, type BureauMember, type BureauRoleKey } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const ADMINISTRATION: BureauRoleKey[] = [
	"secretary",
	"deputySecretary",
	"treasurer",
	"deputyTreasurer",
];

/**
 * The executive board.
 *
 * Thirteen identical cards read as clutter and flattened a real hierarchy. The
 * president leads, the two vice-presidents sit beside him, and the remaining
 * ten are grouped by function as compact rows — which is how the association's
 * own minutes describe the bureau.
 */
export function AboutBureau({ dictionary }: { dictionary: Dictionary }) {
	const { about } = dictionary;
	const { roles, groups } = about.bureau;

	const president = bureauMembers.find((member) => member.role === "president");
	const vicePresidents = bureauMembers.filter((member) =>
		member.role === "vicePresident1" || member.role === "vicePresident2",
	);
	const administration = bureauMembers.filter((member) => ADMINISTRATION.includes(member.role));
	const advisors = bureauMembers.filter((member) => member.role === "advisor");

	return (
		<section className="bg-white py-20 sm:py-28">
			<Container size="wide">
				<div className="flex flex-col gap-4">
					<span aria-hidden="true" className="h-1 w-12 rounded-full bg-clay-500" />
					<h2 className="text-3xl text-forest-900">{about.bureau.title}</h2>
					<p className="max-w-2xl text-lg text-ink-muted">{about.bureau.subtitle}</p>
				</div>

				<div className="mt-12 flex flex-col gap-10">
					{/* Presidency */}
					<div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
						{president ? (
							<article className="relative overflow-hidden rounded-card bg-forest-800 p-8 text-forest-50">
								<span
									aria-hidden="true"
									className="texture-contour pointer-events-none absolute inset-0 opacity-[0.08]"
								/>
								<div className="relative flex flex-col gap-2">
									<span className="text-xs font-semibold uppercase tracking-wider text-clay-300">
										{roles.president}
									</span>
									<p lang="fr" className="font-serif text-3xl text-white">
										{president.nameFr}
									</p>
									<p lang="ar" dir="rtl" className="font-arabic-display text-lg text-forest-200">
										{president.nameAr}
									</p>
								</div>
							</article>
						) : null}

						{vicePresidents.map((member) => (
							<MemberBlock key={member.nameFr} member={member} role={roles[member.role]} />
						))}
					</div>

					{/* Secretariat, treasury and advisors */}
					<div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
						<MemberGroup
							title={groups.administration}
							members={administration}
							roles={roles}
							showRole
						/>
						<MemberGroup title={groups.advisors} members={advisors} roles={roles} />
					</div>
				</div>
			</Container>
		</section>
	);
}

function MemberBlock({ member, role }: { member: BureauMember; role: string }) {
	return (
		<article className="flex flex-col gap-1.5 rounded-card bg-sand-50 p-6 ring-1 ring-sand-200">
			<span className="text-xs font-semibold uppercase tracking-wider text-clay-700">{role}</span>
			<p lang="fr" className="font-serif text-xl text-forest-900">
				{member.nameFr}
			</p>
			<p lang="ar" dir="rtl" className="font-arabic text-sm text-ink-muted">
				{member.nameAr}
			</p>
		</article>
	);
}

function MemberGroup({
	title,
	members,
	roles,
	showRole = false,
}: {
	title: string;
	members: BureauMember[];
	roles: Record<BureauRoleKey, string>;
	/** Advisors all share one role, so repeating it on every row is noise. */
	showRole?: boolean;
}) {
	if (members.length === 0) return null;

	return (
		<div>
			<h3 className="text-sm font-semibold uppercase tracking-wider text-clay-700">{title}</h3>
			<ul className="mt-4">
				{members.map((member) => (
					<li
						key={member.nameFr}
						className="flex items-baseline justify-between gap-4 border-t border-sand-200 py-3.5 first:border-t-0">
						<span className="flex flex-wrap items-baseline gap-x-3">
							<span lang="fr" className="font-medium text-forest-900">
								{member.nameFr}
							</span>
							<span lang="ar" dir="rtl" className="font-arabic text-sm text-sand-600">
								{member.nameAr}
							</span>
						</span>
						{showRole ? (
							<span className="shrink-0 text-xs uppercase tracking-wider text-sand-600">
								{roles[member.role]}
							</span>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
}
