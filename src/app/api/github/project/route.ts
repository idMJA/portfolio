import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const search = url.search || "";

		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			throw new Error("API URL not configured");
		}
		const paramUrl = `${apiUrl}/github/project${search}`;

		const response = await fetch(paramUrl, {
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch project");
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching project:", error);
		return NextResponse.json(
			{ error: "Failed to fetch project" },
			{ status: 500 },
		);
	}
}
