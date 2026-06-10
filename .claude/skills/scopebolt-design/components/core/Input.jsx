import React from "react";

/**
 * Text input with an optional leading label. Zinc border, brand focus ring.
 * Mirrors the trial / email-capture fields used in ScopeBolt CTAs.
 */
export function Input({ label, hint, id, style, wrapStyle, ...rest }) {
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
    ...style,
  };

  return React.createElement(
    "label",
    { htmlFor: inputId, style: { display: "flex", flexDirection: "column", gap: "6px", ...wrapStyle } },
    label
      ? React.createElement("span", {
          style: { fontSize: "13px", fontWeight: 600, color: "var(--text-body)" },
        }, label)
      : null,
    React.createElement("input", { id: inputId, style: field, onFocus: () => setFocused(true), onBlur: () => setFocused(false), ...rest }),
    hint
      ? React.createElement("span", {
          style: { fontSize: "12px", color: "var(--text-faint)" },
        }, hint)
      : null
  );
}
