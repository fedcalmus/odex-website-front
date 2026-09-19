import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
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

interface SharedButtonProps {
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
}

function buttonClasses({
  variant = "primary",
  size = "medium",
  fullWidth,
  className,
}: Pick<SharedButtonProps, "variant" | "size" | "fullWidth"> & { className?: string }) {
  return cx(
    styles.button,
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    fullWidth && styles.fullWidth,
    className,
  );
}

function ButtonContent({
  children,
  size = "medium",
  icon,
  iconPosition = "trailing",
  loading,
}: Pick<SharedButtonProps, "children" | "size" | "icon" | "iconPosition"> & { loading?: boolean }) {
  const iconEl = loading ? (
    <Icon name="loader" size={ICON_SIZE[size]} className={styles.spinner} />
  ) : icon ? (
    <Icon name={icon} size={ICON_SIZE[size]} />
  ) : null;

  return (
    <>
      {iconEl && iconPosition === "leading" ? iconEl : null}
      <span>{children}</span>
      {iconEl && iconPosition === "trailing" ? iconEl : null}
    </>
  );
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    SharedButtonProps {
  /** Shows a spinner in place of `icon` and blocks interaction until it clears. */
  loading?: boolean;
}

export function Button({
  children,
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  loading,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <ButtonContent size={size} icon={icon} iconPosition={iconPosition} loading={loading}>
        {children}
      </ButtonContent>
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, "children">,
    SharedButtonProps {}

/**
 * The same button, for actions that NAVIGATE. A link that looks like a button
 * must still be a link (right-click, open-in-new-tab, crawlable) — never a
 * `<button>` wired to `router.push`.
 */
export function ButtonLink({
  children,
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, fullWidth, className })} {...rest}>
      <ButtonContent size={size} icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </Link>
  );
}
