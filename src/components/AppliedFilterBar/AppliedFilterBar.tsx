import Link from "next/link";
import { FilterChip } from "@/components/Chip";
import { cx } from "@/lib/cx";
import styles from "./AppliedFilterBar.module.scss";

export interface AppliedFilter {
  /** Stable key, e.g. "activity:hiking". */
  key: string;
  label: string;
  /** The same list with only this filter removed. */
  href: string;
}

export interface AppliedFilterBarProps {
  resultCount: number;
  /** After the count: "արդյունք". */
  resultsLabel?: string;
  filters: AppliedFilter[];
  clearAllHref: string;
  clearAllLabel: string;
  removeLabel?: string;
  className?: string;
}

/**
 * "14 արդյունք · [Արշավ ×] [Սյունիք ×] … Մաքրել բոլորը" (Figma "Applied filter
 * bar"): what the list is showing and how to undo any part of it. The count is
 * a polite live region, so a screen-reader user hears the effect of a filter
 * change without hunting for it.
 */
export function AppliedFilterBar({
  resultCount,
  resultsLabel = "արդյունք",
  filters,
  clearAllHref,
  clearAllLabel,
  removeLabel,
  className,
}: AppliedFilterBarProps) {
  return (
    <div className={cx(styles.bar, className)}>
      <p className={styles.count} aria-live="polite">
        {resultCount} {resultsLabel}
      </p>
      {filters.map((filter) => (
        <FilterChip key={filter.key} label={filter.label} href={filter.href} removeLabel={removeLabel} />
      ))}
      {filters.length > 0 ? (
        <Link href={clearAllHref} scroll={false} className={styles.clear}>
          {clearAllLabel}
        </Link>
      ) : null}
    </div>
  );
}
