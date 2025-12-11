"use client";
import { ExternalLink, GitFork, Github, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const repoLinks = [
	"https://github.com/idMJA/Soundy",
	"https://github.com/idMJA/Soundy-Dashboard",
	"https://github.com/idMJA/portfolio",
	"https://github.com/idMJA/portfolio-api",
	"https://github.com/idMJA/accessify",
	"https://github.com/idMJA/secretify",
	"https://github.com/idMJA/LavaTools",
	"https://github.com/idMJA/qwesty",
	"https://github.com/idMJA/LinkUp",
	"https://github.com/idMJA/AgroHygra",
	"https://github.com/idMJA/lang-bench",
	"https://github.com/idMJA/WApi",
	"https://github.com/idMJA/youtube-trusted-session-generator",
];

type Project = {
	id: number;
	name: string;
	description: string;
	githubUrl: string;
	demoUrl: string | null;
	stars: number;
	forks: number;
	language: string;
	topics: string[];
	updatedAt: string;
	createdAt: string;
};

// Language color fallback is handled server-side in the projects API route.

function SkeletonCard() {
	return (
		<Card className="bg-gray-900/50 border-gray-800 animate-pulse">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="space-y-2 flex-1">
						<div className="h-6 w-32 bg-gray-700 rounded mb-2" />
						<div className="h-4 w-20 bg-gray-800 rounded" />
					</div>
					<div className="flex gap-2">
						<div className="h-8 w-8 bg-gray-800 rounded-lg" />
						<div className="h-8 w-8 bg-gray-800 rounded-lg" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-0 space-y-4">
				<div className="h-4 w-full bg-gray-800 rounded" />
				<div className="flex gap-2">
					<div className="h-6 w-16 bg-gray-800 rounded-full" />
					<div className="h-6 w-12 bg-gray-800 rounded-full" />
				</div>
				<div className="flex gap-4 pt-2 border-t border-gray-800">
					<div className="h-4 w-10 bg-gray-800 rounded" />
					<div className="h-4 w-10 bg-gray-800 rounded" />
				</div>
			</CardContent>
		</Card>
	);
}

export default function ProjectPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [languageColors, setLanguageColors] = useState<Record<string, string>>(
		{},
	);

	useEffect(() => {
		async function fetchProjects() {
			const params = repoLinks
				.map((url) => `repos=${encodeURIComponent(url)}`)
				.join("&");
			const res = await fetch(`/api/github/project?${params}`);
			if (!res.ok) {
				setProjects([]);
				setLoading(false);
				return;
			}
			const data = await res.json();
			setProjects(data.projects || []);
			setLanguageColors(data.languageColors || {});
			setLoading(false);
		}
		fetchProjects();
	}, []);

	function getColor(language: string) {
		return languageColors[language];
	}

	return (
		<div className="container mx-auto px-4 md:px-8 py-4 md:py-6 max-w-7xl">
			<div className="mb-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide text-white">
					My Projects
				</h1>
				<p className="text-gray-300 text-lg">
					A collection of projects I&apos;ve worked on, showcasing various
					technologies and skills.
				</p>
			</div>

			{loading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: repoLinks.length }).map((_, i) => (
						<SkeletonCard key={repoLinks[i]} />
					))}
				</div>
			) : projects.length === 0 ? (
				<div className="text-center text-gray-400 text-lg py-12">
					No projects found.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project) => (
						<Card
							key={project.id}
							className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
						>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="space-y-1.5 flex-1">
										<CardTitle className="text-white text-xl font-semibold">
											{project.name}
										</CardTitle>
										<div className="flex items-center gap-2 text-sm text-gray-400">
											<span className="flex items-center gap-1">
												<div
													className="w-3 h-3 rounded-full"
													style={{
														backgroundColor: getColor(project.language),
													}}
												/>
												{project.language}
											</span>
										</div>
									</div>
									<div className="flex gap-2">
										<Link
											href={project.githubUrl}
											target="_blank"
											className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
										>
											<Github className="w-4 h-4" />
										</Link>
										{project.demoUrl && (
											<Link
												href={project.demoUrl}
												target="_blank"
												className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
											>
												<ExternalLink className="w-4 h-4" />
											</Link>
										)}
									</div>
								</div>
							</CardHeader>

							<CardContent className="pt-0 space-y-4">
								<CardDescription className="text-gray-300 text-sm leading-relaxed">
									{project.description}
								</CardDescription>

								{project.topics && project.topics.length > 0 && (
									<div>
										<h4 className="text-sm font-medium text-gray-200 mb-2">
											Topics
										</h4>
										<div className="flex flex-wrap gap-1.5">
											{project.topics.map((topic) => (
												<Badge
													key={topic}
													variant="outline"
													className="text-xs px-2 py-0.5 border-gray-600 text-gray-400"
												>
													{topic}
												</Badge>
											))}
										</div>
									</div>
								)}

								<div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-t border-gray-800">
									<span className="flex items-center gap-1">
										<Star className="w-3 h-3" />
										{project.stars}
									</span>
									<span className="flex items-center gap-1">
										<GitFork className="w-3 h-3" />
										{project.forks}
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			<div className="mt-12 text-center">
				<Link
					href="https://github.com/idMJA"
					target="_blank"
					className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
				>
					<Github className="w-5 h-5" />
					View More on GitHub
				</Link>
			</div>
		</div>
	);
}
