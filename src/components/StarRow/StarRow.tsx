import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./StarRow.module.scss";

export interface StarRowProps {
  /** 0–5. Rounded to the nearest whole star — the icon set has no half-star glyph. */
  value: number;
  /** Accessible name, e.g. "Գնահատականը՝ 5 աստղից 5". Omit only when a visible label already states the number. */
  label?: string;
  size?: number;
  className?: string;
}

/** Five stars, filled up to the rounded rating (Figma "Reviews" — MP-03). */
export function StarRow({ value, label, size = 16, className }: StarRowProps) {
  const filled = Math.round(Math.min(5, Math.max(0, value)));

  return (
    <span role="img" aria-label={label} className={cx(styles.row, className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name={index < filled ? "star-filled" : "star"} size={size} aria-hidden="true" />
      ))}
    </span>
  );
}
