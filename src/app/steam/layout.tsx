import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Steam Profile",
	description: "Steam profile and recent games for Moehammad Joesoef Aldri.",
	robots: { index: false, follow: false },
};

import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
