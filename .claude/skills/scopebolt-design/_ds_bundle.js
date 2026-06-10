/* @ds-bundle: {"format":3,"namespace":"ScopeBoltDesignSystem_a38b66","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Stars","sourcePath":"components/core/Stars.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4b9442c8f66f","components/core/Badge.jsx":"a54abe840dac","components/core/Button.jsx":"4e1874e734af","components/core/Card.jsx":"cca14a0d701e","components/core/Input.jsx":"10a2003782b4","components/core/Stars.jsx":"f2c2b0fd7598","ui_kits/marketing/parts.jsx":"1ace74d7017c","ui_kits/marketing/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ScopeBoltDesignSystem_a38b66 = window.ScopeBoltDesignSystem_a38b66 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const PALETTE = {
  indigo: "var(--avatar-indigo)",
  rose: "var(--avatar-rose)",
  amber: "var(--avatar-amber)",
  emerald: "var(--avatar-emerald)"
};
const SIZES = {
  sm: 28,
  md: 36,
  lg: 52
};

/**
 * Initials avatar — a flat color circle with a white monogram. Used in
 * testimonial cards and the hero social-proof stack.
 */
function Avatar({
  initials = "SB",
  color = "indigo",
  size = "md",
  ring = false,
  style,
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const styled = {
    width: px + "px",
    height: px + "px",
    borderRadius: "var(--radius-pill)",
    background: PALETTE[color] || color,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: Math.round(px * 0.34) + "px",
    flexShrink: 0,
    border: ring ? "2px solid #fff" : "none",
    boxShadow: ring ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
    boxSizing: "border-box",
    ...style
  };
  return React.createElement("span", {
    style: styled,
    ...rest
  }, initials);
}

/** Overlapping row of avatars for social proof. Pass an array of {initials,color}. */
function AvatarStack({
  people = [],
  size = "sm",
  style,
  ...rest
}) {
  const px = SIZES[size] || SIZES.sm;
  return React.createElement("span", {
    style: {
      display: "inline-flex",
      ...style
    },
    ...rest
  }, people.map((p, i) => React.createElement(Avatar, {
    key: i,
    initials: p.initials,
    color: p.color,
    size,
    ring: true,
    style: {
      marginLeft: i === 0 ? 0 : -(px * 0.3) + "px"
    }
  })));
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const Check = () => React.createElement("svg", {
  width: 12,
  height: 12,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  "aria-hidden": true
}, React.createElement("path", {
  d: "M4.5 12.75l6 6 9-13.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/**
 * Pill badge. ScopeBolt uses four roles:
 *  - eyebrow: uppercase orange section label
 *  - money:   emerald "recovered" proof with a check
 *  - live:    pulsing dot + status text
 *  - neutral: plain integration/tag pill
 */
function Badge({
  children,
  variant = "neutral",
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    fontFamily: "var(--font-sans)",
    whiteSpace: "nowrap",
    width: "fit-content",
    boxSizing: "border-box"
  };
  const variants = {
    eyebrow: {
      padding: "6px 12px",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      background: "var(--orange-50)",
      borderColor: "var(--orange-200)",
      color: "var(--orange-600)"
    },
    money: {
      padding: "5px 11px",
      fontSize: "12px",
      fontWeight: 600,
      background: "var(--positive-fill)",
      borderColor: "var(--positive-border)",
      color: "var(--positive-text)"
    },
    live: {
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: 500,
      background: "rgba(255,255,255,0.8)",
      borderColor: "var(--border)",
      color: "var(--text-muted)"
    },
    neutral: {
      padding: "6px 12px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      background: "var(--white)",
      borderColor: "var(--border)",
      color: "var(--text-muted)"
    }
  };
  const styled = {
    ...base,
    ...(variants[variant] || variants.neutral),
    ...style
  };
  const lead = variant === "money" ? React.createElement(Check, {
    key: "c"
  }) : variant === "live" ? React.createElement("span", {
    key: "d",
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "999px",
      background: "var(--live)",
      flexShrink: 0,
      boxShadow: "0 0 0 0 rgba(16,185,129,0.5)",
      animation: "sb-pulse 2s infinite"
    }
  }) : null;
  return React.createElement("span", {
    style: styled,
    ...rest
  }, lead, children, React.createElement("style", {
    key: "kf"
  }, "@keyframes sb-pulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}60%{box-shadow:0 0 0 5px rgba(16,185,129,0)}}"));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    padding: "8px 14px",
    fontSize: "13px",
    minHeight: "38px",
    radius: "var(--radius-md)"
  },
  md: {
    padding: "12px 22px",
    fontSize: "14px",
    minHeight: "44px",
    radius: "var(--radius-md)"
  },
  lg: {
    padding: "15px 30px",
    fontSize: "15px",
    minHeight: "52px",
    radius: "var(--radius-md)"
  }
};
const ArrowRight = () => React.createElement("svg", {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  "aria-hidden": true
}, React.createElement("path", {
  d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/**
 * ScopeBolt button. Primary action is INK (near-black zinc), not orange —
 * orange is reserved for the wordmark and accents. Use `brand` only for a
 * single hero moment. `secondary` is the outline; `ghost` is text-only.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  disabled = false,
  href,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    fontSize: s.fontSize,
    lineHeight: 1,
    minHeight: s.minHeight,
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-base) ease, box-shadow var(--dur-base) ease, border-color var(--dur-base) ease",
    boxSizing: "border-box"
  };
  const variants = {
    primary: {
      background: "var(--surface-ink)",
      color: "var(--text-on-dark)",
      boxShadow: "var(--shadow-control)"
    },
    brand: {
      background: "var(--brand)",
      color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-brand), var(--hl-top-strong)"
    },
    secondary: {
      background: "var(--white)",
      color: "var(--text-body)",
      borderColor: "var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-muted)"
    }
  };
  const styled = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style
  };
  const onEnter = e => {
    if (disabled) return;
    if (variant === "primary") {
      e.currentTarget.style.background = "var(--zinc-800)";
      e.currentTarget.style.transform = "translateY(-1px)";
    } else if (variant === "brand") {
      e.currentTarget.style.boxShadow = "var(--shadow-brand-hover), var(--hl-top-strong)";
      e.currentTarget.style.transform = "translateY(-1px)";
    } else if (variant === "secondary") {
      e.currentTarget.style.borderColor = "var(--border-strong)";
      e.currentTarget.style.background = "var(--zinc-50)";
    } else {
      e.currentTarget.style.background = "var(--zinc-100)";
      e.currentTarget.style.color = "var(--text-strong)";
    }
  };
  const onLeave = e => {
    Object.assign(e.currentTarget.style, {
      background: variants[variant].background,
      color: variants[variant].color || "",
      borderColor: variants[variant].borderColor || "transparent",
      boxShadow: variants[variant].boxShadow || "none",
      transform: "none"
    });
  };
  const content = [children, withArrow ? React.createElement(ArrowRight, {
    key: "arr"
  }) : null];
  const Tag = href ? "a" : "button";
  const tagProps = href ? {
    href,
    style: styled,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    ...rest
  } : {
    type,
    disabled,
    onClick,
    style: styled,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    ...rest
  };
  return React.createElement(Tag, tagProps, content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Surface card. Default is the light rounded-2xl panel with a hairline
 * border that lifts on hover. `dark` flips to the zinc-950 ground used in
 * the Features section; `feature` is the translucent white-on-dark tile.
 */
function Card({
  children,
  variant = "light",
  hover = true,
  style,
  ...rest
}) {
  const base = {
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    border: "1px solid",
    boxSizing: "border-box",
    transition: "border-color var(--dur-base) ease, box-shadow var(--dur-base) ease, background var(--dur-base) ease"
  };
  const variants = {
    light: {
      background: "var(--surface-card)",
      borderColor: "var(--border)"
    },
    dark: {
      background: "var(--grad-elevated)",
      borderColor: "var(--border-dark)",
      color: "var(--text-on-dark)",
      boxShadow: "var(--hl-top), var(--shadow-elevated)"
    },
    feature: {
      background: "rgba(255,255,255,0.04)",
      borderColor: "var(--border-dark)",
      color: "var(--text-on-dark)",
      boxShadow: "var(--hl-top)"
    }
  };
  const styled = {
    ...base,
    ...(variants[variant] || variants.light),
    ...style
  };
  const onEnter = e => {
    if (!hover) return;
    if (variant === "light") {
      e.currentTarget.style.borderColor = "var(--border-strong)";
      e.currentTarget.style.boxShadow = "var(--shadow-card)";
    } else {
      e.currentTarget.style.borderColor = "var(--border-dark-strong)";
    }
  };
  const onLeave = e => {
    Object.assign(e.currentTarget.style, {
      borderColor: variants[variant].borderColor,
      boxShadow: variants[variant].boxShadow || "none",
      background: variants[variant].background
    });
  };
  return React.createElement("div", {
    style: styled,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
/**
 * Text input with an optional leading label. Zinc border, brand focus ring.
 * Mirrors the trial / email-capture fields used in ScopeBolt CTAs.
 */
function Input({
  label,
  hint,
  id,
  style,
  wrapStyle,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || "sb-input-" + Math.random().toString(36).slice(2, 7);
  const field = {
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    color: "var(--text-strong)",
    background: "var(--white)",
    border: "1px solid " + (focused ? "var(--brand)" : "var(--border)"),
    boxShadow: focused ? "0 0 0 3px rgba(232,68,10,0.12)" : "none",
    borderRadius: "var(--radius-md)",
    padding: "12px 14px",
    minHeight: "44px",
    outline: "none",
    transition: "border-color var(--dur-base) ease, box-shadow var(--dur-base) ease",
    ...style
  };
  return React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...wrapStyle
    }
  }, label ? React.createElement("span", {
    style: {
      fontSize: "13px",
      fontWeight: 600,
      color: "var(--text-body)"
    }
  }, label) : null, React.createElement("input", {
    id: inputId,
    style: field,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...rest
  }), hint ? React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--text-faint)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Stars.jsx
try { (() => {
const STAR = "M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12l-2.8-2.03c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.29z";

/** Amber star rating row. Decorative proof element; pass `count` filled of 5. */
function Stars({
  count = 5,
  size = 14,
  style,
  ...rest
}) {
  return React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "2px",
      color: "var(--rating)",
      ...style
    },
    role: "img",
    "aria-label": count + " out of 5 stars",
    ...rest
  }, [...Array(5)].map((_, i) => React.createElement("svg", {
    key: i,
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: i < count ? "currentColor" : "var(--zinc-200)"
  }, React.createElement("path", {
    d: STAR
  }))));
}
Object.assign(__ds_scope, { Stars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stars.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/parts.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ScopeBolt landing page — Linear-style dark recreation.
   Adopts Linear's visual language (deep near-black canvas, aurora hero,
   glassy nav, bento feature grid, refined hairline surfaces) for ScopeBolt's
   content. Composes DS primitives (Button, Stars, Avatar, AvatarStack) from
   window.ScopeBoltDesignSystem_a38b66 and exports <App/> as window.SBApp.
   Tweakable via the Tweaks panel (accent, headline, aurora, nav CTA). */

const DS = window.ScopeBoltDesignSystem_a38b66;
const {
  Button,
  Stars,
  Avatar,
  AvatarStack
} = DS;
const {
  useState,
  useEffect,
  useRef
} = React;
const {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakColor,
  TweakText,
  TweakToggle
} = window;

/* --------------------------------------------------------- accent themes */
const ACCENTS = {
  "#e8440a": {
    glow: "232,68,10",
    aura: ["#e8440a", "#f59e0b", "#b45367"]
  },
  // ScopeBolt orange
  "#5e6ad2": {
    glow: "94,106,210",
    aura: ["#5e6ad2", "#8b5cf6", "#3b82f6"]
  },
  // Linear indigo
  "#10b981": {
    glow: "16,185,129",
    aura: ["#10b981", "#22d3ee", "#6366f1"]
  } // Emerald
};
const accentOf = hex => ACCENTS[hex] || {
  glow: "232,68,10",
  aura: [hex, hex, hex]
};
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e8440a",
  "headline": "Stop losing money to scope creep.",
  "aurora": true,
  "navCta": "Start free trial"
} /*EDITMODE-END*/;

/* ------------------------------------------------------------------ data */
const NAV = ["Product", "How it works", "Customers", "Pricing"];
const TICKER = ["Procore", "Buildertrend", "QuickBooks", "Sage 300", "Foundation", "Jonas", "Viewpoint"];
const STEPS = [{
  n: "01",
  title: "Set your baseline",
  body: "Upload your signed contract. ScopeBolt reads it and builds your scope baseline automatically."
}, {
  n: "02",
  title: "Log changes in the field",
  body: "Anyone logs a scope request — photo, voice, or text. Timestamped and tied to the job."
}, {
  n: "03",
  title: "Send the CO, get paid",
  body: "ScopeBolt flags the deviation, drafts the change order, and sends it for GC sign-off."
}];
const FEATURES = [{
  tag: "Track",
  title: "A scope log that never lies",
  desc: "Every request, email, and site instruction is timestamped and tied to a job code the moment it happens — an immutable record you can stand behind.",
  wide: true
}, {
  tag: "Alert",
  title: "Know before you dig in",
  desc: "ScopeBolt compares new requests against your signed contract and flags anything outside it, instantly."
}, {
  tag: "Bill",
  title: "Change orders in 60 seconds",
  desc: "One tap drafts a professional CO. The GC signs off before your crew lifts a tool."
}, {
  tag: "Protect",
  title: "Dispute-proof documentation",
  desc: "Every interaction archived with timestamps. Pull it up mid-dispute and win — we've seen $22k recovered on one job.",
  wide: true
}];
const TESTI = [{
  quote: "We were bleeding $6–8k per project on scope drift and didn't even realize it. ScopeBolt paid for itself on job one.",
  name: "Mike R.",
  role: "Electrical Sub · Chicago",
  initials: "MR",
  color: "indigo",
  money: "$11,400 recovered"
}, {
  quote: "Change orders used to take 2 days of back-and-forth. Now my PM sends one from the truck and the GC signs same-day.",
  name: "Sandra T.",
  role: "Mechanical Sub · Dallas",
  initials: "ST",
  color: "rose",
  money: "$7,800 first month"
}, {
  quote: "I pulled the scope log up mid-dispute and won $22k that would've been a complete write-off. That log is gold.",
  name: "Aaron K.",
  role: "Concrete Sub · Denver",
  initials: "AK",
  color: "amber",
  money: "$22,000 won"
}];
const PLAN = ["Unlimited jobs & change orders", "Real-time scope log", "One-tap CO generation & GC sign-off", "Procore + Buildertrend sync", "Dispute archive (5 years)", "Priority support"];
const LOG = [{
  code: "RFI-204",
  desc: "Added conduit run — east riser",
  status: "Flagged",
  tone: "amber",
  amt: "+$3,400"
}, {
  code: "CO-118",
  desc: "Relocate panel board L2",
  status: "CO sent",
  tone: "ac",
  amt: "+$5,900"
}, {
  code: "CO-117",
  desc: "Extra fire-stopping, levels 3–5",
  status: "Recovered",
  tone: "emerald",
  amt: "+$8,250"
}, {
  code: "RFI-201",
  desc: "Revised lighting layout, lobby",
  status: "Flagged",
  tone: "amber",
  amt: "+$1,180"
}, {
  code: "CO-115",
  desc: "After-hours pour, garage deck",
  status: "Recovered",
  tone: "emerald",
  amt: "+$12,000"
}];

/* ----------------------------------------------------------------- icons */
const Ico = {
  arrow: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  check: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M4.5 12.75l6 6 9-13.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  log: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M8 6h11M8 12h11M8 18h11M3.5 6h.01M3.5 12h.01M3.5 18h.01",
    strokeLinecap: "round"
  })),
  bolt: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M13 2L4.5 13.5H11l-1 8.5L18.5 10.5H12l1-8.5z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  shield: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  bill: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 3h12v18l-3-2-3 2-3-2-3 2V3z M9 8h6M9 12h6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  alert: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
};
const FEAT_ICON = {
  Track: Ico.log,
  Alert: Ico.alert,
  Bill: Ico.bill,
  Protect: Ico.shield
};

/* ------------------------------------------------------------- primitives */
const C = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 24px",
    ...style
  }
}, children);
const Eyebrow = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "5px 12px 5px 10px",
    borderRadius: 999,
    border: "1px solid var(--hair)",
    background: "rgba(255,255,255,0.03)",
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: "-0.005em"
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "var(--ac)",
    boxShadow: "0 0 8px 1px var(--ac)"
  }
}), children);
const Kicker = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--ac)",
    marginBottom: 16
  }
}, children);
const H2 = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: "clamp(28px,4.2vw,44px)",
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1.08,
    color: "#fff",
    ...style
  }
}, children);
const Sub = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.55)",
    ...style
  }
}, children);

