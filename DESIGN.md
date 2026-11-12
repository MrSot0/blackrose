# Blackrose — Design System

Direction: **dark editorial luxury**. A carbon-black canvas, large light-weight display type, thin gold hairlines, generous negative space. Think fashion-house lookbook, not SaaS template. The site is dark by design (one theme, no light toggle).

## Color

| Token | Hex | Role |
|---|---|---|
| `carbon-950` | `#0B0B0C` | Page background |
| `carbon-900` | `#121214` | Raised surfaces (cards, form fields) |
| `carbon-800` | `#1C1C1F` | Borders on hover, alt sections |
| `carbon-700` | `#2A2A2E` | Hairline borders, dividers |
| `ash-400` | `#8C8C93` | Secondary text, captions |
| `ash-200` | `#C9C9CE` | Body text |
| `bone-50` | `#F4F2EE` | Headings, primary text |
| `gold-400` | `#D4B26A` | Accent: CTAs, highlights, focus rings |
| `gold-500` | `#C29A4B` | CTA hover, gold text on dark (AA at ≥18px) |
| `gold-700` | `#7A5F2C` | Subtle gold borders |

Rules: gold is an accent, never a background for large areas. Max one gold CTA per viewport. Body text is `ash-200` on `carbon-950` (contrast ≈ 12:1).

## Typography

- **Display:** Unbounded, weights 200–300. Wide, geometric, striking at light weight. Tight tracking (`-0.02em`) at large sizes, uppercase eyebrow labels at `0.3em` tracking.
- **Body/UI:** Inter, 300–500.
- Scale (clamp, mobile → desktop): hero `3rem → 7.5rem`, h2 `2rem → 4rem`, h3 `1.25rem → 1.5rem`, body `1rem → 1.0625rem`, eyebrow `0.75rem`.
- Line height: display 1.0–1.1, body 1.65.

## Spacing & layout

- 4px base. Section padding `py-24 md:py-36`. Container `max-w-7xl`, side gutter `px-5 md:px-8`.
- 12-column grid on desktop; asymmetric layouts encouraged (e.g. 5/7 splits).

## Radius, borders, shadow

- Radius: `0` on cards and images (editorial), `9999px` on pill buttons and the WhatsApp button.
- Borders: 1px `carbon-700`; gold hairline (`gold-700`) for emphasis.
- Shadow: none on surfaces; soft gold glow only on the floating WhatsApp button.

## Motion

- Page loader: logo mark + gold line fill, fades out ≤ 1.2s.
- Reveal on scroll: fade + 24px rise, 700ms, `cubic-bezier(.2,.7,.2,1)`, staggered 80ms.
- Hero headline: per-line mask reveal.
- Navbar: hides on scroll down, returns on scroll up, gains blurred background after 40px.
- All motion disabled under `prefers-reduced-motion`.

## Components

- **Button primary:** gold-400 fill, carbon-950 text, pill, hover gold-500 + arrow nudge.
- **Button ghost:** 1px bone border, bone text, hover fills bone with carbon text.
- **Service card:** number + title + short copy, top hairline, hover reveals gold line.
- **Portfolio tile:** image (placeholder gradient until real work), category + title, hover zoom 1.04.
- **Input:** carbon-900 fill, bottom border carbon-700, focus border gold-400, label above.
- **Floating WhatsApp:** fixed bottom-right, 56px circle, `#25D366` icon on carbon with gold ring, links to `https://wa.me/27838747567`.
- Focus ring: 2px gold-400, 3px offset, on every interactive element.
