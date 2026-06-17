# VLTD Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the VLTD landing page to award-tier, client-ready quality and ship it as the sole content of the `Karumnieks99/3rd-webpage` repo.

**Architecture:** A single static HTML page (`vltd.html`) + one ES-module 3D scene (`vltd-scene.js`) + self-hosted variable fonts, animated with GSAP/ScrollTrigger/SplitText and a procedural Three.js hero. Phases 1–3 are edited in the `saas-landing` working tree (served at `http://localhost:5175/saas-landing/vltd.html`); Phase 4 relocates the finished page into the `3rd-webpage` Vite project as `index.html`.

**Tech Stack:** HTML/CSS, vanilla ES modules, GSAP 3.13 (ScrollTrigger, SplitText), Three.js 0.180 (CDN, full URL), Vite, Edge headless via CDP for visual verification.

**Verification model:** Each task ends with a verification gate — a CDP screenshot at 1440px desktop and 390px mobile, plus a console-error check and (where relevant) a functional check — followed by a commit. The reusable screenshot helper is created in Task 0.

---

## File structure

| File | Responsibility | Phase |
|---|---|---|
| `.cdp-shot.mjs` (saas-landing, gitignored) | Headless CDP screenshot helper for verification | 0 |
| `vltd.html` | The page: markup, CSS, inline orchestration module | 1–3 |
| `vltd-scene.js` | Procedural Three.js hero + scroll/pointer API | 2–3 |
| `public/vendor/gsap/*.min.js` | Self-hosted GSAP (removes CDN single-point-of-failure) | 3 |
| `public/og/vltd-og.png` | Designed Open Graph card | 3 |
| `3rd-webpage/index.html` etc. | Relocated, production site | 4 |

The inline module in `vltd.html` already cleanly separates concerns (scene wiring, GSAP choreography). New interaction logic (configurator) is added as a focused `initConfigurator()` function in that module rather than a new file, matching the existing pattern. If the inline `<script>` grows past ~250 lines during this work, split the configurator + cursor logic into `vltd-ui.js` and import it.

---

## Phase 0 — Tooling & gates

### Task 0: Create the CDP screenshot helper

**Files:**
- Create: `.cdp-shot.mjs` (saas-landing root; add to `.gitignore`)

- [ ] **Step 1: Write the helper**

```js
// .cdp-shot.mjs — headless full-page screenshot via an already-running Edge CDP endpoint.
// Usage: node .cdp-shot.mjs <url> <outPath> [width] [height] [mobile(0|1)]
import { writeFileSync } from "node:fs";

const [, , url, out = "shot.png", width = "1440", height = "1700", mobile = "0"] = process.argv;
const base = "http://127.0.0.1:9223";

const targets = await (await fetch(base + "/json")).json();
const target = targets.find((t) => t.type === "page") || targets[0];
const ws = new WebSocket(target.webSocketDebuggerUrl);

let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
});

await new Promise((r) => ws.addEventListener("open", r));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: +width, height: +height,
  deviceScaleFactor: mobile === "1" ? 3 : 1, mobile: mobile === "1",
});
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 3500)); // settle fonts + intro timeline
const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, fromSurface: true });
writeFileSync(out, Buffer.from(data, "base64"));
ws.close();
console.log("saved", out);
```

- [ ] **Step 2: Add to .gitignore**

Append to `.gitignore`: `.cdp-shot.mjs` and `*.shot.png`.

- [ ] **Step 3: Launch Edge with a CDP endpoint (background)**

Run:
```
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --remote-debugging-port=9223 --remote-allow-origins=* --force-prefers-reduced-motion --no-first-run --user-data-dir="C:/Users/egulb/AppData/Local/Temp/edge-cdp" about:blank
```
Expected: process stays running; `curl -s http://127.0.0.1:9223/json/version` returns JSON.

- [ ] **Step 4: Smoke-test the helper**

