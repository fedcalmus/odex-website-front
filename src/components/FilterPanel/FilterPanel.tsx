"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { Checkbox } from "@/components/Checkbox";
import { Icon } from "@/components/Icon";
import { PriceRange } from "@/components/PriceRange";
import { discoveryHref, PRICE_MAX, PRICE_STEP } from "@/lib/discovery-params";
import type { DiscoveryParams } from "@/lib/discovery-params";
import { formatPrice } from "@/lib/format";
import { cx } from "@/lib/cx";
import styles from "./FilterPanel.module.scss";

export interface FilterPanelLabels {
  title: string;
  clear: string;
  activity: string;
  price: string;
  /** Prefix of the price cap: "մինչև". */
  priceUpTo: string;
}

export interface FilterPanelProps {
  /** Current filters — the URL, parsed on the server. */
  params: DiscoveryParams;
  /** One row per activity group, with how many events it would show. */
  activities: Array<{ slug: string; title: string; count: number }>;
  /** Where "clear" goes: the same list with every filter dropped. */
  clearHref: string;
  labels: FilterPanelLabels;
  className?: string;
}

/**
 * Filter sidebar (Figma "Filter panel", Sidebar layout): a "Զտիչներ / Մաքրել"
 * header, then collapsible groups — activity checkboxes with live counts, and a
 * price cap.
 *
 * There is no Apply button in the design: ticking a box applies it. The
 * choice is written to the URL (`router.replace`, so filtering doesn't stack
 * up history entries) and the SERVER re-renders the list; `useOptimistic`
 * makes the control respond instantly while it does.
 */
export function FilterPanel({ params, activities, clearHref, labels, className }: FilterPanelProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(params);

  const apply = (patch: Partial<DiscoveryParams>) => {
    const next = { ...current, ...patch };
    startTransition(() => {
      setCurrent(next);
      router.replace(discoveryHref(next), { scroll: false });
    });
  };

  const toggleActivity = (slug: string) =>
    apply({
      activity: current.activity.includes(slug)
        ? current.activity.filter((entry) => entry !== slug)
        : [...current.activity, slug],
    });

  return (
    <section aria-label={labels.title} className={cx(styles.panel, className)}>
      <header className={styles.header}>
        <h2 className={styles.title}>{labels.title}</h2>
        <Link href={clearHref} scroll={false} className={styles.clear}>
          {labels.clear}
        </Link>
      </header>

      <details open className={styles.group}>
        <summary className={styles.summary}>
          <span className={styles.groupTitle}>{labels.activity}</span>
          <Icon name="chevron-up" size={16} className={styles.chevron} />
        </summary>
        <ul role="list" className={styles.options}>
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Checkbox
                size="small"
                label={activity.title}
                meta={activity.count}
                checked={current.activity.includes(activity.slug)}
                onChange={() => toggleActivity(activity.slug)}
              />
            </li>
          ))}
        </ul>
      </details>

      <details open className={styles.group}>
        <summary className={styles.summary}>
          <span className={styles.groupTitle}>{labels.price}</span>
          <Icon name="chevron-up" size={16} className={styles.chevron} />
        </summary>
        <PriceRange
          label={labels.price}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={current.maxPrice ?? PRICE_MAX}
          format={(value) => `${labels.priceUpTo} ${formatPrice(value)}`}
          onCommit={(value) => apply({ maxPrice: value >= PRICE_MAX ? null : value })}
        />
      </details>
    </section>
  );
}
