import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./StatCard.module.scss";

export interface StatCardProps {
  icon: IconName;
  /** Caps caption: "ԸՆԴԱՄԵՆ ՃԱՆԱՊԱՐԴ". */
  label: string;
  /** The figure, already formatted: "248 կմ". */
  value: string;
  className?: string;
}

/**
 * A bordered hero stat tile (Figma "Profile — MP-09" top row: distance /
 * ascent / completed / badges). Also reused in the My events sidebar, which
 * repeats the same four figures — one component, not two copies.
 */
export function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <div className={cx(styles.card, className)}>
      <Icon name={icon} size={20} className={styles.icon} />
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
