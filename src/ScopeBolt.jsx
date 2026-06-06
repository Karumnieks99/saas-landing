import { useEffect, useRef, useState } from "react";

// Centralized page copy keeps each section component focused on layout.
const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const PROOF_ITEMS = [
  { value: "$4,200", label: "avg recovered per job" },
  { value: "340+", label: "subcontractors active" },
  { value: "98%", label: "retention rate" },
];

const FEATURES = [
  {
    tag: "Track",
    title: "Scope log that never lies",
    desc: "Every request, email, or site instruction is timestamped and tied to a job code the moment it happens.",
  },
  {
    tag: "Alert",
    title: "Know before you dig in",
    desc: "ScopeBolt compares new requests against your signed contract and flags anything outside it \u2014 instantly.",
  },
  {
    tag: "Bill",
    title: "Change orders in 60 seconds",
    desc: "One tap generates a professional change order. Sign-off from the GC happens before your crew lifts a tool.",
  },
  {
    tag: "Protect",
    title: "Dispute-proof documentation",
    desc: "Every interaction is archived with timestamps. Pull it up in any dispute and win. We've seen $22k recovered in one job.",
  },
];

const TESTIMONIALS = [
  {
    quote: "We were bleeding $6\u20138k per project on scope drift and didn't even realize it. ScopeBolt paid for itself on job one.",
    name: "Mike R.",
    role: "Electrical Subcontractor \u00B7 Chicago, IL",
    initials: "MR",
    recovered: "$11,400 recovered in 3 months",
  },
  {
    quote: "Change orders used to take 2 days of back-and-forth. Now my PM sends one from the truck and the GC signs it the same day.",
    name: "Sandra T.",
    role: "Mechanical Sub \u00B7 Dallas, TX",
    initials: "ST",
    recovered: "$7,800 recovered first month",
  },
  {
    quote: "I pulled the scope log up mid-dispute and won $22k that would've been a complete write-off. That log is gold.",
    name: "Aaron K.",
    role: "Concrete Subcontractor \u00B7 Denver, CO",
    initials: "AK",
    recovered: "$22,000 won in one dispute",
  },
];

const PRICING_FEATURES = [
  "Unlimited jobs & change orders",
  "Real-time scope log",
  "One-tap CO generation & GC sign-off",
  "Procore + Buildertrend sync",
  "Dispute archive (5 years)",
  "Priority support",
];

const HOW_STEPS = [
  {
    n: "1",
    title: "Set your baseline",
    body: "Upload your signed contract. ScopeBolt reads it and builds your scope baseline automatically.",
    time: "2 min setup",
  },
  {
    n: "2",
    title: "Log changes as they happen",
    body: "Anyone on your team logs a scope request from the field \u2014 photo, voice, or text. It's timestamped and attached to the job.",
    time: "30 sec per entry",
  },
  {
    n: "3",
    title: "Send the CO, get paid",
    body: "ScopeBolt flags the deviation, drafts the change order, and sends it for GC sign-off. Done before your crew starts.",
    time: "Under 60 seconds",
  },
];

const TICKER_LOGOS = [
  "Procore",
  "Buildertrend",
  "QuickBooks",
  "Sage 300",
  "Foundation",
  "Jonas",
  "Viewpoint",
  "CoConstruct",
];

const AVATARS = [{ i: "MR" }, { i: "JT" }, { i: "AK" }, { i: "SB" }];

const CONTACT_EMAIL = "hello@scopebolt.com";
const DEMO_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Book%20a%20ScopeBolt%20demo`;
const TRIAL_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Start%20a%20ScopeBolt%20free%20trial`;

// Reveal each section once when it first enters the viewport.
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, vis];
}

