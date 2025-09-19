'use server';

import { z } from 'zod';
import { adaptContentToReadingLevel } from '@/ai/flows/adapt-content-to-reading-level';
import { summarizeWebpage } from '@/ai/flows/summarize-webpage';
import { translateWebpage } from '@/ai/flows/translate-webpage';
import { proofreadText } from '@/ai/flows/proofread-text';
import { analyzeContent } from '@/ai/flows/analyze-content';
import { explainConcepts } from '@/ai/flows/explain-concepts';
import type { ActionState } from '@/lib/types';

const adaptSchema = z.object({
  content: z.string().min(1, 'Content is required.'),
  readingLevel: z.string(),
});

export async function handleAdapt(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const validatedFields = adaptSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid input.',
      };
    }
    
    const { content, readingLevel } = validatedFields.data;
    const result = await adaptContentToReadingLevel({ content, readingLevel });

    return {
      success: true,
      message: 'Content adapted successfully.',
      data: result.adaptedContent,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to adapt content. Please try again.',
    };
  }
}

const summarizeSchema = z.object({
  url: z.string().url('Please enter a valid URL.'),
  length: z.enum(['short', 'medium', 'long']),
});

export async function handleSummarize(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const validatedFields = summarizeSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid URL or summary length.',
      };
    }
    
    const { url, length } = validatedFields.data;
    const result = await summarizeWebpage({ url, length });

    return {
      success: true,
      message: 'URL summarized successfully.',
      data: result.summary,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to summarize URL. Please check the URL and try again.',
    };
  }
}

const translateSchema = z.object({
  text: z.string().min(1, 'Content is required.'),
  targetLanguage: z.string(),
});

export async function handleTranslate(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const validatedFields = translateSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid input.',
      };
    }
    
    const { text, targetLanguage } = validatedFields.data;
    const result = await translateWebpage({ text, targetLanguage });

    return {
      success: true,
      message: 'Content translated successfully.',
      data: result.translatedText,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to translate content. Please try again.',
    };
  }
}

const proofreadSchema = z.object({
  text: z.string().min(1, 'Text is required.'),
});

export async function handleProofread(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const validatedFields = proofreadSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid input.',
      };
    }

    const { text } = validatedFields.data;
    const result = await proofreadText({ text });

    return {
      success: true,
      message: 'Text proofread successfully.',
      data: result.proofreadText,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to proofread text. Please try again.',
    };
  }
}

const analyzeSchema = z.object({
    text: z.string().min(1, 'Text is required.'),
});

export async function handleAnalyze(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    try {
        const validatedFields = analyzeSchema.safeParse(
            Object.fromEntries(formData.entries())
        );

        if (!validatedFields.success) {
            return {
                success: false,
                message: 'Invalid input.',
            };
        }

        const { text } = validatedFields.data;
        const result = await analyzeContent({ text });

        return {
            success: true,
            message: 'Content analyzed successfully.',
            data: result.analysis,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to analyze content. Please try again.',
        };
    }
}

const explainSchema = z.object({
    text: z.string().min(1, 'Text is required.'),
});

export async function handleExplain(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    try {
        const validatedFields = explainSchema.safeParse(
            Object.fromEntries(formData.entries())
        );

        if (!validatedFields.success) {
            return {
                success: false,
                message: 'Invalid input.',
            };
        }

        const { text } = validatedFields.data;
        const result = await explainConcepts({ text });

        return {
            success: true,
            message: 'Concepts explained successfully.',
            data: result.explanation,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to explain concepts. Please try again.',
        };
    }
}
