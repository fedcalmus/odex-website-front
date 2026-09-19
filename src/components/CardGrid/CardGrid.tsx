import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./CardGrid.module.scss";

export interface CardGridProps {
  /**
   * `3` — event cards (1 → 2 → 3 across). `4` — club and difficulty cards
   * (1 → 2 → 4). `strip` — the seven activity tiles: a swipeable row until
   * there's room for all seven across. `results` — discovery cards beside
   * the filter sidebar (1 → 2 → 3). `list` — a single column.
   */
  columns: 3 | 4 | "strip" | "results" | "list";
  /** `<li>` items. */
  children: ReactNode;
  className?: string;
}

const COLUMNS_CLASS: Record<CardGridProps["columns"], string> = {
  3: styles.cols3,
  4: styles.cols4,
  strip: styles.strip,
  results: styles.results,
  list: styles.list,
};

/** A list of cards laid out on the homepage grid (20px gap everywhere in Figma). */
export function CardGrid({ columns, children, className }: CardGridProps) {
  // role="list": Safari/VoiceOver drops list semantics from a `list-style: none` list.
  return (
    <ul role="list" className={cx(styles.grid, COLUMNS_CLASS[columns], className)}>
      {children}
    </ul>
  );
}
