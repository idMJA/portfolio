import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const search = url.search || "";

		const paramUrl = `${process.env.NEXT_PUBLIC_API_URL}/github/project${search}`;

		const response = await fetch(paramUrl, {
			headers: {
				"Content-Type": "application/json",
			},
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
