import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.scss";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Any valid CSS color. Falls back to --color-surface-2 when omitted. */
  background?: string;
  /** Any valid CSS color. Falls back to --color-text-primary when omitted. */
  color?: string;
  /**
   * `small` is the 12px label used for the scarcity badges over photography
   * (Figma "Scarcity badge"); `default` is the 13px Medium label.
   */
  size?: "default" | "small";
}

export function Badge({
  children,
  background,
  color,
  size = "default",
  className,
  style,
  ...rest
}: BadgeProps) {
  const classes = [styles.badge, size === "small" ? styles.small : null, className]
    .filter(Boolean)
    .join(" ");

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
