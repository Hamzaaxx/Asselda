"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const { sendMembershipNotification } = require("./emailService");

const coreController = createCoreController("api::membership.membership");

module.exports = createCoreController("api::membership.membership", ({ strapi }) => ({
	async create(ctx) {
		const { data } = ctx.request.body;
		const {
			fullName,
			cin,
			email,
			phone,
			address,
			interestedInEnvironment,
			interestedInInfrastructure,
			interestedInSocial,
			interestedInEducation,
			engagementType,
			message,
		} = data;

		console.log(`${JSON.stringify(data)}`);

		try {
			// 2. Validate required fields
			if (!fullName || !cin || !phone || !email || !engagementType) {
				return ctx.badRequest("Missing required fields: fullName, cin, phone, email, engagementType, message");
			}

			if (message.length > 300) {
				return ctx.badRequest("Message must not exceed 1000 characters");
			}

			// 5. Save contact submission to database
			const finalData = {
				fullName,
				cin,
				email,
				phone,
				address: address || "",
				interestedInEnvironment: interestedInEnvironment || false,
				interestedInInfrastructure: interestedInInfrastructure || false,
				interestedInSocial: interestedInSocial || false,
				interestedInEducation: interestedInEducation || false,
				engagementType,
				message: message || "",
				statusType: "pending",
			};
			const entry = await strapi.entityService.create("api::membership.membership", {
				data: finalData,
			});

			// 6. Send notification emails
			try {
				await sendMembershipNotification(finalData);
			} catch (emailError) {
				console.error("Failed to send notification emails:", emailError);
				// Don't fail the request if email fails, but log the error
			}

			// 7. Return success response
			ctx.set("Content-Type", "application/json");
			return ctx.created({
				success: true,
				message: "Membership received successfully",
				data: entry,
			});
		} catch (error) {
			console.error("Membership error:", error);
			return ctx.internalServerError("An error occurred while processing your submission");
		}
	},
}));
