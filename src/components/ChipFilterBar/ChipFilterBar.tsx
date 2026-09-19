import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./ChipFilterBar.module.scss";

export interface ChipFilterItem {
  key: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface ChipFilterBarProps {
  items: ChipFilterItem[];
  /** Accessible name of the group: "Ուղղություն". */
  label: string;
  className?: string;
}

/**
 * A single-choice quick filter as a row of pills (Figma "Chips" on the clubs
 * page): "Բոլորը" lime when nothing is chosen, else the chosen activity. Links,
 * not buttons — each choice is a real URL, so it works without JS and is shareable.
 */
export function ChipFilterBar({ items, label, className }: ChipFilterBarProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul role="list" className={styles.list}>
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              scroll={false}
              aria-current={item.active ? "true" : undefined}
              className={cx(styles.chip, item.active && styles.active)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
