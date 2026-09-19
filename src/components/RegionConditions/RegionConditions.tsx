import Link from "next/link";
import { WeatherDot } from "@/components/WeatherDot";
import type { WeatherCondition } from "@/components/WeatherDot";
import { cx } from "@/lib/cx";
import styles from "./RegionConditions.module.scss";

export interface RegionCondition {
  slug: string;
  name: string;
  condition: WeatherCondition;
  temperature: number;
  conditionLabel: string;
  /** Events departing from this region in the current window. */
  count: number;
  /** The discovery list filtered to this region. */
  href: string;
}

export interface RegionConditionsProps {
  regions: RegionCondition[];
  /** Accessible name of the list: "Եղանակը մարզերում". */
  label: string;
  /** After the count: "միջոցառում". */
  eventsLabel?: string;
  className?: string;
}

/**
 * Today's conditions per region, with how many events depart from each
 * (Figma "Conditions" 194:16880) — answers "where is the weather good" before
 * "what should I book". Each cell filters the list to that region. Forecasts
 * are cached per region per day, never fetched per render.
 */
export function RegionConditions({
  regions,
  label,
  eventsLabel = "միջոցառում",
  className,
}: RegionConditionsProps) {
  return (
    <ul role="list" aria-label={label} className={cx(styles.strip, className)}>
      {regions.map((region) => (
        <li key={region.slug} className={styles.cell}>
          <Link href={region.href} className={styles.link}>
            <span className={styles.region}>
              <WeatherDot condition={region.condition} size={8} />
              {region.name}
            </span>
            <span className={styles.reading}>
              <span className={styles.temperature}>{region.temperature}°</span>
              <span className={styles.condition}>{region.conditionLabel}</span>
            </span>
            <span className={styles.count}>
              {region.count} {eventsLabel}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
