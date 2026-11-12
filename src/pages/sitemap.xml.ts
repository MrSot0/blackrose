import type { APIRoute } from 'astro';
import { abs } from '../lib/agent-content';

const lastmod = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = ({ site }) => {
  const s = site!;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${abs(s, '/')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${abs(s, '/og.jpg')}</image:loc></image:image>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
