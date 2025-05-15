import type { NextConfig } from "next";

const config: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.myanimelist.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.myanimelist.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.steamstatic.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.cloudflare.steamstatic.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.steampowered.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default config;
