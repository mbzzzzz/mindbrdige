'use server';

/**
 * @fileOverview An AI agent for proofreading text.
 *
 * - proofreadText - A function that proofreads the content of a given text.
 * - ProofreadTextInput - The input type for the proofreadText function.
 * - ProofreadTextOutput - The return type for the proofreadText function.
 */

import { generateText } from '@/ai/gemini';
import { z } from 'zod';

const ProofreadTextInputSchema = z.object({
  text: z.string().describe('The text to be proofread.'),
});
export type ProofreadTextInput = z.infer<typeof ProofreadTextInputSchema>;

const ProofreadTextOutputSchema = z.object({
  proofreadText: z.string().describe('The proofread and corrected text.'),
});
export type ProofreadTextOutput = z.infer<typeof ProofreadTextOutputSchema>;

export async function proofreadText(input: ProofreadTextInput): Promise<ProofreadTextOutput> {
  const parsed = ProofreadTextInputSchema.parse(input);
  const prompt = `You are an expert proofreader. Correct grammar and spelling.

Original Text:
${parsed.text}

Proofread Text:`;
  const text = await generateText(prompt);
  return { proofreadText: text.trim() };
}
