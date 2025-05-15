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
