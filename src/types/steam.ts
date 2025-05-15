export interface PlayerSummary {
	steamid: string;
	personaname: string;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	personastate: number;
	gameextrainfo?: string;
	gameid?: string;
	img_icon_url?: string;
}

export interface PlayerSummaryResponse {
	response: {
		players: PlayerSummary[];
	};
}

export interface RecentGame {
	appid: number;
	name: string;
	playtime_2weeks: number;
	playtime_forever: number;
	img_icon_url: string;
}

export interface RecentGamesResponse {
	response: {
		total_count: number;
		games: RecentGame[];
	};
}

export interface OwnedGame {
	appid: number;
	name: string;
	playtime_forever: number;
	img_icon_url: string;
	has_community_visible_stats: boolean;
	playtime_windows_forever: number;
	playtime_mac_forever: number;
	playtime_linux_forever: number;
}

export interface OwnedGamesResponse {
	response: {
		game_count: number;
		games: OwnedGame[];
	};
}
