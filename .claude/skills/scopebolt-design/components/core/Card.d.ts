import * as React from "react";

export interface CardProps {
  children: React.ReactNode;
  /** `light` = white panel (default), `dark` = zinc-950 ground, `feature` = translucent white-on-dark tile. */
  variant?: "light" | "dark" | "feature";
  /** Enable the hover lift / brighten. Default true. */
  hover?: boolean;
  style?: React.CSSProperties;
}

/** Rounded surface card. */
export function Card(props: CardProps): JSX.Element;
