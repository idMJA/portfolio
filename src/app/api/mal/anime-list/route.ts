import { NextResponse } from "next/server";

export async function GET() {
	try {
		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			throw new Error("API URL not configured");
		}
		const response = await fetch(`${apiUrl}/mal/anime-list`, {
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch anime list");
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching anime list:", error);
		return NextResponse.json(
			{ error: "Failed to fetch anime list" },
			{ status: 500 },
		);
	}
}