// Counts headline stats up from zero once their card is visible.
function useCounter(raw, dur = 1400, go = false) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!go) {
      return;
    }

    let t0 = null;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));

    const tick = (ts) => {
      if (!t0) {
        t0 = ts;
      }

      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * num));

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setN(num);
      }
    };

    requestAnimationFrame(tick);
  }, [dur, go, raw]);

  return n;
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProofStat({ value, label, delay }) {
  const [ref, vis] = useInView(0.3);
  const prefix = value.startsWith("$") ? "$" : "";
  const suffix = value.endsWith("+") ? "+" : value.endsWith("%") ? "%" : "";
  const count = useCounter(value, 1300, vis);

  return (
    <div
      ref={ref}
      className="px-3 py-5 text-center sm:px-6"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: `all 0.5s ease ${delay}ms` }}
    >
      <div className="font-mono-tech text-[22px] font-semibold tabular-nums tracking-tight text-[#1a1a17] sm:text-[27px]">
        {vis ? `${prefix}${count.toLocaleString()}${suffix}` : `${prefix}0${suffix}`}
      </div>
      <div className="mt-1.5 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#1a1a17]/40 sm:text-[11px]">{label}</div>
    </div>
  );
}

// Hero "money shot": a live construction scope log rendered as a titleblock document.
const LOG_ROWS = [
  { t: "09:42", code: "IN-001", desc: "Added 40 LF conduit run", kind: "logged", delay: "0.9s" },
  { t: "09:43", code: "OUT-SCOPE", desc: "Outside signed contract scope", kind: "flag" },
  { t: "10:01", code: "CO-118", desc: "Change order sent to GC", kind: "sent", delay: "1.3s" },
  { t: "10:14", code: "CO-118", desc: "GC signed the change order", kind: "signed", delay: "1.5s" },
];

function LogTag({ kind }) {
  if (kind === "flag") {
    return (
      <span className="flex-shrink-0 rounded border border-[#e8440a]/30 bg-[#e8440a]/10 px-1.5 py-0.5 font-mono-tech text-[10px] font-bold tabular-nums text-[#c2380a]">
        +$1,240
      </span>
    );
  }

  if (kind === "sent") {
    return (
      <span className="inline-flex flex-shrink-0 items-center gap-1 font-mono-tech text-[10px] font-semibold uppercase tracking-wide text-[#234e70]">
        Sent
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 12h16m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (kind === "signed") {
    return (
      <span className="inline-flex flex-shrink-0 items-center gap-1 rounded border border-[#0e7c52]/30 bg-[#0e7c52]/10 px-1.5 py-0.5 font-mono-tech text-[10px] font-bold tabular-nums text-[#0e7c52]">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        $1,240
      </span>
    );
  }

  return (
    <span className="inline-flex flex-shrink-0 items-center gap-1 font-mono-tech text-[10px] font-medium uppercase tracking-wide text-[#1a1a17]/40">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Logged
    </span>
  );
}

function LogRow({ r }) {
  const isFlag = r.kind === "flag";

  return (
    <div
      className={
        isFlag
          ? "log-row-flag flex items-center gap-3 border-l-2 border-[#e8440a] bg-[#e8440a]/5 px-4 py-3 sm:px-5"
          : "log-row flex items-center gap-3 px-4 py-3 sm:px-5"
      }
      style={isFlag ? undefined : { animationDelay: r.delay }}
    >
      <span className="w-9 flex-shrink-0 font-mono-tech text-[11px] tabular-nums text-[#234e70]">{r.t}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          {isFlag && (
            <svg className="h-3 w-3 flex-shrink-0 text-[#e8440a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 9v3.75m0 3.75h.008M10.34 3.94L1.7 18.88A1.9 1.9 0 003.36 21.7h17.28a1.9 1.9 0 001.66-2.82L13.66 3.94a1.9 1.9 0 00-3.32 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="font-mono-tech text-[9px] uppercase tracking-[0.1em] text-[#1a1a17]/40">{r.code}</span>
        </div>
        <div className="truncate text-[13px] text-[#1a1a17]/80">{r.desc}</div>
      </div>
      <LogTag kind={r.kind} />
    </div>
  );
}

function ScopeLogPanel() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setGo(true), 1700);
    return () => clearTimeout(id);
  }, []);

  const reduce =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const total = useCounter("4200", 1500, go);
  const shown = reduce ? "4,200" : go ? total.toLocaleString() : "0";

  return (
    <div className="relative">
      <div className="mb-2.5 flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#1a1a17]/40">
        <span className="text-[#234e70]">Fig. 1</span>
        <span className="h-px w-6 bg-[#1a1a17]/20" />
        Live scope log
      </div>

      <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03),0_30px_60px_-28px_rgba(26,26,23,0.3)]">
        <div className="flex items-center justify-between border-b border-black/10 bg-[#fbfaf7] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="live h-1.5 w-1.5 rounded-full bg-[#0e7c52]" />
            <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a17]">Scope Log</span>
          </div>
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[#234e70] sm:text-[11px]">Job #4417 {"·"} Riverfront Med</span>
        </div>

        <div className="flex items-center gap-3 border-b border-black/5 px-4 py-2 font-mono-tech text-[9px] uppercase tracking-[0.12em] text-[#1a1a17]/40 sm:px-5">
          <span className="w-9">Time</span>
          <span className="flex-1">Entry</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-black/5">
          {LOG_ROWS.map((r) => (
            <LogRow key={r.t + r.code} r={r} />
          ))}
        </div>

        <div className="flex items-center justify-between bg-[#1a1a17] px-4 py-4 sm:px-5">
          <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f6f5f1]/60">Recovered this job</span>
          <span className="font-mono-tech text-[20px] font-semibold tabular-nums text-[#fb6a2e] sm:text-[23px]">${shown}</span>
        </div>
      </div>
    </div>
  );
}

