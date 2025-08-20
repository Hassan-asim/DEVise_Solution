import { GoogleGenerativeAI } from "@google/generative-ai";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { markdownContent } = request.body;

  if (!markdownContent) {
    return response.status(400).json({ error: "markdownContent is required" });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Please rewrite the following blog post in a more engaging and modern style.
Return the output as a JSON object with the following keys:
- "title": The title of the blog post.
- "imageUrl": A relevant image URL found on the internet.
- "introduction": A short introduction.
- "body": The main content of the blog post.
- "references": An array of objects, each with "text" and "url" keys for reference links.

Here is the original markdown content:
${markdownContent}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Attempt to parse the response as JSON
    const generatedContent = JSON.parse(text);

    return response.status(200).json(generatedContent);
  } catch (error) {
    console.error("Error generating or parsing content from Gemini:", error);
    // If parsing fails, it means Gemini didn't return valid JSON.
    // We can return the raw text for debugging, or a generic error.
    return response.status(500).json({ 
        error: "Failed to generate blog post or parse Gemini response.",
        details: (error as Error).message,
        geminiResponse: text // Include raw response for debugging
    });
  }
}