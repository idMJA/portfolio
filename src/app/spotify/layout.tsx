import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Spotify Activity",
	description: "See my current Spotify listening activity",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function SpotifyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
