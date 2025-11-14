import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: number): string {
	const now = Date.now();
	const elapsed = now - timestamp;
	const minutes = Math.floor(elapsed / 60000);
	const hours = Math.floor(minutes / 60);

	if (hours > 0) {
		return `${hours} hour${hours === 1 ? "" : "s"} elapsed`;
	}
	return `${minutes} minute${minutes === 1 ? "" : "s"} elapsed`;
}

export type SetCookieOptions = {
	path?: string;
	maxAge?: number;
	expires?: Date;
	secure?: boolean;
	sameSite?: "Strict" | "Lax" | "None";
};

export async function setCookie(
	name: string,
	value: string,
	options: SetCookieOptions = {},
): Promise<void> {
	// Fallback to document.cookie for environments that don't support it.
	try {
		if (typeof window !== "undefined" && "cookieStore" in window.navigator) {
			const cookieInit: Record<string, unknown> = { value };
			if (options.expires) cookieInit.expires = options.expires;
			if (options.maxAge != null) cookieInit.maxAge = options.maxAge;
			if (options.path) cookieInit.path = options.path;
			if (options.sameSite) cookieInit.sameSite = options.sameSite;
			if (options.secure) cookieInit.secure = options.secure;

			const navigatorWithCookieStore = window.navigator as unknown as {
				cookieStore?: { set: (init: Record<string, unknown>) => Promise<void> };
			};

			if (navigatorWithCookieStore.cookieStore?.set) {
				await navigatorWithCookieStore.cookieStore.set({ name, ...cookieInit });
				return;
			}
		}

		if (typeof document === "undefined") return;

		const parts: string[] = [
			`${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
		];

		if (options.path) parts.push(`path=${options.path}`);
		if (options.maxAge != null) parts.push(`max-age=${options.maxAge}`);
		if (options.expires) parts.push(`expires=${options.expires.toUTCString()}`);
		if (options.secure) parts.push("secure");
		if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);

		try {
			if (typeof window !== "undefined" && window.localStorage) {
				const payload = { value, attrs: options };
				window.localStorage.setItem(`cookie:${name}`, JSON.stringify(payload));
			}
		} catch {}
	} catch (e) {
		console.warn("setCookie failed:", e);
	}
}
