/* ScopeBolt landing page — Linear-style dark recreation.
   Adopts Linear's visual language (deep near-black canvas, aurora hero,
   glassy nav, bento feature grid, refined hairline surfaces) for ScopeBolt's
   content. Composes DS primitives (Button, Stars, Avatar, AvatarStack) from
   window.ScopeBoltDesignSystem_a38b66 and exports <App/> as window.SBApp.
   Tweakable via the Tweaks panel (accent, headline, aurora, nav CTA). */

const DS = window.ScopeBoltDesignSystem_a38b66;
const { Button, Stars, Avatar, AvatarStack } = DS;
const { useState, useEffect, useRef } = React;
const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakText, TweakToggle } = window;

/* --------------------------------------------------------- accent themes */
const ACCENTS = {
  "#e8440a": { glow: "232,68,10",  aura: ["#e8440a", "#f59e0b", "#b45367"] }, // ScopeBolt orange
  "#5e6ad2": { glow: "94,106,210", aura: ["#5e6ad2", "#8b5cf6", "#3b82f6"] }, // Linear indigo
  "#10b981": { glow: "16,185,129", aura: ["#10b981", "#22d3ee", "#6366f1"] }, // Emerald
};
const accentOf = (hex) => ACCENTS[hex] || { glow: "232,68,10", aura: [hex, hex, hex] };

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e8440a",
  "headline": "Stop losing money to scope creep.",
  "aurora": true,
  "navCta": "Start free trial"
}/*EDITMODE-END*/;

/* ------------------------------------------------------------------ data */
const NAV = ["Product", "How it works", "Customers", "Pricing"];
const TICKER = ["Procore", "Buildertrend", "QuickBooks", "Sage 300", "Foundation", "Jonas", "Viewpoint"];
const STEPS = [
  { n: "01", title: "Set your baseline", body: "Upload your signed contract. ScopeBolt reads it and builds your scope baseline automatically." },
  { n: "02", title: "Log changes in the field", body: "Anyone logs a scope request — photo, voice, or text. Timestamped and tied to the job." },
  { n: "03", title: "Send the CO, get paid", body: "ScopeBolt flags the deviation, drafts the change order, and sends it for GC sign-off." },
];
const FEATURES = [
  { tag: "Track", title: "A scope log that never lies", desc: "Every request, email, and site instruction is timestamped and tied to a job code the moment it happens — an immutable record you can stand behind.", wide: true },
  { tag: "Alert", title: "Know before you dig in", desc: "ScopeBolt compares new requests against your signed contract and flags anything outside it, instantly." },
  { tag: "Bill", title: "Change orders in 60 seconds", desc: "One tap drafts a professional CO. The GC signs off before your crew lifts a tool." },
  { tag: "Protect", title: "Dispute-proof documentation", desc: "Every interaction archived with timestamps. Pull it up mid-dispute and win — we've seen $22k recovered on one job.", wide: true },
];
const TESTI = [
  { quote: "We were bleeding $6–8k per project on scope drift and didn't even realize it. ScopeBolt paid for itself on job one.", name: "Mike R.", role: "Electrical Sub · Chicago", initials: "MR", color: "indigo", money: "$11,400 recovered" },
  { quote: "Change orders used to take 2 days of back-and-forth. Now my PM sends one from the truck and the GC signs same-day.", name: "Sandra T.", role: "Mechanical Sub · Dallas", initials: "ST", color: "rose", money: "$7,800 first month" },
  { quote: "I pulled the scope log up mid-dispute and won $22k that would've been a complete write-off. That log is gold.", name: "Aaron K.", role: "Concrete Sub · Denver", initials: "AK", color: "amber", money: "$22,000 won" },
];
const PLAN = ["Unlimited jobs & change orders", "Real-time scope log", "One-tap CO generation & GC sign-off", "Procore + Buildertrend sync", "Dispute archive (5 years)", "Priority support"];
const LOG = [
  { code: "RFI-204", desc: "Added conduit run — east riser", status: "Flagged", tone: "amber", amt: "+$3,400" },
  { code: "CO-118", desc: "Relocate panel board L2", status: "CO sent", tone: "ac", amt: "+$5,900" },
  { code: "CO-117", desc: "Extra fire-stopping, levels 3–5", status: "Recovered", tone: "emerald", amt: "+$8,250" },
  { code: "RFI-201", desc: "Revised lighting layout, lobby", status: "Flagged", tone: "amber", amt: "+$1,180" },
  { code: "CO-115", desc: "After-hours pour, garage deck", status: "Recovered", tone: "emerald", amt: "+$12,000" },
];

