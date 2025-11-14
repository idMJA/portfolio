import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
			<h1 className="text-8xl font-bold text-[#ffb6c1] mb-4">404</h1>
			<h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
				Page Not Found
			</h2>
			<p className="text-gray-400 mb-8 max-w-md">
				Oops! The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</p>
			<Link
				href="/"
				className="flex items-center gap-2 px-6 py-3 bg-[#ffb6c1] text-white rounded-lg hover:bg-[#ffb6c1]/80 transition-colors"
			>
				<HomeIcon className="w-5 h-5" />
				<span>Back to Home</span>
			</Link>
		</div>
	);
}
