"use strict";

/**
 * Enable the public API the frontend needs on a fresh database.
 * Production already has these permissions set in the admin panel.
 */
const PUBLIC_ACTIONS = [
	"api::article.article.find",
	"api::article.article.findOne",
	"api::project.project.find",
	"api::project.project.findOne",
	"api::activity.activity.find",
	"api::activity.activity.findOne",
	"api::partner.partner.find",
	"api::partner.partner.findOne",
	"api::album.album.find",
	"api::album.album.findOne",
	"api::event.event.find",
	"api::event.event.findOne",
	"api::timeline-event.timeline-event.find",
	"api::timeline-event.timeline-event.findOne",
	"api::contact-submission.contact-submission.create",
	"api::membership.membership.create",
];

async function enablePublicApi({ strapi }) {
	const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
		where: { type: "public" },
	});
	if (!publicRole) return;

	for (const action of PUBLIC_ACTIONS) {
		const existing = await strapi.db.query("plugin::users-permissions.permission").findOne({
			where: { action },
			populate: ["role"],
		});

		const alreadyPublic =
			existing &&
			(Array.isArray(existing.role)
				? existing.role.some((role) => role.id === publicRole.id)
				: existing.role?.id === publicRole.id);

		if (alreadyPublic) continue;

		if (existing) {
			await strapi.db.query("plugin::users-permissions.permission").update({
				where: { id: existing.id },
				data: { role: publicRole.id },
			});
		} else {
			await strapi.db.query("plugin::users-permissions.permission").create({
				data: { action, role: publicRole.id },
			});
		}
	}
}

module.exports = {
	async bootstrap({ strapi }) {
		await enablePublicApi({ strapi });
	},
};
