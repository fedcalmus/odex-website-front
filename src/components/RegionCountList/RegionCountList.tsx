import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./RegionCountList.module.scss";

export interface RegionCount {
  slug: string;
  name: string;
  count: number;
  /** The event list filtered to this region and club. */
  href: string;
}

export interface RegionCountListProps {
  regions: RegionCount[];
  className?: string;
}

/** Where a club goes, with how many of its departures head there (Figma "Regions" in the profile rail). Each row opens that filtered list. */
export function RegionCountList({ regions, className }: RegionCountListProps) {
  return (
    <ul role="list" className={cx(styles.list, className)}>
      {regions.map((region) => (
        <li key={region.slug}>
          <Link href={region.href} className={styles.row}>
            <Icon name="map-pin" size={16} className={styles.pin} />
            <span className={styles.name}>{region.name}</span>
            <span className={styles.count}>{region.count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
