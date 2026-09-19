import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import styles from "./ActivityTile.module.scss";

export interface ActivityTileProps {
  /** Activity group name, e.g. "Արշավ". */
  title: string;
  /** Number of live events in the group. A group with none renders nothing. */
  count: number;
  /** Unit shown after the count. Override for another locale. */
  countUnit?: string;
  /** Discovery page pre-filtered by this activity group. */
  href: string;
  /** Cover photo — a path/URL or a static import. Cropped to the portrait frame. */
  image: ImageProps["src"];
  /**
   * `sizes` hint for next/image. Defaults to the desktop homepage row
   * (seven tiles at ~177px) and roughly two-up below that.
   */
  sizes?: string;
  /** Set on tiles that are visible without scrolling (LCP). */
  priority?: boolean;
  className?: string;
}

/**
 * Portrait activity tile from the homepage (Figma "Activity tile" 63:944):
 * 177×400 at the 1358px row width, seven across with a 20px gap. It fills its
 * container's width and keeps the 177:400 ratio, so the grid decides the size.
 */
export function ActivityTile({
  title,
  count,
  countUnit = "միջոցառում",
  href,
  image,
  sizes = "(min-width: 1200px) 177px, 45vw",
  priority,
  className,
}: ActivityTileProps) {
  // A group with zero events is HIDDEN, not shown at 0 — an empty category on
  // the homepage says the platform is empty. (`!(count > 0)` also drops NaN.)
  if (!(count > 0)) return null;

  return (
    <Link href={href} className={className ? `${styles.tile} ${className}` : styles.tile}>
      {/* Decorative: the link text below already names the group. */}
      <Image src={image} alt="" fill sizes={sizes} priority={priority} className={styles.image} />
      <span className={styles.scrim} aria-hidden="true" />
      <span className={styles.caption}>
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>
          {count} {countUnit}
        </span>
      </span>
    </Link>
  );
}
