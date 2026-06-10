import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. `primary` = ink (default), `brand` = orange (use once per view), `secondary` = outline, `ghost` = text-only. */
  variant?: "primary" | "brand" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Append the rightward arrow used on ScopeBolt CTAs. */
  withArrow?: boolean;
  disabled?: boolean;
  /** Render as an anchor instead of a button. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

/** Primary call-to-action button for ScopeBolt surfaces. */
export function Button(props: ButtonProps): JSX.Element;
