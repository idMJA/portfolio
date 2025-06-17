import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Code Stats",
	description: "My coding statistics from WakaTime and more",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function StatsLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}
