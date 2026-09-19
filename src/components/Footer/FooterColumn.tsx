import Link from "next/link";
import { useId } from "react";
import styles from "./Footer.module.scss";

export interface FooterColumnProps {
  /** 9px caps column head. */
  title: string;
  links: Array<{ label: string; href: string }>;
}

/** One footer link column — its own navigation landmark, named by its head. */
export function FooterColumn({ title, links }: FooterColumnProps) {
  const headingId = useId();

  return (
    <nav aria-labelledby={headingId} className={styles.column}>
      <h2 id={headingId} className={styles.columnTitle}>
        {title}
      </h2>
      <ul role="list" className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
