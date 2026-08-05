module.exports = ({ env }) => ({
	host: env("HOST", "0.0.0.0"),
	port: env.int("PORT", 1337),
	app: {
		keys: env.array("APP_KEYS", ["ztfNvRr0baWgR2qjRKvLOA==", "HVbiNgz7JKbwms4q9eaBzA=="]),
	},
	middleware: ["strapi::cors"],
	webhooks: {
		events: {},
	},
	cron: {
		enabled: env.bool("CRON_ENABLED", true),
	},
});
