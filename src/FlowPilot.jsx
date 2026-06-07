import { useEffect, useRef, useState } from "react";

/* ============================================================================
   FLOWPILOT — Premium SaaS landing page template
   ----------------------------------------------------------------------------
   A single-file, production-ready landing page for a fictional AI workflow &
   analytics product. Built to be customized fast.

   HOW TO CUSTOMIZE (see README.md for the full guide):
   • Brand name / logo ........ search "BRAND" in this file
   • Colors / fonts / radius .. edit the CSS variables in <Tokens/> below
   • All page copy ............ edit the CONTENT constants near the top
   • CTA links ................ edit CTA_PRIMARY_HREF / CTA_SECONDARY_HREF
   • Icons .................... edit the ICONS map (inline SVG paths)
   • Sections ................. each is a self-contained component; reorder or
                                delete them in <FlowPilot/> at the bottom.
   ========================================================================== */

/* ============================================================================
   CONTENT  —  edit everything a buyer would change in one place
   ========================================================================== */

const BRAND = "FlowPilot";

const CTA_PRIMARY_LABEL = "Start free trial";
const CTA_SECONDARY_LABEL = "Book demo";
const CTA_PRIMARY_HREF = "#pricing";
const CTA_SECONDARY_HREF = "#demo";
const LOGIN_HREF = "#login";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#faq" },
];

const HERO = {
  badge: "AI workflow + analytics platform",
  // Keep the headline to two clauses for scannability.
  title: ["Automate the busywork.", "Run operations from one", "intelligent platform."],
  accentWord: "intelligent",
  subtitle:
    "FlowPilot helps growing teams automate repetitive work, track performance in real time, and make faster decisions — without stitching together five disconnected tools.",
  microcopy: ["No credit card required", "Setup in minutes", "Cancel anytime"],
};

// Fictional placeholder companies for the trust bar — replace with real logos.
const TRUST_LOGOS = ["Northwind", "Quanta", "Lumen Labs", "Vertex", "Hatch", "Outpace"];

const PROBLEMS = {
  eyebrow: "The problem",
  title: "Growth shouldn't mean more chaos",
  copy: "As teams scale, work scatters across tools, handoffs slow to a crawl, and leaders lose the visibility they need to act in time.",
  cards: [
    {
      icon: "layers",
      title: "Your stack doesn't talk",
      body: "Work lives across eight disconnected tools. Data never lines up, and someone is always copying it from one tab to another.",
    },
    {
      icon: "clock",
      title: "Everything is still manual",
      body: "Handoffs, status updates, and follow-ups happen by hand. Your best people spend their day on admin instead of real work.",
    },
    {
      icon: "gauge",
      title: "You're deciding blind",
      body: "By the time a report surfaces a bottleneck, it has already cost you a deal, an SLA, or a renewal. Insight arrives too late.",
    },
  ],
};

const SOLUTION = {
  eyebrow: "The platform",
  title: "One operating layer for your whole team",
  accent: "operating layer",
  copy: "FlowPilot sits on top of the tools you already use and turns scattered work into one connected, automated, measurable flow.",
  capabilities: [
    { icon: "bolt", title: "Workflow automation", body: "Trigger multi-step processes across tools — no code, no babysitting." },
    { icon: "pipeline", title: "Pipeline tracking", body: "Every deal, ticket, and request in a single live view." },
    { icon: "spark", title: "AI prioritization", body: "FlowPilot ranks what matters so the right work happens first." },
    { icon: "chart", title: "Real-time analytics", body: "Live dashboards that flag bottlenecks before they cost you." },
  ],
};

const FEATURES = {
  eyebrow: "Capabilities",
  title: "Everything your team needs to move faster",
  copy: "Purpose-built features that replace busywork with momentum — each one tied to a result you can measure.",
  cards: [
    { icon: "route", title: "Automated handoffs", body: "Move work between teams the moment it's ready — without a single status meeting." },
    { icon: "gauge", title: "Live performance dashboards", body: "See bottlenecks before they become revenue problems, not after the quarter closes." },
    { icon: "spark", title: "AI summaries", body: "Turn scattered updates and threads into a clear list of next actions, automatically." },
    { icon: "bolt", title: "Smart task prioritization", body: "Your team always works the highest-impact item next, ranked by real business signal." },
    { icon: "pipeline", title: "Unified pipeline", body: "Every customer, deal, and ticket in one view that updates itself in real time." },
    { icon: "shield", title: "Enterprise-grade security", body: "SOC 2, SSO, granular roles, and audit logs your IT team will happily sign off on." },
  ],
};

const SHOWCASE = {
  eyebrow: "Product tour",
  title: "A workspace your team will actually want to open",
  copy: "Switch between the views your team lives in every day — all designed, all editable, all in one place.",
};

const USE_CASES = {
  eyebrow: "Solutions",
  title: "Built for the teams that keep revenue moving",
  cta: "Explore use cases",
  cards: [
    {
      icon: "pipeline",
      trade: "Sales teams",
      pain: "Reps lose deals to slow follow-up and messy handoffs between SDRs and AEs.",
      solution: "FlowPilot auto-routes leads and drafts the next step the moment a stage changes.",
      outcome: "3.2× faster handoffs",
    },
    {
      icon: "users",
      trade: "Customer support",
      pain: "Tickets pile up and SLAs quietly slip before anyone on the team notices.",
      solution: "Priority routing and AI summaries surface the tickets that actually matter first.",
      outcome: "42% faster resolution",
    },
    {
      icon: "route",
      trade: "Operations teams",
      pain: "Manual processes break silently and no one is sure who owns the fix.",
      solution: "Automated workflows run the process end-to-end and flag exceptions in real time.",
      outcome: "27 hrs saved / month",
    },
  ],
};

const HOW_STEPS = {
  eyebrow: "How it works",
  title: "Live in an afternoon, not a quarter",
  steps: [
    { n: "01", icon: "plug", title: "Connect your tools", body: "Link your CRM, helpdesk, and apps in a few clicks. No engineering required." },
    { n: "02", icon: "route", title: "Build workflows", body: "Drag triggers and actions together to automate any process — visually." },
    { n: "03", icon: "bolt", title: "Automate the busywork", body: "FlowPilot runs handoffs, updates, and follow-ups so your team doesn't have to." },
    { n: "04", icon: "chart", title: "Track results", body: "Watch live dashboards turn raw activity into decisions you can act on." },
  ],
};

// NOTE: All metrics below are ILLUSTRATIVE placeholder content for the template
// demo. Replace them with your own verified numbers before going live.
const RESULTS = {
  eyebrow: "Results",
  title: "What teams see in the first 90 days",
  note: "Illustrative figures for template demonstration only — replace with your own verified metrics.",
  stats: [
    { value: "42%", label: "less manual admin" },
    { value: "3.2x", label: "faster team handoffs" },
    { value: "27", label: "hours saved / team / month" },
  ],
};

