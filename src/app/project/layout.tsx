import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Projects by Moehammad Joesoef Aldri (idMJA / MJBA): web apps, Discord bots, and tools built with Next.js, TypeScript, and Tailwind CSS.",
	robots: { index: true, follow: true },
};

import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
