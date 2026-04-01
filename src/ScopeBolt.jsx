import { useEffect, useRef, useState } from "react";

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
    icon: "\u{1F4CB}",
  },
  {
    tag: "Alert",
    title: "Know before you dig in",
    desc: "ScopeBolt compares new requests against your signed contract and flags anything outside it \u2014 instantly.",
    icon: "\u26A0",
  },
  {
    tag: "Bill",
    title: "Change orders in 60 seconds",
    desc: "One tap generates a professional change order. Sign-off from the GC happens before your crew lifts a tool.",
    icon: "\u26A1",
  },
  {
    tag: "Protect",
    title: "Dispute-proof documentation",
    desc: "Every interaction is archived with timestamps. Pull it up in any dispute and win. We've seen $22k recovered in one job.",
    icon: "\u{1F6E1}",
  },
];

const TESTIMONIALS = [
  {
    quote: "We were bleeding $6\u20138k per project on scope drift and didn't even realize it. ScopeBolt paid for itself on job one.",
    name: "Mike R.",
    role: "Electrical Subcontractor \u00B7 Chicago, IL",
    initials: "MR",
    bg: "bg-indigo-500",
    recovered: "$11,400 recovered in 3 months",
  },
  {
    quote: "Change orders used to take 2 days of back-and-forth. Now my PM sends one from the truck and the GC signs it the same day.",
    name: "Sandra T.",
    role: "Mechanical Sub \u00B7 Dallas, TX",
    initials: "ST",
    bg: "bg-rose-500",
    recovered: "$7,800 recovered first month",
  },
  {
    quote: "I pulled the scope log up mid-dispute and won $22k that would've been a complete write-off. That log is gold.",
    name: "Aaron K.",
    role: "Concrete Subcontractor \u00B7 Denver, CO",
    initials: "AK",
    bg: "bg-amber-500",
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

const AVATARS = [
  { i: "MR", bg: "bg-indigo-500" },
  { i: "JT", bg: "bg-rose-500" },
  { i: "AK", bg: "bg-amber-500" },
  { i: "SB", bg: "bg-emerald-500" },
];

const CONTACT_EMAIL = "hello@scopebolt.com";
const DEMO_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Book%20a%20ScopeBolt%20demo`;
const TRIAL_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Start%20a%20ScopeBolt%20free%20trial`;

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
      className="text-center"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: `all 0.5s ease ${delay}ms` }}
    >
      <div className="font-display text-[28px] font-bold tracking-tight text-zinc-900 sm:text-[32px]">
        {vis ? `${prefix}${count.toLocaleString()}${suffix}` : `${prefix}0${suffix}`}
      </div>
      <div className="mt-0.5 text-[12px] text-zinc-500 sm:text-[13px]">{label}</div>
    </div>
  );
}

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
      <div className="select-none rounded-2xl border border-zinc-200 bg-white p-6" onTouchStart={onTS} onTouchEnd={onTE}>
        <Stars />
        <p className="mt-4 text-[15px] font-medium leading-relaxed text-zinc-800">"{t.quote}"</p>
        <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4">
          <div className={`h-9 w-9 flex-shrink-0 rounded-full ${t.bg} flex items-center justify-center text-xs font-bold text-white`}>{t.initials}</div>
          <div>
            <div className="text-[13px] font-semibold text-zinc-900">{t.name}</div>
            <div className="text-[11px] text-zinc-400">{t.role}</div>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
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
            className={`h-1.5 rounded-full transition-all touch-manipulation ${i === idx ? "w-5 bg-zinc-800" : "w-1.5 bg-zinc-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Drawer({ open, onClose }) {
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
      <div className={`fixed top-0 right-0 bottom-0 z-50 flex w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-[56px] items-center justify-between border-b border-zinc-100 px-5">
          <span className="text-[15px] font-bold">
            Scope<span style={{ color: "#e8440a" }}>Bolt</span>
          </span>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl active:bg-zinc-100 touch-manipulation">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={onClose} className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-zinc-700 active:bg-zinc-50 touch-manipulation">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-zinc-100 p-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <a href={DEMO_CTA_HREF} onClick={onClose} className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 py-3.5 text-[14px] font-medium text-zinc-600 active:bg-zinc-200 touch-manipulation">
            Book demo
          </a>
          <a href={TRIAL_CTA_HREF} onClick={onClose} className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3.5 text-[14px] font-bold text-white active:bg-zinc-700 touch-manipulation">
            Start free trial {"\u2192"}
          </a>
        </div>
      </div>
    </>
  );
}

