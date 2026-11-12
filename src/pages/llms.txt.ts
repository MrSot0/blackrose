import type { APIRoute } from 'astro';
import { llmsTxt, text } from '../lib/agent-content';

export const GET: APIRoute = ({ site }) => text(llmsTxt(site!));
