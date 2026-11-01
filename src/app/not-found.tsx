import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
			<h1 className="text-8xl font-semibold tracking-display text-foreground mb-4">
				404
			</h1>
			<h2 className="text-2xl md:text-3xl font-semibold tracking-heading text-foreground mb-4">
				Page Not Found
			</h2>
			<p className="text-foreground/70 mb-8 max-w-md text-[15px]">
				The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</p>
			<Link
				href="/"
				className="flex items-center gap-2 px-5 py-2.5 bg-background text-foreground rounded-md text-sm font-medium hover:bg-card transition-colors"
			>
				<HomeIcon className="w-4 h-4" />
				<span>Back to Home</span>
			</Link>
		</div>
	);
}
