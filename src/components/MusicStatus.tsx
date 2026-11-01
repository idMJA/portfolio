"use client";

import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatDuration, formatPlayedAt, formatProgress } from "@/lib/music";
import type { CurrentlyPlaying, RecentTrack, Track } from "@/types/music";

function TrackCard({
	track,
	isPlaying = false,
	isPaused = false,
	progress_ms = 0,
	played_at,
	onTrackComplete,
	onStateChange,
}: {
	track: Track;
	isPlaying?: boolean;
	isPaused?: boolean;
	progress_ms?: number;
	played_at?: string;
	onTrackComplete?: () => void;
	onStateChange?: (isNowPlaying: boolean) => void;
}) {
	const [currentProgress, setCurrentProgress] = useState(progress_ms);
	const prevIsPlayingRef = useRef(isPlaying);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- sync progress bar with external prop on track change
		setCurrentProgress(progress_ms);
	}, [progress_ms]);

	// Handle play/pause state changes (ref avoids cascading renders)
	useEffect(() => {
		if (prevIsPlayingRef.current !== isPlaying && onStateChange) {
			onStateChange(isPlaying);
		}
		prevIsPlayingRef.current = isPlaying;
	}, [isPlaying, onStateChange]);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isPlaying && track.duration_ms && track.duration_ms > 0) {
			const trackDuration = track.duration_ms;
			interval = setInterval(() => {
				setCurrentProgress((prev) => {
					if (prev >= trackDuration) {
						if (onTrackComplete) {
							onTrackComplete();
						}
						return 0;
					}
					return prev + 1000;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isPlaying, track.duration_ms, onTrackComplete]);

	const hasDuration = Boolean(track.duration_ms && track.duration_ms > 0);

	return (
		<div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 w-full hover:bg-card/80 transition-colors relative">
			{played_at && (
				<div className="absolute top-3 right-3">
					<p className="text-muted-foreground text-xs">
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
						sizes="(max-width: 640px) 48px, 64px"
						className="object-cover rounded-md"
					/>
				</div>
				<div className="flex-1 min-w-0 py-1 pr-16 relative">
					{(isPlaying || isPaused) && (
						<>
							{!hasDuration && (
								<div className="absolute top-0 right-0 flex items-end gap-1 h-5">
									<span
										className={`w-1 rounded-sm bg-muted/50 ${isPlaying ? "animate-pulse" : "opacity-60"}`}
										style={{ height: "40%", animationDelay: "0ms" }}
									/>
									<span
										className={`w-1 rounded-sm bg-muted/50 ${isPlaying ? "animate-pulse" : "opacity-60"}`}
										style={{ height: "100%", animationDelay: "120ms" }}
									/>
									<span
										className={`w-1 rounded-sm bg-muted/50 ${isPlaying ? "animate-pulse" : "opacity-60"}`}
										style={{ height: "65%", animationDelay: "240ms" }}
									/>
									<span
										className={`w-1 rounded-sm bg-muted/50 ${isPlaying ? "animate-pulse" : "opacity-60"}`}
										style={{ height: "85%", animationDelay: "360ms" }}
									/>
								</div>
							)}
							<div className="absolute bottom-0 right-0 flex items-center gap-1">
								{isPlaying ? (
									<PlayIcon className="w-3 h-3" />
								) : (
									<PauseIcon className="w-3 h-3" />
								)}
								<span
									className={`text-xs uppercase font-medium ${isPlaying ? "text-green-500" : "text-orange-500"}`}
								>
									{isPlaying ? "playing" : "paused"}
								</span>
							</div>
						</>
					)}
					<a
						href={track.external_urls.spotify}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground hover:text-foreground/90 transition-colors block truncate text-sm sm:text-base"
					>
						{track.name}
					</a>
					<p className="text-muted-foreground text-xs sm:text-sm truncate mt-0.5">
						{track.artists.map((a) => a.name).join(", ")}
					</p>
					<p className="text-muted-foreground text-xs truncate mt-0.5">
						{track.album.name}
					</p>
					{(isPlaying || isPaused) && hasDuration && (
						<div className="mt-2">
							<div className="h-1 bg-card rounded-full overflow-hidden">
								<div
									className="h-full bg-muted/50 transition-all duration-1000 ease-linear"
									style={{
										width: formatProgress(
											currentProgress,
											track.duration_ms || 0,
										),
									}}
								/>
							</div>
							<div className="flex justify-between text-xs text-muted-foreground mt-1">
								<span>{formatDuration(currentProgress)}</span>
								<span>{formatDuration(track.duration_ms || 0)}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default function MusicStatus() {
	const [currentlyPlaying, setCurrentlyPlaying] =
		useState<CurrentlyPlaying | null>(null);
	const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchMusicData = async (showLoading = true) => {
		try {
			if (showLoading) {
				setLoading(true);
			}

			const response = await fetch("/api/music/recent-tracks");

			if (response.ok) {
				const data = await response.json();
				setCurrentlyPlaying(data?.currentlyPlaying || null);
				setRecentTracks(data?.recentTracks || []);
			}
		} catch (error) {
			console.error("Failed to fetch music data:", error);
		} finally {
			setLoading(false);
		}
	};

	// Using useCallback to memoize the fetchMusicData function
	/* eslint-disable react-hooks/use-memo, react-hooks/set-state-in-effect -- fetchMusicData stable; polling interval */
	const memoizedFetchData = useCallback(fetchMusicData, []);
	useEffect(() => {
		// Initial fetch and set up regular polling interval
		memoizedFetchData();

		// Set up a more frequent polling for play state changes (every 5 seconds)
		const stateCheckInterval = setInterval(() => {
			memoizedFetchData(false);
		}, 5000);

		// Set up less frequent full refresh (every 30 seconds)
		const fullRefreshInterval = setInterval(() => {
			memoizedFetchData(false);
		}, 30000);

		return () => {
			clearInterval(stateCheckInterval);
			clearInterval(fullRefreshInterval);
		};
	}, [memoizedFetchData]);
	/* eslint-enable react-hooks/use-memo, react-hooks/set-state-in-effect */

	const handleTrackComplete = useCallback(() => {
		// When track completes, fetch new data without showing loading state
		memoizedFetchData(false);
	}, [memoizedFetchData]);

	const handleStateChange = useCallback(() => {
		// Force refresh data when user manually changes play state
		memoizedFetchData(false);
	}, [memoizedFetchData]);

	if (loading) {
		return (
			<div className="space-y-6 sm:space-y-8 w-full">
				<section>
					<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground/90">
						Currently Playing
					</h2>
					<div className="space-y-3">
						<div className="bg-background/60 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-card rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-card rounded w-3/4" />
									<div className="h-3 bg-card rounded w-1/2" />
									<div className="h-3 bg-card rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-background/60 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-card rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-card rounded w-3/4" />
									<div className="h-3 bg-card rounded w-1/2" />
									<div className="h-3 bg-card rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-background/60 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-card rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-card rounded w-3/4" />
									<div className="h-3 bg-card rounded w-1/2" />
									<div className="h-3 bg-card rounded w-1/3" />
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground/90">
						Recently Played
					</h2>
					<div className="space-y-3">
						<div className="bg-background/60 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-card rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-card rounded w-3/4" />
									<div className="h-3 bg-card rounded w-1/2" />
									<div className="h-3 bg-card rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-background/60 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-card rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-card rounded w-3/4" />
									<div className="h-3 bg-card rounded w-1/2" />
									<div className="h-3 bg-card rounded w-1/3" />
								</div>
							</div>
						</div>
						<div className="bg-background/60 rounded-lg p-4 animate-pulse">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-card rounded-md" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-card rounded w-3/4" />
									<div className="h-3 bg-card rounded w-1/2" />
									<div className="h-3 bg-card rounded w-1/3" />
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
				<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground/90">
					Currently Playing
				</h2>

				<div className="space-y-3">
					{currentlyPlaying?.item ? (
						<TrackCard
							track={currentlyPlaying.item}
							isPlaying={currentlyPlaying.is_playing}
							isPaused={!currentlyPlaying.is_playing}
							progress_ms={currentlyPlaying.progress_ms}
							onTrackComplete={handleTrackComplete}
							onStateChange={handleStateChange}
						/>
					) : (
						<p className="text-muted-foreground text-sm">
							Nothing playing right now
						</p>
					)}
				</div>
			</section>

			<section>
				<h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground/90">
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
						<p className="text-muted-foreground text-sm">
							No recently played tracks
						</p>
					)}
				</div>
			</section>
		</div>
	);
}
