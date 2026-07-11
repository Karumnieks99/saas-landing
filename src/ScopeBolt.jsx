/**
 * ScopeBolt.jsx — the ScopeBolt marketing landing page (single-file React).
 * A fictional SaaS for commercial subcontractors: it logs field changes, checks
 * them against the signed contract, and turns out-of-scope work into signed
 * change orders.
 *
 * Visual direction: enterprise field-service software ("job-cost ledger, not
 * brochure") — hairline-ruled data blocks, tabular numerals, sharp corners,
 * one industrial orange on warm-paper neutrals with a near-black ink frame.
 * See docs/superpowers/specs/2026-07-03-scopebolt-enterprise-redesign-design.md.
 *
 * Structure: all page copy lives in the CONTENT constants just below; each
 * section is a self-contained presentational component; <ScopeBolt/> at the
 * bottom composes them in order. GSAP + ScrollTrigger drive the scroll-reveal
 * motion (with a prefers-reduced-motion fallback). Visual design tokens come
 * from scopebolt-tokens.css.
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CaretDown, Check, List, WarningDiamond, X } from "@phosphor-icons/react";
import "./scopebolt-tokens.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/* ============================================================================
   CONTENT
   All page copy lives here so layout components stay focused on presentation.
   ========================================================================== */

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Product", href: "#product" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const CONTACT_EMAIL = "hello@scopebolt.com";
// Primary CTAs route like product pages (public/404.html catches them on the
// static deploy); the plain mailto stays on utility-bar and footer email links.
const DEMO_CTA_HREF = `${import.meta.env.BASE_URL}demo`;
const TRIAL_CTA_HREF = `${import.meta.env.BASE_URL}signup`;
const DEMO_LABEL = "Book a demo";
const TRIAL_LABEL = "Start free trial";

// Sync strip under the hero: the office systems ScopeBolt syncs with, set as
// type-only wordmarks. Mirrors INTEGRATION_LINE in the capabilities section.
const SYNC_SYSTEMS = ["Procore", "Buildertrend", "QuickBooks", "Sage", "Viewpoint"];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Status"];

// The hero scope-log ledger: one morning on a live job, field note to signature.
const LOG_ROWS = [
  { t: "09:42", desc: 'Added 40 LF of 2" conduit run', base: "In contract", kind: "logged" },
  { t: "09:43", desc: "Reroute feeders around new duct bank", base: "Not in baseline", kind: "flag", amount: "+$1,240" },
  { t: "10:01", desc: "CO-118 sent to GC for signature", base: "Pending sign-off", kind: "sent" },
  { t: "10:14", desc: "CO-118 signed by Riverfront GC", base: "Approved", kind: "signed", amount: "+$1,240" },
];

// The demo wire: the hero LOG_ROWS morning retold as a ticker — sample data
// from the one demo job (Riverfront Medical, Job 4417), matching ChangeOrderDoc.
// If that narrative changes, update it here and there too.
const TICKER_ITEMS = [
  { t: "09:42", body: '40 LF of 2" conduit logged · in contract' },
  { t: "09:43", figure: "+$1,240", body: "feeder reroute flagged · not in baseline" },
  { t: "10:01", body: "CO-118 drafted and sent for signature" },
  { t: "10:14", body: "CO-118 signed by the GC · 31 min after the flag" },
  { t: "10:15", figure: "+$1,240", body: "posted to the schedule of values" },
];

const WORKFLOW = [
  {
    t: "09:42",
    title: "Foreman logs the change",
    body: "Photo, voice, or text from the field, tied to the job and timestamped to the minute.",
    chip: { label: "Logged", kind: "neutral" },
  },
  {
    t: "09:42",
    title: "Checked against the baseline",
    body: "ScopeBolt compares the entry to the signed contract and schedule of values.",
    chip: { label: "In contract", kind: "neutral" },
  },
  {
    t: "09:43",
    title: "Out-of-scope work flagged",
    body: "Anything outside the baseline is flagged instantly, with the dollar value attached.",
    chip: { label: "+$1,240 flagged", kind: "flag" },
  },
  {
    t: "10:01",
    title: "Change order drafted and sent",
    body: "A GC-ready CO with the photo, field note, and contract reference built in.",
    chip: { label: "CO-118 sent", kind: "neutral" },
  },
  {
    t: "10:14",
    title: "GC signs before crews start",
    body: "Digital signature from any device. Crews don't start until it's signed.",
    chip: { label: "Signed", kind: "signed" },
  },
];

// The document register: every paperwork type ScopeBolt produces, coded the
// way a spec book indexes documents.
const CAPABILITIES = [
  {
    code: "CO",
    label: "Change orders",
    promise: "GC-ready COs in one tap",
    body: "Flagged work becomes a priced, professional change order with the photo and contract reference attached.",
  },
  {
    code: "PL",
    label: "Punch lists",
    promise: "Catch the extras hiding in closeout",
    body: "Every punch item is checked against the baseline, so out-of-scope fixes become billable COs instead of free labor.",
  },
  {
    code: "JC",
    label: "Job costing",
    promise: "See margin drift while the job runs",
    body: "Every change posts to its cost code and the schedule of values, so drift shows up in dollars before closeout.",
  },
  {
    code: "TM",
    label: "T&M tickets",
    promise: "Verbal directives, documented",
    body: "A directive becomes a time-and-material ticket with labor, equipment, and photos attached the same day.",
  },
  {
    code: "CB",
    label: "Contract baseline",
    promise: "The signed scope, machine-read",
    body: "Upload the contract and schedule of values once. ScopeBolt builds the baseline every field entry is checked against.",
  },
  {
    code: "DA",
    label: "Dispute archive",
    promise: "Five years of proof on demand",
    body: "Every entry, photo, and signature is archived. When a GC disputes a CO, pull the record and get paid.",
  },
];

const INTEGRATION_LINE =
  "Two-way sync with Procore, Buildertrend, QuickBooks, Sage, and Viewpoint. No double entry.";

const TRADES = [
  {
    trade: "Electrical",
    body: "The GC asks for one more circuit? That's a T&M ticket before lunch.",
  },
  {
    trade: "Mechanical",
    body: "Equipment swaps and access delays, captured with photo and timestamp proof.",
  },
  {
    trade: "Concrete",
    body: "Weather standby documented down to the minute. Pour changes priced the same day.",
  },
];

