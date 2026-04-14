import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

export async function askStudyAssistant(question: string, context: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `You are an expert LLM/AI engineering study assistant. The user is currently studying: ${context}

Answer concisely and technically. Use markdown formatting for code blocks and lists.

Question: ${question}`,
  });
  return response.text ?? 'No response generated.';
}

export function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
}
