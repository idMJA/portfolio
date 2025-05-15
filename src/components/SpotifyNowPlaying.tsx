"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";

interface Track {
	name: string;
	artists: { name: string }[];
	album: {
		name: string;
		images: { url: string }[];
	};
	duration_ms: number;
	external_urls: {
		spotify: string;
	};
}

interface RecentTrack {
	track: Track;
	played_at: string;
}

interface CurrentlyPlaying {
	item: Track;
	is_playing: boolean;
	progress_ms: number;
}

function formatDuration(ms: number) {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatProgress(progress: number, duration: number) {
	const progressPercent = (progress / duration) * 100;
	return `${progressPercent}%`;
}

function formatPlayedAt(played_at: string) {
	const playedDate = new Date(played_at);
	const now = new Date();
	const diffInMinutes = Math.floor((now.getTime() - playedDate.getTime()) / (1000 * 60));
	
	if (diffInMinutes < 1) return 'Just now';
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
	if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
	return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

function TrackCard({
	track,
	isPlaying = false,
	isPaused = false,
	progress_ms = 0,
	played_at,
}: {
	track: Track;
	isPlaying?: boolean;
	isPaused?: boolean;
	progress_ms?: number;
	played_at?: string;
}) {
	const [currentProgress, setCurrentProgress] = useState(progress_ms);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isPlaying) {
			interval = setInterval(() => {
				setCurrentProgress((prev) => {
					if (prev >= track.duration_ms) return 0;
					return prev + 1000;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isPlaying, track.duration_ms]);

	return (
		<div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 w-full hover:bg-zinc-900/70 transition-colors relative">
			{played_at && (
				<div className="absolute top-3 right-3">
					<p className="text-gray-500 text-xs">
						{formatPlayedAt(played_at)}
					</p>
				</div>
			)}
			<div className="flex items-start gap-3">
				<div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
					<Image
						src={track.album.images[0]?.url || "/placeholder-album.jpg"}
						alt={track.album.name}
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="flex-1 min-w-0 py-1 pr-8">
					<a
						href={track.external_urls.spotify}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-pink-500 transition-colors block truncate text-sm sm:text-base"
					>
						{track.name}
					</a>
					<p className="text-gray-400 text-xs sm:text-sm truncate mt-0.5">
						{track.artists.map((a) => a.name).join(", ")}
					</p>
					<p className="text-gray-500 text-xs truncate mt-0.5">
						{track.album.name}
					</p>
					{(isPlaying || isPaused) && (
						<div className="mt-2">
							<div className="flex justify-end items-center gap-1 mb-1">
								{isPlaying ? (
									<PlayIcon className="w-3 h-3" />
								) : (
									<PauseIcon className="w-3 h-3" />
								)}
								<span className={`text-xs uppercase font-medium ${isPlaying ? 'text-green-500' : 'text-orange-500'}`}>
									{isPlaying ? 'playing' : 'paused'}
								</span>
							</div>
							<div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
								<div
									className="h-full bg-pink-500 transition-all duration-1000 ease-linear"
									style={{
										width: formatProgress(currentProgress, track.duration_ms),
									}}
								/>
							</div>
							<div className="flex justify-between text-xs text-gray-500 mt-1">
								<span>{formatDuration(currentProgress)}</span>
								<span>{formatDuration(track.duration_ms)}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default function SpotifyNowPlaying() {
	const [currentlyPlaying, setCurrentlyPlaying] =
		useState<CurrentlyPlaying | null>(null);
	const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				
				const [currentRes, recentRes] = await Promise.all([
					fetch("/api/spotify/now-playing"),
					fetch("/api/spotify/recently-played"),
				]);

				if (currentRes.ok) {
					const currentData = await currentRes.json();
					setCurrentlyPlaying(currentData);
				}

				if (recentRes.ok) {
					const recentData = await recentRes.json();
					setRecentTracks(recentData?.items || []);
				}
			} catch (error) {
				console.error("Failed to fetch Spotify data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
		const interval = setInterval(() => {
			// For subsequent fetches, don't show loading
			fetchData().then(() => setLoading(false));
		}, 30000);
		return () => clearInterval(interval);
	}, []);

	if (loading) {
		return (
			<div className="space-y-6 sm:space-y-8 w-full">
				<section>
					<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-pink-500">
						Currently Playing
					</h2>
					<div className="space-y-3">
						<div className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-zinc-800 rounded w-3/4" />
									<div className="h-3 bg-zinc-800 rounded w-1/2" />
									<div className="h-3 bg-zinc-800 rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-zinc-800 rounded w-3/4" />
									<div className="h-3 bg-zinc-800 rounded w-1/2" />
									<div className="h-3 bg-zinc-800 rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-zinc-800 rounded w-3/4" />
									<div className="h-3 bg-zinc-800 rounded w-1/2" />
									<div className="h-3 bg-zinc-800 rounded w-1/3" />
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-pink-500">
						Recently Played
					</h2>
					<div className="space-y-3">
						<div className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-zinc-800 rounded w-3/4" />
									<div className="h-3 bg-zinc-800 rounded w-1/2" />
									<div className="h-3 bg-zinc-800 rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-zinc-800 rounded w-3/4" />
									<div className="h-3 bg-zinc-800 rounded w-1/2" />
									<div className="h-3 bg-zinc-800 rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-zinc-800 rounded w-3/4" />
									<div className="h-3 bg-zinc-800 rounded w-1/2" />
									<div className="h-3 bg-zinc-800 rounded w-1/3" />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}

	return (
		<div className="space-y-6 sm:space-y-8 w-full">
			<section>
				<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-pink-500">
					Currently Playing
				</h2>
				<div className="space-y-3">
					{currentlyPlaying?.item ? (
						<TrackCard
							track={currentlyPlaying.item}
							isPlaying={currentlyPlaying.is_playing}
							isPaused={!currentlyPlaying.is_playing}
							progress_ms={currentlyPlaying.progress_ms}
						/>
					) : (
						<p className="text-gray-500 text-sm">Nothing playing right now</p>
					)}
				</div>
			</section>

			<section>
				<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-pink-500">
					Recently Played
				</h2>
				<div className="space-y-3">
					{Array.isArray(recentTracks) && recentTracks.length > 0 ? (
						recentTracks.map((item: RecentTrack) => (
							<TrackCard 
								key={item.played_at} 
								track={item.track} 
								played_at={item.played_at}
							/>
						))
					) : (
						<p className="text-gray-500 text-sm">No recently played tracks</p>
					)}
				</div>
			</section>
		</div>
	);
}
