import { DetailBlock } from "@/components/DetailBlock";
import { cx } from "@/lib/cx";
import styles from "./CancellationPolicy.module.scss";

export interface CancellationTerm {
  /** "Մինչև 48 ժամ". */
  when: string;
  /** "Ամբողջական վերադարձ". */
  outcome: string;
  /** Green = full refund, amber = partial, red = none. Never the only channel — the outcome is written. */
  tone: "full" | "partial" | "none";
}

export interface CancellationPolicyProps {
  title: string;
  terms: CancellationTerm[];
}

/** "Չեղարկման պայմաններ" — refund tiers, most generous first (Figma "Detail block · Cancellation"). */
export function CancellationPolicy({ title, terms }: CancellationPolicyProps) {
  return (
    <DetailBlock title={title}>
      <ul role="list" className={styles.terms}>
        {terms.map((term) => (
          <li key={term.when} className={styles.term}>
            <span className={styles.when}>
              <span className={cx(styles.dot, styles[term.tone])} aria-hidden="true" />
              {term.when}
            </span>
            <span className={styles.outcome}>{term.outcome}</span>
          </li>
        ))}
      </ul>
    </DetailBlock>
  );
}