// The platform spec sheet: what ships in the product, written the way a
// submittal lists it. Product capabilities only — no customer, usage, or
// outcome claims belong in this section.
const PLATFORM_SPECS = [
  {
    heading: "Field app",
    rows: [
      { k: "Capture", v: "Photo · Voice · Text" },
      { k: "Offline mode", v: "Logs locally, syncs on signal" },
      { k: "Devices", v: "iOS · Android · Web" },
      { k: "Baseline check", v: "Automatic, per entry" },
    ],
  },
  {
    heading: "Office console",
    rows: [
      { k: "Change orders", v: "Branded PDF, e-sign link" },
      { k: "Job costing", v: "Posts to SOV cost codes" },
      { k: "Integrations", v: "Procore · QuickBooks · Sage" },
      { k: "Archive", v: "Every entry, photo, signature" },
    ],
  },
];

const PRICING_FIELD = [
  "Photo, voice, and text capture, offline-ready",
  "Unlimited jobs and change orders",
  "One-tap CO with digital GC sign-off",
];

const PRICING_OFFICE = [
  "Contract baseline and out-of-scope alerts",
  "Job costing against the schedule of values",
  "Procore, Buildertrend, and QuickBooks sync",
  "5-year dispute-proof archive",
  "Phone support that picks up",
];

const FAQ_ITEMS = [
  {
    q: "Does ScopeBolt replace Procore?",
    a: "No. ScopeBolt sits alongside Procore and Buildertrend and syncs with them. It owns the one thing those tools do poorly for subs: capturing scope changes in the field and turning them into signed change orders.",
  },
  {
    q: "Can field crews use it on mobile?",
    a: "Yes. The field app is built mobile-first for foremen. They log a change by photo, voice, or text in under 30 seconds. No training required.",
  },
  {
    q: "Can I export change orders as PDF?",
    a: "Every change order generates a clean, branded PDF with the photo, field note, and contract reference attached. Email it, print it, or push it to your accounting tool.",
  },
  {
    q: "Can GCs sign digitally?",
    a: "Yes. GCs get a secure link, review the CO, and sign on any device. You see the signed status the second it happens. No account required on their end.",
  },
  {
    q: "Does it work for electrical, mechanical, and concrete subs?",
    a: "ScopeBolt is built specifically for commercial subcontractors in those trades. The scope log, baseline comparison, and CO templates are tuned for trade work, not general contracting.",
  },
  {
    q: "What happens if there's no internet on-site?",
    a: "The field app works fully offline. Entries, photos, and voice notes are saved locally and sync automatically the moment the device gets signal.",
  },
  {
    q: "Can I invite PMs, foremen, and office staff?",
    a: "Yes. Unlimited users on every plan. Set role-based access so the field logs, the office bills, and PMs see everything in one place.",
  },
  {
    q: "Is my contract and job data secure?",
    a: "Job data is encrypted in transit and at rest, with a 5-year retention archive. Your data is yours and exportable at any time.",
  },
];

/* ============================================================================
   HOOKS & HELPERS
   ========================================================================== */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Reveal a section once when it first enters the viewport.
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, vis];
}

// Count a numeric stat up from zero once it is visible. Keeps one decimal
// place when the target has one (e.g. 2.7), whole numbers otherwise.
function useCounter(target, dur = 1200, go = false) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!go) return;

    let t0 = null;
    let raf;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dur, go, target]);

  return n;
}

