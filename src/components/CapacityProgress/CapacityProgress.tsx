import { Icon } from "@/components/Icon";
import { getAvailability } from "@/lib/capacity";
import { cx } from "@/lib/cx";
import styles from "./CapacityProgress.module.scss";

export interface CapacityProgressProps {
  taken: number;
  total: number;
  /** Suffix after the remaining count: "տեղ մնացել". */
  leftLabel?: string;
  className?: string;
}

/**
 * Detail-page capacity (Figma "Capacity progress" 27:1001): "16/18 ⏱ 2 տեղ
 * մնացել" over an 8px bar. Chunkier than the card's 4px bar because here it
 * is the main thing being read. Turns to the accent at the same "scarce"
 * threshold as the badge and the card bar — one definition (`lib/capacity`).
 */
export function CapacityProgress({ taken, total, leftLabel = "տեղ մնացել", className }: CapacityProgressProps) {
  const { remaining, ratio, scarce, soldOut } = getAvailability(taken, total);
  const alert = scarce || soldOut;

  return (
    <div className={cx(styles.progress, className)}>
      <div className={styles.row}>
        <span className={cx(styles.count, alert && styles.alert)}>
          {taken}/{total}
        </span>
        {!soldOut ? (
          <>
            {alert ? <Icon name="clock" size={16} className={styles.alert} /> : null}
            <span className={styles.left}>
              {remaining} {leftLabel}
            </span>
          </>
        ) : null}
      </div>
      <div className={styles.track} aria-hidden="true">
        <div className={cx(styles.fill, alert && styles.fillAlert)} style={{ width: `${Math.round(ratio * 100)}%` }} />
      </div>
    </div>
  );
}
