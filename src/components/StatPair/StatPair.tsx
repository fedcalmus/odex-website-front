import { cx } from "@/lib/cx";
import styles from "./StatPair.module.scss";

export interface StatPairProps {
  /** The figure — always a whole number, never a range. */
  value: number | string;
  /** Tiny caps caption. Never used without the figure. */
  label: string;
  /** `small` is the 16px figure used for secondary stats (Figma "Stat pair" Small). */
  size?: "default" | "small";
  className?: string;
}

/**
 * Number over a 9px caps label (Figma 67:911). Markup is a description-list
 * entry — label then value, which is how it reads aloud — flipped visually so
 * the figure carries the weight. Render inside a `<dl>`.
 */
export function StatPair({ value, label, size = "default", className }: StatPairProps) {
  return (
    <div className={cx(styles.pair, size === "small" && styles.small, className)}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{value}</dd>
    </div>
  );
}
