import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./CarouselRow.module.scss";

export interface CarouselRowProps {
  /** Accessible name of the list, e.g. "Ուղեցույց". */
  label: string;
  /**
   * `primary` — the track starts at the left edge. `staggered` — shifted 146px
   * left so two stacked rows don't line up; the offset is what makes the band
   * read as one continuous surface rather than a grid. Hidden below md, where
   * the band is a single row.
   */
  variant?: "primary" | "staggered";
  /** `<li>` cards. */
  children: ReactNode;
}

/**
 * One row of the Guide band (Figma "Carousel row" 92:3538): a full-bleed,
 * clipped container holding a wider track of fixed-width cards. The track
 * running off both edges IS the affordance — no dots, no arrows. It scrolls
 * natively (touch, trackpad, shift-wheel, keyboard focus) with gentle
 * scroll-snap; it does not auto-drift, because a band that moves while
 * someone reads a title is worse than a still one.
 */
export function CarouselRow({ label, variant = "primary", children }: CarouselRowProps) {
  return (
    <div className={cx(styles.row, variant === "staggered" && styles.staggered)}>
      <ul role="list" aria-label={label} className={styles.track}>
        {children}
      </ul>
    </div>
  );
}