function formatStat(n, target) {
  const decimals = Number.isInteger(target) ? 0 : 1;
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// In-view counter with the reduced-motion fallback baked in: returns a ref for
// the observed node and the formatted display string. One source of truth for
// every counted figure on the page.
function useCountedStat(target, { dur = 1300, threshold = 0.5 } = {}) {
  const [ref, vis] = useInView(threshold);
  const count = useCounter(target, dur, vis);
  const display = prefersReducedMotion() ? formatStat(target, target) : formatStat(count, target);
  return [ref, display];
}

/* ============================================================================
   PRIMITIVES
   ========================================================================== */

function Wrap({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-8 ${className}`}>{children}</div>;
}

function SectionHeading({ children, tone = "light", className = "" }) {
  return <h2 className={`sb-h2 ${tone === "dark" ? "sb-h2--dark" : ""} ${className}`}>{children}</h2>;
}

const BTN_VARIANTS = {
  primary: "sb-btn--primary",
  secondary: "sb-btn--secondary",
  outlineDark: "sb-btn--outline-dark",
};

function Cta({ href, variant = "primary", size, withArrow = false, children, className = "" }) {
  return (
    <a
      href={href}
      className={`sb-btn group ${BTN_VARIANTS[variant] || BTN_VARIANTS.primary} ${size === "sm" ? "sb-btn--sm" : ""} ${className}`}
    >
      {children}
      {withArrow ? (
        <ArrowRight size={15} weight="bold" className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
      ) : null}
    </a>
  );
}

// Ledger status chip: the one place status is allowed a color, because it is
// data (in scope / out of scope / signed), not decoration.
function Chip({ kind = "neutral", children, className = "" }) {
  const kinds = {
    neutral: "sb-chip--neutral",
    flag: "sb-chip--flag",
    signed: "sb-chip--signed",
  };
  return (
    <span className={`sb-chip ${kinds[kind] || kinds.neutral} ${className}`}>
      {kind === "flag" ? <WarningDiamond size={11} weight="bold" aria-hidden="true" /> : null}
      {kind === "signed" ? <Check size={11} weight="bold" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

/* ============================================================================
   NAVBAR + MOBILE DRAWER
   ========================================================================== */

// The brand mark — bold "B" monogram on an orange tile, squared to match the
// page's sharp-corner system.
function LogoMark({ className = "h-7 w-7" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" role="img" aria-label="ScopeBolt logo mark">
      <rect width="64" height="64" rx="8" fill="var(--brand)" />
      <path
        d="M17 22c0-5 4-9 9-9h12c5 0 9 4 9 9 0 3-1 5-3 7 2 2 3 4 3 7 0 8-6 13-15 13H17V22Zm10-1v7h10c2 0 4-1 4-4s-2-3-4-3H27Zm0 13v9h7c5 0 7-2 7-5 0-2-1-4-6-4H27Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function Logo({ dark = false, className = "text-[17px]" }) {
  return (
    <a
      href="#top"
      className={`flex items-center gap-2 font-bold tracking-tight ${dark ? "text-[color:var(--text-on-dark)]" : "text-[color:var(--text-strong)]"} ${className}`}
      style={{ fontWeight: "var(--fw-bold)" }}
    >
      <LogoMark />
      <span>
        Scope<span className="text-[color:var(--accent-strong)]">Bolt</span>
      </span>
    </a>
  );
}

function UtilityBar() {
  return (
    <div className="bg-[var(--surface-dark)] text-[color:var(--text-dim-dark)]">
      <Wrap className="flex h-9 items-center justify-between gap-4 text-[12px]">
        <span className="truncate">
          <span className="hidden sm:inline">Built for commercial trade subcontractors: electrical, mechanical, concrete</span>
          <span className="sm:hidden">For commercial trade subcontractors</span>
        </span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="sb-mono flex-shrink-0 text-[11px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)]">
          {CONTACT_EMAIL}
        </a>
      </Wrap>
    </div>
  );
}

function Drawer({ open, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Keep the off-canvas panel out of the tab order + a11y tree when closed.
    if (panelRef.current) panelRef.current.inert = !open;
    if (open) {
      closeRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      // Return focus to the trigger when the drawer closes (not on first mount).
      document.getElementById("menu-button")?.focus();
      wasOpen.current = false;
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 flex w-[300px] flex-col border-l border-[color:var(--border)] bg-[var(--surface-page)] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-[56px] items-center justify-between border-b border-[color:var(--border)] px-5">
          <Logo className="text-[15px]" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center text-[color:var(--text-strong)] active:bg-[var(--gray-150)] touch-manipulation"
          >
            <X size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={onClose}
              className="flex items-center border-b border-[color:var(--gray-150)] px-5 py-3.5 text-[15px] font-medium text-[color:var(--text-body)] active:bg-[var(--gray-150)] touch-manipulation"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-[color:var(--border)] p-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <a href={TRIAL_CTA_HREF} onClick={onClose} className="sb-btn sb-btn--secondary w-full">
            {TRIAL_LABEL}
          </a>
          <a href={DEMO_CTA_HREF} onClick={onClose} className="sb-btn sb-btn--primary w-full">
            {DEMO_LABEL}
          </a>
        </div>
      </div>
    </>
  );
}

function Navbar({ onOpenMenu, expanded }) {
  return (
    <nav className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[var(--surface-page)]">
      {/* Page-progress rule: fills left to right as the reader moves down. */}
      <span aria-hidden="true" data-nav-progress className="sb-nav-progress" />
      <Wrap className="flex h-[60px] items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-2.5 py-2 text-[13.5px] font-medium text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)] xl:px-3"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Cta href={DEMO_CTA_HREF} variant="primary" size="sm">
            {DEMO_LABEL}
          </Cta>
        </div>
        <button
          type="button"
          id="menu-button"
          aria-expanded={expanded}
          aria-controls="mobile-drawer"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center text-[color:var(--text-strong)] active:bg-[var(--gray-150)] touch-manipulation lg:hidden"
        >
          <List size={20} weight="bold" aria-hidden="true" />
        </button>
      </Wrap>
    </nav>
  );
}

/* ============================================================================
   HERO  —  the dollar figure is the headline; the scope ledger is the proof
   ========================================================================== */

function ScopeLedger() {
  const reduce = prefersReducedMotion();
  const [ref, recovered] = useCountedStat(3180, { threshold: 0.35 });

  return (
    <div ref={ref} className="border border-[color:var(--border)] border-t-2 border-t-[color:var(--border-heavy)] bg-[var(--surface-card)]">
      <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--border)] px-4 py-3 sm:px-5">
        <span className="sb-label text-[color:var(--text-strong)]">Scope log</span>
        <span className="sb-mono text-[11px] text-[color:var(--text-muted)]">Riverfront Medical, Job 4417</span>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[color:var(--gray-150)]">
            <th scope="col" className="sb-label w-[52px] px-4 py-2 text-left font-normal text-[color:var(--text-muted)] sm:px-5">
              Time
            </th>
            <th scope="col" className="sb-label px-1 py-2 text-left font-normal text-[color:var(--text-muted)]">
              Entry
            </th>
            <th scope="col" className="sb-label px-4 py-2 text-right font-normal text-[color:var(--text-muted)] sm:px-5">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {LOG_ROWS.map((r, i) => {
            const isFlag = r.kind === "flag";
            return (
              <tr
                key={r.t + r.desc}
                className={`log-row border-b border-[color:var(--gray-150)] align-top ${isFlag ? "bg-[var(--flag-fill)]" : ""}`}
                style={reduce ? undefined : { animationDelay: `${0.55 + i * 0.16}s` }}
              >
                <td className="sb-mono px-4 py-3 text-[12px] tabular-nums text-[color:var(--text-muted)] sm:px-5">{r.t}</td>
                <td className="px-1 py-3">
                  <div className="text-[13.5px] leading-snug text-[color:var(--text-body)]">{r.desc}</div>
                  <div className={`sb-mono mt-0.5 text-[10px] uppercase tracking-[0.08em] ${isFlag ? "text-[color:var(--accent-strong)]" : "text-[color:var(--text-muted)]"}`}>
                    {r.base}
                  </div>
                </td>
                <td className="px-4 py-3 text-right sm:px-5">
                  {r.kind === "logged" && <Chip kind="neutral">Logged</Chip>}
                  {r.kind === "flag" && <Chip kind="flag">{r.amount}</Chip>}
                  {r.kind === "sent" && <Chip kind="neutral">Sent</Chip>}
                  {r.kind === "signed" && <Chip kind="signed">{r.amount}</Chip>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-between gap-3 border-t-2 border-[color:var(--border-heavy)] px-4 py-3.5 sm:px-5">
        <div>
          <div className="sb-label text-[color:var(--text-strong)]">Recovered on this job</div>
          <div className="sb-mono mt-0.5 text-[11px] text-[color:var(--text-muted)]">CO-112 · CO-115 · CO-118 signed</div>
        </div>
        <div className="sb-mono text-[26px] font-medium tabular-nums leading-none text-[color:var(--accent-strong)] sm:text-[30px]">
          ${recovered}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" data-hero className="relative overflow-hidden bg-[var(--surface-page)]">
      {/* Faint engineering-grid texture, masked so it fades before the fold. */}
      <div aria-hidden="true" className="sb-grid-texture absolute inset-0" />
      <Wrap className="relative grid items-center gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-6">
          <h1>
            <span data-hero-stat className="sb-stat-hero block text-[color:var(--brand)]">+$1,240</span>
            <span data-hero-display className="sb-display mt-3 block max-w-[16ch] text-[length:var(--fs-display-1)] text-[color:var(--text-strong)]">
              flagged in the field, GC-signed 31 minutes later.
            </span>
          </h1>
          <p data-hero-seq className="sb-mono mt-4 max-w-md text-[11.5px] leading-relaxed text-[color:var(--text-muted)]">
            From the sample scope log: one out-of-scope change, flagged 09:43, signed 10:14.
          </p>
          <p data-hero-seq className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-[color:var(--text-body)] sm:text-[length:var(--fs-lead)]">
            ScopeBolt logs every field change against the signed contract and turns out-of-scope work into a GC-signed
            change order.
          </p>
          <div data-hero-seq className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Cta href={DEMO_CTA_HREF} variant="primary" withArrow>
              {DEMO_LABEL}
            </Cta>
            <Cta href={TRIAL_CTA_HREF} variant="secondary">
              {TRIAL_LABEL}
            </Cta>
          </div>
        </div>

        <div data-hero-ledger className="lg:col-span-6">
          {/* Carbon-copy stack: change orders ship in triplicate. */}
          <div className="sb-carbon relative">
            <ScopeLedger />
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   SYNC STRIP  —  one hairline-ruled row of integration wordmarks, type only
   ========================================================================== */

function SyncStrip() {
  return (
    <section aria-label="Systems ScopeBolt syncs with" className="border-t border-[color:var(--border)] bg-[var(--surface-page)]">
      <Wrap>
        <div data-reveal className="flex flex-wrap items-baseline gap-x-7 gap-y-2.5 py-5 sm:gap-x-9 sm:py-6">
          <span className="sb-label text-[color:var(--text-faint)]">Two-way sync with</span>
          {SYNC_SYSTEMS.map((name) => (
            <span key={name} className="sb-mono text-[12px] uppercase tracking-[0.08em] text-[color:var(--text-muted)]">
              {name}
            </span>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   FIELD WIRE  —  thin ink strip: live change-order events across jobs
   ========================================================================== */

function WireTrack({ hidden }) {
  return (
    <ul aria-hidden={hidden ? "true" : undefined} className="sb-wire-track flex flex-none list-none items-center">
      {TICKER_ITEMS.map((it, i) => (
        <li key={i} className="flex items-baseline gap-2.5 whitespace-nowrap pr-12">
          <span className="sb-mono text-[11px] tabular-nums text-[color:var(--text-dim-dark)]">{it.t}</span>
          <span className="text-[12.5px] text-[color:var(--text-dim-dark)]">
            {it.figure ? (
              <>
                <span className="sb-mono tabular-nums text-[color:var(--accent-on-dark)]">{it.figure}</span>{" "}
              </>
            ) : null}
            {it.body}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FieldWire() {
  return (
    <div className="sb-wire bg-[var(--surface-dark)]" aria-label="Sample change-order activity from the demo job, Riverfront Medical">
      <div className="flex h-11 w-full items-stretch">
        <div className="flex flex-shrink-0 items-center gap-2 border-r border-[color:var(--border-dark)] px-4 sm:px-5">
          <span aria-hidden="true" className="sb-wire-dot h-1.5 w-1.5 bg-[var(--accent-on-dark)]" />
          <span className="sb-label text-[color:var(--text-dim-dark)]">Demo wire</span>
        </div>
        {/* Marquee is decorative for AT: the label above carries the meaning. */}
        <div aria-hidden="true" className="sb-wire-viewport flex min-w-0 flex-1 items-center overflow-hidden pl-6">
          <WireTrack />
          <WireTrack hidden />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   WORKFLOW  —  timestamped ledger, field note to signature
   ========================================================================== */

function Workflow() {
  return (
    <section id="how" className="bg-[var(--surface-page)]">
      <Wrap className="py-14 sm:py-20 lg:py-24">
        <div data-reveal>
          <SectionHeading className="max-w-xl">From field note to signed change order in one shift.</SectionHeading>
        </div>
        <div data-wf className="sb-wf mt-9 max-w-3xl sm:mt-12">
          {/* The rule beside the timestamps draws with scroll; rows tick on as it passes. */}
          <div aria-hidden="true" className="sb-wf-line">
            <i data-wf-progress className="sb-wf-progress" />
          </div>
          <ol data-reveal-group className="list-none border-t-2 border-[color:var(--border-heavy)]">
          {WORKFLOW.map((step) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[52px_1fr] items-start gap-x-4 border-b border-[color:var(--border)] py-5 sm:grid-cols-[72px_1fr_auto] sm:gap-x-6 sm:py-6"
            >
              <span aria-hidden="true" className="sb-wf-marker" />
              <span className="sb-wf-time sb-mono pt-0.5 text-[13px] tabular-nums text-[color:var(--text-muted)]">{step.t}</span>
              <div>
                <h3 className="text-[16px] font-semibold leading-snug text-[color:var(--text-strong)]" style={{ fontWeight: "var(--fw-semibold)" }}>
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{step.body}</p>
              </div>
              <div className="col-start-2 mt-2.5 sm:col-start-3 sm:mt-0.5">
                <Chip kind={step.chip.kind}>{step.chip.label}</Chip>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   CAPABILITIES  —  the document register + the CO sheet it produces
   ========================================================================== */

// A believable GC-ready change order, rendered as a crisp sheet. This is the
// product artifact the register on the left produces.
function ChangeOrderDoc() {
  const meta = [
    {
      label: "Project",
      value: (
        <>
          Riverfront Medical Center — <span className="sb-mono">Job 4417</span>
        </>
      ),
    },
    { label: "To", value: "Riverfront GC, LLC" },
    { label: "From", value: "Acme Electric Co." },
    { label: "Date", value: <span className="sb-mono">Mar 14, 2026</span> },
    {
      label: "Contract ref",
      value: <span className="sb-mono">Section 26 05 19 · SOV line 14</span>,
    },
  ];

  const items = [
    { desc: "Journeyman labor @ $98/hr", qty: "8.0 hr", amount: "$784.00" },
    { desc: '2" RMC conduit + fittings', qty: "120 LF", amount: "$312.00" },
    { desc: "Equipment: bender, lift (half day)", qty: "0.5 day", amount: "$144.00" },
  ];

  const cellLabel = "sb-label pb-1.5 font-normal text-[color:var(--text-muted)]";

  return (
    <figure
      data-co-doc
      className="relative border border-[color:var(--border)] border-t-2 border-t-[color:var(--border-heavy)] bg-white px-5 py-5 text-[13px] leading-snug text-[color:var(--text-body)]"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="sb-label text-[color:var(--text-muted)]">Change Order</div>
          <div className="sb-mono mt-1 text-[26px] font-semibold leading-none tracking-tight text-[color:var(--text-strong)]">
            CO-118
          </div>
        </div>
        <div className="sb-mono shrink-0 pt-0.5 text-right text-[10.5px] leading-[1.7] text-[color:var(--text-faint)]">
          Generated by ScopeBolt
          <br />
          10:01 CST
        </div>
      </header>

      <dl className="mt-4 border-t border-[color:var(--border)]">
        {meta.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-[color:var(--gray-150)] py-[7px]"
          >
            <dt className="sb-label shrink-0 text-[color:var(--text-muted)]">{row.label}</dt>
            <dd className="min-w-0 break-words text-right text-[12.5px] text-[color:var(--text-strong)]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-4">
        <div className="sb-label text-[color:var(--text-muted)]">Scope of Change</div>
        <p className="mt-1.5 text-[12.5px]">
          Reroute 480V feeders around new duct bank per GC field directive. Work falls outside
          baseline contract scope.
        </p>
        <span className="sb-mono mt-2 inline-block border border-[color:var(--flag-line)] bg-[color:var(--flag-fill)] px-2 py-[3px] text-[10px] uppercase tracking-[0.12em] text-[color:var(--accent-strong)]">
          Not in Baseline
        </span>
      </section>

      <table className="mt-4 w-full">
        <thead>
          <tr className="border-b border-[color:var(--border)]">
            <th className={`${cellLabel} text-left`}>Description</th>
            <th className={`${cellLabel} pl-3 text-right`}>Qty</th>
            <th className={`${cellLabel} pl-3 text-right`}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.desc} className="border-b border-[color:var(--gray-150)]">
              <td className="break-words py-2 pr-3 text-[12.5px]">{item.desc}</td>
              <td className="sb-mono whitespace-nowrap py-2 pl-3 text-right text-[12px] tabular-nums text-[color:var(--text-muted)]">
                {item.qty}
              </td>
              <td className="sb-mono whitespace-nowrap py-2 pl-3 text-right text-[12.5px] tabular-nums text-[color:var(--text-strong)]">
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="sb-label border-t-2 border-[color:var(--border-heavy)] pt-3 align-baseline text-[color:var(--text-strong)]">
              Total This Change Order
            </td>
            <td className="sb-mono whitespace-nowrap border-t-2 border-[color:var(--border-heavy)] pt-3 pl-3 text-right align-baseline text-[19px] font-semibold leading-none tabular-nums text-[color:var(--accent-strong)]">
              $1,240.00
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-5 grid grid-cols-2 divide-x divide-[color:var(--gray-150)] border-t border-[color:var(--border)] pt-3.5">
        {[
          {
            role: "Submitted",
            name: "J. Doe, Acme Electric · 10:01",
            pad: "pr-4",
            d: "M6 19c5-11 8-13 9-8 1 4-2 9 1 8 4-1 6-12 10-11 3 1-1 10 3 9 5-2 8-11 13-9 3 1 0 8 4 7 6-2 12-8 20-6 7 1 15-3 25-4 8-1 15 2 23 7",
          },
          {
            role: "Approved",
            name: "R. Whitfield, Riverfront GC · 10:14",
            pad: "pl-4",
            d: "M8 18c3-9 6-14 8-10 2 5-4 11 0 11 5 0 8-14 14-13 4 1-2 12 2 11 6-2 9-10 16-9 5 1 8 5 15 3 8-3 16-2 24-1 7 1 15-3 23 3",
          },
        ].map((s) => (
          <div key={s.role} className={`min-w-0 ${s.pad}`}>
            <div className="sb-label text-[color:var(--text-muted)]">{s.role}</div>
            <svg viewBox="0 0 120 26" className="mt-1 h-6 w-full max-w-[130px] text-[color:var(--text-strong)]" aria-hidden="true">
              <path d={s.d} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <div className="mt-0.5 border-t border-[color:var(--gray-150)] pt-1">
              <span className="sb-mono text-[10.5px] text-[color:var(--text-muted)]">{s.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Root useGSAP animates this stamping in via data-co-stamp. */}
      <div
        data-co-stamp
        className="sb-mono pointer-events-none absolute bottom-[31%] right-[10%] rotate-[-7deg] select-none border-2 border-[color:var(--accent-strong)] bg-[rgba(232,68,10,0.06)] px-3.5 py-1.5 text-[13px] uppercase tracking-[0.25em] text-[color:var(--accent-strong)]"
      >
        Approved
      </div>
    </figure>
  );
}

function Capabilities() {
  return (
    <section id="product" className="bg-[var(--surface-page)]">
      <Wrap className="pb-14 sm:pb-20 lg:pb-24">
        <div data-reveal>
          <SectionHeading className="max-w-xl">Built around the paperwork that gets subs paid.</SectionHeading>
        </div>
        <div className="mt-9 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:gap-14">
          <div data-reveal-group className="border-t-2 border-[color:var(--border-heavy)] lg:col-span-7">
            {CAPABILITIES.map((c) => (
              <div key={c.label} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-[color:var(--border)] py-5 sm:grid-cols-[56px_1fr] sm:gap-x-5 sm:py-6">
                <span className="sb-mono pt-1 text-[13px] font-medium text-[color:var(--accent-strong)]">{c.code}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[17px] font-semibold leading-snug text-[color:var(--text-strong)]" style={{ fontWeight: "var(--fw-semibold)" }}>
                      {c.promise}
                    </h3>
                    <span className="sb-label text-[color:var(--text-muted)]">{c.label}</span>
                  </div>
                  <p className="mt-1.5 max-w-xl text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{c.body}</p>
                </div>
              </div>
            ))}
            <p className="mt-5 text-[13px] leading-relaxed text-[color:var(--text-muted)]">{INTEGRATION_LINE}</p>
          </div>
          <div data-reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ChangeOrderDoc />
              <p className="sb-mono mt-3 text-[11px] leading-relaxed text-[color:var(--text-faint)]">
                The document your GC signs — generated from one field note, 19 minutes after the flag.
              </p>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   TRADES  —  per-trade scenario rows
   ========================================================================== */

function Trades() {
  return (
    <section id="use-cases" className="border-y border-[color:var(--border)] bg-[var(--surface-card)]">
      <Wrap className="py-14 sm:py-20 lg:py-24">
        <div data-reveal>
          <SectionHeading className="max-w-xl">Tuned to the way your trade works.</SectionHeading>
        </div>
        <div data-reveal-group className="mt-9 border-t-2 border-[color:var(--border-heavy)] sm:mt-12">
          {TRADES.map((t) => (
            <div
              key={t.trade}
              className="grid gap-x-8 gap-y-2.5 border-b border-[color:var(--border)] py-6 sm:py-7 lg:grid-cols-[200px_1fr] lg:items-center"
            >
              <h3 className="sb-display text-[24px] text-[color:var(--text-strong)] sm:text-[28px]">{t.trade}</h3>
              <p className="max-w-lg text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{t.body}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   PLATFORM  —  the product spec sheet, field and office
   ========================================================================== */

// Spec-sheet row on the ink band: dark hairlines, light values.
function SpecRow({ k, v, accent = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--border-dark)] py-2.5">
      <dt className="sb-label text-[color:var(--text-dim-dark)]">{k}</dt>
      <dd className={accent ? "sb-mono text-[14px] font-medium tabular-nums text-[color:var(--accent-on-dark)]" : "text-[14px] font-medium text-[color:var(--text-on-dark)]"}>
        {v}
      </dd>
    </div>
  );
}

function Platform() {
  return (
    <section id="platform" className="bg-[var(--surface-dark)]">
      <Wrap className="py-14 sm:py-20 lg:py-24">
        <div data-reveal>
          <SectionHeading tone="dark" className="max-w-xl">The whole platform, on one spec sheet.</SectionHeading>
          <p className="mt-4 max-w-md text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-dim-dark)]">
            One plan, and this is all of it. What the field logs is what the office bills from.
          </p>
        </div>

        {/* Two spec panels on the ink band: field and office, same ruled format */}
        <div data-reveal-group className="mt-9 grid divide-y divide-[color:var(--border-dark)] border border-[color:var(--border-dark)] border-t-2 border-t-[color:var(--border-dark-strong)] sm:mt-12 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {PLATFORM_SPECS.map((group) => (
            <div key={group.heading} className="bg-[var(--surface-panel)] p-5 sm:p-7">
              <div className="sb-label border-b-2 border-[color:var(--border-dark-strong)] pb-2.5 text-[color:var(--text-on-dark)]">
                {group.heading}
              </div>
              <dl>
                {group.rows.map((r) => (
                  <SpecRow key={r.k} k={r.k} v={r.v} />
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   PRICING  —  rate card with the ROI math beside it
   ========================================================================== */

function Pricing() {
  return (
    <section id="pricing" className="border-y border-[color:var(--border)] bg-[var(--surface-card)]">
      <Wrap className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div data-reveal className="lg:col-span-5">
          <SectionHeading>One plan. No surprises.</SectionHeading>
          <p className="mt-4 max-w-md text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">
            $79 a month for each PM who runs jobs, everything included. No tiers, no feature gates, and field
            crews are free, however many you put on.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-2 border-t-2 border-[color:var(--border-heavy)]">
            <div className="border-b border-r border-[color:var(--border)] py-4 pr-4">
              <div className="sb-mono text-[26px] font-medium tabular-nums leading-none text-[color:var(--text-strong)]">$948</div>
              <div className="mt-1.5 text-[12px] leading-snug text-[color:var(--text-muted)]">One PM on ScopeBolt for a full year</div>
            </div>
            <div className="border-b border-[color:var(--border)] py-4 pl-4">
              <div className="sb-mono text-[26px] font-medium tabular-nums leading-none text-[color:var(--accent-strong)]">$1,240</div>
              <div className="mt-1.5 text-[12px] leading-snug text-[color:var(--text-muted)]">CO-118, the sample change order on this page</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[color:var(--text-muted)]">
            One CO the size of the sample covers that PM&rsquo;s whole year. Everything after it is margin back in your pocket.
          </p>
        </div>

        <div data-reveal className="lg:col-span-7">
          <div className="border border-[color:var(--border)] bg-[var(--surface-page)]">
            <div className="flex items-center justify-between gap-3 bg-[var(--surface-dark)] px-5 py-3 sm:px-7">
              <span className="sb-label text-[color:var(--text-on-dark)]">Pro, everything included</span>
              <span className="sb-mono text-[10.5px] uppercase tracking-[0.08em] text-[color:var(--text-dim-dark)]">14-day trial</span>
            </div>
            <div className="px-5 pt-6 pb-7 sm:px-7 sm:pt-7 sm:pb-8">
              <div className="flex items-baseline gap-3">
                <span className="sb-mono text-[52px] font-medium leading-none tracking-tight tabular-nums text-[color:var(--text-strong)]">$79</span>
                <span className="text-[13px] leading-tight text-[color:var(--text-muted)]">
                  per PM,
                  <br />
                  per month
                </span>
              </div>
              <p className="mt-3 text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">
                Unlimited field users included. No annual lock-in. Cancel anytime.
              </p>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <div>
                  <div className="sb-label border-b border-[color:var(--gray-150)] pb-2 text-[color:var(--text-strong)]">In the field</div>
                  <ul className="mt-3 space-y-2.5">
                    {PRICING_FIELD.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[length:var(--fs-sm)] leading-snug text-[color:var(--text-body)]">
                        <Check size={14} weight="bold" className="mt-0.5 flex-shrink-0 text-[color:var(--accent-strong)]" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="sb-label border-b border-[color:var(--gray-150)] pb-2 text-[color:var(--text-strong)]">In the office</div>
                  <ul className="mt-3 space-y-2.5">
                    {PRICING_OFFICE.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[length:var(--fs-sm)] leading-snug text-[color:var(--text-body)]">
                        <Check size={14} weight="bold" className="mt-0.5 flex-shrink-0 text-[color:var(--accent-strong)]" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Cta href={TRIAL_CTA_HREF} variant="primary" withArrow className="mt-8 w-full">
                {TRIAL_LABEL}
              </Cta>
              <p className="mt-3 text-center text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">No credit card required</p>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   FAQ
   ========================================================================== */

function Faq() {
  return (
    <section id="faq" className="bg-[var(--surface-page)]">
      <Wrap className="max-w-3xl py-14 sm:py-20 lg:py-24">
        <div data-reveal>
          <SectionHeading>Common questions, straight answers.</SectionHeading>
        </div>
        <div data-reveal className="mt-9 border-t-2 border-[color:var(--border-heavy)] sm:mt-10">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group border-b border-[color:var(--border)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-[color:var(--text-strong)] transition-colors hover:text-[color:var(--text-body)] [&::-webkit-details-marker]:hidden" style={{ fontWeight: "var(--fw-semibold)" }}>
                {item.q}
                <CaretDown size={15} weight="bold" className="faq-caret flex-shrink-0 text-[color:var(--text-faint)] transition-transform" aria-hidden="true" />
              </summary>
              <p className="faq-answer pb-5 pr-8 text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ============================================================================
   FINAL CTA + FOOTER  —  one continuous ink zone closing the page
   ========================================================================== */

function FinalCta() {
  return (
    <section aria-label="Get started" className="bg-[var(--surface-dark)]">
      <Wrap className="grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading tone="dark" className="max-w-xl">
            Stop doing out-of-scope work for free.
          </SectionHeading>
          <p className="mt-4 max-w-md text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-dim-dark)]">
            Start logging scope changes before the next one eats your margin. Setup takes one afternoon.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 lg:col-span-5 lg:items-end">
          <Cta href={DEMO_CTA_HREF} variant="primary" withArrow className="w-full sm:w-auto">
            {DEMO_LABEL}
          </Cta>
          <Cta href={TRIAL_CTA_HREF} variant="outlineDark" className="w-full sm:w-auto">
            {TRIAL_LABEL}
          </Cta>
          <span className="text-[12.5px] text-[color:var(--text-dim-dark)] lg:text-right">No card required. 14-day trial. Cancel anytime.</span>
        </div>
      </Wrap>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-dark)] bg-[var(--surface-dark)]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
      <Wrap className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark className="text-[15px]" />
          <p className="mt-3 max-w-[24ch] text-[13px] leading-relaxed text-[color:var(--text-dim-dark)]">
            Scope and change-order control for commercial subcontractors.
          </p>
        </div>
        <div>
          <div className="sb-label text-[color:var(--text-dim-dark)]">Product</div>
          <ul className="mt-3.5 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="py-1 text-[13.5px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)] touch-manipulation">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="sb-label text-[color:var(--text-dim-dark)]">Contact</div>
          <ul className="mt-3.5 space-y-2">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="py-1 text-[13.5px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)] touch-manipulation">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={DEMO_CTA_HREF} className="py-1 text-[13.5px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)] touch-manipulation">
                {DEMO_LABEL}
              </a>
            </li>
            <li>
              <a href={TRIAL_CTA_HREF} className="py-1 text-[13.5px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)] touch-manipulation">
                {TRIAL_LABEL}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="sb-label text-[color:var(--text-dim-dark)]">Security</div>
          <ul className="mt-3.5 space-y-2 text-[13px] leading-relaxed text-[color:var(--text-dim-dark)]">
            <li>Encrypted in transit and at rest</li>
            <li>5-year retention archive</li>
          </ul>
        </div>
      </Wrap>
      <div className="border-t border-[color:var(--border-dark)]">
        <Wrap className="flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <span className="text-[12px] text-[color:var(--text-dim-dark)]">&copy; 2026 ScopeBolt</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((label) => (
              <a
                key={label}
                href="#"
                className="py-1 text-[12px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)] touch-manipulation"
              >
                {label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${CONTACT_EMAIL}`} className="sb-mono text-[11px] text-[color:var(--text-dim-dark)] transition-colors hover:text-[color:var(--text-on-dark)]">
            {CONTACT_EMAIL}
          </a>
        </Wrap>
      </div>
    </footer>
  );
}

