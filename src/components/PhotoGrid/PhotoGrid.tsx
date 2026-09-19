import Image from "next/image";
import type { ImageProps } from "next/image";
import { cx } from "@/lib/cx";
import styles from "./PhotoGrid.module.scss";

export interface PhotoGridProps {
  photos: Array<{ src: ImageProps["src"]; alt?: string }>;
  className?: string;
}

/**
 * A row of participant photos (Figma "Gallery" grid): five equal 150px tiles,
 * radius 12, 14px apart. Below md they become a swipeable strip — five tiles
 * don't fit a phone. Alt text is optional: participant photos are decorative
 * unless someone captions them.
 */
export function PhotoGrid({ photos, className }: PhotoGridProps) {
  return (
    <ul role="list" className={cx(styles.grid, className)}>
      {photos.map((photo, index) => (
        <li key={index} className={styles.tile}>
          <Image
            src={photo.src}
            alt={photo.alt ?? ""}
            fill
            sizes="(min-width: 768px) 20vw, 60vw"
            className={styles.image}
          />
        </li>
      ))}
    </ul>
  );
}
