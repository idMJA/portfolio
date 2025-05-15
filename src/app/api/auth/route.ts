import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		const correctUsername = process.env.NEXT_PUBLIC_OWNER_USERNAME;
		const correctPassword = process.env.OWNER_PASSWORD;

		if (username === correctUsername && password === correctPassword) {
			// Set auth cookie
			const response = NextResponse.json({ success: true }, { status: 200 });

			// Set secure HTTP-only cookie
			response.cookies.set("owner_auth", "true", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 24, // 24 hours
			});

			return response;
		}

		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	} catch (error) {
		console.error("Auth Error:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 },
		);
	}
}
