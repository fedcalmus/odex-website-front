import { useId } from "react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./RailBlock.module.scss";

export interface RailBlockProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** A titled card in a side rail (Figma "blk"): 13px heading over its content, surface/0 with a hairline. Lighter than a DetailBlock — no shadow, smaller padding. */
export function RailBlock({ title, children, className }: RailBlockProps) {
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