Run: `node .cdp-shot.mjs "http://localhost:5175/saas-landing/vltd.html" baseline-desktop.shot.png 1440 1700 0`
Expected: `saved baseline-desktop.shot.png`. Read the PNG to confirm the current page renders. Capture a mobile baseline too: `node .cdp-shot.mjs "http://localhost:5175/saas-landing/vltd.html" baseline-mobile.shot.png 390 850 1`.

- [ ] **Step 5: No commit** (helper is gitignored).

> Note: the dev server is already running at port **5175** (`npm run dev`, background task). If it died, restart with `npm run dev` and update the port in URLs below.

---

## Phase 1 — Structure (kill the templated layout)

### Task 1: Rebuild "The Line" as an editorial spec-ledger

**Files:**
- Modify: `vltd.html` (the `#line` section markup at ~`882-1005`, and the `.line-grid` / `.build` CSS at ~`450-577`)

**Goal:** Replace the 3-equal-card grid with an asymmetric, editorial catalogue: **Gauss (flagship) featured large**, **Farad** + **Joule** as supporting entries. This is the single highest-impact change.

- [ ] **Step 1 (Stitch): Generate layout candidates.** Use `stitch-design` with a tight prompt: "Editorial product catalogue row for a luxury machined-PC builder; graphite #0f0e0d background, single old-brass #b8912a accent, Fraunces serif display + Archivo sans; one large flagship entry with big index numeral and a spec table, two smaller supporting entries; intentional asymmetry, generous negative space; no card borders, no 3-up grid." Capture 2–3 compositions as reference only.

- [ ] **Step 2: Author the new markup.** Restructure `#line` into a feature block (Gauss) + a supporting two-up (Farad, Joule). Preserve all real spec data already in the page (graphics/processor/cooling/memory/storage/power/chassis, prices $3,800 / $5,200 / $7,400) and the `data-build` hooks. Keep the `<dl>`/`.spec-row` semantics for the spec tables.

- [ ] **Step 3: Author the CSS.** New layout classes (e.g. `.line-feature`, `.line-support`) replacing `.line-grid`/`.build` equal columns. Use large Fraunces index numerals (`opsz` 144), tabular-nums specs, a brass hairline as the only divider. Keep the existing hover "powered-on" brass edge motif. Mobile (`<1024px`): feature stacks above a single-column support list.

**Acceptance criteria:** No `repeat(3, 1fr)` equal grid remains in `#line`; Gauss is visually dominant; spec data intact; brass-accent discipline maintained; readable 390→1440px.

- [ ] **Step 4: Verify.** Restart dev server if needed. Run:
```
node .cdp-shot.mjs "http://localhost:5175/saas-landing/vltd.html#line" line-desktop.shot.png 1440 2200 0
node .cdp-shot.mjs "http://localhost:5175/saas-landing/vltd.html#line" line-mobile.shot.png 390 2600 1
```
Read both PNGs; confirm hierarchy + no overflow. Open DevTools-less console check: the page must log no errors (check the dev server background output).

- [ ] **Step 5: Commit.**
```
git add vltd.html
git commit -m "Rebuild The Line as an editorial spec-ledger (flagship + supporting)"
```

### Task 2: Elevate the doctrine strip

**Files:**
- Modify: `vltd.html` (`.doctrine` markup ~`987-1004`, CSS ~`579-606`, and the counter JS ~`1300-1316`)

**Goal:** Break the four-identical-cells rhythm; let the numerals carry weight.

- [ ] **Step 1: Rework markup/CSS** so the four stats have deliberate scale variation (e.g. `72 hrs` and `12/mo` larger as the "headline" facts, `311` and `4 yr` quieter) rather than four equal boxes. Keep the `data-count` hooks.

- [ ] **Step 2: Animate weight on count.** In the existing `[data-count]` tween, also animate `font-variation-settings` "wght" from 200→ the resting weight as the number rolls (GSAP `onUpdate` setting `el.style.fontVariationSettings`). Keep the `snap: { v: 1 }` integer roll. Skip the animation under reduced motion (already gated by the `motionOK` matchMedia branch — keep counters readable when motion is off).

