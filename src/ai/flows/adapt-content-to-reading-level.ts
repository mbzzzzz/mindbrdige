'use server';
/**
 * @fileOverview Adapts web content to a user-specified reading level.
 *
 * - adaptContentToReadingLevel - A function that adapts content to a specified reading level.
 * - AdaptContentToReadingLevelInput - The input type for the adaptContentToReadingLevel function.
 * - AdaptContentToReadingLevelOutput - The return type for the adaptContentToReadingLevel function.
 */

import { generateText } from '@/ai/gemini';
import { z } from 'zod';

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
  const parsed = AdaptContentToReadingLevelInputSchema.parse(input);
  const prompt = `You are an expert content adapter. You will rewrite the provided web content to match the reading level requested by the user.

Original Content: ${parsed.content}

Desired Reading Level: ${parsed.readingLevel}

Adapted Content:`;
  const text = await generateText(prompt);
  return { adaptedContent: text.trim() };
}
