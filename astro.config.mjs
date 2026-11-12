// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Domain from the client's flyer. TODO: confirm before launch.
  site: 'https://www.blackrosebranding.co.in',
  // @ts-ignore -- Tailwind ships against a newer Vite type than Astro 5 bundles
  vite: { plugins: [tailwindcss()] },
});
