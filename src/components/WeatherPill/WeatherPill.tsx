import { WeatherDot } from "@/components/WeatherDot";
import type { WeatherCondition } from "@/components/WeatherDot";
import { cx } from "@/lib/cx";
import { formatShortDate } from "@/lib/format";
import styles from "./WeatherPill.module.scss";

export type { WeatherCondition };

export interface WeatherPillProps {
  condition: WeatherCondition;
  /** °C at the departure. */
  temperature: number;
  /** The written condition, e.g. "Պարզ" — the words carry the meaning, the dot is a hint. */
  conditionLabel: string;
  /** ISO date the forecast is for. Weather without a date is a guess. */
  date: string;
  className?: string;
}

/**
 * Forecast for the departure day (Figma 62:842). Dark at 82% so it doesn't
 * outshine the photo, a coloured dot rather than an icon (unreadable at 12px).
 * The caller omits the pill entirely when the forecast is unavailable — a
 * placeholder temperature is worse than none, because someone will pack for it.
 */
export function WeatherPill({
  condition,
  temperature,
  conditionLabel,
  date,
  className,
}: WeatherPillProps) {
  return (
    <span className={cx(styles.pill, className)}>
      <WeatherDot condition={condition} />
      <span>
        {temperature}° · {conditionLabel}
      </span>
      <time className={styles.date} dateTime={date}>
        {formatShortDate(date)}
      </time>
    </span>
  );
}
