import { Icon } from "@/components/Icon";
import { StarRow } from "@/components/StarRow";
import type { EventReviewSummary } from "@/data/events";
import { formatDecimal } from "@/lib/format";
import styles from "./ReviewSummary.module.scss";

export interface ReviewSummaryCopy {
  ratingsLabel: string;
  reviewsLabel: string;
}

const STARS = [5, 4, 3, 2, 1] as const;

/** The score card at the top of "Կարծիքներ" (Figma "Event detail - MP-03 (1)"): big average, 5-star distribution, per-aspect averages. */
export function ReviewSummary({ summary, copy }: { summary: EventReviewSummary; copy: ReviewSummaryCopy }) {
  const average = formatDecimal(summary.average);

  return (
    <div className={styles.card}>
      <div className={styles.score}>
        <p className={styles.value}>{average}</p>
        <StarRow value={summary.average} label={`${average} / 5`} size={18} />
        <p className={styles.count}>
          {summary.totalRatings} {copy.ratingsLabel} · {summary.totalReviews} {copy.reviewsLabel}
        </p>
      </div>

      <dl className={styles.distribution}>
        {STARS.map((star) => (
          <div key={star} className={styles.distributionRow}>
            <dt>{star}</dt>
            <div className={styles.bar}>
              <span style={{ width: `${summary.distribution[star]}%` }} className={styles.barFill} aria-hidden="true" />
            </div>
            <dd>{summary.distribution[star]}%</dd>
          </div>
        ))}
      </dl>

      <dl className={styles.aspects}>
        {summary.aspects.map((aspect) => (
          <div key={aspect.label} className={styles.aspectRow}>
            <dt>{aspect.label}</dt>
            <dd>
              <Icon name="star-filled" size={14} className={styles.aspectStar} />
              {formatDecimal(aspect.value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
