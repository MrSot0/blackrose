// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://blackrose.example',
  // @ts-ignore -- Tailwind ships against a newer Vite type than Astro 5 bundles
  vite: { plugins: [tailwindcss()] },
});
