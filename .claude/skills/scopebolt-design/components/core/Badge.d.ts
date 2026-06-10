import * as React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  /** `eyebrow` = orange section label, `money` = emerald proof w/ check, `live` = pulsing status dot, `neutral` = plain tag. */
  variant?: "eyebrow" | "money" | "live" | "neutral";
  style?: React.CSSProperties;
}

/** Small pill badge for labels, proof, and status. */
export function Badge(props: BadgeProps): JSX.Element;
