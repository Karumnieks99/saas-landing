import React from "react";

const Check = () => (
  React.createElement("svg", { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.5, "aria-hidden": true },
    React.createElement("path", { d: "M4.5 12.75l6 6 9-13.5", strokeLinecap: "round", strokeLinejoin: "round" }))
);

/**
 * Pill badge. ScopeBolt uses four roles:
 *  - eyebrow: uppercase orange section label
 *  - money:   emerald "recovered" proof with a check
 *  - live:    pulsing dot + status text
 *  - neutral: plain integration/tag pill
 */
export function Badge({ children, variant = "neutral", style, ...rest }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    fontFamily: "var(--font-sans)",
    whiteSpace: "nowrap",
    width: "fit-content",
    boxSizing: "border-box",
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
      color: "var(--orange-600)",
    },
    money: {
      padding: "5px 11px",
      fontSize: "12px",
      fontWeight: 600,
      background: "var(--positive-fill)",
      borderColor: "var(--positive-border)",
      color: "var(--positive-text)",
    },
    live: {
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: 500,
      background: "rgba(255,255,255,0.8)",
      borderColor: "var(--border)",
      color: "var(--text-muted)",
    },
    neutral: {
      padding: "6px 12px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      background: "var(--white)",
      borderColor: "var(--border)",
      color: "var(--text-muted)",
    },
  };

  const styled = { ...base, ...(variants[variant] || variants.neutral), ...style };

  const lead =
    variant === "money"
      ? React.createElement(Check, { key: "c" })
      : variant === "live"
      ? React.createElement("span", {
          key: "d",
          style: {
            width: "8px", height: "8px", borderRadius: "999px",
            background: "var(--live)", flexShrink: 0,
            boxShadow: "0 0 0 0 rgba(16,185,129,0.5)",
            animation: "sb-pulse 2s infinite",
          },
        })
      : null;

  return React.createElement(
    "span",
    { style: styled, ...rest },
    lead,
    children,
    React.createElement("style", { key: "kf" }, "@keyframes sb-pulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}60%{box-shadow:0 0 0 5px rgba(16,185,129,0)}}")
  );
}
