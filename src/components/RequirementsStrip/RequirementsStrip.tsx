import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./RequirementsStrip.module.scss";

export interface Requirement {
  icon: IconName;
  /** Caps caption: "ՏԱՐԻՔ". */
  label: string;
  value: string;
}

export interface RequirementsStripProps {
  requirements: Requirement[];
  className?: string;
}

/** Who this is for — age, experience, fitness (Figma "Requirements strip"). Read before booking, so it sits right under the key facts. */
export function RequirementsStrip({ requirements, className }: RequirementsStripProps) {
  return (
    <dl className={cx(styles.strip, className)}>
      {requirements.map((requirement) => (
        <div key={requirement.label} className={styles.item}>
          <Icon name={requirement.icon} size={20} className={styles.icon} />
          <div className={styles.text}>
            <dt className={styles.label}>{requirement.label}</dt>
            <dd className={styles.value}>{requirement.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
