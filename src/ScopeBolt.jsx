import { useState, useEffect, useRef } from "react";

// â”€â”€ ADD TO index.html <head> â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
// <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet">

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    icon: "ðŸ“‹",
  },
  {
    tag: "Alert",
    title: "Know before you dig in",
    desc: "ScopeBolt compares new requests against your signed contract and flags anything outside it â€” instantly.",
    icon: "ðŸš¨",
  },
  {
    tag: "Bill",
    title: "Change orders in 60 seconds",
    desc: "One tap generates a professional change order. Sign-off from the GC happens before your crew lifts a tool.",
    icon: "âš¡",
  },
  {
    tag: "Protect",
    title: "Dispute-proof documentation",
    desc: "Every interaction is archived with timestamps. Pull it up in any dispute and win. We've seen $22k recovered in one job.",
    icon: "ðŸ›¡ï¸",
  },
];

const TESTIMONIALS = [
  {
    quote: "We were bleeding $6â€“8k per project on scope drift and didn't even realize it. ScopeBolt paid for itself on job one.",
    name: "Mike R.",
    role: "Electrical Subcontractor Â· Chicago, IL",
    initials: "MR",
    bg: "bg-indigo-500",
    recovered: "$11,400 recovered in 3 months",
  },
  {
    quote: "Change orders used to take 2 days of back-and-forth. Now my PM sends one from the truck and the GC signs it same day.",
    name: "Sandra T.",
    role: "Mechanical Sub Â· Dallas, TX",
    initials: "ST",
    bg: "bg-rose-500",
    recovered: "$7,800 recovered first month",
  },
  {
    quote: "I pulled the scope log up mid-dispute and won $22k that would've been a complete write-off. That log is gold.",
    name: "Aaron K.",
    role: "Concrete Subcontractor Â· Denver, CO",
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

const AVATARS = [
  { i: "MR", bg: "bg-indigo-500" },
  { i: "JT", bg: "bg-rose-500" },
  { i: "AK", bg: "bg-amber-500" },
  { i: "SB", bg: "bg-emerald-500" },
];

const CONTACT_EMAIL = "hello@scopebolt.com";
const DEMO_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Book%20a%20ScopeBolt%20demo`;
const TRIAL_CTA_HREF = `mailto:${CONTACT_EMAIL}?subject=Start%20a%20ScopeBolt%20free%20trial`;

// â”€â”€â”€ Hooks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

function useCounter(raw, dur = 1400, go = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(tick); else setN(num);
    };
    requestAnimationFrame(tick);
  }, [go]);
  return n;
}

// â”€â”€â”€ Mini components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
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
      <div className="text-[28px] sm:text-[32px] font-bold tracking-tight text-zinc-900 font-display">
        {vis ? `${prefix}${count.toLocaleString()}${suffix}` : `${prefix}0${suffix}`}
      </div>
      <div className="text-[12px] sm:text-[13px] text-zinc-500 mt-0.5">{label}</div>
    </div>
  );
}

// â”€â”€â”€ Testimonial swiper (mobile) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TestiSwiper() {
  const [idx, setIdx] = useState(0);
  const sx = useRef(null);
  const onTS = (e) => { sx.current = e.touches[0].clientX; };
  const onTE = (e) => {
    if (!sx.current) return;
    const dx = e.changedTouches[0].clientX - sx.current;
    if (dx < -40) setIdx((i) => (i + 1) % TESTIMONIALS.length);
    else if (dx > 40) setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    sx.current = null;
  };
  const t = TESTIMONIALS[idx];
  return (
    <div>
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 select-none" onTouchStart={onTS} onTouchEnd={onTE}>
        <Stars />
        <p className="mt-4 text-[15px] text-zinc-800 leading-relaxed font-medium">"{t.quote}"</p>
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${t.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{t.initials}</div>
          <div>
            <div className="text-[13px] font-semibold text-zinc-900">{t.name}</div>
            <div className="text-[11px] text-zinc-400">{t.role}</div>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.recovered}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all touch-manipulation ${i === idx ? "bg-zinc-800 w-5" : "bg-zinc-300 w-1.5"}`} />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Mobile drawer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Drawer({ open, onClose }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 h-[56px] border-b border-zinc-100">
          <span className="text-[15px] font-bold">Scope<span style={{ color: "#e8440a" }}>Bolt</span></span>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl active:bg-zinc-100 touch-manipulation">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" /></svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={onClose} className="flex items-center text-[15px] font-medium text-zinc-700 px-4 py-3.5 rounded-xl active:bg-zinc-50 touch-manipulation">{l.label}</a>
          ))}
        </nav>
        <div className="p-4 flex flex-col gap-2.5 border-t border-zinc-100" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <a href={DEMO_CTA_HREF} onClick={onClose} className="inline-flex w-full items-center justify-center text-[14px] font-medium text-zinc-600 border border-zinc-200 bg-zinc-50 active:bg-zinc-200 py-3.5 rounded-xl touch-manipulation">Book demo</a>
          <a href={TRIAL_CTA_HREF} onClick={onClose} className="inline-flex w-full items-center justify-center text-[14px] font-bold text-white bg-zinc-900 active:bg-zinc-700 py-3.5 rounded-xl touch-manipulation">Start free trial</a>
        </div>
      </div>
    </>
  );
}

