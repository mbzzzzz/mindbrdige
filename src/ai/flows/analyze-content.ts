'use server';

/**
 * @fileOverview An AI agent for analyzing content.
 *
 * - analyzeContent - A function that analyzes the content of a given text.
 * - AnalyzeContentInput - The input type for the analyzeContent function.
 * - AnalyzeContentOutput - The return type for the analyzeContent function.
 */

import { generateText } from '@/ai/gemini';
import { z } from 'zod';

const AnalyzeContentInputSchema = z.object({
  text: z.string().describe('The text to be analyzed.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  analysis: z.string().describe('The analysis of the content.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  const parsed = AnalyzeContentInputSchema.parse(input);
  const prompt = `Analyze this content for:
1. Reading difficulty level (1-10)
2. Key concepts that need explanation
3. Accessibility improvements needed
4. Best transformation approach

Content: ${parsed.text}`;
  const text = await generateText(prompt);
  return { analysis: text.trim() };
}