/* ----------------------------------------------------------------- icons */
const Ico = {
  arrow: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...p}><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  log: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M8 6h11M8 12h11M8 18h11M3.5 6h.01M3.5 12h.01M3.5 18h.01" strokeLinecap="round"/></svg>,
  bolt: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M13 2L4.5 13.5H11l-1 8.5L18.5 10.5H12l1-8.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  shield: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bill: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z M9 8h6M9 12h6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alert: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};
const FEAT_ICON = { Track: Ico.log, Alert: Ico.alert, Bill: Ico.bill, Protect: Ico.shield };

/* ------------------------------------------------------------- primitives */
const C = ({ children, style }) => <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>;

const Eyebrow = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 10px", borderRadius: 999, border: "1px solid var(--hair)", background: "rgba(255,255,255,0.03)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.72)", letterSpacing: "-0.005em" }}>
    <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ac)", boxShadow: "0 0 8px 1px var(--ac)" }}/>
    {children}
  </span>
);
const Kicker = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 16 }}>{children}</div>
);
const H2 = ({ children, style }) => (
  <h2 style={{ margin: 0, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, color: "#fff", ...style }}>{children}</h2>
);
const Sub = ({ children, style }) => (
  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", ...style }}>{children}</p>
);

/* ------------------------------------------------------------------- nav */
function Nav({ t }) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 56, display: "flex", alignItems: "center", transition: "background .25s ease, border-color .25s ease", background: s ? "rgba(8,9,10,0.72)" : "rgba(8,9,10,0)", backdropFilter: s ? "blur(12px)" : "none", borderBottom: "1px solid " + (s ? "var(--hair)" : "transparent") }}>
      <C style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>Scope<span style={{ color: "var(--ac)" }}>Bolt</span></span>
          <div className="nav-links" style={{ display: "flex", gap: 4 }}>
            {NAV.map((l) => <a key={l} href="#" style={{ padding: "6px 10px", fontSize: 13.5, color: "rgba(255,255,255,0.6)", textDecoration: "none", borderRadius: 7, transition: "color .15s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>{l}</a>)}
          </div>
        </div>
        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href="#" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Log in</a>
          <Button variant="brand" size="sm">{t.navCta}</Button>
        </div>
      </C>
    </nav>
  );
}

/* ------------------------------------------------------------- app mock */
function StatusPill({ status, tone }) {
  const map = {
    amber: { c: "var(--amber-400)", b: "rgba(251,191,36,0.16)", bg: "rgba(251,191,36,0.08)" },
    emerald: { c: "#34d399", b: "rgba(16,185,129,0.20)", bg: "rgba(16,185,129,0.10)" },
    ac: { c: "var(--ac)", b: "rgba(var(--ac-glow),0.30)", bg: "rgba(var(--ac-glow),0.12)" },
  }[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 9px", borderRadius: 999, fontSize: 11.5, fontWeight: 500, color: map.c, border: "1px solid " + map.b, background: map.bg }}><span style={{ width: 5, height: 5, borderRadius: 999, background: map.c }}/>{status}</span>;
}

function AppMock() {
  const rail = [["Scope log", Ico.log, true], ["Change orders", Ico.bill, false], ["Disputes", Ico.shield, false], ["Billing", Ico.check, false]];
  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--hair)", background: "var(--grad-elevated)", boxShadow: "var(--hl-top), 0 40px 120px -40px rgba(var(--ac-glow),0.35), 0 30px 80px -30px rgba(0,0,0,0.8)" }}>
      {/* titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, height: 44, padding: "0 16px", borderBottom: "1px solid var(--hair)", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ display: "flex", gap: 7 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c, opacity: 0.85 }}/>)}</div>
        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Harbor Point Garage · Scope log</span>
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mono)" }}>$184k pending · $126k ready to bill</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "188px 1fr" }}>
        {/* sidebar */}
        <div style={{ borderRight: "1px solid var(--hair)", padding: 12, display: "flex", flexDirection: "column", gap: 3, background: "rgba(0,0,0,0.18)" }}>
          {rail.map(([label, I, active]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: active ? "#fff" : "rgba(255,255,255,0.55)", background: active ? "rgba(255,255,255,0.06)" : "transparent", border: "1px solid " + (active ? "var(--hair)" : "transparent") }}>
              <span style={{ color: active ? "var(--ac)" : "rgba(255,255,255,0.4)", display: "inline-flex" }}><I/></span>{label}
            </div>
          ))}
          <div style={{ marginTop: "auto", padding: "10px", borderRadius: 8, border: "1px solid var(--hair)", background: "rgba(var(--ac-glow),0.08)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Recovered this job</div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", marginTop: 2 }}>$40,730</div>
          </div>
        </div>
        {/* main */}
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>Open scope items</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "2px 7px", borderRadius: 999, border: "1px solid var(--hair)" }}>5</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ac)", display: "inline-flex", alignItems: "center", gap: 5 }}>New change order <Ico.arrow/></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 10, overflow: "hidden", border: "1px solid var(--hair)" }}>
            {LOG.map((r, i) => (
              <div key={r.code} style={{ display: "grid", gridTemplateColumns: "84px 1fr auto auto", alignItems: "center", gap: 12, padding: "11px 14px", background: i % 2 ? "rgba(255,255,255,0.012)" : "rgba(255,255,255,0.025)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>{r.code}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.82)" }}>{r.desc}</span>
                <StatusPill status={r.status} tone={r.tone}/>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, fontWeight: 500, color: r.tone === "emerald" ? "#34d399" : "rgba(255,255,255,0.92)", minWidth: 64, textAlign: "right" }}>{r.amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ hero */
function Hero({ t, ac }) {
  return (
    <section style={{ position: "relative", paddingTop: 150, overflow: "hidden" }}>
      {t.aurora && (
        <div aria-hidden style={{ position: "absolute", top: -180, left: "50%", transform: "translateX(-50%)", width: 1100, height: 720, pointerEvents: "none", filter: "blur(70px)", opacity: 0.55,
          background: `radial-gradient(38% 50% at 30% 40%, ${ac.aura[0]}66, transparent 70%), radial-gradient(40% 50% at 65% 35%, ${ac.aura[1]}55, transparent 70%), radial-gradient(45% 55% at 50% 60%, ${ac.aura[2]}44, transparent 70%)` }}/>
      )}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%,#000 30%,transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%,#000 30%,transparent 80%)" }}/>
      <C style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Eyebrow>Margin control for commercial subcontractors</Eyebrow>
        <h1 style={{ margin: "22px 0 0", maxWidth: 820, fontSize: "clamp(40px,6.4vw,72px)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.04em", color: "#fff" }}>
          {t.headline}
        </h1>
        <Sub style={{ marginTop: 22, maxWidth: 560, fontSize: 18 }}>
          ScopeBolt tracks every scope change, fires an alert before your crew starts, and sends a signed change order to the GC — in under 60 seconds.
        </Sub>
        <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="brand" size="lg" withArrow>{t.navCta}</Button>
          <Button variant="ghost" size="lg" style={{ color: "rgba(255,255,255,0.85)", border: "1px solid var(--hair)", background: "rgba(255,255,255,0.02)" }}>Book a demo</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26 }}>
          <AvatarStack size="sm" people={[{ initials: "MR", color: "indigo" }, { initials: "JT", color: "rose" }, { initials: "AK", color: "amber" }, { initials: "SB", color: "emerald" }]}/>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Stars count={5}/>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}><b style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>340+ subs</b> · 4.9 rating</span>
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: 980, marginTop: 56 }}><AppMock/></div>
      </C>
    </section>
  );
}