// Mobile switches testimonials with swipe gestures instead of rendering the full grid.
function TestiSwiper() {
  const [idx, setIdx] = useState(0);
  const sx = useRef(null);

  const onTS = (e) => {
    sx.current = e.touches[0].clientX;
  };

  const onTE = (e) => {
    if (!sx.current) {
      return;
    }

    const dx = e.changedTouches[0].clientX - sx.current;

    if (dx < -40) {
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    } else if (dx > 40) {
      setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }

    sx.current = null;
  };

  const t = TESTIMONIALS[idx];

  return (
    <div>
      <div className="select-none rounded-lg border border-black/10 bg-white p-6" onTouchStart={onTS} onTouchEnd={onTE}>
        <Stars />
        <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#1a1a17]/85">"{t.quote}"</p>
        <div className="mt-4 flex items-center gap-3 border-t border-black/5 pt-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1a1a17] text-xs font-bold text-[#f6f5f1]">{t.initials}</div>
          <div>
            <div className="text-[13px] font-semibold text-[#1a1a17]">{t.name}</div>
            <div className="text-[11px] text-[#1a1a17]/50">{t.role}</div>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#0e7c52]/25 bg-[#0e7c52]/10 px-2.5 py-1 font-mono-tech text-[11px] font-semibold tabular-nums text-[#0e7c52]">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.recovered}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all touch-manipulation ${i === idx ? "w-5 bg-[#1a1a17]" : "w-1.5 bg-black/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Drawer({ open, onClose }) {
  // Prevent the page behind the drawer from scrolling on mobile.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 bottom-0 z-50 flex w-[280px] flex-col bg-[#f6f5f1] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-[56px] items-center justify-between border-b border-black/10 px-5">
          <span className="text-[15px] font-bold text-[#1a1a17]">
            Scope<span style={{ color: "#e8440a" }}>Bolt</span>
          </span>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-md text-[#1a1a17] active:bg-black/5 touch-manipulation">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={onClose} className="flex items-center rounded-md px-4 py-3.5 font-mono-tech text-[13px] uppercase tracking-[0.08em] text-[#1a1a17]/80 active:bg-black/5 touch-manipulation">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-black/10 p-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <a href={DEMO_CTA_HREF} onClick={onClose} className="inline-flex w-full items-center justify-center rounded-md border border-black/10 bg-white py-3.5 text-[14px] font-medium text-[#1a1a17]/70 active:bg-black/5 touch-manipulation">
            Book demo
          </a>
          <a href={TRIAL_CTA_HREF} onClick={onClose} className="inline-flex w-full items-center justify-center rounded-md bg-[#c2380a] py-3.5 text-[14px] font-bold text-white active:bg-[#a82e06] touch-manipulation">
            Start free trial {"\u2192"}
          </a>
        </div>
      </div>
    </>
  );
}

// Reuse the same fade-up treatment across sections instead of repeating inline objects.
function getRevealStyle(vis) {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return {};
  }

  return {
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(20px)",
    transition: "all .6s ease",
  };
}

