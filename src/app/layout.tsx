import type { Metadata, Viewport } from "next";
import { Aldrich } from "next/font/google";
import "./globals.css";

//Stats
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import Sakura from "@/components/Sakura";

const aldrich = Aldrich({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://mjba.my"),
	title: {
		default: "えめじ",
		template: "%s",
	},
	description:
		"Hi! I'm MJ, a passionate developer who loves anime and gaming. Welcome to my portfolio! ♡(˶˃ ᵕ ˂˶)♡",
	keywords: [
		"MJ",
		"iaMJ",
		"MJBA",
		"Portfolio",
		"Developer",
		"Anime",
		"Gaming",
		"Web Development",
		"Weeb",
		"Otaku",
		"Kawaii",
	],
	authors: [{ name: "iaMJ" }],
	creator: "iaMJ",
	publisher: "iaMJ",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://mjba.my",
		siteName: "MJ's Portfolio",
		title: "えめじ",
		description:
			"Hi! I'm MJ, a passionate developer who loves anime and gaming. Welcome to my portfolio! ♡(˶˃ ᵕ ˂˶)♡",
		images: [
			{
				url: "/icon.svg",
				width: 200,
				height: 200,
				alt: "MJ's Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "えめじ",
		description:
			"Hi! I'm MJ, a passionate developer who loves anime and gaming. Welcome to my portfolio! ♡(˶˃ ᵕ ˂˶)♡",
		creator: "@MJ",
		images: ["/icon.svg"],
	},
	alternates: {
		canonical: "https://mjba.my",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={aldrich.className}>
				<Sakura />
				<Navbar />
				<main className="px-4 pt-24 pb-24 min-h-screen overflow-x-hidden max-w-screen-lg mx-auto">
					{children}
					<Analytics />
					<SpeedInsights />
				</main>
				<div className="py-4" />
			</body>
		</html>
	);
}
