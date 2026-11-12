import type { APIRoute } from 'astro';
import { pageMarkdown, text } from '../lib/agent-content';

export const GET: APIRoute = ({ site }) => text(pageMarkdown(site!));
