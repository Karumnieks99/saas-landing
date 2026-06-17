/**
 * ScopeBolt.jsx — the ScopeBolt marketing landing page (single-file React).
 * A fictional SaaS for commercial subcontractors: it logs field changes, checks
 * them against the signed contract, and turns out-of-scope work into signed
 * change orders.
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
import { useGSAP } from "@gsap/react";
import "./scopebolt-tokens.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ============================================================================
   CONTENT
   All page copy lives here so layout components stay focused on presentation.
   ========================================================================== */

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const CONTACT_EMAIL = "hello@scopebolt.com";
const DEMO_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Book%20a%20ScopeBolt%20demo`;
const TRIAL_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Start%20a%20ScopeBolt%20free%20trial`;

const PROOF_ITEMS = [
  { value: "$2.7M", label: "recovered for subs" },
  { value: "410", label: "crews on ScopeBolt" },
  { value: "94%", label: "stay after trial" },
];

const INTEGRATIONS = [
  "Procore",
  "Buildertrend",
  "QuickBooks",
  "Sage",
  "Viewpoint",
  "Jonas",
  "Foundation",
  "CoConstruct",
];

// Live scope-log rows rendered inside the hero product mockup.
const MOCK_LOG_ROWS = [
  { t: "09:42", code: "IN-001", desc: "Added 40 LF of 2\" conduit run", base: "In contract", kind: "logged" },
  { t: "09:43", code: "OUT-118", desc: "Reroute around new duct bank", base: "Not in baseline", kind: "flag", amount: "+$1,240" },
  { t: "10:01", code: "CO-118", desc: "Change order sent to GC", base: "Pending sign-off", kind: "sent" },
  { t: "10:14", code: "CO-118", desc: "GC signed, Riverfront PM", base: "Approved", kind: "signed", amount: "+$1,240" },
];

const MOCK_SIDEBAR = [
  { label: "Dashboard", icon: "grid" },
  { label: "Jobs", icon: "briefcase" },
  { label: "Scope Log", icon: "list", active: true },
  { label: "Change Orders", icon: "file" },
  { label: "Contracts", icon: "doc" },
  { label: "Reports", icon: "chart" },
  { label: "Settings", icon: "sliders" },
];

const HOW_STEPS = [
  {
    n: "1",
    tag: "Set baseline",
    title: "Lock your contract baseline",
    body: "Upload the signed contract and schedule of values. ScopeBolt reads it and builds the scope baseline for the job.",
    meta: "PDF / Procore / email import",
    icon: "upload",
  },
  {
    n: "2",
    tag: "Capture",
    title: "Log changes from the field",
    body: "Foremen capture every extra, delay, or verbal directive by photo, voice, or text, timestamped and tied to the job.",
    meta: "Works offline on mobile",
    icon: "camera",
  },
  {
    n: "3",
    tag: "Bill",
    title: "Send the CO, get paid",
    body: "ScopeBolt flags out-of-scope work, drafts the change order, and routes it to the GC for a digital signature.",
    meta: "Signed before crews start",
    icon: "pen",
  },
];

const WALKTHROUGH = [
  {
    n: "01",
    title: "Crew logs the change",
    desc: "Foreman snaps a photo and dictates a note from the field. Timestamped to the minute.",
    badge: "Field entry",
    tone: "ink",
  },
  {
    n: "02",
    title: "Checked against the contract",
    desc: "ScopeBolt compares it to the signed baseline and schedule of values automatically.",
    badge: "Baseline match",
    tone: "ink",
  },
  {
    n: "03",
    title: "Out-of-scope flagged",
    desc: "Anything outside the contract is flagged instantly, with the dollar value attached.",
    badge: "+$1,240 at risk",
    tone: "orange",
  },
  {
    n: "04",
    title: "Change order generated",
    desc: "A clean, professional CO is drafted with the photo, note, and contract reference built in.",
    badge: "CO-118 drafted",
    tone: "ink",
  },
  {
    n: "05",
    title: "GC signs before work starts",
    desc: "The GC reviews and signs digitally. Your crew lifts a tool only after it is approved.",
    badge: "Signed",
    tone: "green",
  },
];

const FEATURES = [
  {
    tag: "Track",
    icon: "list",
    title: "A scope log that never lies",
    desc: "Every request, email, and verbal directive is timestamped and tied to a job code the moment it happens.",
  },
  {
    tag: "Alert",
    icon: "alert",
    title: "Know before you dig in",
    desc: "ScopeBolt compares new work against your signed contract and flags anything outside it, instantly.",
  },
  {
    tag: "Bill",
    icon: "bolt",
    title: "Change orders in 60 seconds",
    desc: "One tap turns a flagged item into a professional, GC-ready change order with the proof attached.",
  },
  {
    tag: "Protect",
    icon: "shield",
    title: "Dispute-proof documentation",
    desc: "Every interaction is archived for five years. Pull it up mid-dispute and win the conversation.",
  },
];

const USE_CASES = [
  {
    trade: "Electrical",
    icon: "bolt",
    body: "T&M tickets, added circuits, and directive work logged the moment the GC asks for it.",
    tag: "Avg $4,200 recovered / job",
  },
  {
    trade: "Mechanical",
    icon: "gear",
    body: "Equipment swaps, rerouted runs, and access delays captured with photo and timestamp proof.",
    tag: "Cut CO turnaround to 1 day",
  },
  {
    trade: "Concrete",
    icon: "layers",
    body: "Pour changes, rebar adds, and weather standby days documented down to the minute.",
    tag: "Zero write-offs on disputes",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We were bleeding $6-8k a project on scope drift and didn't even know it. ScopeBolt paid for itself on the first job.",
    name: "Marcus Delgado",
    role: "Owner of Delgado Electric, an 18-person electrical sub in Chicago, IL",
    initials: "MD",
    hue: "indigo",
    recovered: "$11,400 recovered in 3 months",
  },
  {
    quote:
      "Change orders used to take two days of back-and-forth. Now my PM sends one from the truck and the GC signs it the same day.",
    name: "Sandra Veit",
    role: "Project manager at Veit Mechanical, a 32-person mechanical sub in Dallas, TX",
    initials: "SV",
    hue: "rose",
    recovered: "$7,800 recovered in month one",
  },
  {
    quote:
      "I pulled the scope log up mid-dispute and won $22k that would've been a complete write-off. That log is gold.",
    name: "Aaron Koss",
    role: "Owner of Koss Concrete, a 9-person concrete crew in Denver, CO",
    initials: "AK",
    hue: "emerald",
    recovered: "$21,600 won in one dispute",
  },
];