**Acceptance criteria:** stats no longer read as four identical cells; numbers roll + firm up in weight; reduced-motion shows final values immediately.

- [ ] **Step 3: Verify.** `node .cdp-shot.mjs "http://localhost:5175/saas-landing/vltd.html#line" doctrine.shot.png 1440 2400 0`; read PNG. Confirm scale variation.

- [ ] **Step 4: Commit.**
```
git add vltd.html
git commit -m "Elevate doctrine strip with scale variation and weight-on-count"
```

---

## Phase 2 — Soul (type, 3D, interaction)

### Task 3: Expressive variable-font display type

**Files:**
- Modify: `vltd.html` (`.serif-display`, `.hero__title`, `.statement` CSS ~`123-148`, `339-354`; the SplitText reveal in `init()` ~`1259-1268`)

**Goal:** Make Fraunces' variable axes do expressive work in the display type and its reveal.

- [ ] **Step 1: Tune resting display type.** On `.hero__title` and `.statement`, push optical size (`opsz` 144 for the hero) and add an italic accent already present (`.hero__title em`). Tighten tracking at large sizes. Confirm Fraunces exposes `opsz`/`wght`/`SOFT` (the self-hosted file is `100 900` weight + opsz); only animate axes the file actually supports — verify with a quick `document.fonts` check before relying on `SOFT`.

- [ ] **Step 2: Axis-animated reveal.** Extend the `[data-split]` SplitText reveal so lines rise from their masks *and* settle their weight/opsz (e.g. start `wght` ~300 → rest, via `onUpdate` on the GSAP tween writing `fontVariationSettings`). Keep `once: true` and the existing `expo.out` ease. Leave the hero `.mask > span` line-rise as-is (it already has the failsafe).

**Acceptance criteria:** display type reads bespoke (not default serif); reveal shows axis motion; reduced-motion shows final state (no axis animation).

- [ ] **Step 3: Verify** desktop + mobile screenshots of hero and a `.statement` section; read PNGs. Confirm no FOUT jump (fonts are preloaded).

- [ ] **Step 4: Commit.**
```
git add vltd.html
git commit -m "Expressive Fraunces variable-axis display type and reveals"
```

### Task 4: Scroll-reactive 3D hero

**Files:**
- Modify: `vltd-scene.js` (public API + frame loop), `vltd.html` (scene wiring ~`1162-1184`, add a ScrollTrigger in `init()`)

**Goal:** Turn the 3D backdrop into something narrative — the turntable responds to scroll as the hero leaves.

- [ ] **Step 1: Add a scroll input to the scene API.** In `vltd-scene.js`, add `setScroll(p)` (p = 0..1 hero scroll progress) to the returned object; store it and, in `frame()`, ease the spin speed and a slight camera dolly/tilt toward a "settled" framing as `p`→1. Keep `reducedMotion` rendering a single frame (no scroll reactivity when motion is off). Keep `SPIN_SPEED` ceiling (≤0.04).

```js
// in createVltdScene, near pointer state:
let scrollP = 0;
// in frame(), replace the constant spin line:
const settle = 1 - scrollP * 0.6;               // slow the turntable as we scroll away
spin.rotation.y += SPIN_SPEED * dt * settle;
camera.position.z = 7.2 + scrollP * 0.8;        // gentle dolly-out
camera.updateProjectionMatrix();
// add to the returned object:
setScroll(p) { if (!reducedMotion) scrollP = Math.max(0, Math.min(1, p)); },
```

- [ ] **Step 2: Drive it from the page.** In `vltd.html`, after the scene is created, add a ScrollTrigger that maps hero scroll progress to `scene.setScroll`:
```js
ScrollTrigger.create({
  trigger: ".hero", start: "top top", end: "bottom top", scrub: true,
  onUpdate: (self) => scene.setScroll(self.progress),
});
```
Guard for `scene` existence (WebGL may be absent → fallback class already handles it).

- [ ] **Step 3 (optional, decide visually): focal object.** Compare current scattered ring vs. a single dominant machined object. Capture both as screenshots; keep whichever composes stronger. Do not over-scope — if the ring reads well at hero framing, keep it.

