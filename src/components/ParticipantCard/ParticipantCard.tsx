import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./ParticipantCard.module.scss";

export interface ParticipantCardProps {
  /** "2 · Երկրորդ մասնակից" */
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * The card a participant's details are entered in (Figma "blk", active). While
 * anything inside has focus its rim turns lime — that IS the "you are here" marker,
 * so there's no separate active state to keep in sync.
 */
export function ParticipantCard({ title, children, className }: ParticipantCardProps) {
  return (
    <fieldset className={cx(styles.card, className)}>
      <legend className={styles.title}>{title}</legend>
      {children}
    </fieldset>
  );
}
