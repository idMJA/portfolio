"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
	DiscordLogoIcon,
	GitHubLogoIcon,
	GlobeIcon,
	HamburgerMenuIcon,
	Cross1Icon,
} from "@radix-ui/react-icons";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
		icon: React.ReactNode;
	}[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	return (
		<nav className={cn("flex flex-col space-y-1", className)} {...props}>
			{items.map((item) => (
				<Button
					key={item.href}
					variant="ghost"
					className={cn(
						"w-full justify-start gap-2 font-normal hover:text-pink-500 hover:bg-transparent",
						"text-white",
					)}
					asChild
				>
					<a href={item.href}>
						{item.icon}
						<span className="truncate">{item.title}</span>
					</a>
				</Button>
			))}
		</nav>
	);
}

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const sidebarNavItems = [
		{
			title: "Home",
			href: "/",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Home</title>
					<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
					<path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
				</svg>
			),
		},
		{
			title: "Projects",
			href: "/project",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Projects</title>
					<path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
					<path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
				</svg>
			),
		},
		{
			title: "Spotify",
			href: "/spotify",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Spotify</title>
					<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
				</svg>
			),
		},
		{
			title: "Anime",
			href: "/anime",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Anime</title>
					<path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2" />
				</svg>
			),
		},
		{
			title: "Steam",
			href: "/steam",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Steam</title>
					<path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z" />
					<path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048" />
				</svg>
			),
		},
		{
			title: "Stats",
			href: "/stats",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Stats</title>
					<path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
				</svg>
			),
		},
		{
			title: "Socials",
			href: "/socials",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<title>Socials</title>
					<path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
				</svg>
			),
		},
	];

	return (
		<>
			{/* Mobile Toggle Button */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-zinc-900/90 text-white hover:bg-zinc-900/70 transition-colors"
				aria-label={isOpen ? "Close menu" : "Open menu"}
			>
				{isOpen ? (
					<Cross1Icon className="h-5 w-5" />
				) : (
					<HamburgerMenuIcon className="h-5 w-5" />
				)}
			</button>

			{/* Backdrop for mobile */}
			{isOpen && isMobile && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
					onClick={() => setIsOpen(false)}
					onKeyDown={() => setIsOpen(false)}
					role="button"
					tabIndex={0}
				/>
			)}

			{/* Navbar */}
			<div
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-[280px] md:w-64 bg-black/95 backdrop-blur-md border-r border-zinc-800 flex flex-col transition-all duration-300 ease-in-out",
					!isOpen && "-translate-x-full",
					"md:translate-x-0 md:bg-black", // Always show on desktop
				)}
			>
				<div className="flex flex-col h-full">
					<div className="p-6">
						<h1 className="text-2xl font-bold text-pink-500 tracking-wide truncate">
							えめじ
						</h1>
					</div>

					<div className="flex-1 flex flex-col px-4">
						<SidebarNav items={sidebarNavItems} />
						<div className="flex-1" />
						<div className="py-6">
							<div className="flex gap-4 justify-center mb-4">
								<Button
									variant="ghost"
									size="icon"
									className="hover:text-pink-500 hover:bg-transparent"
									asChild
								>
									<a
										href="https://dc.gg/tx"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Discord"
									>
										<DiscordLogoIcon className="h-5 w-5" />
									</a>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="hover:text-pink-500 hover:bg-transparent"
									asChild
								>
									<a
										href="https://github.com/idMJA"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub"
									>
										<GitHubLogoIcon className="h-5 w-5" />
									</a>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="hover:text-pink-500 hover:bg-transparent"
									asChild
								>
									<a
										href="/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Website"
									>
										<GlobeIcon className="h-5 w-5" />
									</a>
								</Button>
							</div>
							<p className="text-sm text-gray-500 tracking-wide text-center">
								© {new Date().getFullYear()} iaMJ
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
