'use server';

/**
 * @fileOverview An AI agent for proofreading text.
 *
 * - proofreadText - A function that proofreads the content of a given text.
 * - ProofreadTextInput - The input type for the proofreadText function.
 * - ProofreadTextOutput - The return type for the proofreadText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProofreadTextInputSchema = z.object({
  text: z.string().describe('The text to be proofread.'),
});
export type ProofreadTextInput = z.infer<typeof ProofreadTextInputSchema>;

const ProofreadTextOutputSchema = z.object({
  proofreadText: z.string().describe('The proofread and corrected text.'),
});
export type ProofreadTextOutput = z.infer<typeof ProofreadTextOutputSchema>;

export async function proofreadText(input: ProofreadTextInput): Promise<ProofreadTextOutput> {
  return proofreadTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proofreadTextPrompt',
  input: {schema: ProofreadTextInputSchema},
  output: {schema: ProofreadTextOutputSchema},
  prompt: `You are an expert proofreader. You will be given a text and you will correct any grammar and spelling mistakes.

Original Text:
{{{text}}}

Proofread Text:`,
});

const proofreadTextFlow = ai.defineFlow(
  {
    name: 'proofreadTextFlow',
    inputSchema: ProofreadTextInputSchema,
    outputSchema: ProofreadTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
