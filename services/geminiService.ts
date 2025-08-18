
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

const chatConfig = {
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: `You are a friendly and professional sales assistant for a software house called "DEVise Solutions".
Your goal is to engage potential clients, understand their needs, and convince them to choose DEVise Solutions for their projects.
Services offered: AI/ML, Web/App Development, Automation, and Product Development.
Company Tagline: "Your Vision, Our Code."
Be proactive, ask questions about their project idea, and explain how DEVise can help.
After a brief interaction, gently ask for their name, email, and a summary of their request to forward to the technical team.
Keep your responses concise, friendly, and professional.
`,
        // Disable thinking for faster, more conversational responses suitable for a chatbot
        thinkingConfig: { thinkingBudget: 0 } 
    }
};

let chat: Chat | null = null;

export const startChat = (): Chat => {
    if (!chat) {
        chat = ai.chats.create(chatConfig);
    }
    return chat;
}

export const sendMessageToBot = async (message: string) => {
    const currentChat = startChat();
    return await currentChat.sendMessageStream({ message });
};
