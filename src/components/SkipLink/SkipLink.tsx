import type { ReactNode } from "react";
import styles from "./SkipLink.module.scss";

export interface SkipLinkProps {
  /** Id of the element to jump to. Defaults to the site's `<main id="main">`. */
  href?: string;
  children: ReactNode;
}

/** First focusable element on the page: lets keyboard users skip the header. Visible only when focused. */
export function SkipLink({ href = "#main", children }: SkipLinkProps) {
  return (
    <a href={href} className={styles.skip}>
      {children}
    </a>
  );
}
