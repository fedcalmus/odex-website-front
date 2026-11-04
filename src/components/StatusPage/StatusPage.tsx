import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./StatusPage.module.scss";

export interface StatusPageProps {
  /** The big lead visual — a numeral like "404", or an icon for a non-HTTP crash state. */
  code: ReactNode;
  title: string;
  description: string;
  /** Actions below the description — a search form on 404, retry/home on the error boundary. */
  children?: ReactNode;
  className?: string;
}

/**
 * Full-bleed centered status shell (Figma "Not found — MP-42a"): giant lead
 * visual, headline, description, actions. Shared by the 404 page and the
 * runtime error boundary — same shape, different code/copy/actions.
 */
export function StatusPage({ code, title, description, children, className }: StatusPageProps) {
  return (
    <section className={cx(styles.wrap, className)}>
      <p className={styles.code}>{code}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {children ? <div className={styles.actions}>{children}</div> : null}
    </section>
  );
}
