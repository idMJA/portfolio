import type { Metadata } from "next";
import { Aldrich } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

//Stats
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const aldrich = Aldrich({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://mjba.my"),
	title: {
		default: "えめじ | MJ's Portfolio",
		template: "%s | MJ's Portfolio",
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
	],
	authors: [{ name: "iaMJ" }],
	creator: "iaMJ",
	publisher: "iaMJ",
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: "/icon.svg",
		shortcut: "/icon.svg",
		apple: "/icon.svg",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://mjba.my",
		siteName: "MJ's Portfolio",
		title: "えめじ | MJ's Portfolio",
		description:
			"Hi! I'm MJ, a passionate developer who loves anime and gaming. Welcome to my portfolio! ♡(˶˃ ᵕ ˂˶)♡",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "MJ's Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "えめじ | MJ's Portfolio",
		description:
			"Hi! I'm MJ, a passionate developer who loves anime and gaming. Welcome to my portfolio! ♡(˶˃ ᵕ ˂˶)♡",
		creator: "@MJ",
		images: ["/og-image.png"],
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
	},
	alternates: {
		canonical: "https://mjba.my",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			
			<body className={aldrich.className}>
				<Navbar />
				<main className="pt-20 md:pt-6 md:pl-64 min-h-screen bg-black transition-all duration-300 overflow-x-hidden">
					{children}
					<Analytics />
			        <SpeedInsights />
				</main>
			</body>
		</html>
	);
}
