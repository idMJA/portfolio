export interface LanyardResponse {
	data: {
		discord_user: {
			id: string;
			username: string;
			avatar: string;
			discriminator: string;
			public_flags: number;
			avatar_decoration_data?: {
				asset: string;
				sku_id: string;
			};
			global_name: string;
			display_name: string;
			clan?: {
				tag: string;
				identity_guild_id: string;
				badge: string;
				identity_enabled: boolean;
			};
		};
		activities: Activity[];
		discord_status: "online" | "idle" | "dnd" | "offline";
		active_on_discord_desktop: boolean;
		active_on_discord_mobile: boolean;
		active_on_discord_web: boolean;
		listening_to_spotify: boolean;
		spotify?: {
			timestamps: {
				start: number;
				end: number;
			};
			album: string;
			album_art_url: string;
			artist: string;
			song: string;
			track_id: string;
		};
	};
	success: boolean;
}

export interface Activity {
	type: number;
	name: string;
	id: string;
	state?: string;
	details?: string;
	application_id?: string;
	timestamps?: {
		start?: number;
		end?: number;
	};
	assets?: {
		large_image?: string;
		large_text?: string;
		small_image?: string;
		small_text?: string;
	};
	emoji?: {
		id: string;
		name: string;
		animated: boolean;
	};
}