**Acceptance criteria:** scrolling the hero visibly slows/reframes the scene; no jank; WebGL-absent fallback still works; reduced-motion unaffected.

- [ ] **Step 4: Verify.** Because scroll state needs motion, capture with motion enabled: launch a second Edge CDP instance *without* `--force-prefers-reduced-motion` on port 9224, or temporarily script a scroll via `Input.dispatchScrollEvent` before capture. Read PNGs at hero-top and hero-bottom scroll positions. Confirm reframing.

- [ ] **Step 5: Commit.**
```
git add vltd.html vltd-scene.js
git commit -m "Make the 3D hero scroll-reactive (turntable settles, gentle dolly)"
```

### Task 5: Interaction layer — interactive configurator

**Files:**
- Modify: `vltd.html` (configurator markup ~`1029-1065`; add `initConfigurator()` to the inline module; a11y roles)

**Goal:** The configurator stops being a static preview — segmented control + swatches toggle, the running total re-rolls.

- [ ] **Step 1: Make controls real + accessible.** Replace `role="img"` on the cooling `.seg` and finish `.swatches` with proper semantics: `role="radiogroup"` on the container, each option `role="radio"` + `tabindex="0"` + `aria-checked`. Give each option a `data-delta` price. Add a base price `data-base` on the panel.

- [ ] **Step 2: Add the logic.** In the inline module, add and call `initConfigurator()`:
```js
function initConfigurator() {
  const panel = document.querySelector("[data-cfg-panel]");
  if (!panel) return;
  const base = +panel.dataset.base || 5200;          // Joule base
  const sumEl = panel.querySelector(".sum");
  const groups = panel.querySelectorAll('[role="radiogroup"]');

  const total = () => {
    let t = base;
    groups.forEach((g) => {
      const on = g.querySelector('[aria-checked="true"]');
      t += on ? (+on.dataset.delta || 0) : 0;
    });
    return t;
  };
  const render = (animate) => {
    const t = total();
    const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");
    if (animate && window.gsap && !reduceMotion) {
      const proxy = { v: +sumEl.dataset.v || base };
      gsap.to(proxy, { v: t, duration: 0.6, ease: "power3.out",
        onUpdate: () => { sumEl.textContent = fmt(proxy.v); } });
    } else { sumEl.textContent = fmt(t); }
    sumEl.dataset.v = t;
  };
  const select = (group, option) => {
    group.querySelectorAll('[role="radio"]').forEach((o) => {
      const on = o === option; o.setAttribute("aria-checked", on); o.classList.toggle("on", on);
    });
    render(true);
  };
  groups.forEach((group) => {
    group.querySelectorAll('[role="radio"]').forEach((option) => {
      option.addEventListener("click", () => select(group, option));
      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(group, option); }
      });
    });
  });
  render(false);
}
```
Call `initConfigurator()` once on DOM ready (independent of GSAP; it degrades to instant totals). Set `data-delta` values so the default selection (Open loop + Oxblood cerakote) reproduces the shown `$6,140` (e.g. base 5200, Open loop +600, Oxblood +340).

- [ ] **Step 3: Verify functionally.** With the motion-enabled CDP instance, script clicks via `Input.dispatchMouseEvent` on an "Air" option and confirm the total drops; capture before/after PNGs. Keyboard: confirm Tab reaches options and Enter selects (manual note in PR).

**Acceptance criteria:** changing cooling/finish updates the total; default = $6,140; keyboard-operable; reduced-motion updates instantly without the roll.

- [ ] **Step 4: Commit.**
```
git add vltd.html
git commit -m "Make the configurator interactive and keyboard-accessible"
```

### Task 6: Interaction layer — brass cursor ring + magnetic CTAs

**Files:**
- Modify: `vltd.html` (add cursor element + CSS + a small `initCursor()`)

