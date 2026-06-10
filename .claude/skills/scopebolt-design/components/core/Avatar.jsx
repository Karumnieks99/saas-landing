import React from "react";

const PALETTE = {
  indigo: "var(--avatar-indigo)",
  rose: "var(--avatar-rose)",
  amber: "var(--avatar-amber)",
  emerald: "var(--avatar-emerald)",
};

const SIZES = { sm: 28, md: 36, lg: 52 };

/**
 * Initials avatar — a flat color circle with a white monogram. Used in
 * testimonial cards and the hero social-proof stack.
 */
export function Avatar({ initials = "SB", color = "indigo", size = "md", ring = false, style, ...rest }) {
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
    ...style,
  };
  return React.createElement("span", { style: styled, ...rest }, initials);
}

/** Overlapping row of avatars for social proof. Pass an array of {initials,color}. */
export function AvatarStack({ people = [], size = "sm", style, ...rest }) {
  const px = SIZES[size] || SIZES.sm;
  return React.createElement(
    "span",
    { style: { display: "inline-flex", ...style }, ...rest },
    people.map((p, i) =>
      React.createElement(Avatar, {
        key: i,
        initials: p.initials,
        color: p.color,
        size,
        ring: true,
        style: { marginLeft: i === 0 ? 0 : -(px * 0.3) + "px" },
      })
    )
  );
}
