import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./RoutePoint.module.scss";

export type RoutePointType = "meeting" | "departure" | "return";

const TYPE: Record<RoutePointType, { icon: IconName; className: string }> = {
  meeting: { icon: "map-pin", className: styles.meeting },
  departure: { icon: "mountain", className: styles.departure },
  return: { icon: "navigation", className: styles.return },
};

export interface RoutePointProps {
  type: RoutePointType;
  /** Caps caption: "ՀԱՆԴԻՊՄԱՆ ՎԱՅՐ". */
  label: string;
  place: string;
  /** Local time, "06:00". */
  time: string;
  className?: string;
}

/** One stop on the route — meeting, trailhead, return (Figma "Route point"): coloured dot, place, time in lime. */
export function RoutePoint({ type, label, place, time, className }: RoutePointProps) {
  const config = TYPE[type];
  return (
    <div className={cx(styles.point, className)}>
      <span className={cx(styles.dot, config.className)} aria-hidden="true">
        <Icon name={config.icon} size={16} />
      </span>
      <div className={styles.text}>
        <p className={styles.label}>{label}</p>
        <p className={styles.place}>{place}</p>
      </div>
      <p className={styles.time}>{time}</p>
    </div>
  );
}
