import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-webpage.ts';
import '@/ai/flows/adapt-content-to-reading-level.ts';
import '@/ai/flows/translate-webpage.ts';
import '@/ai/flows/proofread-text.ts';
