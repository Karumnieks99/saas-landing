import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: string;
  /** Helper text rendered below. */
  hint?: string;
}

/** Labelled text input with a brand focus ring. */
export function Input(props: InputProps): JSX.Element;
