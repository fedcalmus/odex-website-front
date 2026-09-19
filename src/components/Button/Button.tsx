import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-photo";
export type ButtonSize = "small" | "medium" | "large";

// Confirmed from the Button export: 16px icon at small/medium, 20px at large.
const ICON_SIZE: Record<ButtonSize, number> = {
  small: 16,
  medium: 16,
  large: 20,
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  small: styles.sm,
  medium: styles.md,
  large: styles.lg,
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  "on-photo": styles.onPhoto,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon glyph shown alongside the label. */
  icon?: IconName;
  /**
   * Where `icon` sits relative to the label. Mirrors Figma's Back (leading —
   * "go back") / Forward (trailing — "proceed") icon property.
   */
  iconPosition?: "leading" | "trailing";
  fullWidth?: boolean;
  /** Shows a spinner in place of `icon` and blocks interaction until it clears. */
  loading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "trailing",
  fullWidth,
  loading,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    fullWidth ? styles.fullWidth : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = loading ? (
    <Icon name="loader" size={ICON_SIZE[size]} className={styles.spinner} />
  ) : icon ? (
    <Icon name={icon} size={ICON_SIZE[size]} />
  ) : null;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {iconEl && iconPosition === "leading" ? iconEl : null}
      <span>{children}</span>
      {iconEl && iconPosition === "trailing" ? iconEl : null}
    </button>
  );
}
