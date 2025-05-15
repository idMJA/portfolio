"use client";

import type { OwnedGame, RecentGame } from "@/types/steam";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, useEffect } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface SteamGameListProps {
	games: (OwnedGame | RecentGame)[];
	title: string;
	description: string;
	isLoading: boolean;
	isRecentGames?: boolean;
}

const ITEMS_PER_PAGE = 12;
const SKELETON_ITEMS = Array.from({ length: 6 }, (_, i) => `skeleton-${i}`);

export default function SteamGameList({
	games,
	title,
	description,
	isLoading,
	isRecentGames = false,
}: SteamGameListProps) {
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const [isFetchingLocal, setIsFetchingLocal] = useState(false);

	const loadMore = useCallback(() => {
		setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, games.length));
		setIsFetchingLocal(false);
	}, [games.length]);

	const { observe, unobserve } = useInfiniteScroll(loadMore);

	// Limit to 3 games if it's recent games, otherwise use infinite scroll
	const displayGames = isRecentGames
		? games.slice(0, 3)
		: games.slice(0, displayCount);

	const hasMore = !isRecentGames && displayCount < games.length;

	// Observe the loadMore div when it exists and we have more items
	useEffect(() => {
		const currentRef = loadMoreRef.current;

		if (currentRef && hasMore) {
			observe(currentRef);
			return () => {
				if (currentRef) {
					unobserve(currentRef);
				}
			};
		}
	}, [observe, unobserve, hasMore]);

	if (isLoading) {
		return (
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="h-4 w-[250px] bg-zinc-800 rounded animate-pulse" />
					<div className="h-4 w-[200px] bg-zinc-800 rounded animate-pulse" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{SKELETON_ITEMS.map((id) => (
						<div
							key={id}
							className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800"
						>
							<div className="relative pb-[46%] bg-zinc-800 animate-pulse" />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (isRecentGames && games.length === 0) {
		return (
			<div className="space-y-4">
				<div className="space-y-1">
					<h2 className="text-2xl font-bold">{title}</h2>
					<p className="text-muted-foreground">{description}</p>
				</div>
				<div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 p-6">
					<div className="flex items-center justify-center min-h-[100px]">
						<p className="text-muted-foreground text-center text-lg">
							Currently taking a break from gaming.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="space-y-1">
				<h2 className="text-2xl font-bold">{title}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>

			{isRecentGames ? (
				// Recent games with icon style
				<div className="grid gap-4">
					{displayGames.map((game) => (
						<Link
							key={game.appid}
							href={`https://store.steampowered.com/app/${game.appid}`}
							target="_blank"
							rel="noopener noreferrer"
							className="group bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all p-4"
						>
							<div className="flex items-center gap-4">
								<div className="relative w-12 h-12 flex-shrink-0">
									<Image
										src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
										alt={game.name}
										width={48}
										height={48}
										className="rounded object-cover"
										unoptimized
									/>
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="font-medium text-lg truncate">{game.name}</h3>
									<div className="flex items-center gap-4 text-sm text-zinc-400">
										<span>
											{Math.round(game.playtime_forever / 60)} hours total
										</span>
										{"playtime_2weeks" in game && (
											<span>
												{Math.round(game.playtime_2weeks / 60)} hours recent
											</span>
										)}
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				// Game library with header style
				<>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{displayGames.map((game) => (
							<Link
								key={game.appid}
								href={`https://store.steampowered.com/app/${game.appid}`}
								target="_blank"
								rel="noopener noreferrer"
								className="group bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all"
							>
								<div className="relative pb-[46%] overflow-hidden">
									<Image
										src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
										alt={game.name}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:via-black/60 transition-colors duration-300" />
									<div className="absolute bottom-0 left-0 right-0 p-3">
										<h3 className="font-medium text-white line-clamp-2 text-sm">
											{game.name}
										</h3>
									</div>
								</div>
								<div className="p-3">
									<div className="flex justify-between text-sm text-zinc-400">
										<span>
											{Math.round(game.playtime_forever / 60)} hours played
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>

					{hasMore && (
						<div
							ref={loadMoreRef}
							className="w-full py-8 flex items-center justify-center"
						>
							{isFetchingLocal ? (
								<div className="flex items-center gap-2 text-zinc-400">
									<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
										<title>Loading Spinner</title>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									<span>Loading more...</span>
								</div>
							) : (
								<div className="h-8" /> // Spacer for intersection observer
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
