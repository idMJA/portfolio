import { type NextRequest, NextResponse } from "next/server";

interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	topics: string[];
	updated_at: string;
	created_at: string;
	pushed_at: string;
	archived: boolean;
	fork: boolean;
}

export async function GET(request: NextRequest) {
	const url = request.nextUrl;
	const searchParams = url.searchParams;
	const reposParam = searchParams.getAll("repos");

	if (reposParam && reposParam.length > 0) {
		// User provides repo URLs directly
		const repoUrls = reposParam.flatMap((r: string) =>
			r
				.split(",")
				.map((s: string) => s.trim())
				.filter(Boolean),
		);
		const repoApiUrls = repoUrls
			.map((url: string) => {
				const match = url.match(/github.com\/(.+?)\/(.+?)(?:$|\/|\?)/);
				if (!match) return null;
				const owner = match[1];
				const repo = match[2];
				return `https://api.github.com/repos/${owner}/${repo}`;
			})
			.filter((v: string | null): v is string => typeof v === "string" && !!v);

		const headers: HeadersInit = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "Portfolio-App",
		};

		const results = await Promise.all(
			repoApiUrls.map(async (apiUrl: string) => {
				try {
					const res = await fetch(apiUrl, { headers });
					if (!res.ok) return null;
					const repo = await res.json();
					return {
						id: repo.id,
						name: repo.name,
						description: repo.description || "No description available",
						githubUrl: repo.html_url,
						demoUrl: repo.homepage || null,
						stars: repo.stargazers_count,
						forks: repo.forks_count,
						language: repo.language || "Unknown",
						topics: repo.topics || [],
						updatedAt: repo.updated_at,
						createdAt: repo.created_at,
					};
				} catch {
					return null;
				}
			}),
		);

		const projects = results.filter(Boolean);
		return NextResponse.json({
			success: true,
			projects,
			totalCount: projects.length,
		});
	}

	const username = searchParams.get("username"); // Default username
	const limit = Number.parseInt(searchParams.get("limit") || "10");

	try {
		const headers: HeadersInit = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "Portfolio-App",
		};

		// Fetch user repositories
		const reposResponse = await fetch(
			`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
			{
				headers,
				next: { revalidate: 300 }, // Cache for 5 minutes
			},
		);

		if (!reposResponse.ok) {
			if (reposResponse.status === 404) {
				return NextResponse.json(
					{
						success: false,
						error: `User '${username}' not found`,
						projects: [],
					},
					{ status: 404 },
				);
			}
			throw new Error(`GitHub API error: ${reposResponse.status}`);
		}

		const allRepos: GitHubRepo[] = await reposResponse.json();

		// Filter out forked and archived repositories
		const ownRepos = allRepos.filter((repo) => !repo.fork && !repo.archived);

		// Show most recent repos
		const filteredRepos = ownRepos
			.sort(
				(a, b) =>
					new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
			)
			.slice(0, limit);

		// Transform the data for the frontend
		const projects = filteredRepos.map((repo) => ({
			id: repo.id,
			name: repo.name,
			description:
				repo.description || `A ${repo.language || "software"} project`,
			githubUrl: repo.html_url,
			demoUrl: repo.homepage || null,
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			language: repo.language || "Unknown",
			topics: repo.topics || [],
			updatedAt: repo.updated_at,
			createdAt: repo.created_at,
		}));

		return NextResponse.json({
			success: true,
			projects,
			totalCount: projects.length,
			username,
		});
	} catch (error) {
		console.error("Error fetching GitHub data:", error);

		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch GitHub data",
				projects: [],
				username,
			},
			{ status: 500 },
		);
	}
}