// â”€â”€â”€ MAIN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-block text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200/70 px-3 py-1.5 rounded-full mb-3 tracking-widest uppercase">How it works</div>
        <h2 className="text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-zinc-900 font-display italic">From job start to paid â€” in 3 steps</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { n: "1", title: "Set your baseline", body: "Upload your signed contract. ScopeBolt reads it and builds your scope baseline automatically.", time: "2 min setup" },
          { n: "2", title: "Log changes as they happen", body: "Anyone on your team logs a scope request from the field â€” photo, voice, or text. It's timestamped and attached to the job.", time: "30 sec per entry" },
          { n: "3", title: "Send the CO, get paid", body: "ScopeBolt flags the deviation, drafts the change order, and sends it for GC sign-off. Done before your crew starts.", time: "Under 60 seconds" },
        ].map((s) => (
          <div key={s.n} className="relative p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all">
            <div className="w-8 h-8 rounded-full bg-zinc-900 text-white text-[13px] font-bold flex items-center justify-center mb-5">{s.n}</div>
            <h3 className="text-[15px] font-semibold text-zinc-900 mb-2">{s.title}</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-4">{s.body}</p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200/60 px-2.5 py-1 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-block text-[10px] font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-3 py-1.5 rounded-full mb-3 tracking-widest uppercase">Features</div>
        <h2 className="text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-white font-display italic">Built for the field, not the office</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 active:bg-white/10 transition-all touch-manipulation">
            <div className="text-2xl mb-4">{f.icon}</div>
            <div className="text-[10px] font-bold text-orange-400 tracking-widest uppercase mb-2">{f.tag}</div>
            <h3 className="text-[15px] font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-[13px] text-zinc-400 leading-relaxed">{f.desc}</p>
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
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-block text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200/70 px-3 py-1.5 rounded-full mb-3 tracking-widest uppercase">Results</div>
        <h2 className="text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-zinc-900 font-display italic">Real money recovered by real subs</h2>
      </div>
      <div className="sm:hidden"><TestiSwiper /></div>
      <div className="hidden sm:grid sm:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:border-zinc-300 transition-all">
            <Stars />
            <p className="text-[14px] text-zinc-700 leading-relaxed flex-1">"{t.quote}"</p>
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${t.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{t.initials}</div>
                <div>
                  <div className="text-[13px] font-semibold text-zinc-900">{t.name}</div>
                  <div className="text-[11px] text-zinc-400">{t.role}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full w-fit">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-block text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200/70 px-3 py-1.5 rounded-full mb-3 tracking-widest uppercase">Pricing</div>
        <h2 className="text-[clamp(24px,6vw,40px)] font-bold tracking-tight text-zinc-900 font-display italic">One plan. No surprises.</h2>
      </div>
      <div className="max-w-md mx-auto bg-white border-2 border-zinc-900 rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="bg-zinc-900 px-8 py-5 text-center">
          <span className="text-[12px] font-bold text-orange-400 tracking-widest uppercase">Most popular</span>
        </div>
        <div className="px-8 pt-8 pb-10">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[52px] font-bold text-zinc-900 tracking-tight leading-none font-display">$79</span>
            <span className="text-zinc-400 text-[14px]">/ month<br />per PM</span>
          </div>
          <p className="text-[13px] text-zinc-400 mb-7">No seat limits. No annual lock-in. Cancel anytime.</p>
          <ul className="space-y-3 mb-8">
            {PRICING_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[14px] text-zinc-700">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <a href={TRIAL_CTA_HREF} className="inline-flex w-full min-h-[52px] items-center justify-center text-[15px] font-bold text-white bg-zinc-900 active:bg-zinc-700 hover:bg-zinc-800 rounded-xl transition-all shadow-md hover:shadow-lg touch-manipulation">
            Start free 14-day trial â†’
          </a>
          <p className="text-center text-[12px] text-zinc-400 mt-3">No credit card required</p>
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  const [ref, vis] = useInView();

  return (
    <div
      ref={ref}
      className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
      style={getRevealStyle(vis)}
    >
      <div className="bg-zinc-950 px-6 sm:px-14 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div>
          <h2 className="text-[clamp(22px,5vw,38px)] font-bold text-white tracking-tight font-display italic mb-3">
            Stop giving away work for free.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-400 max-w-sm">
            Every day without ScopeBolt is another day of unlogged scope requests and unpaid change orders.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 flex-shrink-0 w-full sm:w-auto">
          <a href={TRIAL_CTA_HREF} className="inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center text-[15px] font-bold text-zinc-900 bg-white active:bg-zinc-100 hover:bg-zinc-50 px-10 rounded-xl transition-all shadow-sm whitespace-nowrap touch-manipulation">
            Start free trial â†’
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
    <div className="min-h-screen bg-white text-zinc-900 antialiased overflow-x-hidden">
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
        /* Ticker */
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-inner { display: flex; animation: ticker 22s linear infinite; width: max-content; }
        .ticker-inner:hover { animation-play-state: paused; }
      `}</style>

      {/* â”€â”€ NAV â”€â”€ */}
      <nav className={`fixed top-0 inset-x-0 z-30 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[56px] sm:h-[60px]">
          <a href="#" className="text-[15px] font-bold tracking-tight">Scope<span className="gradient-text">Bolt</span></a>
          <div className="hidden md:flex gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-[13px] text-zinc-500 hover:text-zinc-900 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-all">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href={DEMO_CTA_HREF} className="inline-flex items-center justify-center text-[13px] font-medium text-zinc-500 hover:text-zinc-900 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-all">Book demo</a>
            <a href={TRIAL_CTA_HREF} className="inline-flex items-center justify-center text-[13px] font-semibold text-white bg-zinc-900 hover:bg-zinc-800 active:scale-95 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md">Start free trial</a>
          </div>
          <div className="flex md:hidden items-center gap-1">
            <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="w-10 h-10 flex items-center justify-center rounded-xl active:bg-zinc-100 touch-manipulation">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          HERO â€” the entire above-the-fold experience.
          Must answer in 3s: What is it? Who's it for?
          What do I get? What do I do next?
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-[56px] sm:pt-[60px] overflow-hidden px-4 sm:px-6">

        {/* â”€â”€ Background: subtle grid + warm glow â”€â”€ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#efefeb_1px,transparent_1px),linear-gradient(to_bottom,#efefeb_1px,transparent_1px)] bg-[size:36px_36px] sm:bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_30%,transparent_100%)] pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-orange-50 rounded-full blur-[100px] opacity-70 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto w-full flex flex-col items-center text-center py-12 sm:py-0">

          {/* â”€â”€ Trust bar: real company type + live users â”€â”€ */}
          <div className="a1 flex items-center gap-2 bg-white/80 backdrop-blur border border-zinc-200 rounded-full px-3.5 py-2 mb-7 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 live" />
            <span className="text-[12px] font-medium text-zinc-600">Used by electrical, mechanical & concrete subs</span>
          </div>

          {/* â”€â”€ Headline: problem + solution in one line â”€â”€ */}
          <h1 className="a2 text-[clamp(34px,8.5vw,64px)] font-bold leading-[1.06] tracking-[-0.035em] text-zinc-900 mb-5">
            Commercial subs stop<br />
            <span className="font-display italic gradient-text">losing money to scope creep</span>
          </h1>

          {/* â”€â”€ Sub: what it does, for whom, how fast â”€â”€ */}
          <p className="a3 text-[15px] sm:text-[17px] text-zinc-500 leading-relaxed max-w-[440px] mb-4">
            ScopeBolt tracks every scope change, fires an alert before your crew starts, and sends a signed change order to the GC â€” all in under 60 seconds.
          </p>

          {/* â”€â”€ Micro-proof right under the description â”€â”€ */}
          <p className="a3 text-[13px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1.5 mb-8">
            Subcontractors recover an avg $4,200 per job
          </p>

          {/* â”€â”€ Primary CTA block â”€â”€ */}
          <div className="a4 w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-5">
            <a href={TRIAL_CTA_HREF} className="inline-flex w-full sm:w-auto min-h-[52px] sm:min-h-[48px] items-center justify-center gap-2 text-[15px] font-bold text-white bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-px touch-manipulation">
              Start free â€” no card needed
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={DEMO_CTA_HREF} className="inline-flex w-full sm:w-auto min-h-[52px] sm:min-h-[48px] items-center justify-center gap-2 text-[14px] font-medium text-zinc-600 bg-white border border-zinc-200 hover:border-zinc-300 active:bg-zinc-50 px-6 rounded-xl transition-all touch-manipulation">
              <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Book demo
            </a>
          </div>

          {/* â”€â”€ Social proof avatars + count â”€â”€ */}
          <div className="a4 flex items-center justify-center gap-3 mb-10 sm:mb-14">
            <div className="flex -space-x-2">
              {AVATARS.map((a, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${a.bg} flex items-center justify-center text-white text-[9px] font-bold`}>{a.i}</div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Stars />
              <span className="text-[12px] text-zinc-500"><span className="font-semibold text-zinc-700">340+ subs</span> Â· 4.9 avg rating</span>
            </div>
          </div>

          {/* â”€â”€ In-hero proof numbers (3 stats, visible without scrolling) â”€â”€ */}
          <div className="a5 w-full grid grid-cols-3 gap-2 sm:gap-6 py-5 border-y border-zinc-200">
            {PROOF_ITEMS.map((p, i) => <ProofStat key={i} value={p.value} label={p.label} delay={i * 80} />)}
          </div>
        </div>

        {/* â”€â”€ Scroll nudge â”€â”€ */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] tracking-widest uppercase text-zinc-500">Scroll</span>
          <svg className="w-4 h-4 text-zinc-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* â”€â”€ TICKER: integrations / trust logos â”€â”€ */}
      <div className="border-y border-zinc-100 bg-zinc-50 py-4 overflow-hidden">
        <div className="ticker-inner">
          {[...Array(2)].map((_, pass) => (
            <div key={pass} className="flex items-center gap-8 px-8">
              {["Procore", "Buildertrend", "QuickBooks", "Sage 300", "Foundation", "Jonas", "Viewpoint", "CoConstruct"].map((name) => (
                <span key={name} className="text-[12px] font-semibold text-zinc-400 tracking-wide uppercase whitespace-nowrap">{name}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ HOW IT WORKS â”€â”€ */}
      <section id="how" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <HowSection />
      </section>

      {/* â”€â”€ FEATURES â”€â”€ */}
      <section id="features" className="bg-zinc-950 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FeaturesSection />
        </div>
      </section>

      {/* â”€â”€ TESTIMONIALS â”€â”€ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <TestimonialsSection />
      </section>

      {/* â”€â”€ PRICING â”€â”€ */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <PricingSection />
      </section>

      {/* â”€â”€ FINAL CTA â”€â”€ */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <CtaSection />
      </section>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <footer className="border-t border-zinc-100" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[14px] font-bold">Scope<span className="gradient-text">Bolt</span></span>
          <div className="flex gap-6 flex-wrap justify-center">
            {["Privacy", "Terms", "Contact", "Docs"].map((l) => (
              <a key={l} href="#" className="text-[12px] text-zinc-400 hover:text-zinc-700 transition-colors py-1 touch-manipulation">{l}</a>
            ))}
          </div>
          <span className="text-[12px] text-zinc-400">Â© 2026 ScopeBolt</span>
        </div>
      </footer>
    </div>
  );
}
