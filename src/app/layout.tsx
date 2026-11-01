import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

//Stats
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import PetalDust from "@/components/PetalDust";

const geistSans = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

const notoJP = Noto_Sans_JP({
	variable: "--font-jp",
	subsets: ["latin"],
	weight: ["400", "700", "900"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://mja.moe"),
	title: {
		// Full legal name first (Google already indexes "Moehammad Joesoef Aldri"
		// via news sites - we want this tied to the portfolio site)
		default: "Moehammad Joesoef Aldri (MJBA / idMJA) - Developer",
		template: "%s - Moehammad Joesoef Aldri",
	},
	description:
		"Moehammad Joesoef Aldri (aka idMJA / MJBA) - developer building web apps, Discord bots, and server systems from Banda Aceh, Indonesia.",
	keywords: [
		"Moehammad Joesoef Aldri",
		"idMJA",
		"MJBA",
		"MJ",
		"Kiyomi",
		"Portfolio",
		"Web Developer Banda Aceh",
		"Developer Indonesia",
		"Web Development",
		"Next.js",
		"Tailwind CSS",
		"TypeScript",
		"Discord bot",
		"Linux",
		"Cloudflare",
		"Vercel",
	],
	authors: [{ name: "Moehammad Joesoef Aldri", url: "https://mja.moe" }],
	creator: "Moehammad Joesoef Aldri",
	publisher: "Moehammad Joesoef Aldri",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	alternates: {
		canonical: "https://mja.moe",
		languages: {
			"en-US": "https://mja.moe",
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://mja.moe",
		siteName: "mja.moe",
		title: "Moehammad Joesoef Aldri (MJBA / idMJA) - Developer",
		description:
			"Moehammad Joesoef Aldri (aka idMJA / MJBA) - developer from Banda Aceh building web apps, Discord bots, and server systems.",
		images: [
			{
				url: "https://mja.moe/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Moehammad Joesoef Aldri - Developer Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Moehammad Joesoef Aldri (MJBA / idMJA) - Developer",
		description:
			"Moehammad Joesoef Aldri (aka idMJA / MJBA) - developer from Banda Aceh building web apps, Discord bots, and server systems.",
		creator: "@idMJA",
		images: ["https://mja.moe/opengraph-image"],
	},
	icons: {
		icon: "/icon.svg",
		apple: "/icon.svg",
	},
	// Appears at top of <head> so crawlers see identity immediately
	other: {
		"google-site-verification": "",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
		{ media: "(prefers-color-scheme: light)", color: "#fafafa" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${notoJP.variable}`}
		>
			<head>
				<script
					type="application/ld+json"
					// JSON-LD Person schema: ties real name + handles to mja.moe so
					// Google can resolve "Moehammad Joesoef Aldri" to this site
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD, no user input
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							name: "Moehammad Joesoef Aldri",
							alternateName: ["idMJA", "MJBA", "MJ", "Kiyomi"],
							url: "https://mja.moe",
							sameAs: [
								"https://github.com/idMJA",
								"https://wakatime.com/@MJA",
								"https://bsky.app/profile/mja.moe",
							],
							jobTitle: "Developer",
							knowsAbout: [
								"Web Development",
								"TypeScript",
								"Next.js",
								"Discord Bots",
								"Linux",
							],
						}),
					}}
				/>
			</head>
			<body className={`${geistSans.className}`}>
				<Navbar />
				<PetalDust />
				<div
					aria-hidden
					className="font-jp jp-vertical fixed right-5 top-1/2 -translate-y-1/2 z-0 hidden lg:block text-[13px] font-medium text-foreground/50 select-none"
				>
					ジュスフ・アルドリ
				</div>
				<main className="px-4 pt-24 pb-24 min-h-screen overflow-x-hidden max-w-screen-lg mx-auto relative z-10">
					{children}
					<Analytics />
					<SpeedInsights />
				</main>
			</body>
		</html>
	);
}
