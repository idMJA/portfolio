import WakaTimeStats from "@/components/WakaTimeStats";

export default function StatsPage() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-4 md:py-6 max-w-7xl">
			<section className="mb-8 md:mb-12">
				<h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
					<span className="text-[#ffb6c1]">Code</span>
					<span className="text-white"> Stats</span>
				</h1>

				<p className="text-gray-300 leading-relaxed mb-8">
					Here are my all-time coding statistics from WakaTime, showing my total
					programming activity since I started tracking. This includes the total
					time spent coding, languages I use most frequently, and my preferred
					code editors.
				</p>

				<div className="max-w-3xl">
					<WakaTimeStats />
				</div>
			</section>
		</div>
	);
}
