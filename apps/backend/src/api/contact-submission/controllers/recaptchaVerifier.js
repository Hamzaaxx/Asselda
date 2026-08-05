"use strict";

const axios = require("axios");

async function verifyRecaptcha(token) {
	try {
		const secretKey = process.env.RECAPTCHA_SECRET_KEY;

		if (!secretKey) {
			throw new Error("reCAPTCHA secret key not configured");
		}

		const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
			params: {
				secret: secretKey,
				response: token,
			},
		});

		const { success, score, action, challenge_ts, hostname, error_codes } = response.data;

		// For v3, we verify success and check score (0.0 to 1.0, higher is more likely genuine)
		// Typically, a score of 0.5 or higher is considered valid
		if (!success || score < 0.5) {
			return {
				verified: false,
				score: score || 0,
				reason: error_codes ? error_codes.join(", ") : "Low score or verification failed",
			};
		}

		return {
			verified: true,
			score: score,
			action: action,
			challenge_ts: challenge_ts,
			hostname: hostname,
		};
	} catch (error) {
		console.error("reCAPTCHA verification error:", error);
		return {
			verified: false,
			reason: `Verification error: ${error.message}`,
		};
	}
}

module.exports = {
	verifyRecaptcha,
};
