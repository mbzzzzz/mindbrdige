'use server';

/**
 * @fileOverview An AI agent for explaining concepts in a text.
 *
 * - explainConcepts - A function that explains concepts in a given text.
 * - ExplainConceptsInput - The input type for the explainConcepts function.
 * - ExplainConceptsOutput - The return type for the explainConcepts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptsInputSchema = z.object({
  text: z.string().describe('The text with concepts to be explained.'),
});
export type ExplainConceptsInput = z.infer<typeof ExplainConceptsInputSchema>;

const ExplainConceptsOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the concepts.'),
});
export type ExplainConceptsOutput = z.infer<typeof ExplainConceptsOutputSchema>;

export async function explainConcepts(input: ExplainConceptsInput): Promise<ExplainConceptsOutput> {
  return explainConceptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptsPrompt',
  input: {schema: ExplainConceptsInputSchema},
  output: {schema: ExplainConceptsOutputSchema},
  prompt: `Generate simple explanations for complex terms in: {{{text}}}
Include examples and analogies for better understanding.`,
});

const explainConceptsFlow = ai.defineFlow(
  {
    name: 'explainConceptsFlow',
    inputSchema: ExplainConceptsInputSchema,
    outputSchema: ExplainConceptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
