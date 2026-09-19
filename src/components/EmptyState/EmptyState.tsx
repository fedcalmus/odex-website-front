import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./EmptyState.module.scss";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

/** Nothing matched. Says so plainly and offers the one useful next step; never a blank page. */
export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? (
        <Link href={action.href} scroll={false} className={styles.action}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
