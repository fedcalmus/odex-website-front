import { getAvailability } from "@/lib/capacity";
import { cx } from "@/lib/cx";
import styles from "./CapacityBar.module.scss";

export interface CapacityBarProps {
  taken: number;
  total: number;
  /** Caption after "12 / 16". Override for another locale. */
  takenLabel?: string;
  /** Already formatted, e.g. "12 000 ֏" — see `formatPrice`. */
  price: string;
  className?: string;
}

/**
 * Participant-facing scarcity signal, paired with the price (Figma 62:878).
 * Distinct from any admin capacity control: it shows how FULL an event is, and
 * turns to the accent at the same threshold the scarcity badge appears.
 */
export function CapacityBar({
  taken,
  total,
  takenLabel = "տեղ զբաղված",
  price,
  className,
}: CapacityBarProps) {
  const { ratio, soldOut, scarce } = getAvailability(taken, total);

  return (
    <div className={cx(styles.capacity, className)}>
      {/* Decorative: the count beneath says the same thing in words. */}
      <div className={styles.track} aria-hidden="true">
        <div
          className={cx(styles.fill, (scarce || soldOut) && styles.accent)}
          style={{ width: `${Math.round(ratio * 100)}%` }}
        />
      </div>
      <div className={styles.row}>
        <p className={styles.count}>
          {taken} / {total} {takenLabel}
        </p>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}
