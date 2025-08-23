import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from 'node-fetch';
import fs from 'fs';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

interface ProjectOut {
  id: number;
  name: string;
  description: string;
  media: string[];
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Hassan-asim';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // optional for higher rate limits
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // optional for summarization/title

const CACHE_FILE = '/tmp/projects-cache.json';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

const EXCLUDE_NAMES = new Set<string>(['DEVise_Solution', 'Hassan-asim']);
const EXCLUDE_URLS = new Set<string>([
  'https://github.com/Hassan-asim/DEVise_Solution',
  'https://github.com/Hassan-asim/DEVise_Solution.git',
  'https://github.com/Hassan-asim/Hassan-asim',
  'https://github.com/Hassan-asim/Hassan-asim.git',
]);

async function fetchRepos(): Promise<Repo[]> {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, {
    headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}`, 'User-Agent': 'devise-solutions-app' } : { 'User-Agent': 'devise-solutions-app' }
  });
  if (!res.ok) {
    throw new Error(`GitHub API failed: ${res.status} ${await res.text()}`);
  }
  const repos: Repo[] = await res.json();
  return repos.filter(r => !EXCLUDE_NAMES.has(r.name) && !EXCLUDE_URLS.has(r.html_url));
}

function basicTitleFromRepoName(repoName: string): string {
  const cleaned = repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\b(repo|app|project|service|api)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function generateTitle(name: string, description: string | null): Promise<string> {
  const fallback = basicTitleFromRepoName(name) || name;
  if (!GEMINI_API_KEY) return fallback;
  try {
    const prompt = `You are naming a software project for a portfolio card. Return ONLY ONE short, catchy Title Case name (3-6 words). Do not include bullets, numbering, quotes, code fences, or multiple options. Avoid generic words like Repo/App/Project.\n\nRepo name: ${name}\nDescription: ${description || ''}`;
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!resp.ok) throw new Error(await resp.text());
    const data = await resp.json();
    const text: string = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
    const singleLine = text.split('\n')[0].replace(/^[-*\d.\s]+/, '').replace(/"/g, '').trim();
    return singleLine || fallback;
  } catch {
    return fallback;
  }
}

async function summarize(name: string, description: string | null): Promise<string> {
  const base = description && description.trim().length > 0
    ? description
    : `Repository ${name} from ${GITHUB_USERNAME}.`;

  if (!GEMINI_API_KEY) {
    return base;
  }

  try {
    const prompt = `Write a concise, friendly 1-2 sentence description for a portfolio card based on this repository. Focus on outcomes and tech if mentioned.` +
      ` Return a single paragraph, no lists or markdown.\n\nRepo name: ${name}\nDetails: ${base}`;
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!resp.ok) throw new Error(await resp.text());
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || base;
    return text.replace(/\n+/g, ' ').trim();
  } catch {
    return base;
  }
}

function pickTags(name: string, description: string): string[] {
  const text = `${name} ${description}`.toLowerCase();
  const tags = new Set<string>();
  if (/(react|vite|next|typescript|javascript)/.test(text)) tags.add('Web');
  if (/(node|api|express|server)/.test(text)) tags.add('Backend');
  if (/(ai|ml|model|gemini|pytorch|tensorflow)/.test(text)) tags.add('AI/ML');
  if (/(mobile|react native|android|ios)/.test(text)) tags.add('Mobile');
  return Array.from(tags).length ? Array.from(tags) : ['Project'];
}

function unsplashFor(name: string, title: string, tags: string[], description?: string): string {
  const baseKeywords = ['software', 'programming', 'developer', 'code', 'technology', 'app', 'web', 'digital', 'tech'];
  const tagKeywords = tags.map(t => t.toLowerCase());
  const words = `${title} ${name} ${description || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6); // limit noise
  const all = Array.from(new Set([...words, ...tagKeywords, ...baseKeywords]));
  const q = encodeURIComponent(all.join(','));
  return `https://source.unsplash.com/featured/800x600?${q}`;
}

function readCache(): { timestamp: number; payload: ProjectOut[] } | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const raw = fs.readFileSync(CACHE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeCache(payload: ProjectOut[]): void {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), payload }), 'utf8');
  } catch {
    // ignore
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // try cache first
    const cached = readCache();
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
      return res.status(200).json({ projects: cached.payload });
    }

    const repos = await fetchRepos();

    const projects: ProjectOut[] = [];
    for (const repo of repos) {
      const title = await generateTitle(repo.name, repo.description);
      const summary = await summarize(repo.name, repo.description);
      const tags = pickTags(title, summary);
      projects.push({
        id: repo.id,
        name: title,
        description: summary,
        media: [unsplashFor(repo.name, title, tags, summary)],
        githubUrl: repo.html_url,
        tags,
      });
    }

    writeCache(projects);

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    return res.status(200).json({ projects });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Failed to list projects' });
  }
}