const PRICING_FEATURES = [
  "Unlimited jobs and change orders",
  "Unlimited field, office, and PM users",
  "Real-time scope log with photo, voice, and text capture",
  "One-tap CO generation and digital GC sign-off",
  "Contract baseline comparison and out-of-scope alerts",
  "Procore, Buildertrend, and QuickBooks sync",
  "5-year dispute-proof archive",
  "Priority support from a real human",
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
    a: "Job data is encrypted in transit and at rest, hosted on SOC 2 infrastructure, with a 5-year retention archive. Your data is yours and exportable at any time.",
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
function useInView(threshold = 0.14) {
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

// Count a numeric stat up from zero once it is visible.
function useCounter(raw, dur = 1400, go = false) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!go) return;

    let t0 = null;
    const num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));

    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(tick);
      else setN(num);
    };

    requestAnimationFrame(tick);
  }, [dur, go, raw]);

  return n;
}

/* ============================================================================
   PRIMITIVES
   ========================================================================== */

const ICONS = {
  grid: "M4 4.5h6v6H4zM14 4.5h6v6h-6zM14 13.5h6v6h-6zM4 13.5h6v6H4z",
  briefcase: "M3.5 8.5h17v10h-17zM8 8.5V6.5a2 2 0 012-2h4a2 2 0 012 2v2",
  list: "M4 6.5h9M4 12h9M4 17.5h6M16.5 15.5l2 2 4-4",
  file: "M6 3.5h8l4 4v13H6zM14 3.5v4h4M9 13h6M9 16.5h6",
  doc: "M6.5 3.5h11v17h-11zM9.5 8h5M9.5 12h5M9.5 16h3",
  chart: "M4 20h16M7 20v-6M12 20V7M17 20v-9",
  sliders: "M4 7h9M17 7h3M4 12h3M11 12h9M4 17h9M17 17h3M13 5v4M7 10v4M13 15v4",
  upload: "M12 15.5V4M7.5 8.5L12 4l4.5 4.5M5 19.5h14",
  camera: "M3.5 7.5h3.5l1.8-2h6.4l1.8 2h3.5v12h-17zM12 16.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
  pen: "M4 20h16M5 15.5l9.5-9.5 3 3L8 18.5H5z",
  check: "M5 12.5l4.5 4.5L19 7",
  alert: "M12 9v4m0 4h.01M10.3 3.9 1.8 18.9A2 2 0 0 0 3.5 22h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  shield: "M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6zM9 12l2 2 4-4",
  gear: "M12 9a3 3 0 100 6 3 3 0 000-6zM19.4 13a7.5 7.5 0 000-2l1.9-1.4-2-3.4-2.2 1a7.5 7.5 0 00-1.7-1L15 3h-4l-.4 2.3a7.5 7.5 0 00-1.7 1l-2.2-1-2 3.4L6.6 11a7.5 7.5 0 000 2l-1.9 1.4 2 3.4 2.2-1a7.5 7.5 0 001.7 1L11 21h4l.4-2.3a7.5 7.5 0 001.7-1l2.2 1 2-3.4z",
  layers: "M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5",
  clock: "M12 7.5V12l3 1.8M12 21a9 9 0 100-18 9 9 0 000 18z",
  chevron: "M6 9l6 6 6-6",
  arrow: "M5 12h13M13 6l6 6-6 6",
  search: "M20.5 20.5l-3.6-3.6M11 17.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z",
  play: "M8 5.5v13l11-6.5z",
};

