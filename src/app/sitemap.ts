import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = "https://mja.moe";

	const staticRoutes = [
		"",
		"/project",
		"/anime",
		"/stats",
		"/music",
		"/socials",
		"/steam",
	];

	const now = new Date();

	return staticRoutes.map((route) => ({
		url: `${base}${route}`,
		lastModified: now,
		changeFrequency: "weekly" as const,
		// home is the identity/SEO page, prioritize it
		priority: route === "" ? 1 : 0.8,
	}));
}