/* ------------------------------------------------------------------- nav */
function Nav({
  t
}) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > 8);
    window.addEventListener("scroll", fn, {
      passive: true
    });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      height: 56,
      display: "flex",
      alignItems: "center",
      transition: "background .25s ease, border-color .25s ease",
      background: s ? "rgba(8,9,10,0.72)" : "rgba(8,9,10,0)",
      backdropFilter: s ? "blur(12px)" : "none",
      borderBottom: "1px solid " + (s ? "var(--hair)" : "transparent")
    }
  }, /*#__PURE__*/React.createElement(C, {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Scope", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ac)"
    }
  }, "Bolt")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links",
    style: {
      display: "flex",
      gap: 4
    }
  }, NAV.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      padding: "6px 10px",
      fontSize: 13.5,
      color: "rgba(255,255,255,0.6)",
      textDecoration: "none",
      borderRadius: 7,
      transition: "color .15s"
    },
    onMouseEnter: e => e.currentTarget.style.color = "#fff",
    onMouseLeave: e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"
  }, l)))), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 13.5,
      color: "rgba(255,255,255,0.6)",
      textDecoration: "none"
    }
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "sm"
  }, t.navCta))));
}

/* ------------------------------------------------------------- app mock */
function StatusPill({
  status,
  tone
}) {
  const map = {
    amber: {
      c: "var(--amber-400)",
      b: "rgba(251,191,36,0.16)",
      bg: "rgba(251,191,36,0.08)"
    },
    emerald: {
      c: "#34d399",
      b: "rgba(16,185,129,0.20)",
      bg: "rgba(16,185,129,0.10)"
    },
    ac: {
      c: "var(--ac)",
      b: "rgba(var(--ac-glow),0.30)",
      bg: "rgba(var(--ac-glow),0.12)"
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "3px 9px",
      borderRadius: 999,
      fontSize: 11.5,
      fontWeight: 500,
      color: map.c,
      border: "1px solid " + map.b,
      background: map.bg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 999,
      background: map.c
    }
  }), status);
}
function AppMock() {
  const rail = [["Scope log", Ico.log, true], ["Change orders", Ico.bill, false], ["Disputes", Ico.shield, false], ["Billing", Ico.check, false]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 14,
      overflow: "hidden",
      border: "1px solid var(--hair)",
      background: "var(--grad-elevated)",
      boxShadow: "var(--hl-top), 0 40px 120px -40px rgba(var(--ac-glow),0.35), 0 30px 80px -30px rgba(0,0,0,0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      height: 44,
      padding: "0 16px",
      borderBottom: "1px solid var(--hair)",
      background: "rgba(255,255,255,0.015)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7
    }
  }, ["#ff5f57", "#febc2e", "#28c840"].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 11,
      height: 11,
      borderRadius: 999,
      background: c,
      opacity: 0.85
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "rgba(255,255,255,0.5)",
      fontWeight: 500
    }
  }, "Harbor Point Garage \xB7 Scope log"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11.5,
      color: "rgba(255,255,255,0.38)",
      fontFamily: "var(--font-mono)"
    }
  }, "$184k pending \xB7 $126k ready to bill")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "188px 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--hair)",
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 3,
      background: "rgba(0,0,0,0.18)"
    }
  }, rail.map(([label, I, active]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "8px 10px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 500,
      color: active ? "#fff" : "rgba(255,255,255,0.55)",
      background: active ? "rgba(255,255,255,0.06)" : "transparent",
      border: "1px solid " + (active ? "var(--hair)" : "transparent")
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: active ? "var(--ac)" : "rgba(255,255,255,0.4)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(I, null)), label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: "10px",
      borderRadius: 8,
      border: "1px solid var(--hair)",
      background: "rgba(var(--ac-glow),0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.5)"
    }
  }, "Recovered this job"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "#fff",
      marginTop: 2
    }
  }, "$40,730"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "-0.01em"
    }
  }, "Open scope items"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.4)",
      padding: "2px 7px",
      borderRadius: 999,
      border: "1px solid var(--hair)"
    }
  }, "5"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 12,
      color: "var(--ac)",
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, "New change order ", /*#__PURE__*/React.createElement(Ico.arrow, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      borderRadius: 10,
      overflow: "hidden",
      border: "1px solid var(--hair)"
    }
  }, LOG.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.code,
    style: {
      display: "grid",
      gridTemplateColumns: "84px 1fr auto auto",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      background: i % 2 ? "rgba(255,255,255,0.012)" : "rgba(255,255,255,0.025)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      color: "rgba(255,255,255,0.5)"
    }
  }, r.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.82)"
    }
  }, r.desc), /*#__PURE__*/React.createElement(StatusPill, {
    status: r.status,
    tone: r.tone
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      fontWeight: 500,
      color: r.tone === "emerald" ? "#34d399" : "rgba(255,255,255,0.92)",
      minWidth: 64,
      textAlign: "right"
    }
  }, r.amt)))))));
}

