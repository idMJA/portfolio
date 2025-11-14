"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { formatTimestamp } from "@/lib/utils";
import type { LanyardResponse } from "@/types/discord";

// Platform icons configuration
const platformIcons = {
	desktop: (
		<Icon
			d="M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z"
			width={16}
			height={16}
		/>
	),
	web: (
		<Icon
			d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z"
			width={16}
			height={16}
		/>
	),
	mobile: (
		<Icon
			d="M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z"
			viewBox="0 0 1000 1500"
			width={16}
			height={16}
		/>
	),
};

export default function DiscordStatus() {
	const [data, setData] = useState<LanyardResponse["data"] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchDiscordStatus() {
			try {
				const response = await fetch(
					"https://api.lanyard.rest/v1/users/885731228874051624",
				);
				const json = await response.json();
				if (json.success) {
					setData(json.data);
				}
			} catch (error) {
				console.error("Error fetching Discord status:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchDiscordStatus();
		// Refresh every 30 seconds
		const interval = setInterval(fetchDiscordStatus, 30000);
		return () => clearInterval(interval);
	}, []);

	if (loading || !data) {
		return (
			<div className="bg-[#0f0f0f] rounded-lg p-4 max-w-xl animate-pulse">
				<div className="flex items-start space-x-3">
					<div className="w-16 h-16 bg-zinc-800 rounded-full" />
					<div className="flex-1 space-y-2">
						<div className="h-4 bg-zinc-800 rounded w-1/4" />
						<div className="h-3 bg-zinc-800 rounded w-1/3" />
					</div>
				</div>
			</div>
		);
	}

	const {
		discord_user,
		activities,
		discord_status,
		active_on_discord_desktop,
		active_on_discord_web,
		active_on_discord_mobile,
		spotify,
		listening_to_spotify,
	} = data;

	// Get custom status (type 4 is Custom Status)
	const customStatus = activities.find((activity) => activity.type === 4);

	// Get main activity (VSCode or other apps)
	const mainActivity = activities.find(
		(activity) => activity.type === 0 && activity.application_id,
	);

	// Status colors mapping
	const statusColors = {
		online: "bg-green-500",
		idle: "bg-yellow-500",
		dnd: "bg-red-500",
		offline: "bg-gray-500",
	};

	return (
		<div className="bg-[#0f0f0f] rounded-lg p-4 max-w-xl space-y-4 font-['Play']">
			{/* User Profile Header */}
			<div className="flex items-start space-x-3">
				<div className="relative w-16 h-16">
					{/* Avatar with Decorations */}
					<div className="relative">
						<Image
							src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=1024`}
							alt={discord_user.display_name}
							width={53}
							height={53}
							className="rounded-full translate-x-0 translate-y-0"
						/>
						{discord_user.avatar_decoration_data && (
							<Image
								src={`https://cdn.discordapp.com/avatar-decoration-presets/${discord_user.avatar_decoration_data.asset}.png`}
								alt="avatar decoration"
								width={84}
								height={84}
								className="absolute -top-2.5 -left-2.5 translate-x-1 translate-y-1"
								unoptimized
							/>
						)}
						<div
							className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-[3px] border-[#0f0f0f] 
                ${statusColors[discord_status as keyof typeof statusColors]}`}
						/>
					</div>
				</div>

				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="max-w-[70%]">
							<div className="flex items-center gap-1 flex-wrap">
								<h3 className="font-['Aldrich'] font-semibold text-white">
									{discord_user.display_name}
								</h3>
								{/* Clan Tag with Badge */}
								{discord_user.clan && (
									<div className="flex items-center gap-1">
										<div className="flex items-center gap-1 text-xs text-gray-400 border border-gray-700 rounded px-1.5 py-0.5">
											{discord_user.clan.badge && (
												<Image
													src={`https://cdn.discordapp.com/clan-badges/${discord_user.clan.identity_guild_id}/${discord_user.clan.badge}.webp`}
													alt="clan badge"
													width={14}
													height={14}
													className="rounded-sm"
													unoptimized
												/>
											)}
											<span>{discord_user.clan.tag}</span>
										</div>
									</div>
								)}
							</div>
							<p className="text-sm text-gray-400">@{discord_user.username}</p>

							{/* Custom Status */}
							{customStatus && (customStatus.emoji || customStatus.state) && (
								<div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
									{customStatus.emoji && (
										<Image
											src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.webp?size=128`}
											alt={customStatus.emoji.name}
											width={16}
											height={16}
										/>
									)}
									{customStatus.state && <span>{customStatus.state}</span>}
								</div>
							)}
						</div>

						{/* Platform Information - Horizontal layout */}
						<div className="flex items-center gap-2">
							{active_on_discord_desktop && (
								<div className="w-4 h-4 text-white" title="Desktop">
									{platformIcons.desktop}
								</div>
							)}
							{active_on_discord_web && (
								<div className="w-4 h-4 text-white" title="Browser">
									{platformIcons.web}
								</div>
							)}
							{active_on_discord_mobile && (
								<div className="w-4 h-4 text-white" title="Mobile">
									{platformIcons.mobile}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Spotify Activity */}
			{listening_to_spotify && spotify && (
				<div className="bg-[#1f1f1f] rounded p-3 text-sm">
					<div className="flex items-center space-x-3">
						<div className="relative">
							<Image
								src={spotify.album_art_url}
								alt={spotify.album}
								width={40}
								height={40}
								className="rounded"
							/>
							<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#1DB954] rounded-full flex items-center justify-center">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<title>Spotify Icon</title>
									<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
								</svg>
							</div>
						</div>
						<div className="flex-1">
							<p className="font-['Aldrich'] font-medium text-white">
								{spotify.song}
							</p>
							<p className="text-gray-400 text-sm">by {spotify.artist}</p>
							<p className="text-gray-400 text-sm">on {spotify.album}</p>
							{spotify.timestamps?.start && (
								<p className="text-gray-500 text-xs mt-1">
									{formatTimestamp(spotify.timestamps.start)}
								</p>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Activity Display */}
			{mainActivity && (
				<div className="bg-[#1f1f1f] rounded p-3 text-sm">
					<div className="flex items-center space-x-3">
						<div className="relative">
							{mainActivity.assets?.large_image && (
								<Image
									src={
										mainActivity.assets.large_image.startsWith("mp:external")
											? `https://${mainActivity.assets.large_image.split("/https/")[1]}`
											: `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.webp?size=128`
									}
									alt={mainActivity.assets.large_text || mainActivity.name}
									width={40}
									height={40}
									className="rounded"
									unoptimized
								/>
							)}
							{mainActivity.assets?.small_image && (
								<Image
									src={
										mainActivity.assets.small_image.startsWith("mp:external")
											? `https://${mainActivity.assets.small_image.split("/https/")[1]}`
											: `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.small_image}.webp?size=128`
									}
									alt={mainActivity.assets.small_text || ""}
									width={20}
									height={20}
									className="absolute -bottom-1 -right-1 rounded-full"
									unoptimized
								/>
							)}
						</div>
						<div className="flex-1">
							<p className="font-['Aldrich'] font-medium text-white">
								{mainActivity.name}
							</p>
							{mainActivity.details && (
								<p className="text-gray-400 text-sm">{mainActivity.details}</p>
							)}
							{mainActivity.state && (
								<p className="text-gray-400 text-sm">{mainActivity.state}</p>
							)}
							{mainActivity.timestamps?.start && (
								<p className="text-gray-500 text-xs mt-1">
									{formatTimestamp(mainActivity.timestamps.start)}
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
