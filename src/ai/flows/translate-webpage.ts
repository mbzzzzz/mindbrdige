'use server';

/**
 * @fileOverview A webpage translation AI agent.
 *
 * - translateWebpage - A function that handles the webpage translation process.
 * - TranslateWebpageInput - The input type for the translateWebpage function.
 * - TranslateWebpageOutput - The return type for the translateWebpage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return translateWebpageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateWebpagePrompt',
  input: {schema: TranslateWebpageInputSchema},
  output: {schema: TranslateWebpageOutputSchema},
  prompt: `Translate the following text into {{{targetLanguage}}}.\n\n{{{text}}} `,
});

const translateWebpageFlow = ai.defineFlow(
  {
    name: 'translateWebpageFlow',
    inputSchema: TranslateWebpageInputSchema,
    outputSchema: TranslateWebpageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
