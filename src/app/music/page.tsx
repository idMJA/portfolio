import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Music Activity",
	description: "Recently played music activity for Moehammad Joesoef Aldri.",
	robots: { index: false, follow: false },
};

import MusicStatus from "@/components/MusicStatus";

export default function MusicPage() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-8 max-w-5xl">
			<h1 className="text-3xl md:text-4xl font-semibold tracking-display mb-2 text-foreground">
				Music Activity
			</h1>
			<p className="text-foreground/70 text-sm font-mono-geist uppercase tracking-wide mb-8">
				listening activity
			</p>
			<MusicStatus />
		</div>
	);
}
