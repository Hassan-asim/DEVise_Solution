import { GoogleGenerativeAI } from "@google/generative-ai";
import { VercelRequest, VercelResponse } from "@vercel/node";
import fs from 'fs';
import path from 'path';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { markdownContent } = request.body;

  if (!markdownContent) {
    return response.status(400).json({ error: "markdownContent is required" });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" }); // Changed model name

  const prompt = `Rewrite the following blog post in a more engaging and modern style. Add a title, a short introduction, and a conclusion. Also, find a relevant image on the internet and provide the URL. Finally, add some reference links to relevant websites.

${markdownContent}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // This is a simplified way to parse the generated text.
    // In a real application, you would want to use a more robust parsing method.
    const lines = text.split('\n');
    const title = lines[0].replace('Title: ', '');
    const imageUrl = lines[1].replace('Image URL: ', '');
    const introduction = lines.slice(3, lines.indexOf('---')).join('\n');
    const body = lines.slice(lines.indexOf('---') + 1, lines.indexOf('References:')).join('\n');
    const references = lines.slice(lines.indexOf('References:') + 1).map(line => {
        const [text, url] = line.split('](');
        return { text: text.replace('[', ''), url: url.replace(')', '') };
    });

    return response.status(200).json({
        title,
        imageUrl,
        introduction,
        body,
        references
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to generate blog post" });
  }
}