import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Steam Stats",
	description: "Steam game stats and now playing info",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function SteamLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}
