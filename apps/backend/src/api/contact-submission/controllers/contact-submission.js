"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const { sendContactNotification } = require("./emailService");
const { verifyRecaptcha } = require("./recaptchaVerifier");

const coreController = createCoreController("api::contact-submission.contact-submission");

module.exports = createCoreController("api::contact-submission.contact-submission", ({ strapi }) => ({
	async create(ctx) {
		const { data } = ctx.request.body;
		const { fullName, email, phone, subject, message, recaptchaToken } = data;

		console.log(`${JSON.stringify(data)}`);

		try {
			// 1. Validate reCAPTCHA token
			if (!recaptchaToken) {
				return ctx.badRequest("reCAPTCHA token is required");
			}

			const recaptchaResult = await verifyRecaptcha(recaptchaToken);
			if (!recaptchaResult.verified) {
				console.warn("reCAPTCHA verification failed:", recaptchaResult.reason);
				return ctx.badRequest(`reCAPTCHA verification failed: ${recaptchaResult.reason}`);
			}

			// 2. Validate required fields
			if (!fullName || !email || !subject || !message) {
				return ctx.badRequest("Missing required fields: fullName, email, subject, message");
			}

			// 3. Validate message length
			if (message.length < 20) {
				return ctx.badRequest("Message must be at least 20 characters long");
			}

			if (message.length > 1000) {
				return ctx.badRequest("Message must not exceed 1000 characters");
			}

			// 4. Validate phone if provided
			if (phone) {
				const phoneRegex = /^0[67]\d{8}$/;
				if (!phoneRegex.test(phone)) {
					return ctx.badRequest("Invalid phone number format. Expected format: 06XXXXXXXX or 07XXXXXXXX");
				}
			}

			// 5. Save contact submission to database
			const entry = await strapi.entityService.create("api::contact-submission.contact-submission", {
				data: {
					fullName,
					email,
					phone: phone || null,
					subject,
					message,
					read: false,
				},
			});

			// 6. Send notification emails
			try {
				await sendContactNotification({
					fullName,
					email,
					phone: phone || "",
					subject,
					message,
				});
			} catch (emailError) {
				console.error("Failed to send notification emails:", emailError);
				// Don't fail the request if email fails, but log the error
			}

			// 7. Return success response
			ctx.set("Content-Type", "application/json");
			return ctx.created({
				success: true,
				message: "Contact submission received successfully",
				data: entry,
			});
		} catch (error) {
			console.error("Contact submission error:", error);
			return ctx.internalServerError("An error occurred while processing your submission");
		}
	},
}));
