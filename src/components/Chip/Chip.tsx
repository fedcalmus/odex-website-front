import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./Chip.module.scss";

export interface ChipProps {
  children: ReactNode;
  className?: string;
}

/** A static, non-interactive chip — the gear checklist (Figma "Detail block · Gear" items). */
export function Chip({ children, className }: ChipProps) {
  return <span className={cx(styles.chip, className)}>{children}</span>;
}

export interface FilterChipProps {
  /** What is applied, e.g. "Արշավ". */
  label: string;
  /** Where removing it goes — the same list with this one filter dropped. A link, so it works without JS. */
  href: string;
  /** Prefix of the accessible name: "Հեռացնել Արշավ". */
  removeLabel?: string;
  className?: string;
}

/** An applied filter (Figma "AppliedFilterBar" chip): its label, and an × that removes it. */
export function FilterChip({ label, href, removeLabel = "Հեռացնել", className }: FilterChipProps) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-label={`${removeLabel} ${label}`}
      className={cx(styles.chip, styles.filter, className)}
    >
      <span>{label}</span>
      <Icon name="x" size={16} className={styles.remove} />
    </Link>
  );
}