function Icon({ name, className = "h-5 w-5", stroke = 1.75 }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={stroke} viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name] || ICONS.list} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stars({ className = "h-3.5 w-3.5" }) {
  return (
    <div className="flex gap-0.5 text-[color:var(--rating)]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Italic Instrument Serif accent phrase inside an upright Geist headline.
function Em({ children }) {
  return <em className="sb-serif">{children}</em>;
}

function SectionHeading({ children, tone = "light", className = "" }) {
  return <h2 className={`sb-h2 mt-4 ${tone === "dark" ? "sb-h2--dark" : ""} ${className}`}>{children}</h2>;
}

const BTN_VARIANTS = {
  primary: "sb-btn--primary",
  brand: "sb-btn--brand",
  secondary: "sb-btn--secondary",
  ghost: "sb-btn--ghost",
  outlineDark: "sb-btn--outline-dark",
};

function Cta({ href, variant = "primary", size, withArrow = false, children, className = "" }) {
  return (
    <a
      href={href}
      className={`sb-btn group ${BTN_VARIANTS[variant] || BTN_VARIANTS.primary} ${size === "sm" ? "sb-btn--sm" : ""} ${className}`}
    >
      {children}
      {withArrow ? <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" stroke={2.2} /> : null}
    </a>
  );
}

/* ============================================================================
   PRODUCT MOCKUP  —  the hero "money shot" dashboard
   ========================================================================== */

function LogTag({ kind, amount }) {
  if (kind === "flag") {
    return (
      <span className="sb-mono inline-flex flex-shrink-0 items-center gap-1 rounded-[var(--radius-sm)] border border-[color:var(--orange-200)] bg-[var(--orange-50)] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[color:var(--brand)]">
        {amount}
      </span>
    );
  }
  if (kind === "sent") {
    return (
      <span className="sb-mono inline-flex flex-shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
        Sent
        <Icon name="arrow" className="h-3 w-3" stroke={2} />
      </span>
    );
  }
  if (kind === "signed") {
    return (
      <span className="sb-mono inline-flex flex-shrink-0 items-center gap-1 rounded-[var(--radius-sm)] border border-[color:var(--positive-border)] bg-[var(--positive-fill)] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[color:var(--positive-text)]">
        <Icon name="check" className="h-3 w-3" stroke={2.5} />
        {amount}
      </span>
    );
  }
  return (
    <span className="sb-mono inline-flex flex-shrink-0 items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-[color:var(--text-faint)]">
      <Icon name="check" className="h-3 w-3" stroke={2.5} />
      Logged
    </span>
  );
}

function MetricTile({ label, value, sub, tone }) {
  const toneMap = {
    green: "text-[color:var(--positive)]",
    ink: "text-[color:var(--text-strong)]",
  };
  return (
    <div className="rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[var(--surface-subtle)] p-3.5">
      <div className="sb-mono text-[9.5px] font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--text-muted)]">{label}</div>
      <div className={`sb-mono mt-1 text-[20px] font-semibold tabular-nums leading-none ${toneMap[tone] || toneMap.ink}`}>{value}</div>
      {sub ? <div className="mt-1.5 text-[11px] leading-tight text-[color:var(--text-muted)]">{sub}</div> : null}
    </div>
  );
}

function ProductMockup({ compact = false }) {
  const [go, setGo] = useState(false);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => setGo(true), reduce ? 0 : 1500);
    return () => clearTimeout(id);
  }, [reduce]);

  const recovered = useCounter("4200", 1400, go);
  const recoveredText = reduce ? "4,200" : go ? recovered.toLocaleString() : "0";

  return (
    <div
      className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[var(--surface-card)]"
      style={{ boxShadow: "var(--shadow-lg), var(--shadow-pop)" }}
    >
      <div className="flex min-h-[420px]">
        {/* Sidebar (desktop). Hidden in the compact/hero placement so the
            log + rail keep their room in a narrower column. */}
        {!compact && (
        <aside className="hidden w-52 flex-shrink-0 flex-col bg-[var(--surface-dark)] lg:flex">
          <div className="flex items-center gap-2 px-5 py-4">
            <LogoMark className="h-6 w-6" />
            <span className="text-[14px] font-bold tracking-tight text-[color:var(--text-on-dark)]">
              Scope<span className="text-[color:var(--accent-on-dark)]">Bolt</span>
            </span>
          </div>
          <nav className="mt-1 flex flex-col gap-0.5 px-3">
            {MOCK_SIDEBAR.map((item) => (
              <span
                key={item.label}
                className={`relative flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-[12.5px] font-medium ${
                  item.active ? "text-[color:var(--text-on-dark)]" : "text-[color:var(--zinc-400)]"
                }`}
                style={item.active ? { background: "color-mix(in srgb, var(--white) 10%, transparent)" } : undefined}
              >
                {item.active ? <span className="absolute left-0 h-4 w-0.5 -translate-x-3 rounded-full bg-[var(--accent-on-dark)]" /> : null}
                <Icon name={item.icon} className={`h-4 w-4 ${item.active ? "text-[color:var(--accent-on-dark)]" : ""}`} stroke={1.75} />
                {item.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 border-t border-[color:var(--border-dark)] px-4 py-3.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-[color:var(--text-on-dark)]" style={{ background: "var(--avatar-indigo)" }}>
              RM
            </span>
            <div className="leading-tight">
              <div className="text-[11.5px] font-semibold text-[color:var(--text-on-dark)]">Riverfront PM</div>
              <div className="sb-mono text-[9px] uppercase tracking-wide text-[color:var(--zinc-500)]">Field admin</div>
            </div>
          </div>
        </aside>
        )}

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar: job selector */}
          <div className="flex items-center justify-between gap-3 border-b border-[color:var(--border)] bg-[var(--surface-subtle)] px-4 py-3 sm:px-5">
            <button type="button" className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[var(--surface-card)] px-3 py-1.5 text-left">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--zinc-100)] text-[color:var(--text-body)]">
                <Icon name="briefcase" className="h-3.5 w-3.5" stroke={1.75} />
              </span>
              <span className="leading-tight">
                <span className="block text-[12.5px] font-semibold text-[color:var(--text-strong)]">Riverfront Medical</span>
                <span className="sb-mono block text-[9.5px] uppercase tracking-wide text-[color:var(--text-muted)]">Job #4417</span>
              </span>
              <Icon name="chevron" className="ml-1 h-3.5 w-3.5 text-[color:var(--text-faint)]" stroke={2} />
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="sb-mono inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color:var(--positive-border)] bg-[var(--positive-fill)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--positive-text)]">
                <span className="sb-pulse" /> Baseline locked
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border)] text-[color:var(--text-faint)]">
                <Icon name="search" className="h-3.5 w-3.5" stroke={1.75} />
              </span>
            </div>
          </div>

          {/* Body: scope log + right rail */}
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1fr_260px]">
            {/* Scope log */}
            <div className="min-w-0 border-b border-[color:var(--border)] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
                <span className="sb-mono text-[11px] font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--text-strong)]">Scope Log</span>
                <span className="sb-mono text-[10px] uppercase tracking-wide text-[color:var(--text-faint)]">Today &middot; 4 entries</span>
              </div>
              <div className="sb-mono flex items-center gap-3 border-y border-[color:var(--zinc-100)] bg-[var(--surface-subtle)] px-4 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] sm:px-5">
                <span className="w-9">Time</span>
                <span className="flex-1">Entry &middot; baseline</span>
                <span>Status</span>
              </div>
              <div className="divide-y divide-[color:var(--zinc-100)]">
                {MOCK_LOG_ROWS.map((r, i) => {
                  const isFlag = r.kind === "flag";
                  return (
                    <div
                      key={r.t + r.code}
                      className={`log-row flex items-center gap-3 px-4 py-2.5 sm:px-5 ${isFlag ? "border-l-2 border-[color:var(--brand)] bg-[var(--orange-50)]" : ""}`}
                      style={reduce ? undefined : { animationDelay: `${0.9 + i * 0.22}s` }}
                    >
                      <span className="sb-mono w-9 flex-shrink-0 text-[11px] tabular-nums text-[color:var(--text-muted)]">{r.t}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {isFlag ? <Icon name="alert" className="h-3 w-3 flex-shrink-0 text-[color:var(--brand)]" stroke={2} /> : null}
                          <span className="sb-mono text-[9px] uppercase tracking-[0.1em] text-[color:var(--text-faint)]">{r.code}</span>
                        </div>
                        <div className="truncate text-[12.5px] text-[color:var(--text-body)]">{r.desc}</div>
                        <div className={`sb-mono text-[9.5px] uppercase tracking-wide ${isFlag ? "text-[color:var(--brand)]" : "text-[color:var(--text-faint)]"}`}>{r.base}</div>
                      </div>
                      <LogTag kind={r.kind} amount={r.amount} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right rail */}
            <div className="grid grid-cols-2 gap-2.5 p-4 lg:grid-cols-1 lg:content-start">
              <div className="col-span-2 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[var(--surface-ink)] p-3.5 lg:col-span-1">
                <div className="sb-mono text-[9.5px] font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--zinc-400)]">Recovered this job</div>
                <div className="sb-mono mt-1 text-[24px] font-semibold tabular-nums leading-none text-[color:var(--accent-on-dark)]">${recoveredText}</div>
                <div className="sb-mono mt-1.5 text-[10px] uppercase tracking-wide text-[color:var(--zinc-500)]">3 signed COs</div>
              </div>
              <MetricTile label="Pending sign-off" value="2" sub="With GC since 9:43a" tone="ink" />
              <MetricTile label="Risk level" value="Low" sub="All work baselined" tone="green" />
              <div className="col-span-2 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[var(--surface-card)] p-3.5 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="sb-mono text-[9.5px] font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--text-muted)]">CO-118 preview</span>
                  <Icon name="file" className="h-3.5 w-3.5 text-[color:var(--text-faint)]" stroke={1.75} />
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-3/4 rounded-full bg-[var(--zinc-200)]" />
                  <div className="h-1.5 w-full rounded-full bg-[var(--zinc-100)]" />
                  <div className="h-1.5 w-2/3 rounded-full bg-[var(--zinc-100)]" />
                </div>
                <div className="sb-mono mt-2.5 inline-flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-wide text-[color:var(--positive)]">
                  <Icon name="check" className="h-3 w-3" stroke={2.5} /> Ready to send
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   NAVBAR + MOBILE DRAWER
   ========================================================================== */

// The brand mark — bold "B" monogram in a rounded-square orange tile
// (assets/logo-mark.svg from the design system, inlined).
function LogoMark({ className = "h-7 w-7" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" role="img" aria-label="ScopeBolt logo mark">
      <rect width="64" height="64" rx="16" fill="var(--brand)" />
      <path
        d="M17 22c0-5 4-9 9-9h12c5 0 9 4 9 9 0 3-1 5-3 7 2 2 3 4 3 7 0 8-6 13-15 13H17V22Zm10-1v7h10c2 0 4-1 4-4s-2-3-4-3H27Zm0 13v9h7c5 0 7-2 7-5 0-2-1-4-6-4H27Z"
        fill="var(--white)"
      />
    </svg>
  );
}

function Logo({ className = "text-[17px]" }) {
  return (
    <a href="#top" className={`flex items-center gap-2 font-bold tracking-tight text-[color:var(--text-strong)] ${className}`}>
      <LogoMark />
      <span>
        Scope<span className="text-[color:var(--brand)]">Bolt</span>
      </span>
    </a>
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
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 flex w-[300px] flex-col bg-[var(--surface-page)] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-[60px] items-center justify-between border-b border-[color:var(--border)] px-5">
          <Logo className="text-[15px]" />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--text-strong)] active:bg-[var(--zinc-100)] touch-manipulation">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={onClose}
              className="flex items-center rounded-[var(--radius-md)] px-4 py-3.5 text-[15px] font-medium text-[color:var(--text-body)] active:bg-[var(--zinc-100)] touch-manipulation"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-[color:var(--border)] p-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <a href={DEMO_CTA_HREF} onClick={onClose} className="sb-btn sb-btn--secondary w-full">
            Book demo
          </a>
          <a href={TRIAL_CTA_HREF} onClick={onClose} className="sb-btn sb-btn--primary w-full">
            Start free trial
          </a>
        </div>
      </div>
    </>
  );
}

function Navbar({ onOpenMenu, scrolled, expanded }) {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-30 transition-all duration-200"
      style={
        scrolled
          ? { background: "color-mix(in srgb, var(--white) 85%, transparent)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }
          : { background: "transparent", borderBottom: "1px solid transparent" }
      }
    >
      <div className="mx-auto flex h-[60px] max-w-[var(--container-max)] items-center justify-between gap-4 px-4 sm:h-[64px] sm:px-6">
        <Logo />
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-[var(--radius-sm)] px-3 py-2 text-[13px] font-medium text-[color:var(--text-muted)] transition-all hover:bg-[var(--zinc-100)] hover:text-[color:var(--text-strong)]"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href={DEMO_CTA_HREF} className="sb-btn sb-btn--ghost sb-btn--sm">
            Book demo
          </a>
          <a href={TRIAL_CTA_HREF} className="sb-btn sb-btn--primary sb-btn--sm">
            Start free trial
          </a>
        </div>
        <button type="button" id="menu-button" aria-expanded={expanded} aria-controls="mobile-drawer" onClick={onOpenMenu} aria-label="Open menu" className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--text-strong)] active:bg-[var(--zinc-100)] touch-manipulation md:hidden">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

/* ============================================================================
   HERO
   ========================================================================== */

// Four fixed avatar hues tag people throughout the page.
const AVATAR_HUES = {
  indigo: "var(--avatar-indigo)",
  rose: "var(--avatar-rose)",
  amber: "var(--avatar-amber)",
  emerald: "var(--avatar-emerald)",
};

const HERO_AVATARS = [
  { initials: "MR", hue: "indigo" },
  { initials: "JT", hue: "rose" },
  { initials: "AK", hue: "emerald" },
  { initials: "SB", hue: "amber" },
];

function Hero() {
  return (
    <section id="top" data-hero className="relative overflow-hidden bg-[var(--surface-page)] px-4 pt-[92px] pb-16 sm:px-6 sm:pt-[112px] sm:pb-24">
      <div className="sb-grid-light pointer-events-none absolute inset-0" />
      <div data-hero-glow className="pointer-events-none absolute -top-16 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[var(--brand)] opacity-[0.05] blur-[100px]" />

      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-14">
        {/* Left: the pitch */}
        <div className="w-full max-w-xl lg:w-[42%] lg:flex-shrink-0">
          <div
            data-hero-seq
            className="inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] border border-[color:var(--border)] px-3.5 py-1.5 text-[12px] font-medium text-[color:var(--text-muted)] backdrop-blur"
            style={{ background: "color-mix(in srgb, var(--white) 80%, transparent)" }}
          >
            Scope &amp; change-order control for commercial subs
          </div>

          <h1 data-hero-seq className="sb-h1 mt-6">
            Stop <Em>losing money</Em> to scope creep.
          </h1>

          <p data-hero-seq className="mt-5 max-w-lg text-[16px] leading-relaxed text-[color:var(--text-muted)] sm:text-[length:var(--fs-lead)]">
            ScopeBolt logs every field change, checks it against your signed contract, and turns out-of-scope work into a
            signed change order, so subs recover an average of <span className="font-semibold text-[color:var(--text-strong)]">$4,200 a job</span> instead of eating it.
          </p>

          <div data-hero-seq className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Cta href={TRIAL_CTA_HREF} variant="brand" withArrow>
              Start free trial
            </Cta>
            <Cta href={DEMO_CTA_HREF} variant="secondary">
              <Icon name="play" className="h-3.5 w-3.5 text-[color:var(--text-muted)]" stroke={1.75} />
              Book a demo
            </Cta>
          </div>

          <div data-hero-seq className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex -space-x-2">
              {HERO_AVATARS.map((a) => (
                <span
                  key={a.initials}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[color:var(--white)] text-[9px] font-bold text-[color:var(--text-on-dark)]"
                  style={{ background: AVATAR_HUES[a.hue] }}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Stars />
              <span className="text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">
                <span className="font-semibold text-[color:var(--text-strong)]">4.9</span> &middot; 410 subs on live jobs
              </span>
            </div>
          </div>
        </div>

        {/* Right: the live job dashboard — the product doing its job, not a slide. */}
        <div data-hero-mockup className="w-full lg:w-[58%] lg:min-w-[560px]">
          <div className="sb-mono mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--text-faint)]">
            Live job dashboard
          </div>
          <ProductMockup compact />
        </div>
      </div>

      {/* Proof strip */}
      <div data-reveal className="relative mx-auto mt-14 max-w-4xl sm:mt-16">
        <div className="grid grid-cols-3 divide-x divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {PROOF_ITEMS.map((p) => (
            <ProofStat key={p.label} value={p.value} label={p.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofStat({ value, label }) {
  const [ref, vis] = useInView(0.4);
  const prefix = value.startsWith("$") ? "$" : "";
  const suffix = value.endsWith("M+") ? "M+" : value.endsWith("M") ? "M" : value.endsWith("+") ? "+" : value.endsWith("%") ? "%" : "";
  const count = useCounter(value, 1300, vis);
  const display = prefersReducedMotion()
    ? value
    : vis
    ? `${prefix}${count.toLocaleString()}${suffix}`
    : `${prefix}0${suffix}`;

  return (
    <div ref={ref} className="px-3 py-5 text-center sm:px-6">
      <div className="sb-mono text-[22px] font-semibold tabular-nums tracking-tight text-[color:var(--text-strong)] sm:text-[26px]">{display}</div>
      <div className="mt-1.5 text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">{label}</div>
    </div>
  );
}

/* ============================================================================
   INTEGRATION / TRUST STRIP
   ========================================================================== */

function TickerPill({ name }) {
  return (
    <div className="flex flex-shrink-0 items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border)] bg-[var(--surface-card)] px-4 py-2.5">
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--zinc-300)]" />
      <span className="text-[length:var(--fs-xs)] font-semibold tracking-[0.04em] text-[color:var(--text-muted)]">{name}</span>
    </div>
  );
}

function IntegrationStrip() {
  return (
    <section className="border-y border-[color:var(--border)] bg-[var(--surface-subtle)] px-0 py-10 sm:py-12">
      <div data-reveal className="mx-auto max-w-[var(--container-max)]">
        <div className="flex flex-col items-center gap-3 px-4 text-center sm:px-6">
          <p className="max-w-md text-[length:var(--fs-body)] font-medium text-[color:var(--text-body)]">Works with the tools your crew already uses</p>
        </div>
        {/* Logo ticker — drifts horizontally, pauses on hover */}
        <div className="sb-ticker mt-7">
          <div className="sb-ticker-track">
            {[0, 1].map((half) => (
              <div key={half} className="sb-ticker-half" aria-hidden={half === 1}>
                {INTEGRATIONS.map((name) => (
                  <TickerPill key={name} name={name} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 px-4 text-center text-[length:var(--fs-meta)] text-[color:var(--text-faint)] sm:px-6">
          Two-way sync, no double entry. SOC 2 infrastructure.
        </p>
      </div>
    </section>
  );
}

/* ============================================================================
   HOW IT WORKS
   ========================================================================== */

function HowVisual({ icon, n }) {
  return (
    <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[var(--surface-subtle)] text-[color:var(--text-body)]">
      <Icon name={icon} className="h-5 w-5" stroke={1.75} />
      <span className="sb-mono absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-ink)] text-[10px] font-bold text-[color:var(--text-on-dark)]">{n}</span>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[var(--container-max)] px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-14">
      <div>
        <div data-reveal className="mb-10 sm:mb-14">
          <SectionHeading className="max-w-lg">
            From job start to paid, in three moves
          </SectionHeading>
        </div>
        <div data-reveal-group className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HOW_STEPS.map((s) => (
            <div key={s.n} className="sb-card p-6">
              <HowVisual icon={s.icon} n={s.n} />
              <div className="text-[length:var(--fs-eyebrow)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--brand-deep)]">{s.tag}</div>
              <h3 className="mt-1.5 text-[16px] font-semibold text-[color:var(--text-strong)]">{s.title}</h3>
              <p className="mt-2 text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{s.body}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 border-t border-[color:var(--zinc-100)] pt-3 text-[length:var(--fs-xs)] font-medium text-[color:var(--text-muted)]">
                <Icon name="clock" className="h-3.5 w-3.5 text-[color:var(--text-faint)]" stroke={2} />
                {s.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   PRODUCT WALKTHROUGH  —  "From field note to signed change order"
   ========================================================================== */

const WALK_TONES = {
  ink: "border-[color:var(--border)] bg-[var(--surface-subtle)] text-[color:var(--text-muted)]",
  orange: "border-[color:var(--orange-200)] bg-[var(--orange-50)] text-[color:var(--brand)]",
  green: "border-[color:var(--positive-border)] bg-[var(--positive-fill)] text-[color:var(--positive-text)]",
};

function Walkthrough() {
  return (
    <section id="product" className="mx-auto max-w-[var(--container-max)] px-4 pt-12 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
      <div>
        <div data-reveal className="mb-10 sm:mb-12">
          <SectionHeading className="max-w-md">
            From field note to signed change order
          </SectionHeading>
        </div>

        {/* One connected flow — five steps divided by hairlines, not five floating cards.
            The steps cascade in 01→05 so the reveal reads in workflow order. */}
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[var(--surface-card)]">
          <div data-reveal-group className="grid grid-cols-1 divide-y divide-[color:var(--border)] lg:grid-cols-5 lg:divide-y-0 lg:divide-x">
            {WALKTHROUGH.map((step) => (
              <div key={step.n} className="flex flex-col p-5 transition-colors duration-200 hover:bg-[var(--surface-subtle)] lg:p-6">
                <span className="sb-serif text-[30px] leading-none text-[color:var(--zinc-300)]">{step.n}</span>
                <h3 className="mt-3 text-[length:var(--fs-sm)] font-semibold leading-snug text-[color:var(--text-strong)]">{step.title}</h3>
                <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[color:var(--text-muted)]">{step.desc}</p>
                <span className={`sb-mono mt-4 inline-flex w-fit items-center gap-1 rounded-[var(--radius-sm)] border px-2 py-1 text-[9.5px] font-semibold uppercase tracking-wide ${WALK_TONES[step.tone]}`}>
                  {step.tone === "orange" ? <Icon name="alert" className="h-2.5 w-2.5" stroke={2.25} /> : null}
                  {step.tone === "green" ? <Icon name="check" className="h-2.5 w-2.5" stroke={2.5} /> : null}
                  {step.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FEATURES (dark)
   ========================================================================== */

function FeatureVisual({ tag }) {
  if (tag === "Track") {
    return (
      <div className="sb-mono sb-card--dark mt-4 space-y-1.5 !rounded-[var(--radius-md)] p-2.5 text-[9.5px]">
        {[
          ["09:42", "IN-001 logged"],
          ["09:43", "OUT-118 flagged"],
          ["10:01", "CO-118 sent"],
        ].map(([t, l]) => (
          <div key={t} className="flex items-center gap-2">
            <span className="text-[color:var(--zinc-500)]">{t}</span>
            <span className="text-[color:var(--zinc-400)]">{l}</span>
          </div>
        ))}
      </div>
    );
  }
  if (tag === "Alert") {
    return (
      <div
        className="mt-4 flex items-center justify-between rounded-[var(--radius-md)] border px-3 py-2.5"
        style={{ borderColor: "color-mix(in srgb, var(--accent-on-dark) 30%, transparent)", background: "color-mix(in srgb, var(--accent-on-dark) 10%, transparent)" }}
      >
        <span className="sb-mono inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--accent-on-dark)]">
          <Icon name="alert" className="h-3 w-3" stroke={2.25} /> Out of scope
        </span>
        <span className="sb-mono text-[11px] font-bold tabular-nums text-[color:var(--accent-on-dark)]">+$1,240</span>
      </div>
    );
  }
  if (tag === "Bill") {
    return (
      <div className="sb-card--dark mt-4 !rounded-[var(--radius-md)] p-3">
        <div className="flex items-center justify-between">
          <span className="sb-mono text-[9.5px] font-semibold uppercase tracking-wide text-[color:var(--zinc-400)]">CO-118.pdf</span>
          <Icon name="file" className="h-3.5 w-3.5 text-[color:var(--zinc-500)]" stroke={1.75} />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-2/3 rounded-full" style={{ background: "color-mix(in srgb, var(--white) 15%, transparent)" }} />
          <div className="h-1.5 w-full rounded-full" style={{ background: "color-mix(in srgb, var(--white) 8%, transparent)" }} />
        </div>
      </div>
    );
  }
  return (
    <div className="sb-card--dark mt-4 flex items-center gap-3 !rounded-[var(--radius-md)] px-3 py-2.5">
      <span className="sb-mono inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--emerald-500)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-500)]" /> Archived
      </span>
      <span className="sb-mono text-[9.5px] uppercase tracking-wide text-[color:var(--zinc-500)]">5-year retention</span>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-[var(--surface-dark)] px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
      <div className="sb-grid-dark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[var(--container-max)]">
        <div data-reveal className="mb-10 sm:mb-14">
          <Eyebrow tone="dark">Features</Eyebrow>
          <SectionHeading tone="dark" className="max-w-lg">
            Built for the field, <Em>not the office</Em>
          </SectionHeading>
        </div>
        <div data-reveal-group className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="sb-card--dark group p-6">
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-dark)] text-[color:var(--accent-on-dark)]"
                style={{ background: "color-mix(in srgb, var(--accent-on-dark) 10%, transparent)" }}
              >
                <Icon name={f.icon} className="h-5 w-5" stroke={1.75} />
              </div>
              <div className="text-[length:var(--fs-eyebrow)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--accent-on-dark)]">{f.tag}</div>
              <h3 className="mt-1.5 text-[length:var(--fs-h3)] font-semibold text-[color:var(--text-on-dark)]">{f.title}</h3>
              <p className="mt-2 text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--zinc-400)]">{f.desc}</p>
              <FeatureVisual tag={f.tag} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   USE CASES
   ========================================================================== */

function MoneyBadge({ children, className = "" }) {
  return (
    <div
      className={`inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color:var(--positive-border)] bg-[var(--positive-fill)] px-2.5 py-1 text-[length:var(--fs-xs)] font-semibold tabular-nums text-[color:var(--positive-text)] ${className}`}
    >
      <Icon name="check" className="h-3 w-3" stroke={2.5} />
      {children}
    </div>
  );
}

function UseCases() {
  return (
    <section id="use-cases" className="mx-auto max-w-[var(--container-max)] px-4 py-14 sm:px-6 sm:py-20">
      <div>
        <div data-reveal className="mb-10 sm:mb-12">
          <SectionHeading className="max-w-lg">
            Tuned to the way your trade works
          </SectionHeading>
        </div>
        {/* One panel, three trades — hairline-divided, not floating cards */}
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[var(--surface-card)]">
          <div data-reveal-group className="grid grid-cols-1 divide-y divide-[color:var(--border)] sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {USE_CASES.map((u) => (
              <div key={u.trade} className="flex flex-col p-6 transition-colors duration-200 hover:bg-[var(--surface-subtle)] sm:p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[var(--surface-subtle)] text-[color:var(--text-body)]">
                  <Icon name={u.icon} className="h-5 w-5" stroke={1.75} />
                </div>
                <h3 className="text-[16px] font-semibold text-[color:var(--text-strong)]">{u.trade}</h3>
                <p className="mt-2 flex-1 text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{u.body}</p>
                <MoneyBadge className="mt-5">{u.tag}</MoneyBadge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   TESTIMONIALS
   ========================================================================== */

function TestiSwiper() {
  const [idx, setIdx] = useState(0);
  const sx = useRef(null);

  const onStart = (e) => {
    sx.current = e.touches[0].clientX;
  };
  const onEnd = (e) => {
    if (sx.current == null) return;
    const dx = e.changedTouches[0].clientX - sx.current;
    if (dx < -40) setIdx((i) => (i + 1) % TESTIMONIALS.length);
    else if (dx > 40) setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    sx.current = null;
  };

  const t = TESTIMONIALS[idx];
  return (
    <div>
      <div className="sb-card select-none p-6" onTouchStart={onStart} onTouchEnd={onEnd}>
        <Stars />
        <p className="mt-4 text-[length:var(--fs-body)] font-medium leading-relaxed text-[color:var(--text-body)]">&ldquo;{t.quote}&rdquo;</p>
        <div className="mt-4 flex items-center gap-3 border-t border-[color:var(--zinc-100)] pt-4">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-[color:var(--text-on-dark)]" style={{ background: AVATAR_HUES[t.hue] }}>
            {t.initials}
          </span>
          <div>
            <div className="text-[length:var(--fs-meta)] font-semibold text-[color:var(--text-strong)]">{t.name}</div>
            <div className="text-[11px] leading-tight text-[color:var(--text-muted)]">{t.role}</div>
          </div>
        </div>
        <MoneyBadge className="mt-3">{t.recovered}</MoneyBadge>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === idx ? "true" : undefined}
            onClick={() => setIdx(i)}
            className="flex h-11 items-center px-1 touch-manipulation"
          >
            <span className={`block h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-[var(--surface-ink)]" : "w-1.5 bg-[var(--zinc-300)]"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function TestimonialByline({ t, avatarSize = "h-8 w-8" }) {
  return (
    <div className="flex flex-col gap-3 border-t border-[color:var(--zinc-100)] pt-4">
      <div className="flex items-center gap-2.5">
        <span className={`flex ${avatarSize} flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-[color:var(--text-on-dark)]`} style={{ background: AVATAR_HUES[t.hue] }}>
          {t.initials}
        </span>
        <div>
          <div className="text-[length:var(--fs-meta)] font-semibold text-[color:var(--text-strong)]">{t.name}</div>
          <div className="text-[10.5px] leading-tight text-[color:var(--text-muted)]">{t.role}</div>
        </div>
      </div>
      <MoneyBadge>{t.recovered}</MoneyBadge>
    </div>
  );
}

function Testimonials() {
  // The $22k dispute win is the biggest number on the page — it leads.
  const featured = TESTIMONIALS[2];
  const supporting = TESTIMONIALS.slice(0, 2);

  return (
    <section id="results" className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-24">
      <div>
        <div data-reveal className="mb-8 sm:mb-12">
          <SectionHeading className="max-w-md">
            Real money recovered by real subs
          </SectionHeading>
        </div>
        <div data-reveal className="sm:hidden">
          <TestiSwiper />
        </div>
        {/* One featured quote at reading size, two supporting quotes stacked beside it */}
        <div data-reveal-group className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-5">
          <div className="sb-card flex flex-col gap-5 p-7 sm:col-span-2 lg:col-span-3 lg:row-span-2 lg:p-9">
            <Stars className="h-4 w-4" />
            <div className="flex flex-1 items-center">
              <p className="text-[17px] font-medium leading-relaxed text-[color:var(--text-body)] lg:text-[24px] lg:leading-[1.45] lg:tracking-[var(--tracking-tight)]">
                &ldquo;{featured.quote}&rdquo;
              </p>
            </div>
            <TestimonialByline t={featured} avatarSize="h-9 w-9" />
          </div>
          {supporting.map((t) => (
            <div key={t.name} className="sb-card flex flex-col gap-4 p-6 lg:col-span-2">
              <Stars />
              <p className="flex-1 text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-body)]">&ldquo;{t.quote}&rdquo;</p>
              <TestimonialByline t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   PRICING
   ========================================================================== */

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-28">
      <div>
        <div data-reveal className="mb-8 text-center sm:mb-10">
          <SectionHeading>
            One plan. No surprises.
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-md text-[length:var(--fs-sm)] text-[color:var(--text-muted)]">No seat math, no feature gates. Everything ScopeBolt does, on every job.</p>
        </div>
        <div data-reveal className="mx-auto max-w-xl overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[var(--surface-card)]" style={{ boxShadow: "var(--shadow-lg)" }}>
          <div className="flex items-center justify-between bg-[var(--surface-dark)] px-7 py-4">
            <span className="text-[length:var(--fs-eyebrow)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-[color:var(--accent-on-dark)]">Pro &middot; everything included</span>
            <span className="sb-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--zinc-500)]">14-day trial</span>
          </div>
          <div className="px-7 pt-8 pb-9">
            <div className="flex items-baseline gap-2.5">
              <span className="sb-mono text-[52px] font-semibold leading-none tracking-tight tabular-nums text-[color:var(--text-strong)]">$79</span>
              <span className="text-[length:var(--fs-meta)] leading-[1.4] text-[color:var(--text-muted)]">
                /mo
                <br />
                per PM
              </span>
            </div>
            <p className="mt-3 text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">Unlimited field users included. No annual lock-in. Cancel anytime.</p>

            <div className="my-6 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color:var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-[length:var(--fs-xs)] font-semibold text-[color:var(--text-muted)]">
              <Icon name="briefcase" className="h-3.5 w-3.5" stroke={2} />
              Best for subs running 3-25 active jobs a month
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRICING_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[length:var(--fs-sm)] leading-snug text-[color:var(--text-body)]">
                  <Icon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--positive)]" stroke={2.5} />
                  {f}
                </li>
              ))}
            </ul>

            <Cta href={TRIAL_CTA_HREF} variant="primary" withArrow className="mt-8 w-full">
              Start free 14-day trial
            </Cta>
            <p className="mt-3 text-center text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FAQ
   ========================================================================== */

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <div>
        <div data-reveal className="mb-8 text-center sm:mb-12">
          <SectionHeading>
            Questions subs actually ask
          </SectionHeading>
        </div>
        <div data-reveal className="divide-y divide-[color:var(--border)] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[var(--surface-card)]">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[14.5px] font-semibold text-[color:var(--text-strong)] transition-colors hover:text-[color:var(--zinc-600)] [&::-webkit-details-marker]:hidden">
                {item.q}
                <Icon name="chevron" className="faq-chevron h-4 w-4 flex-shrink-0 text-[color:var(--text-faint)] transition-transform" stroke={2} />
              </summary>
              <p className="faq-answer pb-5 pr-8 text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--text-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FINAL CTA + FOOTER
   ========================================================================== */

function FinalCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div data-reveal className="relative mx-auto max-w-[var(--container-max)] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-dark)]">
        <div className="sb-grid-dark pointer-events-none absolute inset-0" />
        <div className="relative flex flex-col items-center justify-between gap-8 bg-[var(--surface-dark)] px-6 py-12 text-center sm:flex-row sm:px-14 sm:py-16 sm:text-left">
          <div>
            <h2 className="sb-h2 sb-h2--dark">
              Stop giving away <Em>work for free</Em>.
            </h2>
            <p className="mt-3 max-w-md text-[length:var(--fs-sm)] leading-relaxed text-[color:var(--zinc-400)] sm:text-[length:var(--fs-body)]">
              Start logging every scope change before it costs you another job. Setup takes one afternoon.
            </p>
          </div>
          <div className="flex w-full flex-shrink-0 flex-col items-center gap-3 sm:w-auto">
            <Cta href={TRIAL_CTA_HREF} variant="brand" withArrow className="w-full sm:w-auto">
              Start free trial
            </Cta>
            <Cta href={DEMO_CTA_HREF} variant="outlineDark" className="w-full sm:w-auto">
              Book a demo
            </Cta>
            <span className="text-[length:var(--fs-meta)] text-[color:var(--zinc-500)]">No card. 14-day trial. Cancel anytime.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[var(--surface-subtle)]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center justify-between gap-4 px-4 py-7 sm:flex-row sm:px-6">
        <Logo className="text-[15px]" />
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: "Product", href: "#product" },
            { label: "How it works", href: "#how" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: DEMO_CTA_HREF },
          ].map((l) => (
            <a key={l.label} href={l.href} className="py-2 text-[length:var(--fs-meta)] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)] touch-manipulation">
              {l.label}
            </a>
          ))}
        </div>
        <span className="text-[length:var(--fs-meta)] text-[color:var(--text-muted)]">&copy; 2026 ScopeBolt</span>
      </div>
    </footer>
  );
}

/* ============================================================================
   ROOT
   ========================================================================== */

export default function ScopeBolt() {
  const rootRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // All motion lives here: transform/opacity only, gated on reduced-motion.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero entrance — badge → headline → lead → CTA, then the mockup.
        gsap
          .timeline({ defaults: { ease: "power3.out", duration: 0.5 } })
          .from("[data-hero-seq]", { y: 18, autoAlpha: 0, stagger: 0.07 })
          .from("[data-hero-mockup]", { y: 26, autoAlpha: 0, duration: 0.65, ease: "power2.out" }, "-=0.3");

        // One reveal pattern for every section: rise 24px, fade in, fire once.
        gsap.utils.toArray("[data-reveal]", rootRef.current).forEach((el) => {
          gsap.from(el, {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });

        // Grouped variant: direct children cascade so sequences read in order.
        gsap.utils.toArray("[data-reveal-group]", rootRef.current).forEach((group) => {
          gsap.from(group.children, {
            y: 20,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        // Accent: the hero glow drifts down as the page scrolls away.
        const hero = rootRef.current?.querySelector("[data-hero]");
        if (hero) {
          gsap.to("[data-hero-glow]", {
            yPercent: 28,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
          });
        }
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="sb-root relative min-h-screen overflow-x-hidden bg-[var(--surface-page)] text-[color:var(--text-strong)] antialiased">
      <a href="#main" className="skip-link">Skip to content</a>
      <style>{`
        /* ---- Families (tokens live in scopebolt-tokens.css) ---------- */
        .sb-root, .sb-root * { font-family: var(--font-sans); }
        .sb-root .sb-serif { font-family: var(--font-display); font-style: italic; font-weight: var(--fw-regular); letter-spacing: var(--tracking-normal); font-size: 1.06em; }
        .sb-root .sb-mono { font-family: var(--font-mono); }

        /* ---- Type --------------------------------------------------- */
        .sb-h1 { font-size: var(--fs-display-1); line-height: var(--lh-display); letter-spacing: var(--tracking-display); font-weight: var(--fw-semibold); color: var(--text-strong); text-wrap: balance; }
        .sb-h2 { font-size: var(--fs-display-2); line-height: var(--lh-display); letter-spacing: var(--tracking-display); font-weight: var(--fw-semibold); color: var(--text-strong); text-wrap: balance; }
        .sb-h2--dark { color: var(--text-on-dark); }

        /* ---- Buttons -------------------------------------------------
           Primary is INK — orange ('brand') is a once-per-view hero
           option. Secondary = white outline; ghost = text-only. */
        .sb-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; padding: 0 28px; border-radius: var(--radius-md); border: 1px solid transparent; font-size: var(--fs-body); font-weight: var(--fw-semibold); letter-spacing: var(--tracking-tight); line-height: 1; text-decoration: none; white-space: nowrap; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform var(--dur-fast) var(--ease-out), background var(--dur-base) ease, color var(--dur-base) ease, box-shadow var(--dur-base) ease, border-color var(--dur-base) ease; }
        .sb-btn--sm { min-height: 44px; padding: 0 14px; font-size: var(--fs-meta); }
        .sb-btn--primary { background: var(--surface-ink); color: var(--text-on-dark); box-shadow: var(--shadow-control); }
        .sb-btn--primary:hover { background: var(--zinc-800); transform: translateY(-1px); }
        .sb-btn--primary:active { background: var(--zinc-950); transform: scale(.985); }
        .sb-btn--brand { background: var(--brand); color: var(--text-on-brand); box-shadow: var(--shadow-brand), var(--hl-top-strong); }
        .sb-btn--brand:hover { box-shadow: var(--shadow-brand-hover), var(--hl-top-strong); transform: translateY(-1px); }
        .sb-btn--brand:active { background: var(--accent-press); transform: scale(.985); }
        .sb-btn--secondary { background: var(--white); color: var(--text-body); border-color: var(--border); }
        .sb-btn--secondary:hover { border-color: var(--border-strong); background: var(--zinc-50); }
        .sb-btn--secondary:active { background: var(--zinc-100); transform: scale(.985); }
        .sb-btn--ghost { background: transparent; color: var(--text-muted); }
        .sb-btn--ghost:hover { background: var(--zinc-100); color: var(--text-strong); }
        .sb-btn--ghost:active { background: var(--zinc-200); }
        .sb-btn--outline-dark { background: color-mix(in srgb, var(--white) 4%, transparent); color: var(--text-on-dark); border-color: var(--border-dark-strong); }
        .sb-btn--outline-dark:hover { background: color-mix(in srgb, var(--white) 9%, transparent); }
        .sb-btn--outline-dark:active { background: color-mix(in srgb, var(--white) 6%, transparent); transform: scale(.985); }
        .sb-btn:focus-visible, .sb-root summary:focus-visible, .sb-root a:focus-visible, .sb-root button:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
        .sb-root [id="main"]:focus { outline: none; }

        /* ---- Cards ---------------------------------------------------
           White, 1px zinc hairline, no shadow at rest; soft lift +
           darker border on hover. On dark: translucent white-5% with a
           white hairline that brightens. */
        .sb-card { background: var(--surface-card); border: 1px solid var(--border); border-radius: var(--radius-lg); transition: border-color var(--dur-base) ease, box-shadow var(--dur-base) ease; }
        .sb-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-card); }
        .sb-card--dark { background: color-mix(in srgb, var(--white) 5%, transparent); border: 1px solid var(--border-dark); border-radius: var(--radius-lg); transition: border-color var(--dur-base) ease, background var(--dur-base) ease; }
        .sb-card--dark:hover { background: color-mix(in srgb, var(--white) 8%, transparent); border-color: var(--border-dark-strong); }

        /* ---- Backgrounds --------------------------------------------- */
        .sb-grid-light { background-image: linear-gradient(to right, var(--zinc-200) 1px, transparent 1px), linear-gradient(to bottom, var(--zinc-200) 1px, transparent 1px); background-size: 48px 48px; -webkit-mask-image: radial-gradient(ellipse 120% 70% at 50% 0%, #000 45%, transparent 100%); mask-image: radial-gradient(ellipse 120% 70% at 50% 0%, #000 45%, transparent 100%); }
        .sb-grid-dark { background-image: linear-gradient(to right, color-mix(in srgb, var(--white) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--white) 6%, transparent) 1px, transparent 1px); background-size: 46px 46px; -webkit-mask-image: radial-gradient(ellipse 85% 55% at 50% 0%, #000, transparent 72%); mask-image: radial-gradient(ellipse 85% 55% at 50% 0%, #000, transparent 72%); }

        /* ---- Motion ----------------------------------------------------
           Entrance + scroll reveals are GSAP-driven (see useGSAP in root);
           only self-contained loops and micro-states live in CSS. */
        .touch-manipulation { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        a, button { -webkit-tap-highlight-color: transparent; }
        @keyframes logRow { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
        .log-row { opacity: 0; animation: logRow .5s var(--ease-out) both; }
        .sb-pulse { width: 7px; height: 7px; border-radius: var(--radius-pill); background: var(--live); flex-shrink: 0; box-shadow: 0 0 0 0 color-mix(in srgb, var(--live) 50%, transparent); animation: sbPulse 2s infinite; }
        @keyframes sbPulse { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--live) 50%, transparent); } 60% { box-shadow: 0 0 0 5px transparent; } }
        .sb-ticker { overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent); mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent); }
        .sb-ticker-track { display: flex; width: max-content; animation: sbTicker 30s linear infinite; }
        .sb-ticker:hover .sb-ticker-track { animation-play-state: paused; }
        .sb-ticker-half { display: flex; gap: 10px; padding-right: 10px; }
        @keyframes sbTicker { to { transform: translateX(-50%); } }
        details[open] .faq-chevron { transform: rotate(180deg); }
        @keyframes faqIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        details[open] .faq-answer { animation: faqIn .3s var(--ease-out); }
        @media (prefers-reduced-motion: reduce) {
          .log-row, .faq-answer { animation: none !important; opacity: 1 !important; transform: none !important; }
          .sb-pulse { animation: none !important; }
          .sb-ticker-track { animation: none !important; }
          .sb-ticker { -webkit-mask-image: none !important; mask-image: none !important; }
        }
      `}</style>

      <Navbar onOpenMenu={() => setMenuOpen(true)} scrolled={scrolled} expanded={menuOpen} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main" tabIndex={-1}>
        <Hero />
        <IntegrationStrip />
        <HowItWorks />
        <Walkthrough />
        <Features />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}