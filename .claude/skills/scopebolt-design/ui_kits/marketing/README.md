# Marketing Site UI kit — ScopeBolt landing page (Linear-style)

A high-fidelity, interactive ScopeBolt landing page rendered in a **Linear-style
dark aesthetic** — deep near-black canvas, aurora hero glow, glassy sticky nav,
a product "scope log" app mock, a bento feature grid, and refined hairline
surfaces. It composes the design-system primitives
(`window.ScopeBoltDesignSystem_a38b66`: `Button`, `Stars`, `Avatar`,
`AvatarStack`) and is fully **tweakable**.

## Files
- `index.html` — mounts the page; loads React UMD + Babel + `_ds_bundle.js`,
  then `tweaks-panel.jsx` and `parts.jsx`.
- `parts.jsx` — all sections + `<App/>` (exported as `window.SBApp`):
  `Nav`, `Hero`, `AppMock`, `LogoCloud`, `Steps`, `Features` (bento),
  `Testimonials`, `Pricing`, `Cta`, `Footer`.
- `tweaks-panel.jsx` — the Tweaks shell (host-protocol + controls).

## Tweaks (toolbar → Tweaks)
- **Accent** — ScopeBolt orange `#e8440a` · Linear indigo `#5e6ad2` · emerald.
  The choice cascades through the wordmark, nav, CTAs, eyebrows, aurora, app
  mock, and pricing via the `--ac` / `--brand` custom properties.
- **Aurora glow** — toggle the hero/CTA aurora.
- **Headline** and **Primary CTA** copy — free text.

## Linear cues adopted
- Dark canvas `#08090a`, faint masked grid, blurred multi-hue aurora.
- Glassy nav that frosts on scroll with a hairline bottom border.
- Tight Geist headlines (−0.04em), muted-white body, accent kicker labels.
- Gradient-elevated cards with a top inset highlight + hairline borders.
- Bento feature grid (wide / two-up / wide) and a product app-mock under the hero.

## Notes
- This is an **original ScopeBolt page in Linear's visual language**, not a copy
  of Linear's content, logo, or proprietary assets.
- Accent/headline/CTA persist via the Tweaks host; default is ScopeBolt orange.
- Tagged as a Design System card (`Marketing Site`) and a Starting Point.
