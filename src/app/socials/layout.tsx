import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Socials",
	description: "Connect with me on various social platforms",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function SocialsLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}
