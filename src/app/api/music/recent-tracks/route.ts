import { NextResponse } from "next/server";
import { mapLastFmTrack, toIsoDate } from "@/lib/music";
import type { LastFmTrack } from "@/types/music";

export async function GET() {
	try {
		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			throw new Error("API URL not configured");
		}

		const response = await fetch(`${apiUrl}/lastfm/recent-tracks`, {
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 30 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch latest recent tracks");
		}

		const data = await response.json();
		const tracks: LastFmTrack[] = data?.recenttracks?.track || [];

		const nowPlayingTrack = tracks.find(
			(track) => track?.["@attr"]?.nowplaying === "true",
		);

		const currentlyPlaying = nowPlayingTrack
			? {
					item: mapLastFmTrack(nowPlayingTrack),
					is_playing: true,
					progress_ms: 0,
				}
			: { item: null, is_playing: false, progress_ms: 0 };

		const recentTracks = tracks
			.filter((track) => track?.["@attr"]?.nowplaying !== "true")
			.map((track) => ({
				track: mapLastFmTrack(track),
				played_at: toIsoDate(track.date?.uts),
			}));

		return NextResponse.json({
			currentlyPlaying,
			recentTracks,
		});
	} catch (error) {
		console.error("Error fetching music tracks:", error);
		return NextResponse.json(
			{ error: "Failed to fetch music tracks" },
			{ status: 500 },
		);
	}
}
