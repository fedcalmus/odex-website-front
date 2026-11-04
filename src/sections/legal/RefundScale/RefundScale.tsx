import { Notice } from "@/components/Notice";
import { cx } from "@/lib/cx";
import styles from "./RefundScale.module.scss";

export interface RefundTier {
  /** "100%". */
  percent: string;
  /** "48+ ժ". */
  window: string;
  /** Green = full refund, amber = partial, red = none — matches the vocabulary already used by `CancellationPolicy`. */
  tone: "full" | "partial" | "none";
}

export interface RefundScaleCopy {
  /** Overline above the bar, e.g. "ՄԵԿՆՈՒՄԻՑ ԱՌԱՋ". */
  label: string;
  tiers: readonly RefundTier[];
  /** The always-100% carve-out note (club cancels / weather). */
  notice: string;
}

/**
 * The refund-tier gradient bar (Figma "Cancellation & refunds — MP-40"):
 * green→amber→red segments with a percent/time-window pair under each. The
 * bar itself is decorative — the `<dl>` beneath it already states the same
 * tiers as text, so screen readers get the real content once, not twice.
 */
export function RefundScale({ copy }: { copy: RefundScaleCopy }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{copy.label}</p>

      <div className={styles.bar} aria-hidden="true">
        {copy.tiers.map((tier) => (
          <span key={tier.window} className={cx(styles.segment, styles[tier.tone])} />
        ))}
      </div>

      <dl className={styles.tiers}>
        {copy.tiers.map((tier) => (
          <div key={tier.window} className={styles.tier}>
            <dt className={styles.percent}>{tier.percent}</dt>
            <dd className={styles.window}>{tier.window}</dd>
          </div>
        ))}
      </dl>

      <Notice tone="info" icon="lock" className={styles.notice}>
        {copy.notice}
      </Notice>
    </div>
  );
}
