import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Stops `next dev` writing an AGENTS.md rules file into the app directory.
	agentRules: false,

	images: {
		// Media is served by Strapi, not from /public, so every CMS host must be
		// allowed explicitly before next/image will optimise it.
		remotePatterns: [
			{ protocol: "http", hostname: "localhost", port: "1337", pathname: "/**" },
			{
				protocol: "https",
				hostname: "projet-site-web-asselda-production.up.railway.app",
				pathname: "/**",
			},
		],
		// Modern formats first; Next falls back automatically for older browsers.
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