const TESTIMONIALS = {
  eyebrow: "Testimonials",
  title: "Teams don't go back",
  cards: [
    {
      quote:
        "We cut lead response time from hours to minutes. FlowPilot routes and drafts the follow-up before a rep even opens their inbox.",
      name: "Dana Whitfield",
      role: "Head of Operations",
      company: "Northwind",
      initials: "DW",
    },
    {
      quote:
        "I finally have one dashboard that shows where revenue is stuck. We caught two stalled deals last week that would have slipped.",
      name: "Marcus Lee",
      role: "Revenue Lead",
      company: "Vertex",
      initials: "ML",
    },
    {
      quote:
        "CSAT is up because nothing falls through the cracks anymore. The AI summaries alone save my team an hour every single morning.",
      name: "Priya Nair",
      role: "Customer Success Manager",
      company: "Lumen Labs",
      initials: "PN",
    },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integrations",
  title: "Connects with the tools you already run",
  note: "Placeholder integrations — swap in your own logos and names.",
  categories: ["CRM", "Support", "Analytics", "Communication", "Project mgmt"],
  items: [
    { name: "Relay CRM", cat: "CRM", icon: "pipeline" },
    { name: "HelpDesk", cat: "Support", icon: "users" },
    { name: "Insight", cat: "Analytics", icon: "chart" },
    { name: "Pulse Chat", cat: "Communication", icon: "bell" },
    { name: "Boardly", cat: "Project mgmt", icon: "grid" },
    { name: "Ledger", cat: "Billing", icon: "layers" },
    { name: "Mailwave", cat: "Email", icon: "route" },
    { name: "Vaultly", cat: "Security", icon: "shield" },
  ],
};

// Prices are per user / month. Yearly shows the discounted effective monthly rate.
const PRICING = {
  eyebrow: "Pricing",
  title: "Pricing that scales with your team",
  copy: "Start free. Upgrade when you're ready. No seat games, no surprises.",
  yearlyBadge: "Save 20%",
  tiers: [
    {
      name: "Starter",
      monthly: 0,
      yearly: 0,
      blurb: "For small teams finding their flow.",
      cta: "Start free",
      ctaHref: CTA_PRIMARY_HREF,
      popular: false,
      features: ["Up to 5 users", "3 active workflows", "Core analytics", "Community support"],
    },
    {
      name: "Growth",
      monthly: 39,
      yearly: 31,
      blurb: "For teams scaling operations fast.",
      cta: "Start free trial",
      ctaHref: CTA_PRIMARY_HREF,
      popular: true,
      features: ["Up to 25 users", "Unlimited workflows", "AI prioritization", "Advanced analytics", "Priority support"],
    },
    {
      name: "Scale",
      monthly: 89,
      yearly: 71,
      blurb: "For orgs that need control & scale.",
      cta: "Book demo",
      ctaHref: CTA_SECONDARY_HREF,
      popular: false,
      features: ["Unlimited users", "SSO & SAML", "Audit logs & roles", "Custom integrations", "Dedicated CSM"],
    },
  ],
};

// ON-PAGE FAQ = realistic product questions (keeps the demo client-ready).
// Template-buyer questions live in README.md. To show those instead, just
// replace the array below.
const FAQ_ITEMS = [
  { q: "How long does setup take?", a: "Most teams connect their tools and ship their first workflow in an afternoon. There's nothing to install and no engineering work required." },
  { q: "Do I have to replace my current tools?", a: "No. FlowPilot sits on top of your CRM, helpdesk, and apps and syncs both ways — it connects what you already use instead of replacing it." },
  { q: "Is my data secure?", a: "Yes. FlowPilot is SOC 2 Type II, encrypts data in transit and at rest, and supports SSO/SAML, granular role-based access, and full audit logs." },
  { q: "Can I build workflows without code?", a: "Every workflow is built in a visual drag-and-drop editor. Technical teams can go further with our REST API and webhooks." },
  { q: "What happens if I outgrow my plan?", a: "Nothing breaks — we'll simply prompt you to upgrade. You can change or cancel your plan at any time, no contract required." },
  { q: "Do you offer onboarding help?", a: "Growth includes guided onboarding and priority support. Scale adds a dedicated customer success manager to get your team live." },
];

const FINAL_CTA = {
  badge: "Get started",
  title: "Put your busywork on autopilot",
  copy: "Join the teams running their operations on one intelligent platform. Start free — no credit card, setup in minutes.",
};

const FOOTER_COLS = [
  { title: "Product", links: ["Overview", "Automations", "Analytics", "Integrations", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { title: "Resources", links: ["Docs", "API reference", "Community", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
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

// Reveal a section once when it first scrolls into view.
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// Count a numeric value up from zero once visible (respects reduced motion).
function useCounter(raw, dur = 1400, go = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN((1 - Math.pow(1 - p, 3)) * num);
      if (p < 1) requestAnimationFrame(tick);
      else setN(num);
    };
    requestAnimationFrame(tick);
  }, [dur, go, raw]);
  return n;
}

function revealStyle(vis, delay = 0) {
  if (prefersReducedMotion()) return {};
  return {
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(22px)",
    transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  };
}

/* ============================================================================
   ICONS  —  inline SVG path data (24x24, stroked). Add your own here.
   ========================================================================== */

const ICONS = {
  grid: "M4 4.5h6v6H4zM14 4.5h6v6h-6zM14 13.5h6v6h-6zM4 13.5h6v6H4z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  pipeline: "M4 7h6a2 2 0 012 2v6a2 2 0 002 2h6M4 7l3-3M4 7l3 3M20 17l-3-3M20 17l-3 3",
  chart: "M4 20h16M7 20v-6M12 20V7M17 20v-9",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  users: "M16 19v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 17.5V19M10 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM19.5 19v-1.2a3.2 3.2 0 00-2.4-3.1M16 4.2a3.2 3.2 0 010 6.2",
  layers: "M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5",
  shield: "M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6zM9 12l2 2 4-4",
  clock: "M12 7.5V12l3 1.8M12 21a9 9 0 100-18 9 9 0 000 18z",
  plug: "M9 3v5M15 3v5M7 8h10v3a5 5 0 01-10 0zM12 16v5",
  route: "M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM7 7h7a3 3 0 010 6H9a3 3 0 000 6h2",
  gauge: "M12 14l4-4M21 14a9 9 0 10-18 0M5.5 19h13",
  search: "M20.5 20.5l-3.6-3.6M11 17.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 01-3.4 0",
  check: "M5 12.5l4.5 4.5L19 7",
  chevron: "M6 9l6 6 6-6",
  arrow: "M5 12h13M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M9 7h8v8",
  play: "M8 5.5v13l11-6.5z",
  filter: "M4 5h16l-6 7v6l-4 2v-8z",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
  star: "M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.2l1-5.7-4.1-4 5.7-.8z",
};

function Icon({ name, className = "h-5 w-5", stroke = 1.7 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
      <path d={ICONS[name] || ICONS.grid} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================================
   DESIGN TOKENS  —  the one place to retheme the whole template.
   Change a color/font/radius here and it cascades everywhere.
   ========================================================================== */

function Tokens() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap');

      :root {
        /* —— Linear color system (tokens map 1:1 to DESIGN.md) —— */
        --fp-bg:          #010102;   /* canvas — deepest dark surface */
        --fp-bg-alt:      #0F1011;   /* surface-1 — lifted section bg / chrome */
        --fp-surface:     #0F1011;   /* surface-1 — cards / panels */
        --fp-surface-2:   #141516;   /* surface-2 — featured / hover / inner tiles */
        --fp-ink:         #F7F8F8;   /* ink — headings */
        --fp-ink-2:       #D0D6E0;   /* ink-muted — body text */
        --fp-muted:       #8A8F98;   /* ink-subtle — meta / captions */
        --fp-line:        #23252A;   /* hairline borders */
        --fp-line-2:      #18191A;   /* surface-3 — faint nested divider */
        --fp-line-strong: #34343A;   /* hairline-strong — hover / focus borders */
        --fp-accent:      #5E6AD2;   /* PRIMARY ACCENT (lavender-blue) */
        --fp-accent-deep: #828FFF;   /* primary-hover — lighter lavender */
        --fp-accent-bright:#828FFF;  /* accent on dark surfaces */
        --fp-accent-soft: rgba(94,106,210,0.12);
        --fp-success:     #27A644;   /* semantic-success — the only semantic color */
        --fp-dark:        #010102;   /* canvas — deepest lifted surface (sidebar) */

        /* —— Shape & rhythm —— */
        --fp-radius:      12px;      /* rounded.lg — card radius */
        --fp-radius-lg:   16px;      /* rounded.xl — product screenshot panel */

        /* —— Typography (Geist — DESIGN.md-listed substitute, single voice) —— */
        --fp-font-display:'Geist',system-ui,-apple-system,'Segoe UI',sans-serif;
        --fp-font-body:   'Geist',system-ui,-apple-system,sans-serif;
        --fp-font-mono:   'Geist Mono',ui-monospace,'SFMono-Regular',monospace;
      }

      /* Base — scoped under .fp-root so it can't fight the rest of the app */
      .fp-root {
        font-family: var(--fp-font-body);
        color: var(--fp-ink-2);
        background: var(--fp-bg);
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
      .fp-root h1,.fp-root h2,.fp-root h3,.fp-root h4 {
        font-family: var(--fp-font-display);
        color: var(--fp-ink);
        letter-spacing: -0.025em;
        margin: 0;
      }
      .fp-display { font-family: var(--fp-font-display); }
      .fp-mono    { font-family: var(--fp-font-mono); }

      /* —— Reusable component classes (Tailwind handles layout) —— */
      .fp-eyebrow {
        font-family: var(--fp-font-mono);
        font-size: 11px; font-weight: 500;
        letter-spacing: 0.16em; text-transform: uppercase;
        color: var(--fp-accent-deep);
        display: inline-flex; align-items: center; gap: 0.6rem;
      }
      .fp-eyebrow::before {
        content:''; width: 1.4rem; height: 1px; background: var(--fp-accent);
        opacity: .5;
      }
      .fp-eyebrow-c { justify-content: center; }
      .fp-eyebrow-c::after {
        content:''; width: 1.4rem; height: 1px; background: var(--fp-accent); opacity:.5;
      }

      .fp-card {
        background: var(--fp-surface);
        border: 1px solid var(--fp-line);
        border-radius: var(--fp-radius);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.04);  /* subtle top-edge highlight only */
        transition: border-color .2s ease, background .2s ease;
      }
      .fp-card-hover:hover {
        border-color: var(--fp-line-strong);
        background: var(--fp-surface-2);
      }

      /* Buttons */
      .fp-btn {
        display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
        font-weight:500; font-size:14px; line-height:1;
        border-radius: 8px; min-height: 40px; padding: 0 14px;
        transition: background .15s ease, border-color .15s ease, color .15s ease;
        cursor:pointer; white-space:nowrap;
        -webkit-tap-highlight-color: transparent;
      }
      .fp-btn-primary {
        background: var(--fp-accent); color:#fff; border:1px solid transparent;
      }
      .fp-btn-primary:hover { background: var(--fp-accent-deep); }
      .fp-btn-secondary {
        background: var(--fp-surface); color: var(--fp-ink);
        border:1px solid var(--fp-line);
      }
      .fp-btn-secondary:hover { border-color: var(--fp-line-strong); background: var(--fp-surface-2); }
      .fp-btn-ghost { background: transparent; color: var(--fp-ink); border:1px solid transparent; }
      .fp-btn-ghost:hover { background: var(--fp-surface); }

      /* Focus visibility for accessibility */
      .fp-root a:focus-visible, .fp-root button:focus-visible, .fp-root summary:focus-visible, .fp-root input:focus-visible {
        outline: 2px solid var(--fp-accent); outline-offset: 2px; border-radius: 8px;
      }

      /* Pill / chip */
      .fp-chip {
        font-family: var(--fp-font-mono);
        font-size: 10.5px; font-weight: 500; letter-spacing:.06em; text-transform:uppercase;
        display:inline-flex; align-items:center; gap:.4rem;
        padding:.32rem .6rem; border-radius:999px;
        border:1px solid var(--fp-line); color: var(--fp-muted); background: var(--fp-surface);
      }

      /* Blueprint dot-grid backdrop for hero / dark panels */
      .fp-dotgrid {
        background-image: radial-gradient(rgba(11,18,32,.10) 1px, transparent 1px);
        background-size: 22px 22px;
      }
      .fp-dotgrid-dark {
        background-image: radial-gradient(rgba(255,255,255,.09) 1px, transparent 1px);
        background-size: 22px 22px;
      }

      /* Page-load orchestration (hero) */
      @keyframes fpUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:none; } }
      .fp-a1 { animation: fpUp .65s cubic-bezier(.16,1,.3,1) .05s both; }
      .fp-a2 { animation: fpUp .65s cubic-bezier(.16,1,.3,1) .14s both; }
      .fp-a3 { animation: fpUp .65s cubic-bezier(.16,1,.3,1) .24s both; }
      .fp-a4 { animation: fpUp .65s cubic-bezier(.16,1,.3,1) .34s both; }
      .fp-a5 { animation: fpUp .65s cubic-bezier(.16,1,.3,1) .46s both; }
      .fp-a6 { animation: fpUp .8s cubic-bezier(.16,1,.3,1) .58s both; }

      @keyframes fpFloat { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-7px); } }
      .fp-float { animation: fpFloat 5s ease-in-out infinite; }
      .fp-float-2 { animation: fpFloat 6.5s ease-in-out infinite .8s; }

      @keyframes fpBar { from { height: 8%; } }
      .fp-baranim { animation: fpBar .9s cubic-bezier(.16,1,.3,1) both; transform-origin:bottom; }

      details[open] .fp-faq-chev { transform: rotate(180deg); }

      @media (prefers-reduced-motion: reduce) {
        .fp-a1,.fp-a2,.fp-a3,.fp-a4,.fp-a5,.fp-a6,.fp-float,.fp-float-2,.fp-baranim {
          animation: none !important; opacity:1 !important; transform:none !important;
        }
      }
    `}</style>
  );
}

/* ============================================================================
   LAYOUT PRIMITIVES
   ========================================================================== */

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function Eyebrow({ children, center = false }) {
  return <span className={`fp-eyebrow ${center ? "fp-eyebrow-c" : ""}`}>{children}</span>;
}

function SectionHead({ eyebrow, title, copy, center = true, accent }) {
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : "items-start"}`}>
      {eyebrow ? <Eyebrow center={center}>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-balance text-[clamp(28px,4.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em]">
        {accent ? renderWithAccent(title, accent) : title}
      </h2>
      {copy ? <p className="max-w-xl text-[15px] leading-relaxed text-[color:var(--fp-ink-2)] sm:text-[16px]">{copy}</p> : null}
    </div>
  );
}

