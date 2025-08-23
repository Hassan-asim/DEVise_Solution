
import { Project } from '../types';

const CACHE_KEY = 'projects-cache-v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function readClientCache(): Project[] | null {
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || !parsed.timestamp || !parsed.payload) return null;
		if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
		return parsed.payload as Project[];
	} catch {
		return null;
	}
}

function writeClientCache(payload: Project[]): void {
	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), payload }));
	} catch {
		// ignore
	}
}

export const fetchProjects = async (): Promise<Project[]> => {
	// client cache first
	const cached = readClientCache();
	if (cached) return cached;

	try {
		const response = await fetch('/api/list-projects');
		if (!response.ok) {
			throw new Error(await response.text());
		}
		const data = await response.json();
		const projects = (data.projects || []) as Array<{
			id: number;
			name: string;
			description: string;
			media: string[];
			githubUrl: string;
			liveUrl?: string;
			tags: string[];
		}>;
		const mapped = projects.map(p => ({
			id: p.id,
			name: p.name,
			description: p.description,
			media: p.media,
			githubUrl: p.githubUrl,
			liveUrl: p.liveUrl,
			tags: p.tags,
		}));
		writeClientCache(mapped);
		return mapped;
	} catch (error) {
		console.error('Failed to fetch projects from API, falling back to empty list:', error);
		return [];
	}
};
