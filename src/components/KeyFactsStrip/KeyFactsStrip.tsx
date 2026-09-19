import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./KeyFactsStrip.module.scss";

export interface KeyFact {
  icon: IconName;
  /** Lowercase caption: "երթուղի". */
  label: string;
  /** Already formatted: "14 կմ". */
  value: string;
}

export interface KeyFactsStripProps {
  facts: KeyFact[];
  className?: string;
}

/**
 * The four numbers a participant weighs first — distance, ascent, duration,
 * group size (Figma "Key facts strip" 4-up). A description list: label, then value.
 */
export function KeyFactsStrip({ facts, className }: KeyFactsStripProps) {
  return (
    <dl className={cx(styles.strip, className)}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <dt className={styles.label}>
            <Icon name={fact.icon} size={16} />
            {fact.label}
          </dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
