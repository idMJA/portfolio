"use client";

import type { PlayerSummary } from "@/types/steam";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import {
	CircleDot,
	Clock,
	GamepadIcon,
	MinusCircle,
	User2,
} from "lucide-react";

const NOT_PLAYING_QUOTES = [
	"Currently taking a break from gaming.",
	"Not playing anything at the moment.",
	"In between games right now.",
	"Taking a pause from the virtual world.",
	"Recharging my batteries before the next gaming session.",
	"Exploring other hobbies besides gaming.",
	"Just chilling and not gaming for a while.",
];

interface SteamNowPlayingProps {
	playerSummary: PlayerSummary | null;
	isLoading: boolean;
}

const getStatusInfo = (state: number) => {
	switch (state) {
		case 0:
			return { text: "Offline", icon: MinusCircle, color: "text-gray-500" };
		case 1:
			return { text: "Online", icon: CircleDot, color: "text-green-500" };
		case 2:
			return { text: "Busy", icon: Clock, color: "text-yellow-500" };
		case 3:
			return { text: "Away", icon: Clock, color: "text-orange-500" };
		case 4:
			return { text: "Snooze", icon: Clock, color: "text-blue-500" };
		case 5:
			return {
				text: "Looking to Trade",
				icon: User2,
				color: "text-purple-500",
			};
		case 6:
			return {
				text: "Looking to Play",
				icon: GamepadIcon,
				color: "text-cyan-500",
			};
		default:
			return { text: "Unknown", icon: MinusCircle, color: "text-gray-500" };
	}
};

export default function SteamNowPlaying({
	playerSummary,
	isLoading,
}: SteamNowPlayingProps) {
	const [notPlayingQuote] = useState(
		() =>
			NOT_PLAYING_QUOTES[Math.floor(Math.random() * NOT_PLAYING_QUOTES.length)],
	);

	if (isLoading) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="space-y-3">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</CardContent>
			</Card>
		);
	}

	if (!playerSummary) {
		return (
			<Card>
				<CardContent className="p-6">
					<p className="text-muted-foreground">Unable to load Steam profile</p>
				</CardContent>
			</Card>
		);
	}

	const status = getStatusInfo(playerSummary.personastate);
	const StatusIcon = status.icon;

	return (
		<Card>
			<CardContent className="p-6 space-y-4">
				<div className="flex space-x-4">
					<div className="relative w-16 h-16 flex-shrink-0">
						<Image
							src={playerSummary.avatarmedium}
							alt={playerSummary.personaname}
							width={64}
							height={64}
							className="rounded-lg object-cover"
						/>
						<div
							className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-background ${status.color}`}
						>
							<StatusIcon size={14} />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-lg truncate">
							{playerSummary.personaname}
						</h3>
						<p className={`flex items-center gap-1.5 ${status.color}`}>
							<StatusIcon size={14} />
							<span>{status.text}</span>
						</p>
					</div>
				</div>

				{playerSummary.gameextrainfo ? (
					<div className="flex items-center space-x-4 bg-muted/50 rounded-lg p-3">
						<div className="relative w-10 h-10 flex-shrink-0">
							{playerSummary.img_icon_url ? (
								<Image
									src={`https://media.steampowered.com/steamcommunity/public/images/apps/${playerSummary.gameid}/${playerSummary.img_icon_url}.jpg`}
									alt={playerSummary.gameextrainfo}
									width={40}
									height={40}
									className="rounded"
									unoptimized
								/>
							) : (
								<div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
									<GamepadIcon size={24} className="text-muted-foreground" />
								</div>
							)}
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Currently Playing</p>
							<p className="font-medium">{playerSummary.gameextrainfo}</p>
						</div>
					</div>
				) : (
					<div className="bg-muted/50 rounded-lg p-4 mt-2 mb-2">
						<div className="flex items-center justify-center min-h-[60px]">
							<p className="text-muted-foreground text-center text-base font-medium">
								{notPlayingQuote}
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
