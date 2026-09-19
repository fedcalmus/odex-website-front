import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./Notice.module.scss";

export interface NoticeProps {
  children: string;
  /** `neutral` — quiet context. `info` — privacy and explanatory notes (the health-data disclosure at checkout). */
  tone?: "neutral" | "info";
  /** Defaults to the info glyph; the register notice uses the lock. */
  icon?: IconName;
  className?: string;
}

/**
 * Quiet context (Figma "Notice", Neutral): an info glyph and ONE line, annotating
 * the block it sits beside. Smaller than an alert, which announces a page
 * condition. If it needs a title AND a body, it's an alert.
 */
export function Notice({ children, tone = "neutral", icon = "info", className }: NoticeProps) {
  return (
    <p className={cx(styles.notice, tone === "info" && styles.info, className)}>
      <Icon name={icon} size={16} className={styles.icon} />
      <span>{children}</span>
    </p>
  );
}
