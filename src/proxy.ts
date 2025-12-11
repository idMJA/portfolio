import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const origin = request.headers.get("origin") || "";

	if (request.method === "OPTIONS") {
		return new NextResponse(null, {
			status: 204,
			headers: {
				"Access-Control-Allow-Origin": origin,
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
				"Access-Control-Max-Age": "86400",
			},
		});
	}

	const response = NextResponse.next();

	response.headers.set("Access-Control-Allow-Origin", origin);
	response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	response.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization",
	);

	return response;
}

export const config = {
	matcher: ["/api/:path*"],
};
