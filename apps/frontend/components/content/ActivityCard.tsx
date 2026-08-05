import type { Activity } from "@/lib/cms/types";
import type { Dictionary } from "@/lib/i18n";
import { domainTone } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CmsPicture } from "@/components/ui/CmsPicture";
import { Prose } from "@/components/ui/Prose";

type ActivityCardProps = {
	activity: Activity;
	dictionary: Dictionary;
	priority?: boolean;
};

/**
 * Activities have no detail route — the card carries the full description, so it
 * is not interactive and must not fake affordance with a hover lift.
 */
export function ActivityCard({ activity, dictionary, priority }: ActivityCardProps) {
	return (
		<Card as="article" accent={domainTone(activity.domain)} className="h-full">
			<CmsPicture image={activity.cover} ratio="3/2" priority={priority} />

			<div className="flex flex-1 flex-col gap-3 p-6">
				<Badge tone={domainTone(activity.domain)} className="self-start">
					{dictionary.activities.domains[activity.domain]}
				</Badge>

				<h3 className="text-xl text-forest-900">{activity.title}</h3>

				<Prose size="sm">{activity.description}</Prose>
			</div>

			{activity.impact ? (
				<div className="mt-auto border-t border-forest-100 bg-forest-50 px-6 py-4">
					<p className="text-xs font-semibold uppercase tracking-wider text-forest-700">
						{dictionary.activities.impactLabel}
					</p>
					<Prose size="sm" className="mt-1 text-forest-900">
						{activity.impact}
					</Prose>
				</div>
			) : null}
		</Card>
	);
}