/* ------------------------------------------------------------------ hero */
function Hero({
  t,
  ac
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      paddingTop: 150,
      overflow: "hidden"
    }
  }, t.aurora && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      top: -180,
      left: "50%",
      transform: "translateX(-50%)",
      width: 1100,
      height: 720,
      pointerEvents: "none",
      filter: "blur(70px)",
      opacity: 0.55,
      background: `radial-gradient(38% 50% at 30% 40%, ${ac.aura[0]}66, transparent 70%), radial-gradient(40% 50% at 65% 35%, ${ac.aura[1]}55, transparent 70%), radial-gradient(45% 55% at 50% 60%, ${ac.aura[2]}44, transparent 70%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
      backgroundSize: "56px 56px",
      maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%,#000 30%,transparent 80%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%,#000 30%,transparent 80%)"
    }
  }), /*#__PURE__*/React.createElement(C, {
    style: {
      position: "relative",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Margin control for commercial subcontractors"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "22px 0 0",
      maxWidth: 820,
      fontSize: "clamp(40px,6.4vw,72px)",
      fontWeight: 600,
      lineHeight: 1.04,
      letterSpacing: "-0.04em",
      color: "#fff"
    }
  }, t.headline), /*#__PURE__*/React.createElement(Sub, {
    style: {
      marginTop: 22,
      maxWidth: 560,
      fontSize: 18
    }
  }, "ScopeBolt tracks every scope change, fires an alert before your crew starts, and sends a signed change order to the GC \u2014 in under 60 seconds."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 30,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "lg",
    withArrow: true
  }, t.navCta), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    style: {
      color: "rgba(255,255,255,0.85)",
      border: "1px solid var(--hair)",
      background: "rgba(255,255,255,0.02)"
    }
  }, "Book a demo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(AvatarStack, {
    size: "sm",
    people: [{
      initials: "MR",
      color: "indigo"
    }, {
      initials: "JT",
      color: "rose"
    }, {
      initials: "AK",
      color: "amber"
    }, {
      initials: "SB",
      color: "emerald"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    count: 5
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "rgba(255,255,255,0.5)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "rgba(255,255,255,0.8)",
      fontWeight: 600
    }
  }, "340+ subs"), " \xB7 4.9 rating"))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 980,
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(AppMock, null))));
}

/* -------------------------------------------------------------- logos */
function LogoCloud() {
  return /*#__PURE__*/React.createElement(C, {
    style: {
      paddingTop: 64,
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: 12.5,
      color: "rgba(255,255,255,0.38)",
      letterSpacing: "0.04em",
      margin: "0 0 22px"
    }
  }, "Syncs with the tools your back office already runs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px 40px"
    }
  }, TICKER.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "rgba(255,255,255,0.32)"
    }
  }, n))));
}

/* -------------------------------------------------------------- steps */
function Steps() {
  return /*#__PURE__*/React.createElement(C, {
    style: {
      paddingTop: 110
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      maxWidth: 640,
      margin: "0 auto 52px"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "How it works"), /*#__PURE__*/React.createElement(H2, null, "From job start to paid in three steps")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 1,
      borderRadius: 14,
      overflow: "hidden",
      border: "1px solid var(--hair)",
      background: "var(--hair)"
    }
  }, STEPS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      padding: "30px 26px",
      background: "var(--surface-canvas)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      color: "var(--ac)",
      marginBottom: 16
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 8px",
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#fff"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.5)"
    }
  }, s.body)))));
}

/* ------------------------------------------------------------- features */
function FeatureTile({
  f
}) {
  const I = FEAT_ICON[f.tag] || Ico.bolt;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: f.wide ? "span 2" : "span 1",
      position: "relative",
      borderRadius: 14,
      border: "1px solid var(--hair)",
      background: "var(--grad-elevated)",
      boxShadow: "var(--hl-top)",
      padding: 26,
      transition: "border-color .2s ease"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = "var(--hair-strong)",
    onMouseLeave: e => e.currentTarget.style.borderColor = "var(--hair)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--ac)",
      background: "rgba(var(--ac-glow),0.10)",
      border: "1px solid rgba(var(--ac-glow),0.22)",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(I, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ac)",
      marginBottom: 8
    }
  }, f.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 8px",
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: "-0.015em",
      color: "#fff"
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.65,
      color: "rgba(255,255,255,0.55)",
      maxWidth: f.wide ? 460 : "none"
    }
  }, f.desc));
}
function Features() {
  return /*#__PURE__*/React.createElement(C, {
    style: {
      paddingTop: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: "0 auto 52px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Features"), /*#__PURE__*/React.createElement(H2, null, "Built for the field, not the office"), /*#__PURE__*/React.createElement(Sub, {
    style: {
      marginTop: 16
    }
  }, "Everything a commercial sub needs to capture scope, flag deviations, and bill for the work \u2014 nothing they don't.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 14
    }
  }, FEATURES.map(f => /*#__PURE__*/React.createElement(FeatureTile, {
    key: f.title,
    f: f
  }))));
}

/* ---------------------------------------------------------- testimonials */
function Testimonials() {
  return /*#__PURE__*/React.createElement(C, {
    style: {
      paddingTop: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: "0 auto 52px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Customers"), /*#__PURE__*/React.createElement(H2, null, "Real money recovered by real subs")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 14
    }
  }, TESTI.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      display: "flex",
      flexDirection: "column",
      borderRadius: 14,
      border: "1px solid var(--hair)",
      background: "var(--grad-elevated)",
      boxShadow: "var(--hl-top)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    count: 5
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      flex: 1,
      margin: "14px 0 18px",
      fontSize: 14.5,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.8)"
    }
  }, "\"", c.quote, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      paddingTop: 16,
      borderTop: "1px solid var(--hair)"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: c.initials,
    color: c.color,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#fff"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "rgba(255,255,255,0.45)"
    }
  }, c.role)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      color: "#34d399",
      padding: "3px 9px",
      borderRadius: 999,
      background: "rgba(16,185,129,0.10)",
      border: "1px solid rgba(16,185,129,0.2)"
    }
  }, c.money))))));
}

/* -------------------------------------------------------------- pricing */
function Pricing() {
  return /*#__PURE__*/React.createElement(C, {
    style: {
      paddingTop: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: "0 auto 52px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Pricing"), /*#__PURE__*/React.createElement(H2, null, "One plan. No surprises.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: 440,
      margin: "0 auto",
      borderRadius: 16,
      border: "1px solid rgba(var(--ac-glow),0.32)",
      background: "var(--grad-elevated)",
      boxShadow: "var(--hl-top), 0 30px 80px -40px rgba(var(--ac-glow),0.4)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--ac),transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px 30px 34px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ac)",
      marginBottom: 16
    }
  }, "Most popular"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 52,
      fontWeight: 600,
      letterSpacing: "-0.03em",
      color: "#fff",
      lineHeight: 1
    }
  }, "$79"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "rgba(255,255,255,0.45)"
    }
  }, "/ month \xB7 per PM")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 24px",
      fontSize: 13.5,
      color: "rgba(255,255,255,0.45)"
    }
  }, "No seat limits. No annual lock-in. Cancel anytime."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "0 0 26px",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, PLAN.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 14,
      color: "rgba(255,255,255,0.78)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ac)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Ico.check, null)), f))), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "lg",
    withArrow: true,
    style: {
      width: "100%"
    }
  }, "Start free 14-day trial"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      textAlign: "center",
      fontSize: 12,
      color: "rgba(255,255,255,0.4)"
    }
  }, "No credit card required"))));
}

/* ------------------------------------------------------------------ cta */
function Cta({
  t,
  ac
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      marginTop: 130,
      overflow: "hidden"
    }
  }, t.aurora && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      bottom: -260,
      left: "50%",
      transform: "translateX(-50%)",
      width: 1000,
      height: 560,
      filter: "blur(80px)",
      opacity: 0.5,
      pointerEvents: "none",
      background: `radial-gradient(45% 55% at 50% 50%, ${ac.aura[0]}66, transparent 70%), radial-gradient(40% 50% at 65% 40%, ${ac.aura[1]}44, transparent 70%)`
    }
  }), /*#__PURE__*/React.createElement(C, {
    style: {
      position: "relative",
      textAlign: "center",
      paddingTop: 40,
      paddingBottom: 100
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 auto",
      maxWidth: 680,
      fontSize: "clamp(32px,5vw,52px)",
      fontWeight: 600,
      letterSpacing: "-0.035em",
      lineHeight: 1.06,
      color: "#fff"
    }
  }, "Stop giving away work for free."), /*#__PURE__*/React.createElement(Sub, {
    style: {
      margin: "20px auto 0",
      maxWidth: 480
    }
  }, "Every day without ScopeBolt is another day of unlogged scope requests and unpaid change orders."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "lg",
    withArrow: true
  }, t.navCta), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    style: {
      color: "rgba(255,255,255,0.85)",
      border: "1px solid var(--hair)",
      background: "rgba(255,255,255,0.02)"
    }
  }, "Book a demo"))));
}

/* --------------------------------------------------------------- footer */
const FOOT = {
  Product: ["Scope log", "Change orders", "Disputes", "Integrations", "Pricing"],
  Company: ["About", "Customers", "Careers", "Contact"],
  Resources: ["Docs", "Guides", "Changelog", "Status"],
  Legal: ["Privacy", "Terms", "Security"]
};
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--hair)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: "linear-gradient(90deg,transparent,rgba(var(--ac-glow),0.5),transparent)"
    }
  }), /*#__PURE__*/React.createElement(C, {
    style: {
      paddingTop: 56,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr repeat(4,1fr)",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Scope", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ac)"
    }
  }, "Bolt")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontSize: 13,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.4)",
      maxWidth: 220
    }
  }, "Margin control for commercial subcontractors.")), Object.entries(FOOT).map(([k, items]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "rgba(255,255,255,0.85)",
      marginBottom: 14
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, items.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.45)",
      textDecoration: "none"
    },
    onMouseEnter: e => e.currentTarget.style.color = "rgba(255,255,255,0.8)",
    onMouseLeave: e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      paddingTop: 22,
      borderTop: "1px solid var(--hair)",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "rgba(255,255,255,0.38)"
    }
  }, "\xA9 2026 ScopeBolt, Inc."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "rgba(255,255,255,0.38)"
    }
  }, "Built for subs who are done eating the cost."))));
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
    overflowX: "hidden"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: root
  }, /*#__PURE__*/React.createElement(Nav, {
    t: t
  }), /*#__PURE__*/React.createElement(Hero, {
    t: t,
    ac: ac
  }), /*#__PURE__*/React.createElement(LogoCloud, null), /*#__PURE__*/React.createElement(Steps, null), /*#__PURE__*/React.createElement(Features, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(Cta, {
    t: t,
    ac: ac
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Theme"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Accent",
    value: t.accent,
    options: ["#e8440a", "#5e6ad2", "#10b981"],
    onChange: v => setTweak("accent", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Aurora glow",
    value: t.aurora,
    onChange: v => setTweak("aurora", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Copy"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Headline",
    value: t.headline,
    onChange: v => setTweak("headline", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Primary CTA",
    value: t.navCta,
    onChange: v => setTweak("navCta", v)
  })));
}
window.SBApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Stars = __ds_scope.Stars;

})();