/* ============================================================================
   ROOT
   ========================================================================== */

export default function ScopeBolt() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // All motion lives here: transform/opacity only, gated on reduced-motion.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero entrance: the headline stat rises character by character, the
        // display line follows line by line, then copy, CTAs, and the ledger settle in.
        // onSplit + autoSplit keep the tweens correct if the webfont re-flows.
        const statSplit = SplitText.create("[data-hero-stat]", {
          type: "chars",
          onSplit: (self) =>
            gsap.from(self.chars, { yPercent: 55, autoAlpha: 0, duration: 0.65, stagger: 0.05, ease: "power4.out" }),
        });
        const displaySplit = SplitText.create("[data-hero-display]", {
          type: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { y: 26, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power4.out", delay: 0.3 }),
        });

        gsap
          .timeline({ defaults: { ease: "power3.out", duration: 0.5 }, delay: 0.55 })
          .from("[data-hero-seq]", { y: 16, autoAlpha: 0, stagger: 0.07 })
          .from("[data-hero-ledger]", { y: 22, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");

        // Nav progress rule tracks overall scroll position.
        gsap.to("[data-nav-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });

        // One restrained reveal pattern for every section: rise, fade, fire once.
        gsap.utils.toArray("[data-reveal]", rootRef.current).forEach((el) => {
          gsap.from(el, {
            y: 20,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });

        // Grouped variant: direct children cascade so ledgers read in order.
        gsap.utils.toArray("[data-reveal-group]", rootRef.current).forEach((group) => {
          gsap.from(group.children, {
            y: 16,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        // Workflow: the timeline rule draws with scroll; rows tick on as it passes.
        const wf = rootRef.current.querySelector("[data-wf]");
        if (wf) {
          gsap.fromTo(
            "[data-wf-progress]",
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top",
              ease: "none",
              scrollTrigger: { trigger: wf, start: "top 70%", end: "bottom 58%", scrub: 0.4 },
            }
          );
          wf.querySelectorAll("li").forEach((li) => {
            ScrollTrigger.create({ trigger: li, start: "top 64%", once: true, onEnter: () => li.classList.add("is-passed") });
          });
        }

        // The CO sheet: the APPROVED stamp punches down once the doc is on screen.
        const stamp = rootRef.current.querySelector("[data-co-stamp]");
        if (stamp) {
          gsap.from(stamp, {
            scale: 1.7,
            autoAlpha: 0,
            rotate: -20,
            duration: 0.4,
            ease: "power4.out",
            scrollTrigger: { trigger: "[data-co-doc]", start: "top 62%", once: true },
          });
        }

        return () => {
          statSplit.revert();
          displaySplit.revert();
        };
      });
    },
    { scope: rootRef }
  );

  // overflow-x-clip (not -hidden): hidden would turn this into a scroll
  // container and silently kill every position:sticky inside.
  return (
    <div ref={rootRef} className="sb-root relative min-h-screen overflow-x-clip bg-[var(--surface-page)] text-[color:var(--text-strong)] antialiased">
      <a href="#main" className="skip-link">Skip to content</a>
      <style>{`
        /* ---- Families (tokens live in scopebolt-tokens.css) ---------- */
        .sb-root, .sb-root * { font-family: var(--font-sans); }
        .sb-root { font-weight: var(--fw-regular); }
        .sb-root .sb-mono { font-family: var(--font-mono); font-weight: 450; }

        /* ---- Type --------------------------------------------------- */
        .sb-display { font-weight: var(--fw-display); font-stretch: var(--stretch-display); letter-spacing: var(--tracking-display); line-height: var(--lh-display); text-wrap: balance; }
        .sb-stat-hero { font-weight: var(--fw-black); font-stretch: var(--stretch-stat); font-size: var(--fs-stat-hero); line-height: 0.9; letter-spacing: -0.025em; font-variant-numeric: tabular-nums; }

        /* ---- Nav progress rule ----------------------------------------- */
        .sb-nav-progress {
          position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; z-index: 1;
          background: var(--accent-strong); transform: scaleX(0); transform-origin: left;
        }

        /* ---- Workflow timeline rule ----------------------------------- */
        .sb-wf { --wf-line-x: 60px; position: relative; }
        @media (min-width: 640px) { .sb-wf { --wf-line-x: 84px; } }
        .sb-wf-line { position: absolute; top: 2px; bottom: 0; left: var(--wf-line-x); width: 2px; background: var(--gray-150); }
        .sb-wf-progress { position: absolute; inset: 0; display: block; background: var(--accent-strong); }
        .sb-wf-marker {
          position: absolute; left: calc(var(--wf-line-x) - 2px); top: 26px;
          width: 6px; height: 6px; background: var(--surface-page); border: 2px solid var(--gray-450);
          transition: background var(--dur-base) ease, border-color var(--dur-base) ease;
        }
        .sb-wf-time { transition: color var(--dur-base) ease; }
        li.is-passed .sb-wf-marker { background: var(--accent-strong); border-color: var(--accent-strong); }
        li.is-passed .sb-wf-time { color: var(--accent-strong); }
        .sb-h2 { font-size: var(--fs-display-2); font-weight: var(--fw-display); font-stretch: var(--stretch-display); line-height: var(--lh-display); letter-spacing: var(--tracking-display); color: var(--text-strong); text-wrap: balance; }
        .sb-h2--dark { color: var(--text-on-dark); }
        .sb-label { font-family: var(--font-mono); font-size: var(--fs-label); font-weight: 500; text-transform: uppercase; letter-spacing: var(--tracking-label); }

        /* ---- Buttons -------------------------------------------------
           Primary is the single orange accent; secondary is a hairline
           outline; outline-dark lives on the ink band. All sharp. */
        .sb-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 0 24px; border-radius: var(--radius-ctl); border: 1px solid transparent; font-size: var(--fs-body); font-weight: var(--fw-semibold); letter-spacing: var(--tracking-tight); line-height: 1; text-decoration: none; white-space: nowrap; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: background var(--dur-base) ease, color var(--dur-base) ease, border-color var(--dur-base) ease, transform var(--dur-fast) var(--ease-out); }
        .sb-btn--sm { min-height: 40px; padding: 0 16px; font-size: var(--fs-meta); }
        .sb-btn--primary { background: var(--accent-strong); color: var(--text-on-brand); }
        .sb-btn--primary:hover { background: var(--accent-press); }
        .sb-btn--primary:active { background: var(--accent-press); transform: scale(.985); }
        .sb-btn--secondary { background: transparent; color: var(--text-strong); border-color: var(--border-strong); }
        .sb-btn--secondary:hover { border-color: var(--text-strong); background: var(--surface-card); }
        .sb-btn--secondary:active { background: var(--gray-150); transform: scale(.985); }
        .sb-btn--outline-dark { background: transparent; color: var(--text-on-dark); border-color: var(--border-dark-strong); }
        .sb-btn--outline-dark:hover { border-color: var(--text-on-dark); }
        .sb-btn--outline-dark:active { transform: scale(.985); }
        .sb-btn:focus-visible, .sb-root summary:focus-visible, .sb-root a:focus-visible, .sb-root button:focus-visible { outline: 2px solid var(--accent-strong); outline-offset: 2px; }
        .sb-root [id="main"]:focus { outline: none; }

        /* ---- Status chips (ledger data, not decoration) --------------- */
        .sb-chip { display: inline-flex; align-items: center; gap: 4px; border-radius: var(--radius-ctl); border: 1px solid transparent; padding: 3px 7px; font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .sb-chip--neutral { border-color: var(--gray-300); color: var(--text-muted); }
        .sb-chip--flag { border-color: var(--flag-line); background: var(--flag-fill); color: var(--accent-strong); }
        .sb-chip--signed { background: var(--surface-ink); color: var(--text-on-dark); }

        /* ---- Hero atmosphere -------------------------------------------
           Engineering-grid texture masked toward the top-right (behind the
           ledger) and a carbon-copy sheet stack: COs ship in triplicate. */
        .sb-grid-texture {
          pointer-events: none; opacity: .55;
          background-image:
            linear-gradient(var(--gray-150) 1px, transparent 1px),
            linear-gradient(90deg, var(--gray-150) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(130% 100% at 78% 0%, #000 25%, transparent 72%);
          mask-image: radial-gradient(130% 100% at 78% 0%, #000 25%, transparent 72%);
        }
        .sb-carbon { z-index: 0; }
        .sb-carbon::before, .sb-carbon::after {
          content: ""; position: absolute; inset: 0; z-index: -1;
          border: 1px solid var(--gray-300); background: var(--paper-deep);
        }
        .sb-carbon::before { transform: translate(9px, 9px); }
        .sb-carbon::after { transform: translate(18px, 18px); opacity: .55; }

        /* ---- Field wire (marquee) ------------------------------------- */
        @keyframes sb-wire-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        .sb-wire-track { animation: sb-wire-scroll 48s linear infinite; }
        .sb-wire:hover .sb-wire-track { animation-play-state: paused; }
        @keyframes sb-wire-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
        .sb-wire-dot { animation: sb-wire-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sb-wire-track, .sb-wire-dot { animation: none !important; }
        }

        /* ---- Selection ------------------------------------------------ */
        .sb-root ::selection { background: var(--flag-fill); color: var(--text-strong); }

        /* ---- Motion ----------------------------------------------------
           Entrance + scroll reveals are GSAP-driven (see useGSAP in root);
           only the ledger-row cascade and micro-states live in CSS. */
        .touch-manipulation { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        a, button { -webkit-tap-highlight-color: transparent; }
        @keyframes logRow { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .log-row { opacity: 0; animation: logRow .45s var(--ease-out) both; }
        details[open] .faq-caret { transform: rotate(180deg); }
        @keyframes faqIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        details[open] .faq-answer { animation: faqIn .25s var(--ease-out); }
        @media (prefers-reduced-motion: reduce) {
          .log-row, .faq-answer { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <UtilityBar />
      <Navbar onOpenMenu={() => setMenuOpen(true)} expanded={menuOpen} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main" tabIndex={-1}>
        <Hero />
        <SyncStrip />
        <FieldWire />
        <Workflow />
        <Capabilities />
        <Trades />
        <Platform />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
