import { NextResponse } from "next/server";

export async function GET() {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) {
			throw new Error('API URL not configured');
		}

		const response = await fetch(`${apiUrl}/spotify/recently-played`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch Spotify recently played');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching Spotify recently played:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Spotify recently played' },
			{ status: 500 }
		);
	}
}