// Wrap an accent word/phrase in an emerald span (used in headings).
function renderWithAccent(text, accent) {
  const parts = text.split(accent);
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 ? <span style={{ color: "var(--fp-accent)" }}>{accent}</span> : null}
    </span>
  ));
}

function PrimaryBtn({ href, children, className = "" }) {
  return (
    <a href={href} className={`fp-btn fp-btn-primary group ${className}`}>
      {children}
      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" stroke={2.2} />
    </a>
  );
}

function SecondaryBtn({ href, children, className = "", icon = "play" }) {
  return (
    <a href={href} className={`fp-btn fp-btn-secondary ${className}`}>
      {icon ? <Icon name={icon} className="h-4 w-4 text-[color:var(--fp-accent)]" stroke={icon === "play" ? 1.5 : 1.8} /> : null}
      {children}
    </a>
  );
}

/* ============================================================================
   NAVBAR + MOBILE DRAWER          [ section marker: NAVBAR ]
   ========================================================================== */

function Wordmark({ className = "text-[17px]" }) {
  return (
    <a href="#top" className={`flex items-center gap-2 font-bold tracking-tight text-[color:var(--fp-ink)] ${className}`}>
      {/* BRAND logo mark — swap this SVG for your own */}
      <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[color:var(--fp-accent)] text-white">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
          <path d="M4 18V9l8-5 8 5v9M4 18h16M4 18l8-5 8 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="fp-display">{BRAND}</span>
    </a>
  );
}

