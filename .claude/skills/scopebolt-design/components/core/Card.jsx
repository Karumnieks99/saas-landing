import React from "react";

/**
 * Surface card. Default is the light rounded-2xl panel with a hairline
 * border that lifts on hover. `dark` flips to the zinc-950 ground used in
 * the Features section; `feature` is the translucent white-on-dark tile.
 */
export function Card({ children, variant = "light", hover = true, style, ...rest }) {
  const base = {
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    border: "1px solid",
    boxSizing: "border-box",
    transition: "border-color var(--dur-base) ease, box-shadow var(--dur-base) ease, background var(--dur-base) ease",
  };

  const variants = {
    light: { background: "var(--surface-card)", borderColor: "var(--border)" },
    dark: { background: "var(--grad-elevated)", borderColor: "var(--border-dark)", color: "var(--text-on-dark)", boxShadow: "var(--hl-top), var(--shadow-elevated)" },
    feature: { background: "rgba(255,255,255,0.04)", borderColor: "var(--border-dark)", color: "var(--text-on-dark)", boxShadow: "var(--hl-top)" },
  };

  const styled = { ...base, ...(variants[variant] || variants.light), ...style };

  const onEnter = (e) => {
    if (!hover) return;
    if (variant === "light") {
      e.currentTarget.style.borderColor = "var(--border-strong)";
      e.currentTarget.style.boxShadow = "var(--shadow-card)";
    } else {
      e.currentTarget.style.borderColor = "var(--border-dark-strong)";
    }
  };
  const onLeave = (e) => {
    Object.assign(e.currentTarget.style, {
      borderColor: variants[variant].borderColor,
      boxShadow: variants[variant].boxShadow || "none",
      background: variants[variant].background,
    });
  };

  return React.createElement(
    "div",
    { style: styled, onMouseEnter: onEnter, onMouseLeave: onLeave, ...rest },
    children
  );
}
