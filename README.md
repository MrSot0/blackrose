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
- Custom domain: the site uses https://blackrose-ten.vercel.app. When a domain is connected in Vercel, set the `SITE_URL` environment variable (e.g. `https://www.example.co.za`) and redeploy; canonical, Open Graph, schema, sitemap, robots and llms.txt all follow it
- Street address / city: add `address` and `geo` to the LocalBusiness schema in `src/layouts/Layout.astro` and create or claim the Google Business Profile with the same name, phone and address

## SEO / AEO / performance
- Title, description, canonical, `en-ZA`, Open Graph and Twitter tags in `src/layouts/Layout.astro`
- JSON-LD: LocalBusiness (services as an OfferCatalog), WebSite and FAQPage, built from `src/data/site.ts`
- FAQ section (`src/components/Faq.astro`) with questions as headings for answer engines
- `public/og.jpg` (1200×630), `site.webmanifest` and app icons
- Generated from `src/data/site.ts` at build time (`src/pages/*.ts`, `src/lib/agent-content.ts`): `/robots.txt` (search and AI crawlers allowed), `/sitemap.xml`, `/llms.txt` (llmstxt.org index), `/llms-full.txt` and `/index.md` (whole page as Markdown for agents)
- `vercel.json`: long cache for `/_astro/*`, correct content types for the text/Markdown files, and a `Link` header pointing agents to llms.txt, index.md and the sitemap
- Lighthouse (local preview): desktop 98 performance; mobile 90–94; 100 for accessibility, best practices and SEO
