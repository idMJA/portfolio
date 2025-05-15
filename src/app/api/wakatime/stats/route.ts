import { NextResponse } from "next/server";

export async function GET() {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) {
			throw new Error("API URL not configured");
		}

		const response = await fetch(`${apiUrl}/wakatime/stats`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch WakaTime stats");
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching WakaTime stats:", error);
		return NextResponse.json(
			{ error: "Failed to fetch WakaTime stats" },
			{ status: 500 },
		);
	}
}
