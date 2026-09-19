import { cx } from "@/lib/cx";
import styles from "./Wordmark.module.scss";

export interface WordmarkProps {
  className?: string;
}

/**
 * "ODex" with the OUTDOOR / EXPERIENCE tagline stacked beside it — the brand
 * mark until a logo exists (Figma 286:1649). Wrap it in a link where it
 * should navigate; it renders as plain text otherwise (footer).
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span className={cx(styles.wordmark, className)}>
      <span className={styles.name}>ODex</span>
      <span className={styles.tagline}>
        <span>Outdoor</span>
        <span>Experience</span>
      </span>
    </span>
  );
}
