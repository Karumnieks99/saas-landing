import React from "react";

const SIZES = {
  sm: { padding: "8px 14px", fontSize: "13px", minHeight: "38px", radius: "var(--radius-md)" },
  md: { padding: "12px 22px", fontSize: "14px", minHeight: "44px", radius: "var(--radius-md)" },
  lg: { padding: "15px 30px", fontSize: "15px", minHeight: "52px", radius: "var(--radius-md)" },
};

const ArrowRight = () => (
  React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, "aria-hidden": true },
    React.createElement("path", { d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3", strokeLinecap: "round", strokeLinejoin: "round" }))
);

/**
 * ScopeBolt button. Primary action is INK (near-black zinc), not orange —
 * orange is reserved for the wordmark and accents. Use `brand` only for a
 * single hero moment. `secondary` is the outline; `ghost` is text-only.
 */
export function Button({
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
    boxSizing: "border-box",
  };

  const variants = {
    primary: {
      background: "var(--surface-ink)",
      color: "var(--text-on-dark)",
      boxShadow: "var(--shadow-control)",
    },
    brand: {
      background: "var(--brand)",
      color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-brand), var(--hl-top-strong)",
    },
    secondary: {
      background: "var(--white)",
      color: "var(--text-body)",
      borderColor: "var(--border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-muted)",
    },
  };

  const styled = { ...base, ...(variants[variant] || variants.primary), ...style };

  const onEnter = (e) => {
    if (disabled) return;
    if (variant === "primary") { e.currentTarget.style.background = "var(--zinc-800)"; e.currentTarget.style.transform = "translateY(-1px)"; }
    else if (variant === "brand") { e.currentTarget.style.boxShadow = "var(--shadow-brand-hover), var(--hl-top-strong)"; e.currentTarget.style.transform = "translateY(-1px)"; }
    else if (variant === "secondary") { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--zinc-50)"; }
    else { e.currentTarget.style.background = "var(--zinc-100)"; e.currentTarget.style.color = "var(--text-strong)"; }
  };
  const onLeave = (e) => {
    Object.assign(e.currentTarget.style, {
      background: variants[variant].background,
      color: variants[variant].color || "",
      borderColor: variants[variant].borderColor || "transparent",
      boxShadow: variants[variant].boxShadow || "none",
      transform: "none",
    });
  };

  const content = [children, withArrow ? React.createElement(ArrowRight, { key: "arr" }) : null];
  const Tag = href ? "a" : "button";
  const tagProps = href
    ? { href, style: styled, onMouseEnter: onEnter, onMouseLeave: onLeave, ...rest }
    : { type, disabled, onClick, style: styled, onMouseEnter: onEnter, onMouseLeave: onLeave, ...rest };

  return React.createElement(Tag, tagProps, content);
}
