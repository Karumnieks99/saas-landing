import React from "react";

const STAR = "M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12l-2.8-2.03c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.29z";

/** Amber star rating row. Decorative proof element; pass `count` filled of 5. */
export function Stars({ count = 5, size = 14, style, ...rest }) {
  return React.createElement(
    "span",
    { style: { display: "inline-flex", gap: "2px", color: "var(--rating)", ...style }, role: "img", "aria-label": count + " out of 5 stars", ...rest },
    [...Array(5)].map((_, i) =>
      React.createElement("svg", {
        key: i, width: size, height: size, viewBox: "0 0 20 20",
        fill: i < count ? "currentColor" : "var(--zinc-200)",
      }, React.createElement("path", { d: STAR }))
    )
  );
}
