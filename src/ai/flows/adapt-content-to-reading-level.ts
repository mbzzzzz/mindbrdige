'use server';
/**
 * @fileOverview Adapts web content to a user-specified reading level.
 *
 * - adaptContentToReadingLevel - A function that adapts content to a specified reading level.
 * - AdaptContentToReadingLevelInput - The input type for the adaptContentToReadingLevel function.
 * - AdaptContentToReadingLevelOutput - The return type for the adaptContentToReadingLevel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptContentToReadingLevelInputSchema = z.object({
  content: z.string().describe('The web content to be adapted.'),
  readingLevel: z
    .string()
    .describe(
      'The desired reading level for the content (e.g., elementary, middle school, high school, general audience).'
    ),
});
export type AdaptContentToReadingLevelInput = z.infer<
  typeof AdaptContentToReadingLevelInputSchema
>;

const AdaptContentToReadingLevelOutputSchema = z.object({
  adaptedContent: z
    .string()
    .describe('The web content adapted to the specified reading level.'),
});
export type AdaptContentToReadingLevelOutput = z.infer<
  typeof AdaptContentToReadingLevelOutputSchema
>;

export async function adaptContentToReadingLevel(
  input: AdaptContentToReadingLevelInput
): Promise<AdaptContentToReadingLevelOutput> {
  return adaptContentToReadingLevelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptContentToReadingLevelPrompt',
  input: {schema: AdaptContentToReadingLevelInputSchema},
  output: {schema: AdaptContentToReadingLevelOutputSchema},
  prompt: `You are an expert content adapter. You will rewrite the provided web content to match the reading level requested by the user.

Original Content: {{{content}}}

Desired Reading Level: {{{readingLevel}}}

Adapted Content:`, //Crucially important: this prompt must end with `Adapted Content:` and nothing else
});

const adaptContentToReadingLevelFlow = ai.defineFlow(
  {
    name: 'adaptContentToReadingLevelFlow',
    inputSchema: AdaptContentToReadingLevelInputSchema,
    outputSchema: AdaptContentToReadingLevelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
