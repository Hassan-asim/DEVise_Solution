
import { Project } from '../types';

export const fetchProjects = async (): Promise<Project[]> => {
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
		return projects.map(p => ({
			id: p.id,
			name: p.name,
			description: p.description,
			media: p.media,
			githubUrl: p.githubUrl,
			liveUrl: p.liveUrl,
			tags: p.tags,
		}));
	} catch (error) {
		console.error('Failed to fetch projects from API, falling back to empty list:', error);
		return [];
	}
};
