import Image from "next/image";
import DiscordStatus from "@/components/DiscordStatus";

export default function Home() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-4 md:py-6 max-w-7xl">
			<section className="mb-8 md:mb-12">
				<h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
					<span className="text-pink-500">About</span>
					<span className="text-white"> Me</span>
				</h1>

				<div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
					<div className="flex-1 space-y-4">
						<h3 className="text-lg md:text-xl">
							Discord Bot & Frontend Developer
						</h3>

						<p className="text-gray-300 leading-relaxed">
							I am not a Discord Bot Developer and a beginner Frontend Developer
							who enjoys creating discord bots and websites maybe? I like to
							create weird and somewhat different things, sorry I&apos;m still a
							beginner.
						</p>

						<p className="text-gray-300 leading-relaxed">
							My favorite Programming Languages are JavaScript and TypeScript. I
							also like to build websites using Next.JS, and Tailwind CSS. For
							Discord Bots I like to create using Discord.JS and Seyfert as the library.
						</p>
					</div>

					<div className="w-full lg:w-[400px] flex-shrink-0">
						<DiscordStatus />
					</div>
				</div>
			</section>

			<section>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
					{/* Frontend */}
					<div className="bg-zinc-900/50 p-4 md:p-6 rounded-lg">
						<h4 className="text-lg font-medium text-zinc-300 mb-4 tracking-wide">
							Frontend
						</h4>
						<div className="flex flex-wrap gap-2">
							<a
								href="https://reactjs.org/"
								target="_blank"
								rel="noopener noreferrer"
								className="group"
							>
								<Image
									src="https://skillicons.dev/icons?i=react"
									alt="React"
									width={40}
									height={40}
									unoptimized
									className="transition-transform group-hover:scale-110"
								/>
							</a>
							<a
								href="https://nextjs.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=nextjs"
									alt="Next.js"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://tailwindcss.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=tailwind"
									alt="Tailwind CSS"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.typescriptlang.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=ts"
									alt="TypeScript"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
						</div>
					</div>

					{/* Backend */}
					<div className="bg-zinc-900/50 p-4 md:p-6 rounded-lg">
						<h4 className="text-lg font-medium text-zinc-300 mb-4 tracking-wide">
							Backend
						</h4>
						<div className="flex flex-wrap gap-2">
						<a
								href="https://www.java.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=java"
									alt="Java"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.rust-lang.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=rust"
									alt="Rust"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.python.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=py"
									alt="Python"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.mysql.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=mysql"
									alt="MySQL"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.prisma.io/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=prisma"
									alt="Prisma"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
						</div>
					</div>

					{/* Tools */}
					<div className="bg-zinc-900/50 p-4 md:p-6 rounded-lg">
						<h4 className="text-lg font-medium text-zinc-300 mb-4 tracking-wide">
							Tools
						</h4>
						<div className="flex flex-wrap gap-2">
						<a
								href="https://bun.sh/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=bun"
									alt="Bun"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://nodejs.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=nodejs"
									alt="Node.js"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://git-scm.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=git"
									alt="Git"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://code.visualstudio.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=vscode"
									alt="VS Code"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://vercel.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=vercel"
									alt="Vercel"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.jetbrains.com/idea/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=idea"
									alt="IntelliJ IDEA"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
						</div>
					</div>

					{/* Discord */}
					<div className="bg-zinc-900/50 p-4 md:p-6 rounded-lg">
						<h4 className="text-lg font-medium text-zinc-300 mb-4 tracking-wide">
							Discord
						</h4>
						<div className="flex flex-wrap gap-2">
							<a
								href="https://discord.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=discord"
									alt="Discord"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://seyfert.dev/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="/Seyfert.svg"
									alt="Seyfert"
									width={40}
									height={40}
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://discord.js.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=discordjs"
									alt="Discord.js"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=js"
									alt="JavaScript"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
							<a
								href="https://www.typescriptlang.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="https://skillicons.dev/icons?i=ts"
									alt="TypeScript"
									width={40}
									height={40}
									unoptimized
									className="transition-transform hover:scale-110"
								/>
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
