import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./ClubStats.module.scss";

export interface ClubStat {
  icon: IconName;
  /** The figure — a whole number, or a rating like "4,9". */
  value: string;
  /** Caps caption: "ԱՌԱՋԻԿԱ ՄԻՋՈՑԱՌՈՒՄ". */
  label: string;
  /** Paint the icon in the accent (the rating star). */
  accent?: boolean;
}

export interface ClubStatsProps {
  stats: ClubStat[];
  className?: string;
}

/**
 * The five numbers a participant compares between clubs (Figma "Stats"): events,
 * guides, trips run, rating, and how long they've been verified. A description
 * list — caption, then value — flipped visually so the figure leads.
 */
export function ClubStats({ stats, className }: ClubStatsProps) {
  return (
    <dl className={cx(styles.stats, className)}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.cell}>
          <dt className={styles.label}>{stat.label}</dt>
          <dd className={styles.value}>
            <Icon name={stat.icon} size={16} className={cx(styles.icon, stat.accent && styles.accent)} />
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
