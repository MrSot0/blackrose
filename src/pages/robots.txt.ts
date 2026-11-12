import type { APIRoute } from 'astro';
import { abs, text } from '../lib/agent-content';

// Search engines and AI assistants/agents are welcome on every page.
const agents = ['*', 'Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'];

export const GET: APIRoute = ({ site }) =>
  text(
    [
      ...agents.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
      `Sitemap: ${abs(site!, '/sitemap.xml')}`,
      `# LLM index: ${abs(site!, '/llms.txt')}`,
      '',
    ].join('\n'),
  );
