import { useId } from "react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./DetailBlock.module.scss";

export interface DetailBlockProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * The card every event-detail content block sits in (Figma "Detail block ·
 * *"): a 16px heading over its content, on surface/0 with a hairline. Each
 * one is a landmark named by its heading.
 */
export function DetailBlock({ title, children, className }: DetailBlockProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={cx(styles.block, className)}>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      {children}
    </section>
  );
}