- [ ] **Step 1: Add the cursor element + CSS.** A fixed `.cursor-ring` (thin brass circle, `mix-blend-mode: difference` optional, `pointer-events:none`, `z-index` above grain). Hidden on touch (`@media (hover: none)`) and under reduced motion.

- [ ] **Step 2: Logic.** `initCursor()` lerps the ring toward the pointer (framerate-independent, like the scene tilt), and grows/brass-fills it over `[data-magnetic]` targets (the `.btn`s). Add a subtle magnetic pull: on `pointermove` within a button's bounds, translate the button a few px toward the cursor; reset on leave. Respect reduced motion (skip entirely).

**Acceptance criteria:** ring tracks smoothly; CTAs feel magnetic on hover; nothing shows on touch/reduced-motion; no scroll jank.

- [ ] **Step 3: Verify** with the motion CDP instance: move the mouse over a CTA via `Input.dispatchMouseEvent` and capture; confirm ring + nudge. Read PNG.

- [ ] **Step 4: Commit.**
```
git add vltd.html
git commit -m "Add brass cursor ring and magnetic CTAs (hover devices only)"
```

---

## Phase 3 — Polish (the remaining approved improvements)

### Task 7: WebGL context-loss recovery + wire dispose()

**Files:**
- Modify: `vltd-scene.js` (renderer setup + returned API), `vltd.html` (call `dispose()` on `pagehide`)

- [ ] **Step 1: Handle context loss.** After creating the renderer, add listeners:
```js
canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); cancelAnimationFrame(raf); running = false; }, false);
canvas.addEventListener("webglcontextrestored", () => { if (!reducedMotion) { running = true; clock.getDelta(); frame(); } else { renderer.render(scene, camera); } }, false);
```
(These reference the existing `raf`, `running`, `clock`, `frame`, `renderer` in scope.)

- [ ] **Step 2: Use the dead `dispose()`.** In `vltd.html`, register cleanup so `dispose()` isn't dead code:
```js
window.addEventListener("pagehide", () => scene.dispose(), { once: true });
```

**Acceptance criteria:** simulating context loss (`renderer.forceContextLoss()` via console, or `WEBGL_lose_context`) pauses cleanly and restores on restore; no uncaught errors; `dispose()` is referenced.

- [ ] **Step 3: Verify.** Launch with motion; via CDP `Runtime.evaluate` call `getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()` then `.restoreContext()`; confirm no console errors and the scene resumes. Screenshot after restore.

- [ ] **Step 4: Commit.**
```
git add vltd.html vltd-scene.js
git commit -m "Add WebGL context-loss recovery and wire scene disposal"
```

### Task 8: Self-host GSAP (remove CDN single-point-of-failure)

**Files:**
- Create: `public/vendor/gsap/{gsap.min.js,ScrollTrigger.min.js,SplitText.min.js}`
- Modify: `vltd.html` (the three `<script src>` tags ~`17-19`)

- [ ] **Step 1: Download the libs.**
```
mkdir -p public/vendor/gsap
curl -L -o public/vendor/gsap/gsap.min.js https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js
curl -L -o public/vendor/gsap/ScrollTrigger.min.js https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js
curl -L -o public/vendor/gsap/SplitText.min.js https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js
```
Expected: three non-empty `.js` files.

- [ ] **Step 2: Point the page at local copies.** Change the three `<script src="https://cdn.jsdelivr.net/...">` to `src="vendor/gsap/gsap.min.js"` etc. (keep `defer`). Relative path resolves under the dev `base` and at the repo root after relocation.

**Acceptance criteria:** page works fully offline from CDNs (block jsdelivr in DevTools/CDP and confirm animations still run — and that the headline failsafe is now moot because GSAP is local).

- [ ] **Step 3: Verify.** Screenshot desktop; confirm intro + reveals still play with CDN blocked (CDP `Network.setBlockedURLs` for `*jsdelivr*`).

- [ ] **Step 4: Commit.**
```
git add public/vendor/gsap vltd.html
git commit -m "Self-host GSAP to remove the CDN single-point-of-failure"
```

### Task 9: OG/Twitter meta + designed OG card + font CLS

