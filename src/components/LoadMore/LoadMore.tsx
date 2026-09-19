import { ButtonLink } from "@/components/Button";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./LoadMore.module.scss";

export interface LoadMoreProps {
  /** "Ցուցադրված է 8 · հաջորդ մեկնումը 18 սեպտեմբերին". */
  status: string;
  actionLabel: string;
  /** The next window. A link, not a button — every page of results is a crawlable URL. */
  href: string;
  /** Trailing icon. The discovery footer moves you forward (an arrow); "show more" stays on the page (`null`). */
  icon?: IconName | null;
  className?: string;
}

/**
 * The foot of the list (Figma "Load more"): what's shown, when the next
 * departure is, and one step to see the following week. Paging by TIME rather
 * than by item count — a weekend planner thinks in weekends.
 */
export function LoadMore({ status, actionLabel, href, icon = "arrow-right", className }: LoadMoreProps) {
  return (
    <div className={cx(styles.loadMore, className)}>
      <p className={styles.status}>{status}</p>
      <ButtonLink href={href} scroll={false} variant="secondary" icon={icon ?? undefined}>
        {actionLabel}
      </ButtonLink>
    </div>
  );
}
