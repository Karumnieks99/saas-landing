# ScopeBolt Design System

A brand & UI design system reverse-engineered from the **ScopeBolt** marketing
site — a (fictional) SaaS product that helps **commercial subcontractors** stop
losing margin to scope creep. ScopeBolt captures every RFI, site instruction,
and change order, flags anything outside the signed contract, and pushes a
GC-ready change order in under 60 seconds.

This system gives design agents everything needed to produce on-brand ScopeBolt
material: tokens, fonts, logo assets, reusable React components, and a full
landing-page UI kit.

## Source material

Built by reading the live marketing site source (not screenshots):

- **GitHub:** https://github.com/Karumnieks99/saas-landing
  - `src/ScopeBolt.jsx` + the inline `<style>` block — **the source of truth**
    for the live brand (Geist + Instrument Serif, orange `#e8440a`, zinc
    neutrals, dark feature sections).
  - `src/index.css` — an **abandoned earlier concept** (blue `#1F6BFF`, IBM Plex
    Sans). Intentionally **not** carried into this system; the live page
    overrides it. `public/og-image.svg` reflects that same old blue concept.
  - `business.html` / `business.css` — an unrelated "Stonebridge Advisory"
    static demo, ignored.

> Explore the repo above to go deeper than this system captures.

## The brand in one breath

Punchy, money-first, jobsite plain-talk. A single hot construction **orange**
against warm-grey **zinc**, **emerald** reserved for "money recovered," big
**Instrument Serif italic** phrases cutting into tight **Geist** headlines, and
**near-black** panels where the orange pops. It should feel like it was built by
someone who has actually argued with a GC about a change order.

---

## CONTENT FUNDAMENTALS

**Voice:** blunt, confident, blue-collar. Talks to the subcontractor as a peer
("you", "your crew", "your PM"), never corporate-abstract. The product is the
verb; the customer is the hero who recovers money.

**It always names the dollar amount.** Proof is specific and monetary:
"recover an avg **$4,200** per job", "won **$22k** in one dispute",
"$11,400 recovered in 3 months". Numbers do the persuading.

**Casing:** Sentence case everywhere — headlines, buttons, nav. The only
uppercase is the tracked eyebrow pill labels (HOW IT WORKS, FEATURES, RESULTS).
The wordmark is always **ScopeBolt** — one word, capital S, capital B, the "Bolt"
in orange.

**Headlines** pair a plain upright clause with an *italic serif* emotional
phrase: "Commercial subs stop *losing money to scope creep*",
"Real money recovered by real subs", "Stop giving away work for free."

**Punctuation & rhythm:** short declarative sentences. Em dashes for the
payoff — "all in under 60 seconds." Fragments are fine. "One plan. No surprises."

**Tone do / don't**
- ✓ "Stop giving away work for free." ✕ "Optimize your change-order lifecycle."
- ✓ "Send the CO from the truck, get paid." ✕ "Streamline stakeholder collaboration."
- ✓ "Know before you dig in." ✕ "Proactively surface scope deviations."

**Emoji:** Used **only** as the four feature-card glyphs (📋 ⚠ ⚡ 🛡) — a
deliberate jobsite-shorthand touch. Never in body copy, headlines, or buttons.

**Microcopy patterns:** reassurance under CTAs ("No credit card required",
"No card. 14-day trial. Cancel anytime."), time-to-value chips ("2 min setup",
"Under 60 seconds"), and live social proof ("340+ subs · 4.9 avg rating").

---

## VISUAL FOUNDATIONS

**Color.** One brand accent: ScopeBolt orange `#e8440a`, deepening to `#c23000`
in the wordmark gradient and pressed states. Neutrals are the warm-grey **zinc**
ramp (paper `#fafafa` → near-black `#09090b`). **Emerald** (`#10b981` /
`#047857`) is reserved strictly for money/positive proof; **amber** (`#fbbf24`)
only for star ratings. Four fixed avatar hues (indigo/rose/amber/emerald) tag
testimonial authors. No blues, no purples, no rainbow gradients — the only
gradient is orange-on-orange inside the wordmark. See `tokens/colors.css`.

**Type.** Two families. **Geist** (300–700) does all UI, body, buttons and
labels. **Instrument Serif** appears *italic only*, as the display accent phrase
inside headlines and section heads. Geist Mono is an occasional metric flourish.
Tracking is tight on display (`-0.035em`), normal on body, wide (`0.14em`) on
uppercase eyebrows. Body runs 13–17px; headlines clamp responsively
(hero up to 64px). See `tokens/typography.css`.

**Spacing & layout.** 4px base scale. Centered, max-width ~1024px (`max-w-5xl`)
content column with generous 96px section padding. Everything is centered and
calm; the hero is a single centered column, not a split.

