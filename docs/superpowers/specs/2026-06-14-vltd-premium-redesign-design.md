# VLTD — Premium ("Awwwards-tier") Redesign & Relocation

- **Date:** 2026-06-14
- **Status:** Draft for review
- **Author:** Claude (with Karumnieks99)
- **Scope:** Elevate the VLTD landing page to award-tier, client-ready quality, then relocate it to be the sole content of the `Karumnieks99/3rd-webpage` repo.
- **Source files (currently untracked in `saas-landing`):** `vltd.html`, `vltd-scene.js`, `public/fonts/{fraunces-latin-var,fraunces-italic-latin-var,archivo-latin-var}.woff2`

---

## 1. Goal & success criteria

Take VLTD from a strong A-minus to genuinely award-tier: one committed art direction, expressive type and motion, distinctive (non-templated) layout, and zero-defect polish. Then ship it as the entire `3rd-webpage` site.

**Done means all of:**

1. No stock 3-equal-card grid anywhere — "The Line" reads as an editorial instrument catalogue with real hierarchy.
2. Display type exploits Fraunces' variable axes (optical size / weight / SOFT) expressively, including in reveal motion.
3. The 3D hero is scroll-reactive (not a static backdrop) and composes as a deliberate focal image.
4. The configurator is genuinely interactive (segmented control + swatches toggle; total re-rolls).
5. Polish gates pass: 60fps scroll on a mid laptop, no layout shift on load, keyboard-accessible, reduced-motion parity, a designed OG/Twitter card.
6. Works coherently from 390px mobile through desktop.
7. Lives in `3rd-webpage` as the primary page, builds and previews cleanly via that repo's Vite setup.

---

## 2. Art direction — the one idea

**"Built in series of one — an instrument, not a product."** The machinist / instrument metaphor governs layout, motion, and copy. Every section must express it; nothing should feel like a swappable module (the test for "AI slop").

- **Palette (unchanged):** graphite (`#0f0e0d` family) + a single old-brass accent (`#b8912a`). Disciplined, one color does the talking.
- **Type (unchanged families):** Fraunces variable serif for display, Archivo variable sans for UI — both already self-hosted.
- **Motion language:** heavy "mass" easing, mechanical shutter / mask reveals, weight over flash. Already established via `--ease-mass` and GSAP; we extend it, not replace it.

---

## 3. Scope — section by section

