export type SearchParams = Record<string, string | string[] | undefined>;

export interface PageProps {
	params: Promise<{ [key: string]: string | string[] }>;
	searchParams: Promise<SearchParams>;
}

export interface ClientPageProps {
	params: { [key: string]: string | string[] };
	searchParams: SearchParams;
}
