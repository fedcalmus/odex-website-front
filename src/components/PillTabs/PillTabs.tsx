import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./PillTabs.module.scss";

export interface PillTabItem {
  key: string;
  href: string;
  label: string;
  count?: number;
}

export interface PillTabsProps {
  items: readonly PillTabItem[];
  active: string;
  label: string;
  className?: string;
}

/**
 * Single-select pill filter, same chip visual language as `ChipToggleGroup`
 * but backed by real links (URL-driven, one value at a time) — the status
 * filters on My events ("Առաջիկա/Ավարտված/Չեղարկված") and Saved
 * ("Բոլորը/Առաջիկա/Անցած").
 */
export function PillTabs({ items, active, label, className }: PillTabsProps) {
  return (
    <div role="group" aria-label={label} className={cx(styles.group, className)}>
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          aria-current={item.key === active ? "page" : undefined}
          className={cx(styles.pill, item.key === active && styles.active)}
        >
          {item.label}
          {item.count !== undefined ? <span className={styles.count}>{item.count}</span> : null}
        </Link>
      ))}
    </div>
  );
}
