import { VercelRequest, VercelResponse } from "@vercel/node";
import fs from 'fs';
import path from 'path';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const blogDirectory = path.join(process.cwd(), 'blog');
    const files = fs.readdirSync(blogDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    response.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    return response.status(200).json({ files: markdownFiles });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to list blog posts" });
  }
}