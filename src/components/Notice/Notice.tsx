import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./Notice.module.scss";

export interface NoticeProps {
  children: string;
  /**
   * `neutral` — quiet context. `info` — privacy and explanatory notes (the
   * health-data disclosure at checkout). `warning` — a condition that needs
   * attention but isn't blocking (the under-18 guardian-consent note, the
   * required-emergency-contact note in the profile-completion flow).
   */
  tone?: "neutral" | "info" | "warning";
  /** Defaults to the info glyph (or the alert-triangle for `warning`); the register notice uses the lock. */
  icon?: IconName;
  className?: string;
}

const DEFAULT_ICON: Record<NonNullable<NoticeProps["tone"]>, IconName> = {
  neutral: "info",
  info: "info",
  warning: "alert-triangle",
};

/**
 * Quiet context (Figma "Notice", Neutral): an info glyph and ONE line, annotating
 * the block it sits beside. Smaller than an alert, which announces a page
 * condition. If it needs a title AND a body, it's an alert.
 */
export function Notice({ children, tone = "neutral", icon, className }: NoticeProps) {
  return (
    <p className={cx(styles.notice, tone === "info" && styles.info, tone === "warning" && styles.warning, className)}>
      <Icon name={icon ?? DEFAULT_ICON[tone]} size={16} className={styles.icon} />
      <span>{children}</span>
    </p>
  );
}
