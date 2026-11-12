// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Primary URL: the Vercel deployment. Set SITE_URL (e.g. a custom domain) to override.
const site = process.env.SITE_URL ?? 'https://blackrose-ten.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  // @ts-ignore -- Tailwind ships against a newer Vite type than Astro 5 bundles
  vite: { plugins: [tailwindcss()] },
});
