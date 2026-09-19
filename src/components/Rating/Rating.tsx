import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import { formatDecimal } from "@/lib/format";
import styles from "./Rating.module.scss";

export interface RatingProps {
  /** 0–5. */
  value: number;
  /** Number of reviews. */
  count: number;
  /** Word after the count: "կարծիք". */
  reviewsLabel?: string;
  className?: string;
}

/** Star, score and review count: "★ 4,9 · 128 կարծիք" (Figma "Rating"). */
export function Rating({ value, count, reviewsLabel = "կարծիք", className }: RatingProps) {
  return (
    <span className={cx(styles.rating, className)}>
      <Icon name="star-filled" size={16} className={styles.star} />
      <span>
        {formatDecimal(value)} · {count} {reviewsLabel}
      </span>
    </span>
  );
}
