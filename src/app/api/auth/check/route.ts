import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
	const cookieStore = await cookies();
	const ownerAuth = cookieStore.get("owner_auth");

	if (ownerAuth?.value === "true") {
		return new NextResponse(null, { status: 200 });
	}

	return new NextResponse(null, { status: 401 });
}
