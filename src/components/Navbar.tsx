"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
	FaChartBar,
	FaCode,
	FaComments,
	FaDiscord,
	FaGithub,
	FaHome,
	FaMusic,
	FaSteam,
	FaTv,
} from "react-icons/fa";

export default function Navbar() {
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- hydration guard, no useSyncExternalStore equivalent
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const navItems = [
		{ href: "/", icon: <FaHome size={16} />, title: "Home" },
		{ href: "/project", icon: <FaCode size={16} />, title: "Projects" },
		{ href: "/music", icon: <FaMusic size={16} />, title: "Music" },
		{ href: "/anime", icon: <FaTv size={16} />, title: "Anime" },
		{ href: "/steam", icon: <FaSteam size={16} />, title: "Steam" },
		{ href: "/stats", icon: <FaChartBar size={16} />, title: "Stats" },
		{ href: "/socials", icon: <FaComments size={16} />, title: "Socials" },
	];

	return (
		<>
			{/* Floating Left Header */}
			<div className="fixed top-5 left-5 z-50 bg-background/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-border flex items-center space-x-2">
				<Image
					src="/icon.svg"
					alt="MJ"
					width={22}
					height={22}
					className="rounded"
				/>
				<span className="text-sm font-medium tracking-tight text-foreground">
					MJ
				</span>
			</div>

			{/* Floating Right Header */}
			<div className="fixed top-5 right-5 z-50 bg-background/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-border flex items-center gap-4">
				<a
					href="https://github.com/idMJA"
					target="_blank"
					rel="noopener noreferrer"
					className="text-foreground/70 hover:text-foreground transition-colors duration-200"
					aria-label="GitHub"
				>
					<FaGithub size={18} />
				</a>
				<a
					href="https://dc.gg/tx"
					target="_blank"
					rel="noopener noreferrer"
					className="text-foreground/70 hover:text-foreground transition-colors duration-200"
					aria-label="Discord"
				>
					<FaDiscord size={18} />
				</a>
			</div>

			{/* Bottom Navigation */}
			<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-background/90 backdrop-blur-md px-2 py-2 rounded-full shadow-card flex items-center gap-1">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
							pathname === item.href
								? "bg-muted/80 text-foreground"
								: "text-foreground/70 hover:text-foreground/90 hover:bg-muted/50"
						}`}
					>
						{item.icon}
						<span className="hidden sm:inline">{item.title}</span>
					</Link>
				))}
			</div>
		</>
	);
}
