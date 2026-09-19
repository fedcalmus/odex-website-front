import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./ViewToggle.module.scss";

export type ViewMode = "grid" | "list";

export interface ViewToggleProps {
  value: ViewMode;
  /** Where each mode goes — same filters, different view. Links, so it works without JS and is shareable. */
  hrefs: Record<ViewMode, string>;
  /** Accessible names of the group and of each mode. */
  labels: { group: string; grid: string; list: string };
  className?: string;
}

/** Grid / list switch (Figma "View"): two 40px segments in a rounded track; the active one is lime. */
export function ViewToggle({ value, hrefs, labels, className }: ViewToggleProps) {
  return (
    <nav aria-label={labels.group} className={cx(styles.toggle, className)}>
      {(["grid", "list"] as const).map((mode) => (
        <Link
          key={mode}
          href={hrefs[mode]}
          scroll={false}
          aria-label={labels[mode]}
          aria-current={value === mode ? "true" : undefined}
          className={cx(styles.option, value === mode && styles.active)}
        >
          <Icon name={mode} size={20} />
        </Link>
      ))}
    </nav>
  );
}
