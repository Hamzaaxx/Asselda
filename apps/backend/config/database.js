module.exports = ({ env }) => {
	const client = env("DATABASE_CLIENT", "postgres");

	if (client === "sqlite") {
		return {
			connection: {
				client: "sqlite",
				connection: {
					filename: env("DATABASE_FILENAME", ".tmp/data.sqlite"),
				},
				useNullAsDefault: true,
			},
		};
	}

	return {
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
	};
};
