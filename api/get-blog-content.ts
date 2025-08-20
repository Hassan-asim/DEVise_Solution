import { VercelRequest, VercelResponse } from "@vercel/node";
import fs from 'fs';
import path from 'path';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { slug } = request.query;

  if (!slug) {
    return response.status(400).send("Slug is required");
  }

  try {
    const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);
    const markdownContent = fs.readFileSync(filePath, 'utf8');
    
    return response.status(200).send(markdownContent);
  } catch (error) {
    console.error(error);
    return response.status(500).send("Failed to read blog post content");
  }
}