/* -------------------------------------------------------------- logos */
function LogoCloud() {
  return (
    <C style={{ paddingTop: 64, paddingBottom: 8 }}>
      <p style={{ textAlign: "center", fontSize: 12.5, color: "rgba(255,255,255,0.38)", letterSpacing: "0.04em", margin: "0 0 22px" }}>Syncs with the tools your back office already runs</p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px 40px" }}>
        {TICKER.map((n) => <span key={n} style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.32)" }}>{n}</span>)}
      </div>
    </C>
  );
}

/* -------------------------------------------------------------- steps */
function Steps() {
  return (
    <C style={{ paddingTop: 110 }}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px" }}>
        <Kicker>How it works</Kicker>
        <H2>From job start to paid in three steps</H2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, borderRadius: 14, overflow: "hidden", border: "1px solid var(--hair)", background: "var(--hair)" }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ padding: "30px 26px", background: "var(--surface-canvas)" }}>
            <div style={{ fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--ac)", marginBottom: 16 }}>{s.n}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: "#fff" }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>{s.body}</p>
          </div>
        ))}
      </div>
    </C>
  );
}

/* ------------------------------------------------------------- features */
function FeatureTile({ f }) {
  const I = FEAT_ICON[f.tag] || Ico.bolt;
  return (
    <div style={{ gridColumn: f.wide ? "span 2" : "span 1", position: "relative", borderRadius: 14, border: "1px solid var(--hair)", background: "var(--grad-elevated)", boxShadow: "var(--hl-top)", padding: 26, transition: "border-color .2s ease" }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--hair-strong)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--hair)"}>
      <div style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ac)", background: "rgba(var(--ac-glow),0.10)", border: "1px solid rgba(var(--ac-glow),0.22)", marginBottom: 18 }}><I/></div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 8 }}>{f.tag}</div>
      <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", color: "#fff" }}>{f.title}</h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", maxWidth: f.wide ? 460 : "none" }}>{f.desc}</p>
    </div>
  );
}
function Features() {
  return (
    <C style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 640, margin: "0 auto 52px", textAlign: "center" }}>
        <Kicker>Features</Kicker>
        <H2>Built for the field, not the office</H2>
        <Sub style={{ marginTop: 16 }}>Everything a commercial sub needs to capture scope, flag deviations, and bill for the work — nothing they don't.</Sub>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {FEATURES.map((f) => <FeatureTile key={f.title} f={f}/>)}
      </div>
    </C>
  );
}

