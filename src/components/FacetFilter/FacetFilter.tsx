"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { Checkbox } from "@/components/Checkbox";
import { cx } from "@/lib/cx";
import styles from "./FacetFilter.module.scss";

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface FacetFilterProps {
  /** "Մարզ" */
  title: string;
  /** Query parameter the selection is written to (repeated once per choice). */
  name: string;
  options: FacetOption[];
  selected: string[];
  /** Page and current query string (no "?") — the change keeps every other parameter. */
  pathname: string;
  query: string;
  /** Parameters dropped on change, e.g. paging: a new filter should start from page one. */
  resetParams?: string[];
  className?: string;
}

/**
 * A titled group of checkboxes with counts (Figma "Regions" card on the clubs
 * page). Ticking applies immediately — no Apply button — by writing the choice
 * to the URL; the server re-renders the list, and `useOptimistic` makes the
 * box respond instantly meanwhile.
 */
export function FacetFilter({
  title,
  name,
  options,
  selected,
  pathname,
  query,
  resetParams = ["limit"],
  className,
}: FacetFilterProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(selected);

  const toggle = (value: string) => {
    const next = current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];
    const search = new URLSearchParams(query);
    search.delete(name);
    resetParams.forEach((param) => search.delete(param));
    next.forEach((entry) => search.append(name, entry));
    const nextQuery = search.toString();
    startTransition(() => {
      setCurrent(next);
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    });
  };

  return (
    <fieldset className={cx(styles.facet, className)}>
      <legend className={styles.title}>{title}</legend>
      <ul role="list" className={styles.options}>
        {options.map((option) => (
          <li key={option.value}>
            <Checkbox
              size="small"
              label={option.label}
              meta={option.count}
              checked={current.includes(option.value)}
              onChange={() => toggle(option.value)}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
