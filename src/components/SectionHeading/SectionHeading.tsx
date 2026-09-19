import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SectionHeading.module.scss";

export interface SectionHeadingProps {
  /** Short caps label above the title. Keep it to about three words — Armenian caps lose legibility at length. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned exit link. Moves beneath the title below md. */
  link?: { href: string; label: string };
  /** Put this on the <h2> so the parent <section> can name itself with aria-labelledby. */
  id?: string;
  className?: string;
}

/**
 * Figma "Section heading" (67:837) — the pattern that repeats on every
 * homepage section, componentised so sections can't drift apart. Variants map
 * to which optional props are passed: with link, with paragraph, no eyebrow.
 */
export function SectionHeading({ eyebrow, title, description, link, id, className }: SectionHeadingProps) {
  return (
    <header className={cx(styles.heading, className)}>
      <div className={styles.copy}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {link ? (
        <Link href={link.href} className={styles.link}>
          {link.label}
          <Icon name="arrow-right" size={16} className={styles.arrow} />
        </Link>
      ) : null}
    </header>
  );
}
