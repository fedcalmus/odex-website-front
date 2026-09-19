import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.scss";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Any valid CSS color. Falls back to --color-surface-2 when omitted. */
  background?: string;
  /** Any valid CSS color. Falls back to --color-text-primary when omitted. */
  color?: string;
}

export function Badge({ children, background, color, className, style, ...rest }: BadgeProps) {
  const classes = className ? `${styles.badge} ${className}` : styles.badge;

  return (
    <span
      className={classes}
      style={{ backgroundColor: background, color, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}
