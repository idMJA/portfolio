import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description: "Check out my portfolio projects",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function ProjectPage() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-4 md:py-6 max-w-7xl">
			<h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide text-white">
				My Projects
			</h1>
			<div className="text-gray-300 text-xl font-semibold mt-8 text-center">
				🚧 Coming Soon 🚧
				<div className="text-base font-normal mt-2 opacity-70">
					This section is under construction. Stay tuned for updates!
				</div>
			</div>
		</div>
	);
}
