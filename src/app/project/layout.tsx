import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description: "Check out my portfolio projects",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function ProjectLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}
