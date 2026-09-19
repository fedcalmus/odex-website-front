import { useId } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SafetyAssurances.module.scss";

export interface SafetyAssurance {
  icon: IconName;
  title: string;
  description: string;
}

export interface SafetyAssurancesProps {
  title: string;
  items: SafetyAssurance[];
  className?: string;
}

/** "Ինչ է ապահովում Odex-ը" — what the platform guarantees on every event (Figma "Safety"): live tracking, emergency line, verified club. */
export function SafetyAssurances({ title, items, className }: SafetyAssurancesProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={cx(styles.safety, className)}>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      <ul role="list" className={styles.list}>
        {items.map((item) => (
          <li key={item.title} className={styles.item}>
            <Icon name={item.icon} size={16} className={styles.icon} />
            <div className={styles.text}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