**Files:**
- Create: `public/og/vltd-og.png` (1200×630)
- Modify: `vltd.html` (`<head>` meta ~`6-15`; `@font-face` fallback metrics ~`27-48`)

- [ ] **Step 1: Produce the OG card.** Use `stitch-design` (or hand-build an HTML snippet and screenshot it at 1200×630 with the CDP helper): graphite field, brass VLTD monogram, tagline "Built in series of one." Save to `public/og/vltd-og.png`.

- [ ] **Step 2: Add meta tags** to `<head>`:
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="VLTD — Volta Custom Machines" />
<meta property="og:description" content="Small-batch, hand-assembled performance systems. Twelve commissions a month." />
<meta property="og:image" content="og/vltd-og.png" />
<meta property="og:url" content="https://karumnieks99.github.io/3rd-webpage/" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="VLTD — Volta Custom Machines" />
<meta name="twitter:description" content="An instrument, not a product. Built in series of one." />
<meta name="twitter:image" content="og/vltd-og.png" />
```
(Confirm the final deployed URL with the user before hardcoding `og:url`; GitHub Pages base shown as a sensible default.)

- [ ] **Step 3: Cut font CLS.** Add fallback `@font-face` descriptors with `size-adjust`/`ascent-override` so the fallback (Georgia / Arial) matches Fraunces/Archivo metrics, reducing swap shift. Provide a starting block and tune by comparing pre/post screenshots:
```css
@font-face { font-family: "Fraunces-fallback"; src: local("Georgia"); size-adjust: 96%; ascent-override: 92%; descent-override: 24%; line-gap-override: 0%; }
@font-face { font-family: "Archivo-fallback"; src: local("Arial"); size-adjust: 100%; }
```
Then add the fallbacks into the `--serif`/`--sans` stacks before the generic family.

**Acceptance criteria:** OG image present and referenced; sharing preview valid (validate markup); measured layout shift on reload is negligible.

- [ ] **Step 4: Verify.** Screenshot; read the OG png; reload and eyeball for shift. Validate meta with a quick `curl`/grep of the built HTML.

- [ ] **Step 5: Commit.**
```
git add public/og vltd.html
git commit -m "Add designed OG/Twitter card and reduce font CLS with fallback metrics"
```

### Task 10: Accessibility pass

**Files:**
- Modify: `vltd.html` (skip-link, focus, landmarks)

- [ ] **Step 1: Skip-link.** Add `<a class="skip-link" href="#line">Skip to content</a>` as the first body child; CSS to reveal on focus only. Ensure `main`/`nav`/`footer` landmarks are correct (they are) and the hero has a sensible heading order (h1→h2→h3, already true).

- [ ] **Step 2: Focus + motion parity.** Confirm `:focus-visible` reaches every interactive element (nav links, CTAs, configurator radios, build "Configure" links). Confirm the configurator radios are operable (Task 5). Re-check reduced-motion: all content visible, counters/totals show final values, no axis/scene animation.

**Acceptance criteria:** keyboard-only traversal reaches all controls with visible focus; skip-link works; reduced-motion shows a complete, static page.

- [ ] **Step 3: Verify.** Manual keyboard pass (note in PR); reduced-motion screenshot (the default CDP instance already forces it) confirms full visibility.

- [ ] **Step 4: Commit.**
```
git add vltd.html
git commit -m "Accessibility pass: skip-link, focus order, reduced-motion parity"
```

---

## Phase 4 — Relocate to `3rd-webpage` and ship

### Task 11: Stage the relocation on a branch

**Files (in a fresh clone, not saas-landing):**
- Target: `Karumnieks99/3rd-webpage`

- [ ] **Step 1: Clone the target repo** beside this one:
```
git clone https://github.com/Karumnieks99/3rd-webpage.git "/c/Users/egulb/Desktop/test field/3rd-webpage"
cd "/c/Users/egulb/Desktop/test field/3rd-webpage"
git checkout -b vltd-relaunch
```

- [ ] **Step 2: Remove the Pulse/Forge site** (recoverable via history):
```
git rm index.html pulse-landing-page.html pulse-landing-page.css pulse-landing-page.js \
       driver-downloads.html privacy-policy.html terms-of-service.html aux-pages.css
