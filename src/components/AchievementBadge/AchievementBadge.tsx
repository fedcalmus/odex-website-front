import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./AchievementBadge.module.scss";

export interface AchievementBadgeProps {
  icon: IconName;
  label: string;
  /** 0–1. 1 = earned (full lime ring); 0 = locked (dim, dashed ring). */
  progress: number;
  className?: string;
}

const SIZE = 64;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * One "Բեյջեր" ring (Figma "Profile — MP-09"): an icon inside a circular
 * progress ring, label below. Earned badges ring fully in lime; untouched
 * ones sit at 0% and read as locked — there is no in-between state in the
 * mock beyond the ring fraction itself.
 */
export function AchievementBadge({ icon, label, progress, className }: AchievementBadgeProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const earned = clamped >= 1;
  const offset = CIRCUMFERENCE * (1 - clamped);

  return (
    <div className={cx(styles.badge, earned && styles.earned, className)}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" className={styles.ring}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          className={styles.track}
          fill="none"
        />
        {clamped > 0 ? (
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            className={styles.fill}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        ) : null}
        <foreignObject x={0} y={0} width={SIZE} height={SIZE}>
          <div className={styles.iconWrap}>
            <Icon name={icon} size={22} />
          </div>
        </foreignObject>
      </svg>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