// Shared section chrome keeps the blueprint language identical across every section.
function SectionLabel({ fig, children, tone = "light" }) {
  return (
    <div className="inline-flex items-center gap-2.5 font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em]">
      <span className="h-1.5 w-1.5 flex-shrink-0 bg-[#e8440a]" />
      {fig ? <span className={tone === "dark" ? "text-white/40" : "text-[#1a1a17]/35"}>{fig}</span> : null}
      <span className={tone === "dark" ? "text-[#9fc1dd]" : "text-[#234e70]"}>{children}</span>
    </div>
  );
}

function SectionHeading({ children, tone = "light" }) {
  return (
    <h2 className={`mt-4 font-fraunces text-[clamp(28px,5.5vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] ${tone === "dark" ? "text-[#f6f5f1]" : "text-[#1a1a17]"}`}>
      {children}
    </h2>
  );
}

const FEATURE_ICON_PATHS = {
  Track: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M8.5 12.5h7M8.5 16h4",
  Alert: "M12 9v3.75m0 3.75h.008M10.34 3.94L1.7 18.88A1.9 1.9 0 003.36 21.7h17.28a1.9 1.9 0 001.66-2.82L13.66 3.94a1.9 1.9 0 00-3.32 0z",
  Bill: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  Protect: "M12 3l7 3v5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-3zM9 12l2 2 4-4",
};

