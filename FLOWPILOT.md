# FlowPilot — Premium SaaS Landing Page Template

A polished, production-ready landing page template for SaaS products, built with
**React + Vite + Tailwind CSS**. Designed to look like it belongs next to top-tier
B2B SaaS companies — clean, fast, fully responsive, and easy to rebrand.

Everything lives in a **single component** — `src/FlowPilot.jsx` — so you can ship
a client-ready site in an afternoon.

> Packaging this for sale? Rename this file to `README.md`. (This repo's existing
> `README.md` documents a different demo, ScopeBolt, and is intentionally left intact.)

---

## ✨ What's included

- 16 conversion-focused sections (hero, trust bar, problem, platform overview,
  features, interactive product showcase, use cases, how-it-works, results,
  testimonials, integrations, pricing, FAQ, final CTA, footer)
- Interactive **product showcase** with 4 tabbed dashboard views
- **Monthly / yearly** pricing toggle
- Accessible **FAQ accordion** (native `<details>`)
- Working **mobile menu** (slide-in drawer)
- Animated counters + subtle scroll reveals (respect `prefers-reduced-motion`)
- One **design-token block** to retheme everything (colors, fonts, radius)
- Fully responsive, no horizontal scroll, no console errors, no heavy libraries

---

## 🚀 Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:5173/saas-landing/)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

The template renders from `src/App.jsx`:

```jsx
import FlowPilot from './FlowPilot';
export default function App() { return <FlowPilot />; }
```

> The dev URL uses the `/saas-landing/` base path (set in `vite.config.js`).
> Change `base` there if you deploy to a different path or a root domain.

---

## 🎨 Customize in minutes

Everything a buyer typically changes is grouped at the **top of
`src/FlowPilot.jsx`** under the `CONTENT` heading, plus one CSS-token block.

### 1. Colors, fonts & shape — `<Tokens/>`
Search for `function Tokens()` in `FlowPilot.jsx`. Edit the CSS variables in `:root`:

| Variable | Controls |
| --- | --- |
| `--fp-accent` | **Primary accent** color (buttons, highlights, charts) |
| `--fp-accent-deep` | Accent hover / pressed state |
| `--fp-accent-bright` | Accent used on dark backgrounds |
| `--fp-ink` | Headings / strongest text |
| `--fp-ink-2` | Body text |
| `--fp-bg` / `--fp-bg-alt` | Page & alternating section backgrounds |
| `--fp-surface` | Card / panel background |
| `--fp-line` | Hairline border color |
| `--fp-radius` / `--fp-radius-lg` | Corner radius (cards / large panels) |
| `--fp-font-display` | Headline font |
| `--fp-font-body` | Body font |
| `--fp-font-mono` | Labels / metrics font |

Change `--fp-accent` once and the whole site re-themes. Swap fonts by editing the
Google Fonts `@import` at the top of the same block and the three font variables.

### 2. Brand name & logo
- **Name:** edit `const BRAND = "FlowPilot";` near the top.
- **Logo:** edit the SVG inside the `Wordmark` component (search `BRAND logo mark`).
  Drop in an `<img src="/logo.svg" />` if you prefer an image.
- **Favicon / page title / social preview:** edit `index.html`.

### 3. Copy / text
All page copy lives in the `CONTENT` constants near the top of `FlowPilot.jsx`:
`HERO`, `PROBLEMS`, `SOLUTION`, `FEATURES`, `USE_CASES`, `HOW_STEPS`, `RESULTS`,
`TESTIMONIALS`, `INTEGRATIONS`, `PRICING`, `FAQ_ITEMS`, `FINAL_CTA`, `FOOTER_COLS`.

### 4. CTA links
Edit these constants at the top:
```js
const CTA_PRIMARY_HREF   = "#pricing";   // "Start free trial"
const CTA_SECONDARY_HREF = "#demo";      // "Book demo"
const LOGIN_HREF         = "#login";
```
Point them at your signup flow, Calendly, or any URL.

### 5. Pricing
Edit the `PRICING.tiers` array — name, `monthly` / `yearly` price, `blurb`,
`features`, `cta`, `ctaHref`, and `popular: true` for the highlighted plan.

### 6. Testimonials & logos
- Replace `TESTIMONIALS.cards` (quote, name, role, company, initials, avatar tint).
- Replace `TRUST_LOGOS` and the `INTEGRATIONS.items` placeholder marks with real
  `<img>` logos (look for the `Placeholder ... mark` comments).

### 7. Screenshots / dashboard mockups
The hero and product-showcase dashboards are **pure CSS/SVG mockups** (no image
assets), so they stay crisp at any size and recolor with your accent automatically.
To use a real screenshot instead, replace the `HeroDashboard` /
`ProductShowcase` panel markup with an `<img>`.

### 8. Add / remove / reorder sections
Each section is a self-contained component. Open the `FlowPilot` component at the
bottom and reorder, comment out, or delete lines inside `<main>`.

---

## 🧭 Section map

Every major block is marked in `FlowPilot.jsx` with a banner comment, e.g.
`[ section marker: HERO ]`, `[ section marker: PRICING ]` — search those to jump
straight to the code for any section.

---

## ♿ Accessibility & quality

- Semantic landmarks (`header`, `main`, `footer`, `section[id]`), skip-to-content link
- Proper heading hierarchy (one `h1`, section `h2`s)
- Visible keyboard focus rings; `aria-pressed` / `role="switch"` on controls
- All animation disabled under `prefers-reduced-motion`
- Color contrast tuned for the navy-on-white system
- No console errors; no horizontal scroll at any breakpoint

---

## 🌐 Deployment

It's a static build — host `dist/` anywhere.

**Netlify / Vercel:** build command `npm run build`, publish directory `dist`.
For a root domain, set `base: '/'` in `vite.config.js` first.

**GitHub Pages:** keep `base: '/<repo-name>/'` in `vite.config.js`, then publish
the `dist/` folder (e.g. with the `gh-pages` package or an Actions workflow).

---

## ❓ Template FAQ (for buyers)

**Can I customize this template?**
Yes — colors, fonts, copy, pricing, and sections are all editable from clearly
labeled constants and a single CSS-variable block. No build tooling knowledge
beyond `npm` is required.

**Is this built for SaaS startups?**
Yes. The structure, copy, and dashboard visuals are tailored to B2B SaaS — but
it works for any product that needs a credible, conversion-focused landing page.

**Does it include responsive design?**
Yes. It's built mobile-first and tested across mobile, tablet, and desktop with
no horizontal scroll.

**Can I connect my own backend / forms?**
Yes. The newsletter and CTA elements are standard HTML — point the form `onSubmit`
or the CTA `href` at your own endpoint, signup flow, or form service.

**Can I use this for client projects?**
Yes, under the license you purchased. The single-tier license covers your own and
client projects; an extended/agency license covers reselling end products at scale.
(Adjust to match the license you actually sell.)

**What is included in the template?**
The full React + Vite + Tailwind source, this guide, all 16 sections, the
interactive product showcase, pricing toggle, FAQ accordion, mobile menu, and the
CSS-token theming system. No paid dependencies.

---

## 🧱 Tech

React 18 · Vite · Tailwind CSS · zero runtime UI libraries. Total JS payload is
~63 KB gzipped.

---

*Demo content (company names, testimonials, and all metrics) is illustrative
placeholder content. Replace it with your own before going live.*