/* ---------------------------------------------------------- testimonials */
function Testimonials() {
  return (
    <C style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 640, margin: "0 auto 52px", textAlign: "center" }}>
        <Kicker>Customers</Kicker>
        <H2>Real money recovered by real subs</H2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {TESTI.map((c) => (
          <div key={c.name} style={{ display: "flex", flexDirection: "column", borderRadius: 14, border: "1px solid var(--hair)", background: "var(--grad-elevated)", boxShadow: "var(--hl-top)", padding: 24 }}>
            <Stars count={5}/>
            <p style={{ flex: 1, margin: "14px 0 18px", fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>"{c.quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 16, borderTop: "1px solid var(--hair)" }}>
              <Avatar initials={c.initials} color={c.color} size="sm"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)" }}>{c.role}</div>
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 500, color: "#34d399", padding: "3px 9px", borderRadius: 999, background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.2)" }}>{c.money}</span>
            </div>
          </div>
        ))}
      </div>
    </C>
  );
}

/* -------------------------------------------------------------- pricing */
function Pricing() {
  return (
    <C style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 640, margin: "0 auto 52px", textAlign: "center" }}>
        <Kicker>Pricing</Kicker>
        <H2>One plan. No surprises.</H2>
      </div>
      <div style={{ position: "relative", maxWidth: 440, margin: "0 auto", borderRadius: 16, border: "1px solid rgba(var(--ac-glow),0.32)", background: "var(--grad-elevated)", boxShadow: "var(--hl-top), 0 30px 80px -40px rgba(var(--ac-glow),0.4)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,var(--ac),transparent)" }}/>
        <div style={{ padding: "30px 30px 34px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 16 }}>Most popular</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>$79</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>/ month · per PM</span>
          </div>
          <p style={{ margin: "10px 0 24px", fontSize: 13.5, color: "rgba(255,255,255,0.45)" }}>No seat limits. No annual lock-in. Cancel anytime.</p>
          <ul style={{ listStyle: "none", margin: "0 0 26px", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {PLAN.map((f) => <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.78)" }}><span style={{ color: "var(--ac)", display: "inline-flex" }}><Ico.check/></span>{f}</li>)}
          </ul>
          <Button variant="brand" size="lg" withArrow style={{ width: "100%" }}>Start free 14-day trial</Button>
          <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>No credit card required</p>
        </div>
      </div>
    </C>
  );
}

/* ------------------------------------------------------------------ cta */
function Cta({ t, ac }) {
  return (
    <section style={{ position: "relative", marginTop: 130, overflow: "hidden" }}>
      {t.aurora && <div aria-hidden style={{ position: "absolute", bottom: -260, left: "50%", transform: "translateX(-50%)", width: 1000, height: 560, filter: "blur(80px)", opacity: 0.5, pointerEvents: "none", background: `radial-gradient(45% 55% at 50% 50%, ${ac.aura[0]}66, transparent 70%), radial-gradient(40% 50% at 65% 40%, ${ac.aura[1]}44, transparent 70%)` }}/>}
      <C style={{ position: "relative", textAlign: "center", paddingTop: 40, paddingBottom: 100 }}>
        <h2 style={{ margin: "0 auto", maxWidth: 680, fontSize: "clamp(32px,5vw,52px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.06, color: "#fff" }}>Stop giving away work for free.</h2>
        <Sub style={{ margin: "20px auto 0", maxWidth: 480 }}>Every day without ScopeBolt is another day of unlogged scope requests and unpaid change orders.</Sub>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 30 }}>
          <Button variant="brand" size="lg" withArrow>{t.navCta}</Button>
          <Button variant="ghost" size="lg" style={{ color: "rgba(255,255,255,0.85)", border: "1px solid var(--hair)", background: "rgba(255,255,255,0.02)" }}>Book a demo</Button>
        </div>
      </C>
    </section>
  );
}

/* --------------------------------------------------------------- footer */
const FOOT = {
  Product: ["Scope log", "Change orders", "Disputes", "Integrations", "Pricing"],
  Company: ["About", "Customers", "Careers", "Contact"],
  Resources: ["Docs", "Guides", "Changelog", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
};
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--hair)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(var(--ac-glow),0.5),transparent)" }}/>
      <C style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(4,1fr)", gap: 32 }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>Scope<span style={{ color: "var(--ac)" }}>Bolt</span></span>
            <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.4)", maxWidth: 220 }}>Margin control for commercial subcontractors.</p>
          </div>
          {Object.entries(FOOT).map(([k, items]) => (
            <div key={k}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 14 }}>{k}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {items.map((l) => <a key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }} onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 22, borderTop: "1px solid var(--hair)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.38)" }}>© 2026 ScopeBolt, Inc.</span>
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.38)" }}>Built for subs who are done eating the cost.</span>
        </div>
      </C>
    </footer>
  );
}

