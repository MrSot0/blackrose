# Blackrose — landing page

Astro + Tailwind CSS v4 + TypeScript. One-page site with loader, hide-on-scroll navbar, mobile menu, filterable portfolio with lightbox, and a contact form that opens WhatsApp with the message pre-filled.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build in dist/
```

- Content (services, projects, contacts, socials): `src/data/site.ts`
- Portfolio photos: `src/assets/work/` (optimised automatically by `astro:assets`)
- Design tokens: `src/styles/global.css`, documented in `DESIGN.md`

## Pending from the client
- Logo: `public/logo.svg` is vectorised from a screenshot of the flyer; swap in the original vector file if the client has one
- Instagram, TikTok and LinkedIn links (`href: '#'` in `src/data/site.ts`)
- Confirm they design, print **and install** (hero, process and meta copy rely on it)
- Photos for Wallpaper and Corporate Gifting
- Service area / city
- Final domain (set `site` in `astro.config.mjs`)
