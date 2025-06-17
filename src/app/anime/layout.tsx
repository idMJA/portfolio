import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Anime List",
	description: "MyAnimeList anime collection and stats",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function AnimeLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}