/* ------------------------------------------------------------------ app */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const ac = accentOf(t.accent);
  const root = {
    "--ac": t.accent,
    "--ac-glow": ac.glow,
    "--brand": t.accent,
    "--brand-deep": t.accent,
    "--accent-on-dark": t.accent,
    "--hair": "rgba(255,255,255,0.08)",
    "--hair-strong": "rgba(255,255,255,0.16)",
    background: "var(--surface-canvas)",
    color: "#fff",
    fontFamily: "var(--font-sans)",
    minHeight: "100vh",
    overflowX: "hidden",
  };
  return (
    <div style={root}>
      <Nav t={t}/>
      <Hero t={t} ac={ac}/>
      <LogoCloud/>
      <Steps/>
      <Features/>
      <Testimonials/>
      <Pricing/>
      <Cta t={t} ac={ac}/>
      <Footer/>
      <TweaksPanel>
        <TweakSection label="Theme"/>
        <TweakColor label="Accent" value={t.accent}
          options={["#e8440a", "#5e6ad2", "#10b981"]}
          onChange={(v) => setTweak("accent", v)}/>
        <TweakToggle label="Aurora glow" value={t.aurora} onChange={(v) => setTweak("aurora", v)}/>
        <TweakSection label="Copy"/>
        <TweakText label="Headline" value={t.headline} onChange={(v) => setTweak("headline", v)}/>
        <TweakText label="Primary CTA" value={t.navCta} onChange={(v) => setTweak("navCta", v)}/>
      </TweaksPanel>
    </div>
  );
}

window.SBApp = App;
