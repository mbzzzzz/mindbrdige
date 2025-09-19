'use server';

/**
 * @fileOverview An AI agent for analyzing content.
 *
 * - analyzeContent - A function that analyzes the content of a given text.
 * - AnalyzeContentInput - The input type for the analyzeContent function.
 * - AnalyzeContentOutput - The return type for the analyzeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentInputSchema = z.object({
  text: z.string().describe('The text to be analyzed.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  analysis: z.string().describe('The analysis of the content.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `Analyze this content for:
1. Reading difficulty level (1-10)
2. Key concepts that need explanation
3. Accessibility improvements needed
4. Best transformation approach

Content: {{{text}}}`,
});

const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