function MobileDrawer({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-[340px] flex-col border-l border-[color:var(--fp-line)] bg-[color:var(--fp-bg)] transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[64px] items-center justify-between border-b border-[color:var(--fp-line)] px-5">
          <Wordmark className="text-[16px]" />
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-[8px] text-[color:var(--fp-ink)] active:bg-[color:var(--fp-surface)]">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={onClose} className="flex items-center justify-between rounded-[8px] px-4 py-3.5 text-[15px] font-medium text-[color:var(--fp-ink)] active:bg-[color:var(--fp-surface)]">
              {l.label}
              <Icon name="chevron" className="h-4 w-4 -rotate-90 text-[color:var(--fp-muted)]" stroke={2} />
            </a>
          ))}
          <a href={LOGIN_HREF} onClick={onClose} className="flex items-center rounded-[8px] px-4 py-3.5 text-[15px] font-medium text-[color:var(--fp-ink)] active:bg-[color:var(--fp-surface)]">
            Login
          </a>
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-[color:var(--fp-line)] p-4" style={{ paddingBottom: "max(1rem,env(safe-area-inset-bottom))" }}>
          <SecondaryBtn href={CTA_SECONDARY_HREF} icon="" className="w-full">{CTA_SECONDARY_LABEL}</SecondaryBtn>
          <PrimaryBtn href={CTA_PRIMARY_HREF} className="w-full">{CTA_PRIMARY_LABEL}</PrimaryBtn>
        </div>
      </div>
    </>
  );
}

function Navbar({ scrolled, onOpenMenu }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition-all duration-200 ${scrolled ? "border-b border-[color:var(--fp-line)] bg-[color:var(--fp-bg)]/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <Container className="flex h-[64px] items-center justify-between gap-4">
        <Wordmark />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="rounded-[8px] px-3 py-2 text-[14px] font-medium text-[color:var(--fp-ink-2)] transition-colors hover:bg-[color:var(--fp-surface)] hover:text-[color:var(--fp-ink)]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-1.5 md:flex">
          <a href={LOGIN_HREF} className="rounded-[8px] px-3 py-2 text-[14px] font-medium text-[color:var(--fp-ink-2)] transition-colors hover:bg-[color:var(--fp-surface)] hover:text-[color:var(--fp-ink)]">
            Login
          </a>
          <a href={CTA_SECONDARY_HREF} className="fp-btn fp-btn-ghost !min-h-[40px] !text-[14px]">{CTA_SECONDARY_LABEL}</a>
          <a href={CTA_PRIMARY_HREF} className="fp-btn fp-btn-primary !min-h-[40px] !text-[14px]">{CTA_PRIMARY_LABEL}</a>
        </div>
        <button type="button" onClick={onOpenMenu} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-[8px] text-[color:var(--fp-ink)] active:bg-[color:var(--fp-surface)] md:hidden">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </Container>
    </header>
  );
}

/* ============================================================================
   HERO + DASHBOARD MOCKUP         [ section marker: HERO ]
   ========================================================================== */

// Mini bar chart used inside the hero dashboard.
const HERO_BARS = [38, 52, 44, 67, 58, 79, 71, 88, 82, 95];

