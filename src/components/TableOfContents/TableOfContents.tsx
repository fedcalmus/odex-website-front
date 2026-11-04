"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./TableOfContents.module.scss";

export interface TableOfContentsItem {
  /** Must match the `id` of a heading in the page content. */
  id: string;
  label: string;
}

export interface TableOfContentsProps {
  items: readonly TableOfContentsItem[];
  /** Accessible name of the navigation landmark. */
  label: string;
  /** Optional overline printed above the list, e.g. "ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ" (Figma "Cookie policy — MP-39"). */
  heading?: string;
  className?: string;
}

/**
 * Sticky "on this page" jump nav for long-form content (Figma "Terms —
 * MP-22"). Tracks scroll position with an IntersectionObserver and
 * highlights whichever section heading is currently under the sticky
 * header, rather than just the clicked link — built for Terms but equally
 * fits Privacy/Disclaimer, which share the same long-document shape.
 */
export function TableOfContents({ items, label, heading, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    // Top offset clears the sticky 76px header; bottom offset keeps only
    // the section nearest the top of the viewport "active" instead of
    // whichever one merely pokes into view at the bottom.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className={cx(styles.toc, className)}>
      {heading ? <p className={styles.heading}>{heading}</p> : null}
      <ul role="list" className={styles.list}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cx(styles.link, active && styles.active)}
                aria-current={active ? "location" : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
