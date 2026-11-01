import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Socials",
	description:
		"Find Moehammad Joesoef Aldri (idMJA / MJBA) online: GitHub, Twitter/X, Bluesky, and Discord.",
	robots: { index: true, follow: true },
};

import {
	FaDiscord,
	FaGithub,
	FaReddit,
	FaSpotify,
	FaSteam,
} from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

const socialLinks = [
	{
		name: "Bluesky",
		icon: <SiBluesky size={20} />,
		url: "https://bsky.app/profile/mja.moe",
	},
	{
		name: "GitHub",
		icon: <FaGithub size={20} />,
		url: "https://github.com/idMJA",
	},
	{
		name: "Steam",
		icon: <FaSteam size={20} />,
		url: "https://steamcommunity.com/id/MJBD/",
	},
	{
		name: "Spotify",
		icon: <FaSpotify size={20} />,
		url: "https://open.spotify.com/user/8116baq16nwq1sab8c5dy3rrx",
	},
	{
		name: "Reddit",
		icon: <FaReddit size={20} />,
		url: "https://www.reddit.com/u/0MJA",
	},
	{
		name: "Discord",
		icon: <FaDiscord size={20} />,
		url: "https://discord.com/users/885731228874051624",
	},
];

export default function SocialsPage() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-8 max-w-5xl">
			<h1 className="text-3xl md:text-4xl font-semibold tracking-display mb-2 text-foreground">
				Socials
			</h1>
			<p className="text-foreground/70 text-sm font-mono-geist uppercase tracking-wide mb-8">
				socials and links
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{socialLinks.map((social) => (
					<a
						key={social.name}
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						className="card-modern p-4 flex items-center gap-3 group"
					>
						<span className="text-foreground/70 group-hover:text-foreground/90 transition-colors">
							{social.icon}
						</span>
						<span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
							{social.name}
						</span>
					</a>
				))}
			</div>
		</div>
	);
}
