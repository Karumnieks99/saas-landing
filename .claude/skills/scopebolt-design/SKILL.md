---
name: scopebolt-design
description: Use this skill to generate well-branded interfaces and assets for ScopeBolt, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** ScopeBolt — margin-control software for commercial subcontractors. Blunt, money-first, jobsite voice.
- **Color:** one orange accent `#e8440a` (→ `#c23000`) on warm-grey **zinc** neutrals; **emerald** only for money/positive; **amber** only for ratings; near-black `zinc-950` panels.
- **Type:** **Geist** for everything UI/body; **Instrument Serif** *italic only* for display accent phrases inside headlines.
- **Tokens:** `styles.css` → `tokens/` (colors, typography, spacing/radius/shadow/motion, fonts).
- **Components:** `components/core/` (Button, Badge, Avatar, Card, Stars, Input) — load `_ds_bundle.js`, read from `window.ScopeBoltDesignSystem_a38b66`.
- **UI kit:** `ui_kits/marketing/` — full landing-page recreation.
- **Assets:** `assets/` logo marks + wordmarks (light & dark).
- Full guidelines (content + visual foundations + iconography) live in `readme.md`.