| Section | Verdict | Change |
|---|---|---|
| **Hero** | Rework | 3D turntable becomes scroll-reactive (slows/reframes entering "The Line"); evaluate a stronger single focal object + subtle depth/bloom; expressive variable-font headline whose reveal animates font axes; magnetic CTA + thin brass cursor ring. Keep the bottom-left editorial composition, veil, grain, scroll cue, and the "Bench 03 · Now building" detail. |
| **The Line** | Rebuild (biggest change) | Replace 3-equal-card grid with an editorial "spec ledger / catalogue": flagship **Gauss** featured large, **Farad**/**Joule** as supporting entries. Big index numerals, specs set as a typographic table, intentional asymmetry. Stitch generates candidate compositions; integrated by hand. |
| **Doctrine strip** | Elevate | Break the 4-identical-cell rhythm — varied scale / editorial run; numerals animate weight as they count up. |
| **Configurator** | Keep + make interactive | Keep the panel concept; segmented control + swatches actually toggle; running total re-rolls mechanically on change. |
| **Method (pinned horizontal)** | Keep (minor) | Already award-grade. Optional: gauge-styled progress, huge outlined stage numerals. Preserve desktop pin + mobile swipe. |
| **Closing / Commission + Footer** | Keep | Tighten type/spacing only. |

**Leave almost untouched (already award-grade):** the pinned Method pattern, the configurator concept, the brass-hairline hover language, the graphite + single-brass palette.

---

## 4. Technical improvements to fold in

The five already approved ("improve all"):

1. **WebGL context-loss recovery** in `vltd-scene.js` (`webglcontextlost`/`restored`); wire up or remove the currently-dead `dispose()`.
2. **OG / Twitter meta + a designed OG image** (currently absent on this page).
3. **Accessibility:** skip-link, visible focus order, correct semantics for the faux-controls (configurator `role="img"` previews), reduced-motion parity.
4. **De-risk the GSAP CDN single-point-of-failure** (self-host or pin GSAP + plugins) and **cut font CLS** with `size-adjust`/fallback metrics.
5. **Interactive configurator** (overlaps §3).

Already applied in the working tree (verified earlier): hero-title GSAP-failure failsafe, `method--pinned` matchMedia cleanup, mobile scroll-listener cleanup.

---

## 5. Relocation to `3rd-webpage`

Target repo today is a Vite **multi-page** site ("pulse-landing-page" / FORGE CUSTOMS): `index.html` (redirect), `pulse-landing-page.{html,css,js}`, `driver-downloads.html`, `privacy-policy.html`, `terms-of-service.html`, `assets/`, `vite.config.js` (explicit Rollup inputs), `package.json`.

**Decision (confirmed): replace repo contents with VLTD only.** Old Pulse/Forge files are removed but **remain recoverable in git history** — nothing is irreversibly destroyed.

Plan:

1. Clone `3rd-webpage` into a separate working folder (it's a different remote from `saas-landing`).
2. Work on a branch (e.g. `vltd-relaunch`).
3. Remove Pulse/Forge pages, assets, and config.
4. Add VLTD: **`vltd.html` becomes `index.html`** (it's the only page, so it should serve at root), plus `vltd-scene.js` and `fonts/`. Rewrite `vite.config.js` to a single entry (or default), update `package.json` name/metadata, refresh `README.md`.
5. Verify relative asset paths resolve at root (no `base` in target → relative `fonts/…` and `./vltd-scene.js` are fine).
6. Build + preview locally before pushing.

**Open decision — push target:** branch + PR (recommended, since wiping the repo is reviewable) vs. straight to `main`. Default to branch + PR unless you say otherwise.

---

## 6. Build sequence (phases, each independently verifiable)

- **Phase 0 — Stitch load.** You restart Claude Code (`claude --continue` to keep this thread); I confirm `stitch-design`/`stitch-build` are loaded.
- **Phase 1 — Structure.** Rebuild "The Line" + doctrine strip (Stitch-assisted ideas, hand-integrated).
- **Phase 2 — Soul.** Variable-font expression, scroll-reactive 3D, interaction layer (cursor, magnetic CTA, interactive configurator).
- **Phase 3 — Polish.** Technical improvements §4, a11y, perf, OG card.
- **Phase 4 — Relocate.** Move into `3rd-webpage`, build, push per §5.

---

## 7. Verification

Use the established headless screenshot method (Edge CDP; localhost vs 127.0.0.1 gotcha; `--force-prefers-reduced-motion` to settle; CDP emulation for mobile widths):

- **Visual:** desktop (1440) + mobile (390) screenshots per phase; reduced-motion render; confirm the hero animates on the happy path and the failsafe reveals the headline when GSAP is blocked.
- **Functional:** configurator toggles update the total; Method scrubs on desktop and swipes on mobile; no console errors.
- **A11y/perf:** keyboard nav + visible focus; reduced-motion parity; no layout shift on load; smooth scroll.

---

## 8. Risks & non-goals

**Risks**
- Stitch may emit generic compositions → treat it as an *idea source only*, integrate by hand, reject anything that flattens the art direction.
- "Awwwards-tier" is a high bar — this is a real multi-session build, not a quick pass.
- Repo replacement is destructive on the surface; mitigated by git history + branch/PR.

**Non-goals (YAGNI)**
- No full copy rewrite (focus is *visual distinctiveness*; copy is already strong and stays).
- No sound design, no preloader unless it's fast + skippable (default: skip).
- No backend, CMS, real commerce, or analytics.
- No changes to the `saas-landing` repo's own pages.

---

## 9. Open decisions to confirm before/while planning

1. Push target for `3rd-webpage`: **branch + PR** (default) or direct to `main`?
2. VLTD as **`index.html`** at root (recommended) — confirm.
3. Optional hero focal-object change (single machined object vs. keep the scattered ring) — decide during Phase 2 from a visual comparison.
