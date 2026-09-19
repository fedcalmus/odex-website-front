import { cx } from "@/lib/cx";
import styles from "./WeatherDot.module.scss";

export type WeatherCondition = "clear" | "cloud" | "rain" | "snow" | "wind";

const CONDITION_CLASS: Record<WeatherCondition, string> = {
  clear: styles.clear,
  cloud: styles.cloud,
  rain: styles.rain,
  snow: styles.snow,
  wind: styles.wind,
};

export interface WeatherDotProps {
  condition: WeatherCondition;
  /** Diameter in px. Figma: 12 on the weather pill, 8 on the region strip. */
  size?: number;
  className?: string;
}

/**
 * The coloured dot that hints at the weather: amber = clear, grey = cloud,
 * blue = rain, white = snow, mint = wind. A hint only — the written condition
 * always sits beside it, so it is decorative (`aria-hidden`).
 */
export function WeatherDot({ condition, size = 12, className }: WeatherDotProps) {
  return (
    <span
      className={cx(styles.dot, CONDITION_CLASS[condition], className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
