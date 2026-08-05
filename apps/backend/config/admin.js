module.exports = ({ env }) => ({
	auth: {
		secret: env("ADMIN_JWT_SECRET", "admin-jwt-secret-change-this"),
		sessions: {
			maxRefreshTokenLifespan: 2592000,
			maxSessionLifespan: 2592000,
		},
	},
	apiToken: {
		salt: env("API_TOKEN_SALT", "api-token-salt-change-this"),
	},
	secrets: {
		encryptionKey: env("ENCRYPTION_KEY"),
	},
	transfer: {
		token: {
			salt: env("TRANSFER_TOKEN_SALT"),
		},
	},
});