function HeroDashboard() {
  const [go, setGo] = useState(false);
  const reduce = prefersReducedMotion();
  useEffect(() => {
    const id = setTimeout(() => setGo(true), reduce ? 0 : 700);
    return () => clearTimeout(id);
  }, [reduce]);

  const automated = useCounter("18.4", 1500, go);
  const automatedText = reduce ? "18.4k" : `${(go ? automated : 0).toFixed(1)}k`;

  return (
    <div className="fp-card overflow-hidden !rounded-[var(--fp-radius-lg)]">
      {/* App chrome top bar */}
      <div className="flex items-center gap-3 border-b border-[color:var(--fp-line)] bg-[color:var(--fp-bg-alt)] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5564B]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5A93B]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--fp-accent)]/70" />
        </div>
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] px-2.5 py-1">
          <Icon name="search" className="h-3.5 w-3.5 text-[color:var(--fp-muted)]" stroke={1.8} />
          <span className="fp-mono text-[10.5px] text-[color:var(--fp-muted)]">app.flowpilot.io / overview</span>
        </div>
        <Icon name="bell" className="h-4 w-4 text-[color:var(--fp-muted)]" stroke={1.7} />
      </div>

      <div className="flex min-h-[400px]">
        {/* Sidebar */}
        <aside className="hidden w-[176px] flex-shrink-0 flex-col bg-[color:var(--fp-dark)] sm:flex">
          <div className="flex items-center gap-2 px-4 py-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[color:var(--fp-accent)] text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 18V9l8-5 8 5v9M4 18l8-5 8 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="fp-display text-[13px] font-bold text-white">{BRAND}</span>
          </div>
          <nav className="mt-1 flex flex-col gap-0.5 px-2.5">
            {[
              { l: "Overview", i: "grid", on: true },
              { l: "Automations", i: "bolt" },
              { l: "Pipeline", i: "pipeline" },
              { l: "Analytics", i: "chart" },
              { l: "Team", i: "users" },
            ].map((it) => (
              <span key={it.l} className={`flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[12px] font-medium ${it.on ? "bg-white/10 text-white" : "text-white/55"}`}>
                <Icon name={it.i} className={`h-4 w-4 ${it.on ? "text-[color:var(--fp-accent-bright)]" : ""}`} stroke={1.7} />
                {it.l}
              </span>
            ))}
          </nav>
          <div className="mt-auto m-2.5 rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
            <div className="fp-mono text-[9px] uppercase tracking-wide text-white/45">Plan</div>
            <div className="mt-0.5 text-[12px] font-semibold text-white">Growth</div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-[color:var(--fp-accent-bright)]" />
            </div>
          </div>
        </aside>

        {/* Main canvas */}
        <div className="flex min-w-0 flex-1 flex-col bg-[color:var(--fp-surface)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="fp-mono text-[9.5px] uppercase tracking-[0.14em] text-[color:var(--fp-muted)]">Workspace overview</div>
              <div className="mt-0.5 text-[15px] font-bold text-[color:var(--fp-ink)]">Good morning, Alex</div>
            </div>
            <span className="fp-chip !text-[color:var(--fp-ink-2)]" style={{ borderColor: "rgba(94,106,210,.25)", background: "var(--fp-accent-soft)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--fp-accent)]" /> Live
            </span>
          </div>

          {/* KPI tiles */}
          <div className="mt-3.5 grid grid-cols-3 gap-2.5">
            {[
              { k: "Tasks automated", v: automatedText, d: "+12%", up: true },
              { k: "Accuracy", v: "94%", d: "+3.1%", up: true },
              { k: "Avg. response", v: "1.4m", d: "-32%", up: true },
            ].map((t) => (
              <div key={t.k} className="rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-2.5">
                <div className="fp-mono text-[8.5px] uppercase tracking-wide text-[color:var(--fp-muted)]">{t.k}</div>
                <div className="mt-1 fp-mono text-[18px] font-semibold leading-none text-[color:var(--fp-ink)]">{t.v}</div>
                <div className="mt-1.5 inline-flex items-center gap-0.5 fp-mono text-[9px] font-semibold text-[color:var(--fp-success)]">
                  <Icon name="arrowUpRight" className="h-2.5 w-2.5" stroke={2.4} />
                  {t.d}
                </div>
              </div>
            ))}
          </div>

          {/* Chart + activity */}
          <div className="mt-2.5 grid flex-1 grid-cols-1 gap-2.5 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-semibold text-[color:var(--fp-ink)]">Throughput</span>
                <span className="fp-mono text-[9px] uppercase tracking-wide text-[color:var(--fp-muted)]">Last 10 wks</span>
              </div>
              <div className="mt-auto flex h-[88px] items-end gap-1.5 pt-3">
                {HERO_BARS.map((h, i) => (
                  <div key={i} className="flex-1 overflow-hidden rounded-t-[3px]">
                    <div
                      className={`fp-baranim w-full rounded-t-[3px] ${i === HERO_BARS.length - 1 ? "bg-[color:var(--fp-accent)]" : "bg-[color:var(--fp-line-strong)]"}`}
                      style={{ height: `${h}%`, animationDelay: reduce ? "0s" : `${0.6 + i * 0.06}s` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
              <span className="text-[11.5px] font-semibold text-[color:var(--fp-ink)]">Recent activity</span>
              <div className="mt-2.5 space-y-2.5">
                {[
                  { c: "var(--fp-accent)", t: "Onboarding flow ran", s: "2m ago" },
                  { c: "var(--fp-muted)", t: "Deal moved to Won", s: "9m ago" },
                  { c: "var(--fp-muted)", t: "SLA alert resolved", s: "21m ago" },
                ].map((a) => (
                  <div key={a.t} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: a.c }} />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] text-[color:var(--fp-ink)]">{a.t}</div>
                      <div className="fp-mono text-[9px] text-[color:var(--fp-muted)]">{a.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero relative pt-[104px] pb-16 sm:pt-[124px] sm:pb-20">
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="fp-a1 fp-chip mx-auto !text-[color:var(--fp-ink-2)]" style={{ borderColor: "var(--fp-line)", background: "var(--fp-surface-2)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--fp-accent)]" />
            {HERO.badge}
          </div>

          <h1 className="fp-a2 mt-7 text-balance text-[clamp(40px,7vw,72px)] font-semibold leading-[1.04] tracking-[-0.035em]">
            {HERO.title.map((line, i) => (
              <span key={i} className="block">
                {line.includes(HERO.accentWord) ? renderWithAccent(line, HERO.accentWord) : line}
              </span>
            ))}
          </h1>

          <p className="fp-a3 mx-auto mt-6 max-w-xl text-[17px] leading-[1.5] text-[color:var(--fp-ink-2)] sm:text-[18px]">
            {HERO.subtitle}
          </p>

          <div className="fp-a4 mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <PrimaryBtn href={CTA_PRIMARY_HREF}>{CTA_PRIMARY_LABEL}</PrimaryBtn>
            <SecondaryBtn href={CTA_SECONDARY_HREF}>{CTA_SECONDARY_LABEL}</SecondaryBtn>
          </div>

          <div className="fp-a4 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {HERO.microcopy.map((m) => (
              <span key={m} className="inline-flex items-center gap-1.5 fp-mono text-[11px] uppercase tracking-wide text-[color:var(--fp-muted)]">
                <Icon name="check" className="h-3 w-3 text-[color:var(--fp-accent)]" stroke={2.6} />
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Product screenshot — the protagonist of the section */}
        <div className="fp-a6 relative mx-auto mt-16 max-w-5xl">
          <HeroDashboard />
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   TRUST BAR                       [ section marker: TRUST ]
   ========================================================================== */

function TrustBar() {
  return (
    <section className="border-y border-[color:var(--fp-line)] py-9">
      <Container>
        <p className="text-center fp-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--fp-muted)]">
          Trusted by fast-growing teams worldwide
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_LOGOS.map((name) => (
            <div key={name} className="flex items-center justify-center gap-2 opacity-60 transition-opacity hover:opacity-100">
              {/* Placeholder logo mark — replace with a real <img> or SVG */}
              <span className="h-5 w-5 rounded-[4px] bg-[color:var(--fp-muted)]" />
              <span className="fp-display text-[15px] font-semibold tracking-tight text-[color:var(--fp-ink)]">{name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   PROBLEM                         [ section marker: PROBLEM ]
   ========================================================================== */

function ProblemSection() {
  const [ref, vis] = useInView();
  return (
    <section id="problem" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={PROBLEMS.eyebrow} title={PROBLEMS.title} copy={PROBLEMS.copy} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PROBLEMS.cards.map((c, i) => (
              <div key={c.title} className="fp-card fp-card-hover flex flex-col p-6" style={revealStyle(vis, i * 90)}>
                <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[color:var(--fp-ink)]">
                  <Icon name={c.icon} className="h-5 w-5" stroke={1.7} />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold text-[color:var(--fp-ink)]">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--fp-ink-2)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   SOLUTION / PLATFORM OVERVIEW    [ section marker: SOLUTION ]
   ========================================================================== */

function SolutionSection() {
  const [ref, vis] = useInView();
  return (
    <section id="platform" className="border-y border-[color:var(--fp-line)] py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={SOLUTION.eyebrow} title={SOLUTION.title} accent={SOLUTION.accent} copy={SOLUTION.copy} />

          {/* Operating-layer diagram */}
          <div className="mt-12 overflow-hidden rounded-[var(--fp-radius-lg)] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] p-6 sm:p-8">
            {/* connected sources */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["CRM", "Support", "Email", "Docs", "Billing", "Chat"].map((s) => (
                <span key={s} className="fp-chip">{s}</span>
              ))}
            </div>
            <div className="relative my-6 flex justify-center">
              <div className="h-8 w-px bg-[color:var(--fp-line-strong)]" />
            </div>
            {/* the FlowPilot layer */}
            <div className="rounded-[12px] border border-[color:var(--fp-accent)]/30 bg-[color:var(--fp-accent-soft)] px-5 py-3 text-center">
              <span className="fp-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--fp-accent-deep)]">
                {BRAND} operating layer
              </span>
            </div>

            {/* capabilities */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {SOLUTION.capabilities.map((c, i) => (
                <div key={c.title} className="rounded-[12px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-4" style={revealStyle(vis, 120 + i * 80)}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] text-[color:var(--fp-ink)]">
                    <Icon name={c.icon} className="h-[18px] w-[18px]" stroke={1.7} />
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-[color:var(--fp-ink)]">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--fp-ink-2)]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   FEATURES (dark)                 [ section marker: FEATURES ]
   ========================================================================== */

function Features() {
  const [ref, vis] = useInView();
  return (
    <section id="product" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={FEATURES.eyebrow} title={FEATURES.title} copy={FEATURES.copy} />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.cards.map((c, i) => (
              <div
                key={c.title}
                className="fp-card fp-card-hover p-6"
                style={revealStyle(vis, i * 70)}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[color:var(--fp-ink)]">
                  <Icon name={c.icon} className="h-5 w-5" stroke={1.7} />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-[color:var(--fp-ink)]">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--fp-ink-2)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   PRODUCT SHOWCASE (tabbed)       [ section marker: SHOWCASE ]
   ========================================================================== */

const SHOWCASE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "automations", label: "Automations" },
  { id: "analytics", label: "Analytics" },
  { id: "team", label: "Team activity" },
];

const SHOWCASE_BARS = [42, 60, 51, 73, 64, 86, 78, 94];

function ShowcaseSidebar({ active }) {
  return (
    <aside className="hidden w-[172px] flex-shrink-0 flex-col bg-[color:var(--fp-dark)] sm:flex">
      <div className="flex items-center gap-2 px-4 py-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[color:var(--fp-accent)] text-white">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 18V9l8-5 8 5v9M4 18l8-5 8 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="fp-display text-[13px] font-bold text-white">{BRAND}</span>
      </div>
      <nav className="mt-1 flex flex-col gap-0.5 px-2.5">
        {[
          { l: "Overview", i: "grid", id: "overview" },
          { l: "Automations", i: "bolt", id: "automations" },
          { l: "Analytics", i: "chart", id: "analytics" },
          { l: "Team", i: "users", id: "team" },
          { l: "Settings", i: "filter", id: "settings" },
        ].map((it) => {
          const on = it.id === active || (active === "team" && it.id === "team");
          return (
            <span key={it.l} className={`flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[12px] font-medium ${on ? "bg-white/10 text-white" : "text-white/50"}`}>
              <Icon name={it.i} className={`h-4 w-4 ${on ? "text-[color:var(--fp-accent-bright)]" : ""}`} stroke={1.7} />
              {it.l}
            </span>
          );
        })}
      </nav>
    </aside>
  );
}

function PanelOverview() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "Active workflows", v: "126", d: "+8" },
          { k: "Tasks automated", v: "18.4k", d: "+12%" },
          { k: "Accuracy", v: "94%", d: "+3.1%" },
          { k: "Hrs saved / mo", v: "27", d: "+5" },
        ].map((t) => (
          <div key={t.k} className="rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
            <div className="fp-mono text-[9px] uppercase tracking-wide text-[color:var(--fp-muted)]">{t.k}</div>
            <div className="mt-1 fp-mono text-[20px] font-semibold leading-none text-[color:var(--fp-ink)]">{t.v}</div>
            <div className="mt-1.5 inline-flex items-center gap-0.5 fp-mono text-[9.5px] font-semibold text-[color:var(--fp-success)]"><Icon name="arrowUpRight" className="h-2.5 w-2.5" stroke={2.4} />{t.d}</div>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
          <div className="flex items-center justify-between"><span className="text-[12px] font-semibold text-[color:var(--fp-ink)]">Workflow throughput</span><span className="fp-chip">+18% WoW</span></div>
          <div className="mt-auto flex h-[120px] items-end gap-2 pt-4">
            {SHOWCASE_BARS.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[4px]" style={{ height: `${h}%`, background: i === SHOWCASE_BARS.length - 1 ? "var(--fp-accent)" : "var(--fp-line-strong)" }} />
            ))}
          </div>
        </div>
        <div className="rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
          <span className="text-[12px] font-semibold text-[color:var(--fp-ink)]">By team</span>
          <div className="mt-3 space-y-2.5">
            {[["Sales", 82, "var(--fp-accent)"], ["Support", 64, "var(--fp-muted)"], ["Ops", 47, "var(--fp-muted)"]].map(([l, w, c]) => (
              <div key={l}>
                <div className="flex justify-between text-[11px]"><span className="text-[color:var(--fp-ink-2)]">{l}</span><span className="fp-mono text-[color:var(--fp-muted)]">{w}%</span></div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[color:var(--fp-line)]"><div className="h-full rounded-full" style={{ width: `${w}%`, background: c }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelAutomations() {
  const rows = [
    { name: "Lead → AE handoff", runs: "1,204", status: "Active", on: true },
    { name: "SLA breach alert", runs: "846", status: "Active", on: true },
    { name: "Renewal reminder", runs: "512", status: "Active", on: true },
    { name: "Onboarding sequence", runs: "388", status: "Paused", on: false },
    { name: "Weekly ops digest", runs: "96", status: "Active", on: true },
  ];
  return (
    <div className="flex flex-1 flex-col rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)]">
      <div className="flex items-center justify-between border-b border-[color:var(--fp-line)] px-4 py-2.5">
        <span className="text-[12px] font-semibold text-[color:var(--fp-ink)]">Automations</span>
        <span className="fp-chip" style={{ borderColor: "rgba(94,106,210,.25)", background: "var(--fp-accent-soft)", color: "var(--fp-accent-deep)" }}>+ New</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 border-b border-[color:var(--fp-line-2)] px-4 py-1.5 fp-mono text-[8.5px] uppercase tracking-wide text-[color:var(--fp-muted)]">
        <span>Workflow</span><span className="hidden sm:block">Runs</span><span>Status</span><span>On</span>
      </div>
      <div className="divide-y divide-[color:var(--fp-line-2)]">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 px-4 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[6px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] text-[color:var(--fp-ink-2)]"><Icon name="bolt" className="h-3.5 w-3.5" stroke={1.8} /></span>
              <span className="truncate text-[12.5px] text-[color:var(--fp-ink)]">{r.name}</span>
            </div>
            <span className="hidden fp-mono text-[11px] tabular-nums text-[color:var(--fp-muted)] sm:block">{r.runs}</span>
            <span className={`fp-mono text-[9.5px] font-semibold uppercase ${r.on ? "text-[color:var(--fp-success)]" : "text-[color:var(--fp-muted)]"}`}>{r.status}</span>
            <span className={`flex h-4 w-7 items-center rounded-full px-0.5 ${r.on ? "justify-end bg-[color:var(--fp-success)]" : "justify-start bg-[color:var(--fp-line)]"}`}><span className="h-3 w-3 rounded-full bg-white" /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelAnalytics() {
  const line = [30, 38, 34, 50, 46, 62, 58, 74, 70, 86, 92];
  const pts = line.map((v, i) => `${(i / (line.length - 1)) * 100},${100 - v}`).join(" ");
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-1 flex-col rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
        <div className="flex items-center justify-between"><span className="text-[12px] font-semibold text-[color:var(--fp-ink)]">Decisions per week</span><span className="fp-chip" style={{ borderColor: "rgba(94,106,210,.25)", background: "var(--fp-accent-soft)", color: "var(--fp-accent-deep)" }}>Trending up</span></div>
        <div className="relative mt-3 flex-1">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[130px] w-full">
            <defs><linearGradient id="fpArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--fp-accent)" stopOpacity="0.22" /><stop offset="100%" stopColor="var(--fp-accent)" stopOpacity="0" /></linearGradient></defs>
            <polygon points={`0,100 ${pts} 100,100`} fill="url(#fpArea)" />
            <polyline points={pts} fill="none" stroke="var(--fp-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[["Conversion", "12.8%"], ["Cycle time", "-34%"], ["Forecast", "$1.2M"]].map(([k, v]) => (
          <div key={k} className="rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] p-3">
            <div className="fp-mono text-[9px] uppercase tracking-wide text-[color:var(--fp-muted)]">{k}</div>
            <div className="mt-1 fp-mono text-[16px] font-semibold text-[color:var(--fp-ink)]">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelTeam() {
  const people = [
    { n: "Alex Rivera", r: "Revenue lead", a: "Closed 4 deals", i: "AR" },
    { n: "Mia Chen", r: "Support manager", a: "Resolved 31 tickets", i: "MC" },
    { n: "Tom Okafor", r: "Ops analyst", a: "Shipped 3 workflows", i: "TO" },
    { n: "Sara Lund", r: "AE", a: "12 follow-ups sent", i: "SL" },
  ];
  return (
    <div className="flex flex-1 flex-col rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)]">
      <div className="flex items-center justify-between border-b border-[color:var(--fp-line)] px-4 py-2.5">
        <span className="text-[12px] font-semibold text-[color:var(--fp-ink)]">Team activity — today</span>
        <span className="fp-mono text-[10px] text-[color:var(--fp-muted)]">4 active</span>
      </div>
      <div className="divide-y divide-[color:var(--fp-line-2)]">
        {people.map((p) => (
          <div key={p.n} className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] text-[10px] font-semibold text-[color:var(--fp-ink)]">{p.i}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-[color:var(--fp-ink)]">{p.n}</div>
              <div className="fp-mono text-[9.5px] uppercase tracking-wide text-[color:var(--fp-muted)]">{p.r}</div>
            </div>
            <span className="truncate text-[11.5px] text-[color:var(--fp-ink-2)]">{p.a}</span>
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--fp-success)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductShowcase() {
  const [ref, vis] = useInView();
  const [tab, setTab] = useState("overview");
  return (
    <section id="tour" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={SHOWCASE.eyebrow} title={SHOWCASE.title} copy={SHOWCASE.copy} />

          {/* Tab bar */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] p-1">
              {SHOWCASE_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-pressed={tab === t.id}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    tab === t.id
                      ? "border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[color:var(--fp-ink)]"
                      : "border-transparent text-[color:var(--fp-muted)] hover:text-[color:var(--fp-ink)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frame */}
          <div className="mt-8 overflow-hidden rounded-[var(--fp-radius-lg)] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
            <div className="flex items-center gap-3 border-b border-[color:var(--fp-line)] bg-[color:var(--fp-bg-alt)] px-4 py-2.5">
              <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#E5564B]/70" /><span className="h-2.5 w-2.5 rounded-full bg-[#E5A93B]/70" /><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--fp-accent)]/70" /></div>
              <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] px-2.5 py-1">
                <Icon name="search" className="h-3.5 w-3.5 text-[color:var(--fp-muted)]" stroke={1.8} />
                <span className="fp-mono text-[10.5px] text-[color:var(--fp-muted)]">app.flowpilot.io / {tab}</span>
              </div>
              <Icon name="dots" className="h-4 w-4 text-[color:var(--fp-muted)]" stroke={2} />
            </div>
            <div className="flex min-h-[330px]">
              <ShowcaseSidebar active={tab} />
              <div className="flex min-w-0 flex-1 flex-col p-4">
                {tab === "overview" && <PanelOverview />}
                {tab === "automations" && <PanelAutomations />}
                {tab === "analytics" && <PanelAnalytics />}
                {tab === "team" && <PanelTeam />}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   USE CASES                       [ section marker: USE_CASES ]
   ========================================================================== */

function UseCases() {
  const [ref, vis] = useInView();
  return (
    <section id="use-cases" className="border-y border-[color:var(--fp-line)] py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={USE_CASES.eyebrow} title={USE_CASES.title} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {USE_CASES.cards.map((c, i) => (
              <div key={c.trade} className="fp-card fp-card-hover flex flex-col p-6" style={revealStyle(vis, i * 90)}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[color:var(--fp-ink)]"><Icon name={c.icon} className="h-5 w-5" stroke={1.7} /></span>
                  <h3 className="text-[16px] font-semibold text-[color:var(--fp-ink)]">{c.trade}</h3>
                </div>
                <dl className="mt-4 space-y-3 text-[13px] leading-relaxed">
                  <div><dt className="fp-mono text-[9.5px] uppercase tracking-wide text-[color:var(--fp-muted)]">Pain</dt><dd className="mt-1 text-[color:var(--fp-ink-2)]">{c.pain}</dd></div>
                  <div><dt className="fp-mono text-[9.5px] uppercase tracking-wide text-[color:var(--fp-muted)]">Solution</dt><dd className="mt-1 text-[color:var(--fp-ink-2)]">{c.solution}</dd></div>
                </dl>
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--fp-accent)]/25 bg-[color:var(--fp-accent-soft)] px-2.5 py-1 fp-mono text-[10.5px] font-semibold uppercase tracking-wide text-[color:var(--fp-accent-deep)]">
                    <Icon name="arrowUpRight" className="h-3 w-3" stroke={2.4} />{c.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <SecondaryBtn href="#use-cases" icon="arrowUpRight">{USE_CASES.cta}</SecondaryBtn>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   HOW IT WORKS                    [ section marker: HOW ]
   ========================================================================== */

function HowItWorks() {
  const [ref, vis] = useInView();
  return (
    <section id="how" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={HOW_STEPS.eyebrow} title={HOW_STEPS.title} />
          <div className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.steps.map((s, i) => (
              <div key={s.n} className="relative" style={revealStyle(vis, i * 90)}>
                <div className="fp-card flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[color:var(--fp-ink)]"><Icon name={s.icon} className="h-5 w-5" stroke={1.7} /></span>
                    <span className="fp-mono text-[26px] font-semibold leading-none text-[color:var(--fp-line-strong)]">{s.n}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-[color:var(--fp-ink)]">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--fp-ink-2)]">{s.body}</p>
                </div>
                {i < HOW_STEPS.steps.length - 1 ? (
                  <Icon name="arrow" className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-[color:var(--fp-muted)] lg:block" stroke={2} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   RESULTS / METRICS               [ section marker: METRICS ]
   ========================================================================== */

function ResultStat({ value, label, go }) {
  const prefix = value.startsWith("$") ? "$" : "";
  const suffix = value.endsWith("x") ? "x" : value.endsWith("%") ? "%" : "";
  const n = useCounter(value, 1500, go);
  const display = prefersReducedMotion()
    ? value
    : `${prefix}${(go ? n : 0).toFixed(value.includes(".") ? 1 : 0)}${suffix}`;
  return (
    <div className="px-4 py-8 text-center sm:py-12">
      <div className="fp-mono text-[clamp(34px,6vw,52px)] font-semibold leading-none tracking-tight text-[color:var(--fp-ink)]">{display}</div>
      <div className="mt-3 text-[13px] font-medium uppercase tracking-[0.12em] text-[color:var(--fp-muted)]">{label}</div>
    </div>
  );
}

function Results() {
  const [ref, vis] = useInView(0.3);
  return (
    <section id="results" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={RESULTS.eyebrow} title={RESULTS.title} />
          <div className="mt-12 overflow-hidden rounded-[var(--fp-radius-lg)] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)]">
            <div className="grid grid-cols-1 divide-y divide-[color:var(--fp-line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {RESULTS.stats.map((s) => (
                <ResultStat key={s.label} value={s.value} label={s.label} go={vis} />
              ))}
            </div>
          </div>
          {/* Disclaimer — replace placeholder numbers with verified data */}
          <p className="mt-4 text-center fp-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--fp-muted)]">{RESULTS.note}</p>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   TESTIMONIALS                    [ section marker: TESTIMONIALS ]
   ========================================================================== */

function Stars() {
  return (
    <div className="flex gap-0.5 text-[color:var(--fp-ink)]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={ICONS.star} />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const [ref, vis] = useInView();
  return (
    <section id="testimonials" className="border-y border-[color:var(--fp-line)] py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={TESTIMONIALS.eyebrow} title={TESTIMONIALS.title} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {TESTIMONIALS.cards.map((t, i) => (
              <figure key={t.name} className="fp-card fp-card-hover flex flex-col p-6" style={revealStyle(vis, i * 90)}>
                <Stars />
                <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-[color:var(--fp-ink)]">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[color:var(--fp-line-2)] pt-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[12px] font-semibold text-[color:var(--fp-ink)]">{t.initials}</span>
                  <div>
                    <div className="text-[14px] font-semibold text-[color:var(--fp-ink)]">{t.name}</div>
                    <div className="text-[12px] text-[color:var(--fp-muted)]">{t.role} · {t.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   INTEGRATIONS                    [ section marker: INTEGRATIONS ]
   ========================================================================== */

function Integrations() {
  const [ref, vis] = useInView();
  return (
    <section id="integrations" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={INTEGRATIONS.eyebrow} title={INTEGRATIONS.title} />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {INTEGRATIONS.categories.map((c) => (
              <span key={c} className="fp-chip">{c}</span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {INTEGRATIONS.items.map((it, i) => (
              <div key={it.name} className="fp-card fp-card-hover flex items-center gap-3 p-4" style={revealStyle(vis, i * 50)}>
                {/* Placeholder integration mark — replace with a real logo <img> */}
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface-2)] text-[color:var(--fp-ink)]">
                  <Icon name={it.icon} className="h-5 w-5" stroke={1.7} />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold text-[color:var(--fp-ink)]">{it.name}</div>
                  <div className="fp-mono text-[9.5px] uppercase tracking-wide text-[color:var(--fp-muted)]">{it.cat}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] text-[color:var(--fp-ink-2)]">
            Plus 200+ more — or build your own with the open API.
            <span className="ml-2 fp-mono text-[10px] uppercase tracking-wide text-[color:var(--fp-muted)]">{INTEGRATIONS.note}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   PRICING                         [ section marker: PRICING ]
   ========================================================================== */

function Pricing() {
  const [ref, vis] = useInView();
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="border-y border-[color:var(--fp-line)] py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionHead eyebrow={PRICING.eyebrow} title={PRICING.title} copy={PRICING.copy} />

          {/* Monthly / yearly toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-[13px] font-semibold ${!yearly ? "text-[color:var(--fp-ink)]" : "text-[color:var(--fp-muted)]"}`}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              aria-label="Toggle yearly billing"
              onClick={() => setYearly((v) => !v)}
              className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition-colors ${yearly ? "border-transparent bg-[color:var(--fp-accent)]" : "border-[color:var(--fp-line)] bg-[color:var(--fp-surface)]"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${yearly ? "left-[calc(100%-1.375rem)]" : "left-0.5"}`} />
            </button>
            <span className={`text-[13px] font-semibold ${yearly ? "text-[color:var(--fp-ink)]" : "text-[color:var(--fp-muted)]"}`}>Yearly</span>
            <span className="rounded-full border border-[color:var(--fp-accent)]/30 bg-[color:var(--fp-accent-soft)] px-2 py-0.5 fp-mono text-[9.5px] font-semibold uppercase tracking-wide text-[color:var(--fp-accent-deep)]">{PRICING.yearlyBadge}</span>
          </div>

          {/* Tier cards */}
          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
            {PRICING.tiers.map((t) => {
              const price = yearly ? t.yearly : t.monthly;
              const popular = t.popular;
              return (
                <div
                  key={t.name}
                  className={`relative flex flex-col rounded-[var(--fp-radius-lg)] border p-6 sm:p-7 ${
                    popular
                      ? "border-[color:var(--fp-accent)]/40 bg-[color:var(--fp-surface-2)] lg:-mt-3 lg:mb-[-0.75rem]"
                      : "border-[color:var(--fp-line)] bg-[color:var(--fp-surface)]"
                  }`}
                >
                  {popular ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--fp-accent)] px-3 py-1 fp-mono text-[9.5px] font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold text-[color:var(--fp-ink)]">{t.name}</h3>
                    {popular ? <Icon name="spark" className="h-5 w-5 text-[color:var(--fp-accent)]" stroke={1.7} /> : null}
                  </div>
                  <p className="mt-2 text-[13px] text-[color:var(--fp-ink-2)]">{t.blurb}</p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="fp-mono text-[40px] font-semibold leading-none tracking-tight text-[color:var(--fp-ink)]">
                      {price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price !== 0 ? <span className="fp-mono text-[11px] uppercase tracking-wide text-[color:var(--fp-muted)]">/ user / mo</span> : null}
                  </div>
                  <div className="mt-1 h-4 fp-mono text-[10px] uppercase tracking-wide text-[color:var(--fp-muted)]">
                    {price !== 0 && yearly ? "billed annually" : ""}
                  </div>
                  <a href={t.ctaHref} className={`fp-btn mt-6 w-full ${popular ? "fp-btn-primary" : "fp-btn-secondary"}`}>{t.cta}</a>
                  <ul className="mt-6 space-y-3 border-t border-[color:var(--fp-line-2)] pt-6">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-[color:var(--fp-ink-2)]">
                        <Icon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--fp-ink)]" stroke={2.4} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   FAQ (accordion)                 [ section marker: FAQ ]
   ========================================================================== */

function Faq() {
  const [ref, vis] = useInView();
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} style={revealStyle(vis)} className="mx-auto max-w-3xl">
          <SectionHead eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-10 divide-y divide-[color:var(--fp-line)] overflow-hidden rounded-[var(--fp-radius-lg)] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)]">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group px-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-semibold text-[color:var(--fp-ink)] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Icon name="chevron" className="fp-faq-chev h-4 w-4 flex-shrink-0 text-[color:var(--fp-muted)] transition-transform duration-200" stroke={2} />
                </summary>
                <p className="pb-5 pr-8 text-[14px] leading-relaxed text-[color:var(--fp-ink-2)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   FINAL CTA                       [ section marker: FINAL_CTA ]
   ========================================================================== */

function FinalCta() {
  const [ref, vis] = useInView(0.2);
  return (
    <section id="demo" className="px-5 pb-20 sm:px-6 sm:pb-28">
      <Container className="!px-0">
        <div ref={ref} style={revealStyle(vis)} className="overflow-hidden rounded-[var(--fp-radius-lg)] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)]">
          <div className="flex flex-col items-center gap-7 px-6 py-14 text-center sm:px-12 sm:py-20">
            <span className="fp-eyebrow fp-eyebrow-c" style={{ color: "var(--fp-accent-bright)" }}>{FINAL_CTA.badge}</span>
            <h2 className="max-w-2xl text-balance text-[clamp(28px,4.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[color:var(--fp-ink)]">{FINAL_CTA.title}</h2>
            <p className="max-w-lg text-[15px] leading-relaxed text-[color:var(--fp-ink-2)] sm:text-[16px]">{FINAL_CTA.copy}</p>
            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <PrimaryBtn href={CTA_PRIMARY_HREF}>{CTA_PRIMARY_LABEL}</PrimaryBtn>
              <a href="#pricing" className="fp-btn fp-btn-secondary">View pricing</a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {HERO.microcopy.map((m) => (
                <span key={m} className="inline-flex items-center gap-1.5 fp-mono text-[11px] uppercase tracking-wide text-[color:var(--fp-muted)]">
                  <Icon name="check" className="h-3 w-3 text-[color:var(--fp-accent)]" stroke={2.6} />{m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   FOOTER                          [ section marker: FOOTER ]
   ========================================================================== */

const SOCIALS = [
  { label: "X", d: "M3 3l8.5 11L3.5 21H6l6.5-7 5 7H21l-8.8-12L20.5 3H18l-5.8 6.4L7.7 3z" },
  { label: "LinkedIn", d: "M5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 9h3v11H4zM10 9h3v1.6c.5-.9 1.6-1.8 3.3-1.8C19 8.8 20 10.4 20 13v7h-3v-6c0-1.4-.5-2.3-1.7-2.3-1 0-1.6.7-1.8 1.4-.1.2-.1.6-.1.9v6h-3z" },
  { label: "GitHub", d: "M12 3a9 9 0 00-2.8 17.5c.4 0 .6-.2.6-.5v-1.7c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.5 0-.5 0-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .3-1.8.9-2.4-.1-.3-.4-1.2.1-2.4 0 0 .7-.2 2.4.9a8.3 8.3 0 014.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.4.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7v2.5c0 .3.2.5.6.5A9 9 0 0012 3z" },
];

function Footer() {
  return (
    <footer className="border-t border-[color:var(--fp-line)] pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand + newsletter */}
          <div className="col-span-2">
            <Wordmark className="text-[16px]" />
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[color:var(--fp-ink-2)]">
              The AI-powered workflow and analytics platform for teams that want to move faster.
            </p>
            <form className="mt-5 flex max-w-xs gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="fp-newsletter" className="sr-only">Email address</label>
              <input
                id="fp-newsletter"
                type="email"
                required
                placeholder="you@company.com"
                className="h-11 min-w-0 flex-1 rounded-[8px] border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] px-3 text-[13px] text-[color:var(--fp-ink)] placeholder:text-[color:var(--fp-muted)] outline-none focus:border-[color:var(--fp-accent)]"
              />
              <button type="submit" className="fp-btn fp-btn-primary !min-h-[44px] !px-4 !text-[13px]">Subscribe</button>
            </form>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="fp-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--fp-muted)]">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-[color:var(--fp-ink-2)] transition-colors hover:text-[color:var(--fp-ink)]">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--fp-line)] py-8 sm:flex-row" style={{ paddingBottom: "max(2rem,env(safe-area-inset-bottom))" }}>
          <span className="fp-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--fp-muted)]">© 2026 {BRAND}. Demo template.</span>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--fp-line)] bg-[color:var(--fp-surface)] text-[color:var(--fp-ink-2)] transition-colors hover:text-[color:var(--fp-ink)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ============================================================================
   ROOT
   ========================================================================== */

export default function FlowPilot() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fp-root min-h-screen overflow-x-hidden">
      <Tokens />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[color:var(--fp-ink)] focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <Navbar scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main">
        <Hero />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <Features />
        <ProductShowcase />
        <UseCases />
        <HowItWorks />
        <Results />
        <Testimonials />
        <Integrations />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
