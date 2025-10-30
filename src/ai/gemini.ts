'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = (globalThis as any)?.process?.env?.GOOGLE_API_KEY;
const MODEL_NAME = (globalThis as any)?.process?.env?.GEMINI_MODEL || 'gemini-2.5-flash';

function getClient(): GoogleGenerativeAI {
  if (!API_KEY) {
    throw new Error('Missing GOOGLE_API_KEY environment variable.');
  }
  return new GoogleGenerativeAI(API_KEY);
}

export async function generateText(prompt: string): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text ?? '';
}


