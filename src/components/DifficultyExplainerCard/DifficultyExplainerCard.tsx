import { DifficultyChip } from "@/components/DifficultyChip";
import type { DifficultyLevel } from "@/components/DifficultyChip";
import { cx } from "@/lib/cx";
import styles from "./DifficultyExplainerCard.module.scss";

export interface DifficultyExplainerCardProps {
  level: DifficultyLevel;
  /** Plain language — whether YOU can do it, not a spec. */
  description: string;
  /** The numbers underneath, for people who know what they mean. */
  anchor: string;
  className?: string;
}

/**
 * Difficulty explainer card (Figma 68:953). Four in a row teach the whole
 * scale once, in human terms, before anyone books — that is what makes the
 * chip on an event card mean something.
 *
 * SAFETY-CRITICAL COPY: the descriptions need review by an experienced guide
 * before launch, not just a designer.
 */
export function DifficultyExplainerCard({
  level,
  description,
  anchor,
  className,
}: DifficultyExplainerCardProps) {
  return (
    <article className={cx(styles.card, className)}>
      <DifficultyChip level={level} />
      <p className={styles.description}>{description}</p>
      <p className={styles.anchor}>{anchor}</p>
    </article>
  );
}
