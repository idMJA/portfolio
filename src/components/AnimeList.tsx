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
		label: "Watching",
		class: "bg-muted/50 text-foreground/90 border border-border",
	},
	completed: {
		label: "Completed",
		class: "bg-muted/50 text-foreground/90 border border-border",
	},
	plan_to_watch: {
		label: "Plan to Watch",
		class: "bg-muted/50 text-foreground/90 border border-border",
	},
	dropped: {
		label: "Dropped",
		class: "bg-muted/50 text-foreground/80 border border-border",
	},
	on_hold: {
		label: "On Hold",
		class: "bg-muted/50 text-foreground/80 border border-border",
	},
} as const;

const SORT_OPTIONS = {
	score: "Rating",
	title: "Title",
	status: "Status",
} as const;

const FILTER_OPTIONS = {
	all: "All",
	watching: "Watching",
	completed: "Completed",
	plan_to_watch: "Plan to Watch",
	dropped: "Dropped",
	on_hold: "On Hold",
} as const;

const ITEMS_PER_PAGE = 15;

export default function AnimeList({ animeList }: AnimeListProps) {
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
	const [sortBy, setSortBy] = useState<SortOption>("score");
	const [filterBy, setFilterBy] = useState<FilterStatus>("all");
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const filteredAndSorted = useMemo(() => {
		let result = [...animeList];

		if (filterBy !== "all") {
			result = result.filter((anime) => anime.list_status?.status === filterBy);
		}

		switch (sortBy) {
			case "score":
				result.sort(
					(a, b) => (b.list_status?.score || 0) - (a.list_status?.score || 0),
				);
				break;
			case "title":
				result.sort((a, b) => a.node.title.localeCompare(b.node.title));
				break;
			case "status":
				result.sort((a, b) =>
					(a.list_status?.status || "").localeCompare(
						b.list_status?.status || "",
					),
				);
				break;
		}

		return result;
	}, [animeList, sortBy, filterBy]);

	const displayAnime = filteredAndSorted.slice(0, displayCount);
	const hasMore = displayCount < filteredAndSorted.length;

	const loadMore = useCallback(() => {
		setDisplayCount((prev) =>
			Math.min(prev + ITEMS_PER_PAGE, filteredAndSorted.length),
		);
	}, [filteredAndSorted.length]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore) {
					loadMore();
				}
			},
			{ threshold: 0.1 },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => observer.disconnect();
	}, [hasMore, loadMore]);

	/* biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reset display count when sort/filter changes */
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- reset display count when sort/filter changes
		setDisplayCount(ITEMS_PER_PAGE);
	}, [sortBy, filterBy]);

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-2">
				<Select
					value={filterBy}
					onValueChange={(value) => setFilterBy(value as FilterStatus)}
				>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Filter" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(FILTER_OPTIONS).map(([key, label]) => (
							<SelectItem key={key} value={key}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={sortBy}
					onValueChange={(value) => setSortBy(value as SortOption)}
				>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Sort" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(SORT_OPTIONS).map(([key, label]) => (
							<SelectItem key={key} value={key}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="text-xs text-foreground/60 font-mono-geist">
				{filteredAndSorted.length} anime
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
				{displayAnime.map((anime) => (
					<Link
						key={anime.node.id}
						href={`https://myanimelist.net/anime/${anime.node.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="card-modern overflow-hidden group"
					>
						<div className="relative aspect-[2/3] overflow-hidden">
							<Image
								src={
									anime.node.main_picture.large ||
									anime.node.main_picture.medium
								}
								alt={anime.node.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
							/>
						</div>
						<div className="p-3">
							<h3 className="text-xs font-medium text-foreground/90 line-clamp-2 mb-1">
								{anime.node.title}
							</h3>
							{anime.list_status && (
								<div className="flex items-center gap-2">
									<span
										className={`text-[10px] px-1.5 py-0.5 rounded-full ${STATUS_MAP[anime.list_status.status as keyof typeof STATUS_MAP]?.class || ""}`}
									>
										{STATUS_MAP[
											anime.list_status.status as keyof typeof STATUS_MAP
										]?.label || anime.list_status.status}
									</span>
									{anime.list_status.score > 0 && (
										<span className="text-[10px] text-foreground/70 font-mono-geist">
											{anime.list_status.score}
										</span>
									)}
								</div>
							)}
						</div>
					</Link>
				))}
			</div>

			{hasMore && (
				<div ref={loadMoreRef} className="flex justify-center py-4">
					<button
						type="button"
						onClick={loadMore}
						className="btn-ghost text-xs"
					>
						Load more
					</button>
				</div>
			)}
		</div>
	);
}
