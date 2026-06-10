import * as React from "react";

export interface AvatarProps {
  /** 1–2 letter monogram. */
  initials?: string;
  /** Named palette hue or any CSS color. */
  color?: "indigo" | "rose" | "amber" | "emerald" | string;
  size?: "sm" | "md" | "lg";
  /** White ring + shadow, for use inside an AvatarStack. */
  ring?: boolean;
  style?: React.CSSProperties;
}

export interface AvatarStackProps {
  people: { initials: string; color?: string }[];
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

/** Initials avatar circle. */
export function Avatar(props: AvatarProps): JSX.Element;
export function AvatarStack(props: AvatarStackProps): JSX.Element;
