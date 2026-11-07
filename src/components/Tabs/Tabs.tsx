import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./Tabs.module.scss";

export interface TabItem {
  key: string;
  href: string;
  label: string;
  /** Shown after the label: "Տոմսեր · 2". Omit for a tab with no count. */
  count?: number;
}

export interface TabsProps {
  items: readonly TabItem[];
  active: string;
  /** Accessible name for the nav landmark. */
  label: string;
  className?: string;
}

/**
 * Underline tab nav (the pattern behind `PlaceTabs`, generalised): white +
 * lime underline when active, muted otherwise. Real links, so every tab is a
 * real page and works without JS — used for the profile section's top nav
 * (Figma "Profile — MP-09") and the Clubs/People/Followers tabs on My
 * following.
 */
export function Tabs({ items, active, label, className }: TabsProps) {
  return (
    <nav aria-label={label} className={cx(styles.tabs, className)}>
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          aria-current={item.key === active ? "page" : undefined}
          className={cx(styles.tab, item.key === active && styles.active)}
        >
          {item.label}
          {item.count !== undefined ? <span className={styles.count}>{item.count}</span> : null}
        </Link>
      ))}
    </nav>
  );
}
