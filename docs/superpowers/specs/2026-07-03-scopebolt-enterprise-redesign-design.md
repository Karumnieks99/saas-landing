# ScopeBolt enterprise redesign — design spec

Date: 2026-07-03
Status: approved via /goal directive (autonomous session)

## Goal

Rebuild the ScopeBolt landing page (live at karumnieks99.github.io/saas-landing/) in the
visual language of enterprise B2B field-service software — reference: ServiceTitan —
instead of generic startup SaaS. The page persuades an ops/purchasing decision-maker
while the primary end-user (foreman/crew lead) reads it on a phone.

## Non-negotiables (from the brief)

- Hero leads with a concrete dollar-impact stat in large type: **"$4,200 lost per job to
  unbilled scope creep"** (keep the existing pain-point number). No abstract tagline lead.
- Tone: authoritative, dense, proof-driven. Structured data blocks, stat callouts,
  one confident accent color. No gradients, glassmorphism, or bento grids.
- Typography: strong sans hierarchy, tight and functional. No editorial serif.
- Required sections: quantified ROI/impact stats; feature breakdown in trade language
  (change orders, punch lists, job costing); testimonial/proof styled like enterprise
  case studies (name, company, trade, photo).
- Mobile-first responsive.
- Avoid: soft rounded corners, pastel gradients, illustration-heavy hero,
  centered-hero-plus-three-cards template layout.

## Design direction

**"Job-cost ledger, not brochure."** The page borrows the visual authority of field-service
enterprise software: hairline-ruled data tables, tabular numerals, uppercase micro-labels,
sharp corners, a near-black ink surface plus one industrial orange. Every section carries
a number. Photography is real jobsite imagery, duotone-treated to brand.

### Type

- **Archivo** (self-hosted variable, `public/fonts/archivo-latin-var.woff2`) for display,
  headings, nav, buttons — heavy weights (650–800), tight tracking. Reads industrial
  grotesk / enterprise, not editorial.
- **Geist Mono** (already self-hosted) for all data: stats, dollar figures, table cells,
  micro-labels. Tabular numerals throughout.
- Instrument Serif is removed entirely (with its preload).
- Body copy also Archivo at 400–450 — one sans family total keeps the system tight.

### Color

- Ink neutrals: near-black `#0c0e10` page-dark / `#141619` panels, warm-gray steel ramp
  for light sections (off-white `#f4f4f2` rather than pure white, to read "print spec
  sheet" not "startup white").
- **Single accent: ScopeBolt orange `#e8440a`** (brand continuity + safety-orange trade
  connotation). Used for: flagged/out-of-scope data, key stats, primary CTA, rules.
- The emerald "money badge" system is removed. Positive/signed states are expressed with
  ink-filled chips + check glyphs; recovered dollars read in orange or ink. One accent.
- No gradients anywhere. Flat fills and hairlines only.

### Shape & density

- Radius: 0 on panels/sections/tables; 2px max on small controls. No pills except none.
- Hairline rules (`1px`) structure everything — table rows, stat grids, section frames.
- Denser vertical rhythm than the old page: sections at 56–88px padding, content blocks
  butt against shared rules instead of floating with gaps.
- Container widens to 1120px to support dense multi-column data layouts.

## Page structure (top to bottom)

1. **Utility bar** — thin ink strip: "Built for commercial subcontractors — Electrical ·
   Mechanical · Concrete" + contact mailto. Enterprise convention, sets tone instantly.
2. **Nav** — flat, sharp; logo, links, "Book a demo" as the loud orange CTA (enterprise
   is demo-led; trial becomes secondary throughout).
3. **Hero (stat-led, asymmetric)** — giant mono/tabular "$4,200" with "lost per job to
   unbilled scope creep" lockup; source footnote line ("Avg. across 410 subs on
   ScopeBolt · 2025 job data") for proof discipline; sub-paragraph naming the mechanism
   (log → check against contract → signed CO); dual CTA. Right/below: the live scope-log
   product evidence, rebuilt sharp and dense. On mobile the stat stacks above the log.
4. **ROI stat band** — 4 quantified blocks in a ruled grid: $2.7M recovered, 410 crews,
   94% retention, 1-day CO turnaround. Count-up on view, tabular numerals, footnotes.
5. **Workflow ledger** — "From field note to signed change order": the five workflow
   steps as numbered ledger rows (time-stamped, status-chipped) rather than cards.
6. **Feature breakdown in trade language** — dense two-column ruled table of six
   capability rows: Change orders · Punch lists · Job costing · T&M tickets · Contract
   baseline / SOV · Dispute archive. Each row: uppercase label, plain-language promise,
   supporting data detail. (Punch lists and job costing are new copy the brief requires.)
7. **Trades served** — electrical / mechanical / concrete with per-trade recovered
   figures, as ruled columns.
8. **Case studies (proof)** — styled like enterprise case studies. Featured study:
   duotone-treated jobsite photo (`public/img/field-worker.jpg`), pull quote, and a
   spec-sheet sidebar (Company / Trade / Crew size / Recovered). Two supporting studies
   as ruled text rows with company monogram tiles and the same spec-line format.
   Names/companies/trades carry over from existing testimonial content.
9. **Pricing** — single plan, restyled as a rate card: big mono $79, ruled two-column
   feature list, ROI line ("pays for itself with one signed CO").
10. **FAQ** — kept, tightened to the ruled-row system.
11. **Final CTA** — full-bleed ink band echoing the hero stat ("Every job without it
    costs you $4,200.").
12. **Footer** — heavier enterprise footer: link columns + compliance line (SOC 2,
    5-year archive), copyright.

## Content

Existing de-slopped copy carries over where it fits; hero and features get rewritten
to stat-led / trade-language framing. All figures already on the page ($4,200, $2.7M,
410, 94%, $79) are retained. New copy invents nothing numerically beyond a 1-day CO
turnaround figure already present in use-case tags.

## Motion & a11y

- GSAP scroll reveals kept but restrained: short fades/rises, ledger rows cascade;
  count-up numbers on stats. Full `prefers-reduced-motion` parity as today.
- Skip link, focus-visible states, drawer focus management, semantic headings retained.
- Fonts self-hosted with preloads updated (drop Instrument Serif, add Archivo).

## Scope of change

- `src/scopebolt-tokens.css` — rewritten token sheet.
- `src/ScopeBolt.jsx` — rebuilt sections (single-file structure and CONTENT-constants
  pattern preserved).
- `index.html` — font preloads, title/description updated to stat-led framing.
- FlowPilot.jsx / index.css untouched. OG image kept as-is.

## Alternatives considered

- **Keep Geist for headings** — rejected: Geist reads "startup SaaS"; Archivo's grotesk
  weight carries the field-service enterprise tone and is already self-hosted.
- **Dark-first page** (ink background throughout) — rejected: harder to keep dense data
  legible on phones outdoors; light "spec sheet" surfaces with ink bands frame proof
  better and photograph well next to ServiceTitan's language.
- **Add stock portraits for all three case studies** — rejected: only one licensed photo
  exists in-repo; one photographed featured study plus ruled text studies is honest and
  still satisfies the enterprise case-study format.
