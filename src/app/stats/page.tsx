import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Code Stats",
	description:
		"Coding activity and language stats for Moehammad Joesoef Aldri via WakaTime.",
	robots: { index: false, follow: false },
};

import WakaTimeStats from "@/components/WakaTimeStats";

export default function StatsPage() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
			<section className="mb-8">
				<h1 className="text-3xl md:text-4xl font-semibold tracking-display mb-2 text-foreground">
					Code Stats
				</h1>
				<p className="text-foreground/70 text-sm font-mono-geist uppercase tracking-wide mb-8">
					wakatime stats
				</p>

				<p className="text-foreground/80 leading-relaxed mb-8 text-[15px] max-w-2xl">
					All-time coding statistics from WakaTime. Total time spent, languages
					I use most frequently, and my preferred code editors.
				</p>

				<div className="max-w-3xl">
					<WakaTimeStats />
				</div>
			</section>
		</div>
	);
}