**Backgrounds.** Mostly clean white/paper. The hero adds a faint **grid pattern**
(48px) masked by a radial fade, plus a soft orange blur glow behind the
headline. **Features** and the final **CTA** flip to near-black (`zinc-950`)
panels — the system's signature rhythm of light → dark → light. No photography,
no illustration; structure and type carry it.

**Corners & cards.** Rounded and friendly: 8px chips, 12px buttons/inputs,
16px cards (`rounded-2xl`), 24px feature/pricing panels (`rounded-3xl`), full
pills for badges and avatars. Cards are white with a 1px zinc hairline border
and **no** shadow at rest; on hover they gain a soft `0 4px 20px rgba(0,0,0,.06)`
lift and a slightly darker border. On dark, cards are translucent white-5% with
a white-10% hairline that brightens to white-8% on hover.

**Shadows.** Low-contrast and soft. The big exception is the **primary CTA**,
which carries a subtle orange-tinted ring + shadow and lifts 1px on hover.
Pricing panel gets a larger ambient `0 8px 40px rgba(0,0,0,.08)`.

**Buttons.** Primary is **ink** (zinc-900), not orange — orange is for the
brand, not every button. `brand` (orange) is a once-per-view hero option.
`secondary` is white with a zinc border; `ghost` is text-only. Pill-ish 12px
radius, 700 weight, optional rightward arrow.

**Motion.** Quick and eased — `cubic-bezier(.16,1,.3,1)`, 150–600ms. Scroll-in
sections fade up 18–20px. A live dot **pulses** (emerald ring), the integration
logo strip **tickers** horizontally (pauses on hover), the hero scroll chevron
bounces. All respect `prefers-reduced-motion`.

**Interaction states.** Hover = darker fill (ink→zinc-800), darker border, or
tinted background lift; never a color hue-shift. Press/active = a slightly
deeper zinc. Focus = orange ring (`0 0 0 3px rgba(232,68,10,.12)`) on inputs.
Links lighten/darken, they don't underline.

---

## ICONOGRAPHY

ScopeBolt has **no icon font and no icon library**. UI icons are **inline
stroke SVGs** drawn in place — thin/medium weight (1.5–2.5px), rounded caps and
joins, `currentColor` fill so they inherit text color. The recurring set:
rightward **arrow** (CTAs), **play** triangle (Book demo), **clock** (time-to-
value chips), **check** (pricing list + money badges), **menu/close**
(mobile drawer), and a **5-point star** (ratings, amber).

The four **feature cards use emoji glyphs** (📋 Track, ⚠ Alert, ⚡ Bill,
🛡 Protect) at ~24px — the single sanctioned emoji use, a deliberate jobsite
shorthand. Don't introduce emoji anywhere else.

**Logo / brand mark.** A bold **"B" monogram** in a rounded-square tile. In this
system it lives at `assets/logo-mark.svg` (white glyph on orange tile) and
`assets/logo-mark-dark.svg` (orange glyph on ink tile), with full lockups at
`assets/wordmark.svg` and `assets/wordmark-on-dark.svg`. The glyph path is
lifted from the repo's favicon/og mark and recolored to the live orange brand.

For any new icon need, hand-draw an inline stroke SVG that matches the existing
weight and rounded-cap style, or substitute **Lucide** (same 2px rounded-stroke
language) and flag the substitution.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (imports only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter for use in Claude Code.

**`tokens/`** — `fonts.css` (Geist + Instrument Serif via Google Fonts),
`colors.css`, `typography.css`, `spacing.css` (spacing, radius, shadow, motion).

**`assets/`** — `logo-mark.svg`, `logo-mark-dark.svg`, `wordmark.svg`,
`wordmark-on-dark.svg`.

**`components/core/`** — reusable React primitives (namespace
`window.ScopeBoltDesignSystem_a38b66`):
`Button`, `Badge`, `Avatar` + `AvatarStack`, `Card`, `Stars`, `Input`.
Each ships a `.d.ts` contract and `.prompt.md` usage note; `core.card.html`
is the live specimen.

**`ui_kits/marketing/`** — full interactive ScopeBolt landing page rendered in a
**Linear-style dark aesthetic** (aurora hero, glassy nav, scope-log app mock,
bento feature grid), composed from the primitives and split into `parts.jsx`.
**Tweakable** (accent orange/indigo/emerald, aurora, headline, CTA) via
`tweaks-panel.jsx`. See its `README.md`.

**`cards/`** — foundation specimen cards rendered in the Design System tab
(Colors, Type, Spacing, Brand).

### Fonts caveat
Geist and Instrument Serif load from **Google Fonts** (the repo's local IBM Plex
woff2 files belong to the abandoned blue concept and are intentionally omitted).
If you need self-hosted webfonts, drop the woff2 files into `tokens/` and add
`@font-face` rules.
