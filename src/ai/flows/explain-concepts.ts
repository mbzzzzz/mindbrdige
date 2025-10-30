'use server';

/**
 * @fileOverview An AI agent for explaining concepts in a text.
 *
 * - explainConcepts - A function that explains concepts in a given text.
 * - ExplainConceptsInput - The input type for the explainConcepts function.
 * - ExplainConceptsOutput - The return type for the explainConcepts function.
 */

import { generateText } from '@/ai/gemini';
import { z } from 'zod';

const ExplainConceptsInputSchema = z.object({
  text: z.string().describe('The text with concepts to be explained.'),
});
export type ExplainConceptsInput = z.infer<typeof ExplainConceptsInputSchema>;

const ExplainConceptsOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the concepts.'),
});
export type ExplainConceptsOutput = z.infer<typeof ExplainConceptsOutputSchema>;

export async function explainConcepts(input: ExplainConceptsInput): Promise<ExplainConceptsOutput> {
  const parsed = ExplainConceptsInputSchema.parse(input);
  const prompt = `Generate simple explanations for complex terms in: ${parsed.text}
Include examples and analogies for better understanding.`;
  const text = await generateText(prompt);
  return { explanation: text.trim() };
}
