"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SortSelect.module.scss";

export interface SortSelectProps {
  /** Page the sort applies to, e.g. "/events" or "/clubs". */
  pathname: string;
  /** The current query string (no leading "?") — sorting keeps every other parameter. */
  query: string;
  /** Query parameter the choice is written to. */
  name?: string;
  /** The option that is the default; it is left OUT of the URL so equivalent states share one address. */
  defaultValue: string;
  /** Current choice. */
  value: string;
  options: Array<{ value: string; label: string }>;
  /** "Դասավորել՝" */
  label: string;
  className?: string;
}

/**
 * Sort control (Figma "Sort" trigger, 48px pill): "Դասավորել՝ Ամենամոտը ⌄".
 * A native `<select>` inside the pill — the platform picker on phones, full
 * keyboard and screen-reader support for free — that writes `?sort=` to the URL.
 * Generic over the page: it only needs the path, the query and the options.
 */
export function SortSelect({
  pathname,
  query,
  name = "sort",
  defaultValue,
  value,
  options,
  label,
  className,
}: SortSelectProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(value);

  return (
    <label className={cx(styles.sort, className)}>
      <span className={styles.label}>{label}</span>
      <select
        className={styles.select}
        value={current}
        onChange={(event) => {
          const next = event.target.value;
          const search = new URLSearchParams(query);
          if (next === defaultValue) search.delete(name);
          else search.set(name, next);
          const nextQuery = search.toString();
          startTransition(() => {
            setCurrent(next);
            router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
          });
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" size={20} className={styles.chevron} />
    </label>
  );
}
