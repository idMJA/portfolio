export interface MALAnime {
	node: {
		id: number;
		title: string;
		main_picture: {
			medium: string;
			large: string;
		};
		status: string;
		media_type: string;
		num_episodes: number;
		start_date?: string;
		end_date?: string;
		genres: Array<{ id: number; name: string }>;
		mean: number;
	};
	list_status: {
		status: string;
		score: number;
		num_episodes_watched: number;
		is_rewatching: boolean;
		updated_at: string;
	};
}

export interface MALAnimeList {
	data: MALAnime[];
	paging: {
		next?: string;
		previous?: string;
	};
}

export interface MALTokenResponse {
	token_type: string;
	expires_in: number;
	access_token: string;
	refresh_token: string;
}
