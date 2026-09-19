import { cx } from "@/lib/cx";
import styles from "./DayHeader.module.scss";

export interface DayHeaderProps {
  /** Day of the month: "12". */
  day: string;
  /** Three-letter caps weekday: "ՈՒՐ". */
  weekdayShort: string;
  /** "Ուրբաթ, 12 սեպտեմբեր". */
  label: string;
  /** "3 մեկնում · ամենավաղը 05:30". */
  summary: string;
  /** Id of the heading, so the day's list can be `aria-labelledby` it. */
  id?: string;
  className?: string;
}

/** Heading of one day's departures (Figma "Day header"): date tile, "Ուրբաթ, 12 սեպտեմբեր", how many and the earliest, then a rule. */
export function DayHeader({ day, weekdayShort, label, summary, id, className }: DayHeaderProps) {
  return (
    <header className={cx(styles.header, className)}>
      <span className={styles.date} aria-hidden="true">
        <span className={styles.day}>{day}</span>
        <span className={styles.weekday}>{weekdayShort}</span>
      </span>
      <div className={styles.label}>
        <h2 id={id} className={styles.title}>
          {label}
        </h2>
        <p className={styles.summary}>{summary}</p>
      </div>
      <span className={styles.rule} aria-hidden="true" />
    </header>
  );
}