function FeatureIcon({ tag }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d={FEATURE_ICON_PATHS[tag] || FEATURE_ICON_PATHS.Track} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HowSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={getRevealStyle(vis)}>
      <div className="mb-10 text-center sm:mb-14">
        <SectionLabel fig="Fig. 02">How it works</SectionLabel>
        <SectionHeading>
          From job start to <span className="redline">paid</span>, in 3 steps
        </SectionHeading>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {HOW_STEPS.map((s) => (
          <div key={s.n} className="group relative overflow-hidden rounded-lg border border-black/10 bg-white p-6 transition-all hover:border-black/20 hover:shadow-[0_14px_40px_-18px_rgba(26,26,23,0.22)]">
            <div className="flex items-start justify-between">
              <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.16em] text-[#1a1a17]/35">Step 0{s.n}</span>
              <span className="font-fraunces text-[44px] leading-none text-[#1a1a17]/10 transition-colors group-hover:text-[#e8440a]/20">0{s.n}</span>
            </div>
            <h3 className="mt-3 text-[16px] font-semibold text-[#1a1a17]">{s.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#1a1a17]/60">{s.body}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-medium uppercase tracking-wide text-[#234e70]">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {s.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={getRevealStyle(vis)}>
      <div className="mb-10 text-center sm:mb-14">
        <SectionLabel fig="Fig. 03" tone="dark">Features</SectionLabel>
        <SectionHeading tone="dark">Built for the field, not the office</SectionHeading>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.06] touch-manipulation">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#fb6a2e] transition-colors group-hover:border-[#fb6a2e]/40">
              <FeatureIcon tag={f.tag} />
            </div>
            <div className="mb-2 font-mono-tech text-[10px] font-semibold uppercase tracking-[0.16em] text-[#fb6a2e]">{f.tag}</div>
            <h3 className="mb-2 text-[16px] font-semibold text-[#f6f5f1]">{f.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-[#f6f5f1]/55">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={getRevealStyle(vis)}>
      <div className="mb-8 text-center sm:mb-12">
        <SectionLabel fig="Fig. 04">Results</SectionLabel>
        <SectionHeading>
          Real money recovered by <span className="redline">real subs</span>
        </SectionHeading>
      </div>
      <div className="sm:hidden">
        <TestiSwiper />
      </div>
      <div className="hidden gap-4 sm:grid sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-6 transition-all hover:border-black/20 hover:shadow-[0_14px_40px_-18px_rgba(26,26,23,0.18)]">
            <Stars />
            <p className="flex-1 text-[14px] leading-relaxed text-[#1a1a17]/80">"{t.quote}"</p>
            <div className="flex flex-col gap-3 border-t border-black/5 pt-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1a1a17] text-xs font-bold text-[#f6f5f1]">{t.initials}</div>
                <div>
                  <div className="text-[13px] font-semibold text-[#1a1a17]">{t.name}</div>
                  <div className="text-[11px] text-[#1a1a17]/50">{t.role}</div>
                </div>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 rounded-md border border-[#0e7c52]/25 bg-[#0e7c52]/10 px-2.5 py-1 font-mono-tech text-[11px] font-semibold tabular-nums text-[#0e7c52]">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.recovered}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={getRevealStyle(vis)}>
      <div className="mb-8 text-center sm:mb-10">
        <SectionLabel fig="Fig. 05">Pricing</SectionLabel>
        <SectionHeading>One plan. No surprises.</SectionHeading>
      </div>
      <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_30px_70px_-34px_rgba(26,26,23,0.4)]">
        <div className="flex items-center justify-between bg-[#1a1a17] px-7 py-4">
          <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fb6a2e]">Pro &middot; everything included</span>
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.12em] text-[#f6f5f1]/45">Plan 01</span>
        </div>
        <div className="px-7 pt-8 pb-9">
          <div className="mb-3 flex items-baseline gap-2.5">
            <span className="font-mono-tech text-[52px] font-semibold leading-none tracking-tight tabular-nums text-[#1a1a17]">$79</span>
            <span className="font-mono-tech text-[11px] uppercase leading-[1.4] tracking-wide text-[#1a1a17]/45">
              /mo
              <br />
              per PM
            </span>
          </div>
          <p className="mb-7 text-[13px] text-[#1a1a17]/55">Unlimited field users. No annual lock-in. Cancel anytime.</p>
          <ul className="mb-8 space-y-3">
            {PRICING_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#1a1a17]/80">
                <svg className="h-4 w-4 flex-shrink-0 text-[#0e7c52]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <a href={TRIAL_CTA_HREF} className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-[#c2380a] text-[15px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(194,56,10,0.6)] transition-all hover:-translate-y-px hover:bg-[#a82e06] active:translate-y-0 touch-manipulation">
            Start free 14-day trial
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="mt-3 text-center font-mono-tech text-[11px] uppercase tracking-wide text-[#1a1a17]/40">No credit card required</p>
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl" style={getRevealStyle(vis)}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_80%_at_28%_0%,#000,transparent_70%)]" />
      <div className="relative flex flex-col items-center justify-between gap-8 bg-[#1a1a17] px-6 py-12 text-center sm:flex-row sm:px-14 sm:py-16 sm:text-left">
        <div>
          <div className="mb-4 inline-flex items-center gap-2.5 font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-[#fb6a2e]">
            <span className="h-1.5 w-1.5 bg-[#e8440a]" />
            Start today
          </div>
          <h2 className="font-fraunces mb-3 text-[clamp(24px,5vw,40px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#f6f5f1]">
            Stop giving away work for free.
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#f6f5f1]/55 sm:text-[15px]">
            Every day without ScopeBolt is another day of unlogged scope requests and unpaid change orders.
          </p>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-center gap-3 sm:w-auto">
          <a href={TRIAL_CTA_HREF} className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#e8440a] px-10 text-[15px] font-bold text-white shadow-[0_8px_28px_-8px_rgba(232,68,10,0.7)] transition-all hover:-translate-y-px hover:bg-[#fb6a2e] active:translate-y-0 touch-manipulation sm:w-auto">
            Start free trial
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="font-mono-tech text-[11px] uppercase tracking-wide text-[#f6f5f1]/45">No card &middot; 14-day trial &middot; cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

export default function ScopeBolt() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add the navbar backdrop once the page has moved off the very top.
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f5f1] text-[#1a1a17] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&display=swap');
        .font-fraunces { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .font-mono-tech { font-family: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace; }
        *, body { font-family: 'Geist', system-ui, sans-serif; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        .touch-manipulation { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        a, button { -webkit-tap-highlight-color: transparent; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes pulse-dot { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.5); } 60% { box-shadow: 0 0 0 5px rgba(34,197,94,0); } }
        .a1 { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .05s both; }
        .a2 { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .15s both; }
        .a3 { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .25s both; }
        .a4 { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .38s both; }
        .a5 { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .5s both; }
        .live { animation: pulse-dot 2s infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-inner { display: flex; animation: ticker 22s linear infinite; width: max-content; }
        .ticker-inner:hover { animation-play-state: paused; }
        .redline { position: relative; white-space: nowrap; }
        .redline::after { content: ''; position: absolute; left: -1px; right: -1px; bottom: .05em; height: .13em; background: #e8440a; transform-origin: left; animation: redlineDraw .55s cubic-bezier(.16,1,.3,1) .6s both; }
        @keyframes redlineDraw { from { transform: skewX(-10deg) scaleX(0); } to { transform: skewX(-10deg) scaleX(1); } }
        @keyframes logRow { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
        .log-row { opacity: 0; animation: logRow .5s cubic-bezier(.16,1,.3,1) both; }
        .log-row-flag { opacity: 0; animation: logRow .5s cubic-bezier(.16,1,.3,1) 1.1s both, flagPulse 1.15s ease 1.7s 2; }
        @keyframes flagPulse { 0%, 100% { background-color: rgba(232,68,10,.05); } 50% { background-color: rgba(232,68,10,.16); } }
        @media (prefers-reduced-motion: reduce) {
          .a1, .a2, .a3, .a4, .a5, .log-row, .log-row-flag { animation: none !important; opacity: 1 !important; transform: none !important; }
          .redline::after { animation: none !important; transform: skewX(-10deg) scaleX(1) !important; }
          .live { animation: none !important; box-shadow: none !important; }
        }
      `}</style>

      {/* Sticky navigation and mobile drawer entry point. */}
      <nav className={`fixed top-0 inset-x-0 z-30 transition-all duration-200 ${scrolled ? "bg-[#f6f5f1]/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "bg-transparent"}`}>
        <div className="mx-auto flex h-[56px] max-w-6xl items-center justify-between px-4 sm:h-[60px] sm:px-6">
          <a href="#" className="text-[16px] font-bold tracking-tight text-[#1a1a17]">
            Scope<span style={{ color: "#e8440a" }}>Bolt</span>
          </a>
          <div className="hidden gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="rounded-md px-3 py-2 font-mono-tech text-[11px] uppercase tracking-[0.1em] text-[#1a1a17]/55 transition-all hover:bg-black/5 hover:text-[#1a1a17]">
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <a href={DEMO_CTA_HREF} className="inline-flex items-center justify-center rounded-md px-3 py-2 font-mono-tech text-[11px] uppercase tracking-[0.1em] text-[#1a1a17]/55 transition-all hover:bg-black/5 hover:text-[#1a1a17]">
              Book demo
            </a>
            <a href={TRIAL_CTA_HREF} className="inline-flex items-center justify-center rounded-md bg-[#c2380a] px-4 py-2 text-[13px] font-semibold text-white transition-all shadow-sm hover:bg-[#a82e06] hover:shadow-md active:scale-95">
              Start free trial
            </a>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-md text-[#1a1a17] active:bg-black/5 touch-manipulation">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero: blueprint drawing-set \u2014 copy left, live scope log right. */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#f6f5f1] px-4 pt-[80px] pb-12 sm:px-6 sm:pt-[88px] sm:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#d6d2c4_1px,transparent_1px),linear-gradient(to_bottom,#d6d2c4_1px,transparent_1px)] bg-[size:34px_34px] opacity-90 [mask-image:radial-gradient(ellipse_110%_90%_at_72%_28%,#000_42%,transparent_100%)] sm:bg-[size:46px_46px]" />
        <div className="pointer-events-none absolute -top-10 right-0 h-[360px] w-[440px] rounded-full bg-[#e8440a] opacity-5 blur-[120px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <div className="a1 inline-flex items-center gap-2.5 font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-[#234e70] sm:text-[12px]">
              <span className="h-1.5 w-1.5 bg-[#e8440a]" />
              Electrical {"\u00B7"} Mechanical {"\u00B7"} Concrete subs
            </div>

            <h1 className="a2 mt-5 font-fraunces text-[clamp(38px,7vw,66px)] font-medium leading-[1.02] tracking-[-0.02em] text-[#1a1a17]">
              Stop losing money to <span className="redline">scope creep</span>.
            </h1>

            <p className="a3 mx-auto mt-6 max-w-[31rem] text-[16px] leading-relaxed text-[#1a1a17]/70 sm:text-[18px] lg:mx-0">
              ScopeBolt logs every scope change, fires an alert before your crew starts, and sends a signed change order to the GC {"\u2014"} all in under 60 seconds.
            </p>

            <div className="a4 mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <a href={TRIAL_CTA_HREF} className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#c2380a] px-7 text-[15px] font-bold text-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(194,56,10,0.6)] transition-all hover:-translate-y-px hover:bg-[#a82e06] active:translate-y-0 touch-manipulation">
                Start free {"\u2014"} no card needed
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={DEMO_CTA_HREF} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-black/10 bg-white/60 px-6 text-[14px] font-semibold text-[#1a1a17] transition-all hover:border-black/30 hover:bg-white touch-manipulation">
                <svg className="h-3.5 w-3.5 text-[#234e70]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
                Book demo
              </a>
            </div>

            <div className="a5 mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2">
                {AVATARS.map((a) => (
                  <div key={a.i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f6f5f1] bg-[#1a1a17] text-[9px] font-bold text-[#f6f5f1]">
                    {a.i}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <Stars />
                <span className="font-mono-tech text-[11px] uppercase tracking-wide text-[#1a1a17]/60">
                  <span className="font-semibold text-[#1a1a17]">4.9</span> {"\u00B7"} 340+ subs
                </span>
              </div>
            </div>
          </div>

          <div className="a3">
            <ScopeLogPanel />
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-6xl sm:mt-12">
          <div className="grid grid-cols-3 divide-x divide-black/10 border-y border-black/10">
            {PROOF_ITEMS.map((p, i) => (
              <ProofStat key={p.label} value={p.value} label={p.label} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* Repeating partner names provide lightweight trust signals between sections. */}
      <div className="overflow-hidden border-y border-black/5 bg-[#f1f0ea] py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="ticker-inner">
          {[...Array(2)].map((_, pass) => (
            <div key={pass} className="flex items-center gap-8 px-8">
              <span className="whitespace-nowrap font-mono-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-[#234e70]">Syncs with</span>
              {TICKER_LOGOS.map((name) => (
                <span key={name} className="whitespace-nowrap font-mono-tech text-[12px] uppercase tracking-[0.12em] text-[#1a1a17]/40">
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="how" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <HowSection />
      </section>

      <section id="features" className="relative overflow-hidden bg-[#1a1a17] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_85%_60%_at_50%_0%,#000,transparent_72%)]" />
        <div className="relative mx-auto max-w-5xl">
          <FeaturesSection />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <TestimonialsSection />
      </section>

      <section id="pricing" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
        <PricingSection />
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <CtaSection />
      </section>

      <footer className="border-t border-black/10 bg-[#f1f0ea]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-7 sm:flex-row sm:px-6">
          <span className="text-[15px] font-bold text-[#1a1a17]">
            Scope<span style={{ color: "#e8440a" }}>Bolt</span>
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy", "Terms", "Contact", "Docs"].map((l) => (
              <a key={l} href="#" className="py-1 font-mono-tech text-[11px] uppercase tracking-[0.12em] text-[#1a1a17]/50 transition-colors hover:text-[#1a1a17] touch-manipulation">
                {l}
              </a>
            ))}
          </div>
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.1em] text-[#1a1a17]/45">{"\u00A9"} 2026 ScopeBolt</span>
        </div>
      </footer>
    </div>
  );
}
