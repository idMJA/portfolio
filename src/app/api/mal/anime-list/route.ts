import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mal/anime-list`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch anime list');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching anime list:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch anime list' },
			{ status: 500 }
		);
	}
}
