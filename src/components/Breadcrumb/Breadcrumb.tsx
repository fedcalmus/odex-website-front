import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./Breadcrumb.module.scss";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  /** Accessible name of the navigation landmark. */
  label: string;
  className?: string;
}

/**
 * "Միջոցառումներ › Արագածոտն" — where this page sits (Figma "Breadcrumb").
 * An ordered list in a labelled `<nav>`; pair it with `breadcrumbJsonLd` so
 * search engines get the trail too.
 */
export function Breadcrumb({ items, label, className }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={cx(styles.breadcrumb, className)}>
      <ol role="list" className={styles.list}>
        {items.map((item, index) => (
          <li key={item.href} className={styles.item}>
            {index > 0 ? <Icon name="chevron-right" size={16} className={styles.separator} /> : null}
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