function getRevealStyle(vis) {
  return {
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(20px)",
    transition: "all .6s ease",
  };
}

function HowSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={getRevealStyle(vis)}>
      <div className="mb-10 text-center sm:mb-14">
        <div className="mb-3 inline-block rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-600">
          How it works
        </div>
        <h2 className="font-display text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-zinc-900 italic">
          From job start to paid {"\u2014"} in 3 steps
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {HOW_STEPS.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[13px] font-bold text-white">{s.n}</div>
            <h3 className="mb-2 text-[15px] font-semibold text-zinc-900">{s.title}</h3>
            <p className="mb-4 text-[13px] leading-relaxed text-zinc-500">{s.body}</p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/60 bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <div className="mb-3 inline-block rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-400">
          Features
        </div>
        <h2 className="font-display text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-white italic">
          Built for the field, not the office
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/8 active:bg-white/10 touch-manipulation">
            <div className="mb-4 text-2xl">{f.icon}</div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-orange-400">{f.tag}</div>
            <h3 className="mb-2 text-[15px] font-semibold text-white">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-zinc-400">{f.desc}</p>
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
        <div className="mb-3 inline-block rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-600">
          Results
        </div>
        <h2 className="font-display text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-zinc-900 italic">
          Real money recovered by real subs
        </h2>
      </div>
      <div className="sm:hidden">
        <TestiSwiper />
      </div>
      <div className="hidden gap-4 sm:grid sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
            <Stars />
            <p className="flex-1 text-[14px] leading-relaxed text-zinc-700">"{t.quote}"</p>
            <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${t.bg} text-xs font-bold text-white`}>{t.initials}</div>
                <div>
                  <div className="text-[13px] font-semibold text-zinc-900">{t.name}</div>
                  <div className="text-[11px] text-zinc-400">{t.role}</div>
                </div>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
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
        <div className="mb-3 inline-block rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-600">
          Pricing
        </div>
        <h2 className="font-display text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-zinc-900 italic">
          One plan. No surprises.
        </h2>
      </div>
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border-2 border-zinc-900 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="bg-zinc-900 px-8 py-5 text-center">
          <span className="text-[12px] font-bold uppercase tracking-widest text-orange-400">Most popular</span>
        </div>
        <div className="px-8 pt-8 pb-10">
          <div className="mb-1 flex items-baseline gap-2">
            <span className="font-display text-[52px] font-bold leading-none tracking-tight text-zinc-900">$79</span>
            <span className="text-[14px] text-zinc-400">
              / month
              <br />
              per PM
            </span>
          </div>
          <p className="mb-7 text-[13px] text-zinc-400">No seat limits. No annual lock-in. Cancel anytime.</p>
          <ul className="mb-8 space-y-3">
            {PRICING_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[14px] text-zinc-700">
                <svg className="h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <a href={TRIAL_CTA_HREF} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-zinc-900 text-[15px] font-bold text-white transition-all shadow-md hover:bg-zinc-800 hover:shadow-lg active:bg-zinc-700 touch-manipulation">
            Start free 14-day trial {"\u2192"}
          </a>
          <p className="mt-3 text-center text-[12px] text-zinc-400">No credit card required</p>
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  const [ref, vis] = useInView();

  return (
    <div ref={ref} className="mx-auto max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl" style={getRevealStyle(vis)}>
      <div className="flex flex-col items-center justify-between gap-8 bg-zinc-950 px-6 py-12 text-center sm:flex-row sm:px-14 sm:py-16 sm:text-left">
        <div>
          <h2 className="font-display mb-3 text-[clamp(22px,5vw,38px)] font-bold tracking-tight text-white italic">
            Stop giving away work for free.
          </h2>
          <p className="max-w-sm text-[14px] text-zinc-400 sm:text-[15px]">
            Every day without ScopeBolt is another day of unlogged scope requests and unpaid change orders.
          </p>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-center gap-3 sm:w-auto">
          <a href={TRIAL_CTA_HREF} className="inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-xl bg-white px-10 text-[15px] font-bold text-zinc-900 transition-all shadow-sm hover:bg-zinc-50 active:bg-zinc-100 touch-manipulation sm:w-auto">
            Start free trial {"\u2192"}
          </a>
          <span className="text-[12px] text-zinc-500">No card. 14-day trial. Cancel anytime.</span>
        </div>
      </div>
    </div>
  );
}

export default function ScopeBolt() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-zinc-900 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        *, body { font-family: 'Geist', system-ui, sans-serif; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        .gradient-text { background: linear-gradient(135deg, #e8440a 0%, #c23000 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
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
      `}</style>

      <nav className={`fixed top-0 inset-x-0 z-30 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
        <div className="mx-auto flex h-[56px] max-w-6xl items-center justify-between px-4 sm:h-[60px] sm:px-6">
          <a href="#" className="text-[15px] font-bold tracking-tight">
            Scope<span className="gradient-text">Bolt</span>
          </a>
          <div className="hidden gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="rounded-lg px-3 py-2 text-[13px] text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900">
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <a href={DEMO_CTA_HREF} className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-[13px] font-medium text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900">
              Book demo
            </a>
            <a href={TRIAL_CTA_HREF} className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-semibold text-white transition-all shadow-sm hover:bg-zinc-800 hover:shadow-md active:scale-95">
              Start free trial
            </a>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-xl active:bg-zinc-100 touch-manipulation">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-[56px] sm:px-6 sm:pt-[60px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#efefeb_1px,transparent_1px),linear-gradient(to_bottom,#efefeb_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_30%,transparent_100%)] sm:bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-orange-50 opacity-70 blur-[100px]" />

        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center py-12 text-center sm:py-0">
          <div className="a1 mb-7 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur">
            <span className="live h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
            <span className="text-[12px] font-medium text-zinc-600">Used by electrical, mechanical & concrete subs</span>
          </div>

          <h1 className="a2 mb-5 text-[clamp(34px,8.5vw,64px)] font-bold leading-[1.06] tracking-[-0.035em] text-zinc-900">
            Commercial subs stop
            <br />
            <span className="gradient-text font-display italic">losing money to scope creep</span>
          </h1>

          <p className="a3 mb-4 max-w-[440px] text-[15px] leading-relaxed text-zinc-500 sm:text-[17px]">
            ScopeBolt tracks every scope change, fires an alert before your crew starts, and sends a signed change order to the GC {"\u2014"} all in under 60 seconds.
          </p>

          <p className="a3 mb-8 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[13px] font-semibold text-emerald-600">
            Subcontractors recover an avg $4,200 per job
          </p>

          <div className="a4 mb-5 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href={TRIAL_CTA_HREF} className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-8 text-[15px] font-bold text-white transition-all shadow-lg hover:-translate-y-px hover:bg-zinc-800 hover:shadow-xl active:bg-zinc-700 touch-manipulation sm:min-h-[48px] sm:w-auto">
              Start free {"\u2014"} no card needed
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={DEMO_CTA_HREF} className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-[14px] font-medium text-zinc-600 transition-all hover:border-zinc-300 active:bg-zinc-50 touch-manipulation sm:min-h-[48px] sm:w-auto">
              <svg className="h-4 w-4 flex-shrink-0 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Book demo
            </a>
          </div>

          <div className="a4 mb-10 flex items-center justify-center gap-3 sm:mb-14">
            <div className="flex -space-x-2">
              {AVATARS.map((a) => (
                <div key={a.i} className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white ${a.bg} text-[9px] font-bold text-white`}>
                  {a.i}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Stars />
              <span className="text-[12px] text-zinc-500">
                <span className="font-semibold text-zinc-700">340+ subs</span> {"\u00B7"} 4.9 avg rating
              </span>
            </div>
          </div>

          <div className="a5 grid w-full grid-cols-3 gap-2 border-y border-zinc-200 py-5 sm:gap-6">
            {PROOF_ITEMS.map((p, i) => (
              <ProofStat key={p.label} value={p.value} label={p.label} delay={i * 80} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
          <svg className="h-4 w-4 animate-bounce text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      <div className="overflow-hidden border-y border-zinc-100 bg-zinc-50 py-4">
        <div className="ticker-inner">
          {[...Array(2)].map((_, pass) => (
            <div key={pass} className="flex items-center gap-8 px-8">
              {TICKER_LOGOS.map((name) => (
                <span key={name} className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
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

      <section id="features" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
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

      <footer className="border-t border-zinc-100" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <span className="text-[14px] font-bold">
            Scope<span className="gradient-text">Bolt</span>
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy", "Terms", "Contact", "Docs"].map((l) => (
              <a key={l} href="#" className="py-1 text-[12px] text-zinc-400 transition-colors hover:text-zinc-700 touch-manipulation">
                {l}
              </a>
            ))}
          </div>
          <span className="text-[12px] text-zinc-400">{"\u00A9"} 2026 ScopeBolt</span>
        </div>
      </footer>
    </div>
  );
}
