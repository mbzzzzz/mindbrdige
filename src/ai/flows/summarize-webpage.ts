'use server';

/**
 * @fileOverview An AI agent for summarizing webpages.
 *
 * - summarizeWebpage - A function that summarizes the content of a webpage.
 * - SummarizeWebpageInput - The input type for the summarizeWebpage function.
 * - SummarizeWebpageOutput - The return type for the summarizeWebpage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return summarizeWebpageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWebpagePrompt',
  input: {schema: SummarizeWebpageInputSchema},
  output: {schema: SummarizeWebpageOutputSchema},
  prompt: `You are an expert summarizer. You will be given the content of a webpage and you will summarize it.

The webpage URL is: {{{url}}}

Summarize the webpage in a {{{length}}} length summary.`,
});

const summarizeWebpageFlow = ai.defineFlow(
  {
    name: 'summarizeWebpageFlow',
    inputSchema: SummarizeWebpageInputSchema,
    outputSchema: SummarizeWebpageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
