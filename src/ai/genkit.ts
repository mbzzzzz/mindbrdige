import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const model = (globalThis as any)?.process?.env?.GEMINI_MODEL || 'googleai/gemini-2.5-flash';

export const ai = genkit({
  plugins: [googleAI()],
  model,
});
