"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AnimeList from "@/components/AnimeList";
import type { MALAnimeList } from "@/types/mal";

export default function AnimePage() {
	const [animeList, setAnimeList] = useState<MALAnimeList["data"]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchAnimeList = useCallback(async () => {
		try {
			setError(null);
			const response = await fetch("/api/mal/anime-list");

			if (!response.ok) {
				const errorData = await response.text();
				console.error("Anime list fetch error:", errorData);
				throw new Error(errorData || "Failed to fetch anime list");
			}

			const data: MALAnimeList = await response.json();
			setAnimeList(data.data || []);
		} catch (error) {
			console.error("Failed to fetch anime list:", error);
			setError(
				error instanceof Error ? error.message : "Failed to fetch anime list",
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	/* eslint-disable react-hooks/set-state-in-effect -- fetch anime list on mount */
	useEffect(() => {
		fetchAnimeList();
	}, [fetchAnimeList]);
	/* eslint-enable react-hooks/set-state-in-effect */

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-muted-foreground">Loading anime list...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<div className="text-red-400">{error}</div>
				<button
					type="button"
					onClick={fetchAnimeList}
					className="px-4 py-2 bg-muted/50 hover:bg-muted/80 text-foreground/90 rounded-md border border-border transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div className="space-y-2">
						<h1 className="text-4xl font-semibold tracking-display text-foreground">
							My Anime List
						</h1>
						<p className="text-muted-foreground">
							Here&apos;s my anime watching journey, powered by MyAnimeList.
						</p>
					</div>
					<Link
						href="https://myanimelist.net/profile/1MJ"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted/80 text-foreground/90 rounded-md border border-border transition-colors whitespace-nowrap"
					>
						<span>View Profile</span>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>External Link</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</Link>
				</div>
				<AnimeList animeList={animeList} />
			</div>
		</main>
	);
}
