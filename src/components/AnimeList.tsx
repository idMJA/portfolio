"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MALAnime } from "@/types/mal";

interface AnimeListProps {
	animeList: MALAnime[];
}

type FilterStatus =
	| "all"
	| "watching"
	| "completed"
	| "plan_to_watch"
	| "dropped"
	| "on_hold";
type SortOption = "score" | "title" | "status";

const STATUS_MAP = {
	watching: {
		label: "📺 Watching",
		class: "bg-[#ffb6c1]/20 text-[#ffb6c1] border border-[#ffb6c1]/30",
	},
	completed: {
		label: "✨ Completed",
		class: "bg-[#ffb6c1]/20 text-[#ffb6c1] border border-[#ffb6c1]/30",
	},
	plan_to_watch: {
		label: "📝 Plan to Watch",
		class: "bg-[#ffb6c1]/20 text-[#ffb6c1] border border-[#ffb6c1]/30",
	},
	dropped: {
		label: "🚫 Dropped",
		class: "bg-[#ffb6c1]/20 text-[#ffb6c1] border border-[#ffb6c1]/30",
	},
	on_hold: {
		label: "⏸️ On Hold",
		class: "bg-[#ffb6c1]/20 text-[#ffb6c1] border border-[#ffb6c1]/30",
	},
} as const;

const SORT_OPTIONS = {
	score: "⭐ Rating",
	title: "📝 Title",
	status: "📊 Status",
} as const;

const FILTER_OPTIONS = {
	all: "🎯 All",
	watching: "📺 Watching",
	completed: "✨ Completed",
	plan_to_watch: "📝 Plan to Watch",
	dropped: "🚫 Dropped",
	on_hold: "⏸️ On Hold",
} as const;

const ITEMS_PER_PAGE = 15;

