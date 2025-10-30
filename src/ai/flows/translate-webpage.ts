'use server';

/**
 * @fileOverview A webpage translation AI agent.
 *
 * - translateWebpage - A function that handles the webpage translation process.
 * - TranslateWebpageInput - The input type for the translateWebpage function.
 * - TranslateWebpageOutput - The return type for the translateWebpage function.
 */

import { generateText } from '@/ai/gemini';
import { z } from 'zod';

const TranslateWebpageInputSchema = z.object({
  text: z.string().describe('The text content of the webpage to translate.'),
  targetLanguage: z.string().describe('The target language for the translation.'),
});
export type TranslateWebpageInput = z.infer<typeof TranslateWebpageInputSchema>;

const TranslateWebpageOutputSchema = z.object({
  translatedText: z.string().describe('The translated text content of the webpage.'),
});
export type TranslateWebpageOutput = z.infer<typeof TranslateWebpageOutputSchema>;

export async function translateWebpage(input: TranslateWebpageInput): Promise<TranslateWebpageOutput> {
  const parsed = TranslateWebpageInputSchema.parse(input);
  const prompt = `Translate the following text into ${parsed.targetLanguage}.

${parsed.text}`;
  const text = await generateText(prompt);
  return { translatedText: text.trim() };
}
