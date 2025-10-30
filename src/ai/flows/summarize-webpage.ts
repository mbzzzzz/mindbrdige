'use server';

/**
 * @fileOverview An AI agent for summarizing webpages.
 *
 * - summarizeWebpage - A function that summarizes the content of a webpage.
 * - SummarizeWebpageInput - The input type for the summarizeWebpage function.
 * - SummarizeWebpageOutput - The return type for the summarizeWebpage function.
 */

import { generateText } from '@/ai/gemini';
import { z } from 'zod';

const SummarizeWebpageInputSchema = z.object({
  url: z.string().describe('The URL of the webpage to summarize.'),
  length: z.enum(['short', 'medium', 'long']).default('short').describe('The desired length of the summary.'),
});
export type SummarizeWebpageInput = z.infer<typeof SummarizeWebpageInputSchema>;

const SummarizeWebpageOutputSchema = z.object({
  summary: z.string().describe('The summary of the webpage.'),
});
export type SummarizeWebpageOutput = z.infer<typeof SummarizeWebpageOutputSchema>;

export async function summarizeWebpage(input: SummarizeWebpageInput): Promise<SummarizeWebpageOutput> {
  const parsed = SummarizeWebpageInputSchema.parse(input);
  const prompt = `You are an expert summarizer. Summarize the content found at URL in a ${parsed.length} summary.

URL: ${parsed.url}`;
  const text = await generateText(prompt);
  return { summary: text.trim() };
}
