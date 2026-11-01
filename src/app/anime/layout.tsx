import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Anime List",
	description:
		"Anime lists and stats tracked by Moehammad Joesoef Aldri (idMJA).",
	robots: { index: false, follow: false },
};

import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
