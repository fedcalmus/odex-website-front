import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./IncludedExcludedList.module.scss";

export interface IncludedExcludedListProps {
  includedTitle: string;
  included: string[];
  excludedTitle: string;
  excluded: string[];
  className?: string;
}

/**
 * What the price covers and what it doesn't, side by side (Figma "Included /
 * excluded list", Two column). Colour is never the only channel: green ✓ and
 * red ✗ glyphs sit alongside the words and the column titles.
 */
export function IncludedExcludedList({
  includedTitle,
  included,
  excludedTitle,
  excluded,
  className,
}: IncludedExcludedListProps) {
  return (
    <div className={cx(styles.list, className)}>
      <div className={styles.column}>
        <h3 className={cx(styles.title, styles.includedTitle)}>{includedTitle}</h3>
        <ul role="list" className={styles.items}>
          {included.map((item) => (
            <li key={item} className={styles.item}>
              <Icon name="check" size={16} className={styles.included} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <h3 className={cx(styles.title, styles.excludedTitle)}>{excludedTitle}</h3>
        <ul role="list" className={styles.items}>
          {excluded.map((item) => (
            <li key={item} className={styles.item}>
              <Icon name="x" size={16} className={styles.excluded} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
