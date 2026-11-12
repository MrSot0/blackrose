// Plain-text / Markdown views of the landing page for search crawlers and AI agents.
// Everything is generated from src/data/site.ts so it never drifts from the HTML page.
import { faqs, nav, process, projects, services, site, waLink } from '../data/site';

export const abs = (base: URL, path = '/') => new URL(path, base).href;

const description =
  'Blackrose Branding designs, prints and installs physical branding for homes and businesses in South Africa: event branding, car wraps, vinyl and decals, wallpaper, corporate gifting and branded gazebos.';

const contactLines = (base: URL) => [
  `- WhatsApp / phone: ${site.phoneDisplay} (${waLink()})`,
  `- Email: ${site.email} (mailto:${site.email})`,
  ...site.socials.filter((s) => s.href !== '#').map((s) => `- ${s.name}: ${s.href}`),
  `- Contact form: ${abs(base, '/#contact')} (opens WhatsApp with the message pre-filled; nothing is sent until the user presses send)`,
];

const quoteHowTo = [
  '## How to request a quote',
  '',
  `1. Open ${waLink("Hi Blackrose, I'd like a quote.")} (WhatsApp, +27 83 874 7567).`,
  '2. Say what needs branding, where it is and when it is needed.',
  '3. Attach photos of the space or vehicle; photos help Blackrose quote faster.',
  '',
  'A pre-filled message can be built with this URL pattern:',
  `\`https://wa.me/${site.whatsapp}?text=<url-encoded message>\``,
];

/** llms.txt — short index in the llmstxt.org format */
export function llmsTxt(base: URL) {
  return [
    '# Blackrose Branding',
    '',
    `> ${description}`,
    '',
    'One-page website. Every section has a stable anchor, listed below. Quotes are handled on WhatsApp; there is no online checkout or price list.',
    '',
    '## Pages',
    '',
    `- [Home](${abs(base, '/')}): landing page (HTML)`,
    `- [Home as Markdown](${abs(base, '/index.md')}): the full page content as Markdown, best for agents`,
    `- [Full text](${abs(base, '/llms-full.txt')}): services, portfolio, process, FAQ and contact in one file`,
    '',
    '## Sections',
    '',
    `- [Services](${abs(base, '/#services')}): ${services.map((s) => s.title).join(', ')}`,
    `- [Portfolio](${abs(base, '/#work')}): ${projects.length} photographed projects`,
    `- [Process](${abs(base, '/#process')}): ${process.map((p) => p.title).join(' → ')}`,
    `- [FAQ](${abs(base, '/#faq')}): ${faqs.length} common questions`,
    `- [Contact](${abs(base, '/#contact')}): WhatsApp quote form`,
    '',
    '## Contact',
    '',
    ...contactLines(base),
    '',
    '## Optional',
    '',
    `- [Sitemap](${abs(base, '/sitemap.xml')})`,
    `- [Open Graph image](${abs(base, '/og.jpg')})`,
    '',
  ].join('\n');
}

/** Full Markdown of the page (used by /index.md and /llms-full.txt) */
export function pageMarkdown(base: URL) {
  return [
    '# Blackrose Branding: event branding, car wraps, vinyl and wallpaper in South Africa',
    '',
    `> ${description}`,
    '',
    `Source: ${abs(base, '/')}`,
    '',
    '## Services',
    '',
    'Blackrose handles concept, artwork, production and installation.',
    '',
    ...services.map((s) => `- **${s.title}**: ${s.copy}`),
    '',
    '## Portfolio',
    '',
    ...projects.map((p) => `- **${p.title}** (${p.category}): ${p.description}`),
    '',
    '## Process',
    '',
    ...process.map((p, i) => `${i + 1}. **${p.title}**: ${p.copy}`),
    '',
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    ...quoteHowTo,
    '',
    '## Contact',
    '',
    ...contactLines(base),
    '',
    '## Site navigation',
    '',
    ...nav.map((n) => `- [${n.label}](${abs(base, '/' + n.href)})`),
    '',
  ].join('\n');
}

export const text = (body: string, type = 'text/plain') =>
  new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
