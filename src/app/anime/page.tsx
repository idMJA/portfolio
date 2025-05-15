"use client";

import { useEffect, useState, useCallback } from "react";
import AnimeList from "@/components/AnimeList";
import type { MALAnimeList } from "@/types/mal";
import Link from "next/link";

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

	useEffect(() => {
		fetchAnimeList();
	}, [fetchAnimeList]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-zinc-400">Loading anime list...</div>
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
					className="px-4 py-2 bg-[#ffb6c1]/20 hover:bg-[#ffb6c1]/30 text-[#ffb6c1] rounded-lg border border-[#ffb6c1]/30 transition-colors"
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
						<h1 className="text-4xl font-bold bg-gradient-to-r from-[#ffb6c1] to-[#ffb6c1] text-transparent bg-clip-text">
							My Anime List
						</h1>
						<p className="text-zinc-400">
							Here&apos;s my anime watching journey, powered by MyAnimeList.
						</p>
					</div>
					<Link
						href="https://myanimelist.net/profile/1MJ"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-2 bg-[#ffb6c1]/20 hover:bg-[#ffb6c1]/30 text-[#ffb6c1] rounded-lg border border-[#ffb6c1]/30 transition-colors whitespace-nowrap"
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
