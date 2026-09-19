import { cx } from "@/lib/cx";
import styles from "./LiveStatusPanel.module.scss";

export interface LiveStatusPanelProps {
  /** Caps eyebrow beside the live dot, e.g. "ՀԻՄԱ ՈՒՂՈՒ ՎՐԱ". */
  eyebrow: string;
  /** Groups on the mountain right now. */
  count: number;
  countLabel: string;
  /** Participants and signal age — the timestamp is what makes the count credible. */
  details: string;
  /** Who can see the tracking. MANDATORY: advertising tracking without naming the audience is a liability. */
  privacyNote: string;
  className?: string;
}

/**
 * Hero live-status panel (Figma "Hero live status" 71:910) — the platform's
 * differentiator stated as a live fact: right now, N groups are on a mountain
 * and the platform knows where they are.
 *
 * MUST be fed from real data before launch. A frozen figure is worse than no
 * panel — it turns the product's core claim into a lie. The zero state should
 * be shown honestly (with the next departure), not hidden; that copy is still
 * to be designed.
 */
export function LiveStatusPanel({
  eyebrow,
  count,
  countLabel,
  details,
  privacyNote,
  className,
}: LiveStatusPanelProps) {
  return (
    <div className={cx(styles.panel, className)}>
      <p className={styles.eyebrow}>
        <span className={styles.dot} aria-hidden="true" />
        {eyebrow}
      </p>
      <p className={styles.count}>
        <span className={styles.figure}>{count}</span>
        <span className={styles.countLabel}>{countLabel}</span>
      </p>
      <p className={styles.details}>{details}</p>
      <p className={styles.privacy}>{privacyNote}</p>
    </div>
  );
}
