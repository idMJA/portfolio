"use client";

import { useEffect, useState } from "react";
import SteamGameList from "@/components/SteamGameList";
import SteamNowPlaying from "@/components/SteamNowPlaying";
import type { OwnedGame, PlayerSummary, RecentGame } from "@/types/steam";

export default function SteamPage() {
	const [playerSummary, setPlayerSummary] = useState<PlayerSummary | null>(
		null,
	);
	const [recentGames, setRecentGames] = useState<RecentGame[]>([]);
	const [ownedGames, setOwnedGames] = useState<OwnedGame[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchSteamData() {
			try {
				setLoading(true);
				setError(null);

				const [playerRes, recentRes, ownedRes] = await Promise.all([
					fetch("/api/steam/player-summary"),
					fetch("/api/steam/recently-played"),
					fetch("/api/steam/owned-games"),
				]);

				if (playerRes.ok) {
					const playerData = await playerRes.json();
					setPlayerSummary(playerData.response.players[0] || null);
				}

				if (recentRes.ok) {
					const recentData = await recentRes.json();
					setRecentGames(recentData.response.games || []);
				}

				if (ownedRes.ok) {
					const ownedData = await ownedRes.json();
					setOwnedGames(ownedData.response.games || []);
				}
			} catch (err) {
				console.error("Error fetching Steam data:", err);
				setError("Failed to load Steam profile. Please try again later.");
			} finally {
				setLoading(false);
			}
		}

		fetchSteamData();
	}, []);

	const sortedOwnedGames = [...ownedGames].sort(
		(a, b) => b.playtime_forever - a.playtime_forever,
	);

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="space-y-8">
					<h1 className="text-4xl font-bold">Steam Profile</h1>
					<div className="text-zinc-400">Loading Steam data...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="space-y-4">
					<h1 className="text-4xl font-bold text-red-500">Error</h1>
					<p className="text-zinc-400">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="space-y-8">
				<h1 className="text-4xl font-bold">Steam Profile</h1>
				<div className="grid gap-8 md:grid-cols-2">
					<SteamNowPlaying playerSummary={playerSummary} isLoading={false} />
					<SteamGameList
						games={recentGames}
						title="Recently Played"
						description="Games played in the last 2 weeks"
						isLoading={false}
						isRecentGames
					/>
				</div>
				<SteamGameList
					games={sortedOwnedGames}
					title="Game Library"
					description="All owned games sorted by playtime"
					isLoading={false}
				/>
			</div>
		</div>
	);
}