export default function AnimeList({ animeList }: AnimeListProps) {
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
	const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
	const [activeSort, setActiveSort] = useState<SortOption>("status");
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	const filteredAndSortedAnime = useMemo(() => {
		let filtered = [...animeList];

		// Apply filter
		if (activeFilter !== "all") {
			filtered = filtered.filter(
				(anime) => anime.list_status.status === activeFilter,
			);
		}

		// Apply sort
		return filtered.sort((a, b) => {
			switch (activeSort) {
				case "score":
					return b.list_status.score - a.list_status.score;
				case "title":
					return a.node.title.localeCompare(b.node.title);
				case "status": {
					const statusOrder = {
						watching: 0,
						completed: 1,
						plan_to_watch: 2,
						on_hold: 3,
						dropped: 4,
					};
					const aStatus =
						statusOrder[a.list_status.status as keyof typeof statusOrder] ??
						999;
					const bStatus =
						statusOrder[b.list_status.status as keyof typeof statusOrder] ??
						999;
					if (aStatus !== bStatus) return aStatus - bStatus;
					return b.list_status.score - a.list_status.score;
				}
				default:
					return 0;
			}
		});
	}, [animeList, activeFilter, activeSort]);

	const loadMore = useCallback(() => {
		if (isLoading || displayCount >= filteredAndSortedAnime.length) return;

		setIsLoading(true);
		setTimeout(() => {
			setDisplayCount((prev) => {
				const nextCount = Math.min(
					prev + ITEMS_PER_PAGE,
					filteredAndSortedAnime.length,
				);
				setIsLoading(false);
				return nextCount;
			});
		}, 300);
	}, [filteredAndSortedAnime.length, displayCount, isLoading]);

	const displayedAnime = filteredAndSortedAnime.slice(0, displayCount);
	const hasMore = displayCount < filteredAndSortedAnime.length;

	// Reset display count when filter or sort changes
	useEffect(() => {
		setDisplayCount(ITEMS_PER_PAGE);
		setIsLoading(false);
	}, []);

	// Setup intersection observer for infinite scroll
	useEffect(() => {
		const currentRef = loadMoreRef.current;
		if (!currentRef || !hasMore || isLoading) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(currentRef);
		return () => observer.disconnect();
	}, [hasMore, isLoading, loadMore]);

	const stats = useMemo(() => {
		const totalAnime = animeList.length;
		const completedAnime = animeList.filter(
			(anime) => anime.list_status.status === "completed",
		).length;
		const watchingAnime = animeList.filter(
			(anime) => anime.list_status.status === "watching",
		).length;
		const planToWatchAnime = animeList.filter(
			(anime) => anime.list_status.status === "plan_to_watch",
		).length;

		const totalEpisodes = animeList.reduce(
			(acc, anime) => acc + anime.list_status.num_episodes_watched,
			0,
		);

		const averageScore = animeList
			.filter((anime) => anime.list_status.score > 0)
			.reduce(
				(acc, anime, _index, array) =>
					acc + anime.list_status.score / array.length,
				0,
			);

		return {
			totalAnime,
			completedAnime,
			watchingAnime,
			planToWatchAnime,
			totalEpisodes,
			averageScore: averageScore.toFixed(2),
		};
	}, [animeList]);

	return (
		<div className="relative">
			<div className="mb-8">
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 p-4 sm:p-6 bg-zinc-900/50 rounded-lg border border-[#ffb6c1]/20 flex-1 w-full">
					<div className="stat text-center">
						<h3 className="text-xs sm:text-sm font-medium text-[#ffb6c1]">
							Total Anime
						</h3>
						<p className="text-xl sm:text-2xl font-bold text-white">
							{stats.totalAnime}
						</p>
					</div>
					<div className="stat text-center">
						<h3 className="text-xs sm:text-sm font-medium text-[#ffb6c1]">
							Completed
						</h3>
						<p className="text-xl sm:text-2xl font-bold text-white">
							{stats.completedAnime}
						</p>
					</div>
					<div className="stat text-center">
						<h3 className="text-xs sm:text-sm font-medium text-[#ffb6c1]">
							Watching
						</h3>
						<p className="text-xl sm:text-2xl font-bold text-white">
							{stats.watchingAnime}
						</p>
					</div>
					<div className="stat text-center">
						<h3 className="text-xs sm:text-sm font-medium text-[#ffb6c1]">
							Plan to Watch
						</h3>
						<p className="text-xl sm:text-2xl font-bold text-white">
							{stats.planToWatchAnime}
						</p>
					</div>
					<div className="stat text-center">
						<h3 className="text-xs sm:text-sm font-medium text-[#ffb6c1]">
							Total Episodes
						</h3>
						<p className="text-xl sm:text-2xl font-bold text-white">
							{stats.totalEpisodes}
						</p>
					</div>
					<div className="stat text-center">
						<h3 className="text-xs sm:text-sm font-medium text-[#ffb6c1]">
							Average Score
						</h3>
						<p className="text-xl sm:text-2xl font-bold text-white">
							{stats.averageScore}
						</p>
					</div>
				</div>
			</div>

			<div id="sticky-wrapper" className="relative mb-8">
				<div className="sticky top-4 left-0 right-0 z-50">
					<div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 bg-zinc-900/50 rounded-lg border border-[#ffb6c1]/20">
						<div className="flex-1 space-y-2">
							<h3 className="text-xs font-medium text-[#ffb6c1]">
								Filter by Status
							</h3>
							<Select
								value={activeFilter}
								onValueChange={(value: FilterStatus) => setActiveFilter(value)}
							>
								<SelectTrigger className="w-[180px] bg-zinc-900 border-[#ffb6c1]/20 text-[#ffb6c1]">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent className="bg-zinc-900 border-[#ffb6c1]/20">
									{Object.entries(FILTER_OPTIONS).map(([value, label]) => (
										<SelectItem
											key={value}
											value={value}
											className="cursor-pointer text-[#ffb6c1] hover:bg-[#ffb6c1]/20 focus:bg-[#ffb6c1]/20 focus:text-[#ffb6c1]"
										>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<h3 className="text-xs font-medium text-[#ffb6c1]">Sort by</h3>
							<Select
								value={activeSort}
								onValueChange={(value: SortOption) => setActiveSort(value)}
							>
								<SelectTrigger className="w-[180px] bg-zinc-900 border-[#ffb6c1]/20 text-[#ffb6c1]">
									<SelectValue placeholder="Select sort" />
								</SelectTrigger>
								<SelectContent className="bg-zinc-900 border-[#ffb6c1]/20">
									{Object.entries(SORT_OPTIONS).map(([value, label]) => (
										<SelectItem
											key={value}
											value={value}
											className="cursor-pointer text-[#ffb6c1] hover:bg-[#ffb6c1]/20 focus:bg-[#ffb6c1]/20 focus:text-[#ffb6c1]"
										>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
				{displayedAnime.map((anime) => (
					<Link
						key={anime.node.id}
						href={`https://myanimelist.net/anime/${anime.node.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="group bg-zinc-900/50 rounded-lg overflow-hidden border border-[#ffb6c1]/20 hover:border-[#ffb6c1]/40 transition-all w-full"
					>
						<div className="relative pb-[140%] overflow-hidden">
							<Image
								src={anime.node.main_picture.large}
								alt={anime.node.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-110"
								sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16.67vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:via-black/60 transition-colors duration-300" />
							<div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
								<h3 className="font-medium text-white line-clamp-2 text-xs sm:text-sm">
									{anime.node.title}
								</h3>
							</div>
						</div>
						<div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
							<div className="flex justify-between text-xs sm:text-sm text-zinc-400">
								<span className="flex items-center gap-1">
									<svg
										className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Star Icon</title>
										<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
									</svg>
									{anime.list_status.score > 0
										? anime.list_status.score
										: "N/A"}
								</span>
								<span>
									{anime.list_status.num_episodes_watched}/
									{anime.node.num_episodes || "?"} eps
								</span>
							</div>
							<div className="flex justify-between text-xs">
								<span
									className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs ${
										STATUS_MAP[
											anime.list_status.status as keyof typeof STATUS_MAP
										]?.class ||
										"bg-zinc-500/20 text-zinc-300 border border-zinc-500/30"
									}`}
								>
									{STATUS_MAP[
										anime.list_status.status as keyof typeof STATUS_MAP
									]?.label || anime.list_status.status.replace("_", " ")}
								</span>
								{anime.list_status.is_rewatching && (
									<span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] sm:text-xs border border-purple-500/30">
										🔄 Rewatching
									</span>
								)}
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
					{isLoading ? (
						<div className="flex items-center gap-2 text-[#ffb6c1]">
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
		</div>
	);
}
