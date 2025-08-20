
import { VercelRequest, VercelResponse } from "@vercel/node";
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateAndSaveBlog(slug: string) {
  const markdownFilePath = path.join(process.cwd(), 'blog', `${slug}.md`);
  const generatedFilePath = path.join('/tmp', `${slug}.json`);

  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');

  const prompt = `Please rewrite the following blog post in a more engaging and modern style.
Return the output as a JSON object inside a markdown code block with the language set to json.
Ensure all string values within the JSON are properly escaped according to JSON standards.
- "title": The title of the blog post.
- "imageUrl": A relevant image URL found on the internet.
- "introduction": A short introduction.
- "body": The main content of the blog post, formatted as a single Markdown string.
- "references": An array of objects, each with "text" and "url" keys for reference links.

Here is the original markdown content:
${markdownContent}`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = text.match(jsonRegex);

  if (!match || !match[1]) {
    throw new Error("Could not find valid JSON block in Gemini's response.");
  }

  const jsonString = match[1];
    let cleanedJsonString = jsonString.replace(/\n/g, '\n')
                                    .replace(/\t/g, '\t')
                                    .replace(/\r/g, '\r')
                                    .replace(/(?<!"))/g, '"')
                                    .replace(/(?<!")/g, '');
  const generatedContent = JSON.parse(cleanedJsonString);

  fs.writeFileSync(generatedFilePath, JSON.stringify(generatedContent, null, 2), 'utf8');

  return generatedContent;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { slug } = request.query;

  if (!slug || typeof slug !== 'string') {
    return response.status(400).send("Slug is required");
  }

  try {
    const generatedFilePath = path.join('/tmp', `${slug}.json`);

    if (fs.existsSync(generatedFilePath)) {
      const cachedContent = fs.readFileSync(generatedFilePath, 'utf8');
      return response.status(200).json(JSON.parse(cachedContent));
    } else {
      const generatedContent = await generateAndSaveBlog(slug);
      return response.status(200).json(generatedContent);
    }
  } catch (error) {
    console.error("Error in get-blog-content handler:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return response.status(500).send(`Failed to process blog post: ${errorMessage}`);
  }
}
