import * as React from "react";

export interface StarsProps {
  /** Filled stars out of 5. Default 5. */
  count?: number;
  /** Pixel size per star. Default 14. */
  size?: number;
  style?: React.CSSProperties;
}

/** Amber 5-star rating row. */
export function Stars(props: StarsProps): JSX.Element;