git rm -r assets
```

- [ ] **Step 3: Copy the finished VLTD in.** From the saas-landing working tree:
```
cp "../SaaS page/vltd.html" index.html
cp "../SaaS page/vltd-scene.js" vltd-scene.js
mkdir -p public/fonts public/vendor public/og
cp "../SaaS page/public/fonts/"*.woff2 public/fonts/
cp -r "../SaaS page/public/vendor/gsap" public/vendor/
cp "../SaaS page/public/og/vltd-og.png" public/og/
```
(`index.html`'s relative refs `fonts/…`, `vendor/gsap/…`, `og/…`, and `./vltd-scene.js` resolve at root because `public/` maps to `/` and `vltd-scene.js` sits at project root.)

- [ ] **Step 4: Rewrite `vite.config.js`** to a single-page default:
```js
import { defineConfig } from "vite";
export default defineConfig({}); // single-page app, index.html is the default entry
```

- [ ] **Step 5: Update `package.json`** name/metadata:
```json
{
  "name": "vltd-volta-custom-machines",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
  "devDependencies": { "vite": "^7.1.0" }
}
```

- [ ] **Step 6: Replace `README.md`** with a short VLTD description (what it is, `npm i`, `npm run dev`, `npm run build`).

- [ ] **Step 7: Build + preview.**
```
npm install
npm run build
npm run preview
```
Expected: clean build; preview serves at the printed port.

- [ ] **Step 8: Verify the built site.** Point `.cdp-shot.mjs` at the preview URL (root, no base): desktop + mobile. Confirm fonts load, hero renders, configurator works, no console errors, no broken asset paths.

- [ ] **Step 9: Commit.**
```
git add -A
git commit -m "Relaunch 3rd-webpage as VLTD — Volta Custom Machines"
```

### Task 12: Push branch and open PR

- [ ] **Step 1: Push.**
```
git push -u origin vltd-relaunch
```

- [ ] **Step 2: Open the PR** (do not merge without user approval):
```
gh pr create --repo Karumnieks99/3rd-webpage --base main --head vltd-relaunch \
  --title "Relaunch as VLTD — Volta Custom Machines" \
  --body "Replaces the Pulse/Forge site with the VLTD landing page. Old pages remain in git history. See screenshots."
```

- [ ] **Step 3: Hand off to user** for PR review + merge decision. Report the PR URL.

---

## Self-review

**Spec coverage:** Hero rework → Tasks 3,4,6. The Line rebuild → Task 1. Doctrine → Task 2. Interactive configurator → Task 5. WebGL context-loss + dispose → Task 7. OG meta/image → Task 9. A11y → Task 10. GSAP de-risk + font CLS → Tasks 8,9. Relocation/replace + index.html + branch/PR → Tasks 11,12. Verification model → Task 0 + per-task gates. The 3 already-applied bug fixes are preserved (no task reverts them). All spec §3–§5 items mapped.

**Placeholder scan:** No "TBD/handle edge cases" left; deterministic tasks carry full code; creative tasks (1,3,4) carry explicit acceptance criteria + concrete verification commands rather than fabricated final CSS, which is the honest unit of work for design iteration. `og:url` and `size-adjust` values are flagged as "confirm/tune," not silent guesses.

**Type/name consistency:** Scene API names used consistently — `setPointer`, `setScroll(p)`, `pause`, `resume`, `dispose`. Page hooks consistent — `data-cfg-panel`, `data-build`, `data-count`, `data-split`, `[data-magnetic]`. Configurator uses `aria-checked`/`role="radio"` consistently between Task 5 steps 1 and 2.

**Open items to confirm during execution:** final deployed URL for `og:url`; whether to keep the scattered-ring hero or a single focal object (Task 4 Step 3, decided visually); GitHub Pages enablement (out of scope unless requested).
