module.exports = ({ env }) => ({
	connection: {
		client: "postgres",
		connection: {
			host: env("DB_HOST", "localhost"),
			port: env.int("DB_PORT", 5432),
			database: env("DB_NAME", "asselda_db"),
			user: env("DB_USERNAME", "asselda"),
			password: env("DB_PASSWORD"),
			ssl: env.bool("DATABASE_SSL", false),
		},
		useNullAsDefault: true,
	},
});
