import Image from "next/image";
import DiscordStatus from "@/components/DiscordStatus";

const techData: {
	name: string;
	url: string;
	icon: string;
	goSkill?: boolean;
}[][] = [
	[
		{
			name: "HTML",
			url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
			icon: "html",
		},
		{
			name: "CSS",
			url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
			icon: "css",
		},
		{ name: "React", url: "https://reactjs.org/", icon: "react" },
		{ name: "Next.js", url: "https://nextjs.org/", icon: "nextjs" },
		{ name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: "tailwind" },
		{
			name: "Shadcn UI",
			url: "https://ui.shadcn.com/",
			icon: "shadcn",
			goSkill: true,
		},
	],
	[
		{ name: "Express", url: "https://expressjs.com/", icon: "express" },
		{
			name: "Elysia",
			url: "https://elysiajs.com/",
			icon: "elysia",
			goSkill: true,
		},
		{ name: "Hono", url: "https://hono.dev/", icon: "hono", goSkill: true },
	],
	[
		{
			name: "JavaScript",
			url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
			icon: "js",
		},
		{ name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "ts" },
		{ name: "Java", url: "https://www.java.com/", icon: "java" },
		{ name: "Go", url: "https://go.dev/", icon: "go" },
		{ name: "Rust", url: "https://www.rust-lang.org/", icon: "rust" },
		{ name: "Python", url: "https://python.org/", icon: "py" },
	],
	[
		{ name: "Node.js", url: "https://nodejs.org/", icon: "nodejs" },
		{ name: "Bun", url: "https://bun.com/", icon: "bun" },
		{ name: "Git", url: "https://git-scm.com/", icon: "git" },
		{ name: "Docker", url: "https://www.docker.com/", icon: "docker" },
		{
			name: "GitHub Actions",
			url: "https://github.com/features/actions",
			icon: "githubactions",
		},
		{ name: "Vercel", url: "https://vercel.com/", icon: "vercel" },
		{ name: "Linux", url: "https://www.linux.org/", icon: "linux" },
		{
			name: "Windows",
			url: "https://www.microsoft.com/windows",
			icon: "windows",
		},
	],
	[
		{ name: "VS Code", url: "https://code.visualstudio.com/", icon: "vscode" },
		{
			name: "IntelliJ IDEA",
			url: "https://www.jetbrains.com/idea/",
			icon: "idea",
		},
		{ name: "GitHub", url: "https://github.com/", icon: "github" },
		{ name: "Postman", url: "https://www.postman.com/", icon: "postman" },
		{
			name: "Android Studio",
			url: "https://developer.android.com/studio",
			icon: "androidstudio",
		},
		{
			name: "DataGrip",
			url: "https://www.jetbrains.com/datagrip/",
			icon: "datagrip",
			goSkill: true,
		},
		{
			name: "Biome",
			url: "https://biomejs.dev/",
			icon: "biome",
			goSkill: true,
		},
	],
	[
		{ name: "Turso", url: "https://turso.tech/", icon: "turso", goSkill: true },
		{ name: "MySQL", url: "https://www.mysql.com/", icon: "mysql" },
		{ name: "Prisma", url: "https://www.prisma.io/", icon: "prisma" },
		{
			name: "Drizzle",
			url: "https://orm.drizzle.team/",
			icon: "drizzle",
			goSkill: true,
		},
		{
			name: "PostgreSQL",
			url: "https://www.postgresql.org/",
			icon: "postgresql",
		},
		{
			name: "LibSQL",
			url: "https://docs.turso.tech/libsql",
			icon: "libsql",
			goSkill: true,
		},
		{ name: "MongoDB", url: "https://www.mongodb.com/", icon: "mongodb" },
	],
];

const sectionTitles = [
	"Web Development",
	"Backend",
	"Languages",
	"Ecosystem & Devops",
	"Toolstack",
	"Databases & ORM",
];

function TechIcon({ tech }: { tech: (typeof techData)[number][number] }) {
	return (
		<a
			href={tech.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group bg-muted/50 p-2 rounded-md transition-all hover:bg-muted/80 hover:-translate-y-0.5"
			aria-label={tech.name}
		>
			<Image
				src={
					tech.goSkill
						? `https://go-skill-icons.vercel.app/api/icons?i=${tech.icon}`
						: `https://skillicons.dev/icons?i=${tech.icon}`
				}
				alt={tech.name}
				width={28}
				height={28}
				unoptimized
				className="transition-transform group-hover:scale-110"
			/>
		</a>
	);
}

export default function Home() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
			<section className="relative mb-16">
				<span
					aria-hidden
					className="jp-watermark absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[11rem] md:text-[15rem]"
				>
					開発者
				</span>
				<div className="relative">
					<h1 className="text-3xl md:text-5xl font-semibold tracking-display text-foreground mb-3">
						MJ builds web apps and server systems.
					</h1>
					<p className="text-foreground/80 text-[15px] leading-relaxed max-w-[65ch] mb-10">
						Developer in Banda Aceh. TypeScript, Next.js, and Linux at the core.
						Mostly building Discord bots and small web tools.
					</p>

					<div className="flex gap-3">
						<a href="/project" className="btn-primary text-sm">
							Projects
						</a>
						<a
							href="https://github.com/idMJA"
							className="btn-ghost text-sm"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
					</div>
				</div>
			</section>

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-16">
				<div className="card-modern p-6">
					<p className="text-xs text-foreground/70 font-mono-geist uppercase tracking-wide mb-3">
						Currently
					</p>
					<p className="text-foreground/90 leading-relaxed text-[15px]">
						Primary stack: TypeScript, Next.js, Tailwind CSS, and Linux
						administration. Backend work with Node.js, Elysia, and Hono.
						Currently maintaining Discord bots, small web tools, and a few
						Debian servers.
					</p>
				</div>

				<div className="card-modern p-5">
					<p className="text-xs text-foreground/70 font-mono-geist uppercase tracking-wide mb-3">
						Discord
					</p>
					<DiscordStatus />
				</div>
			</div>

			<section>
				<h2 className="text-xl md:text-2xl font-semibold tracking-heading text-foreground mb-6">
					Stack
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{techData.map((group, idx) => (
						<div key={sectionTitles[idx]} className="card-modern p-5">
							<h3 className="text-xs text-foreground/80 font-mono-geist uppercase tracking-wide mb-4">
								{sectionTitles[idx]}
							</h3>
							<div className="flex flex-wrap gap-2">
								{group.map((tech) => (
									<TechIcon key={tech.name} tech={tech} />
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
