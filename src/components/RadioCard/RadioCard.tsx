import type { ComponentPropsWithRef } from "react";
import { cx } from "@/lib/cx";
import styles from "./RadioCard.module.scss";

export interface RadioCardProps extends Omit<ComponentPropsWithRef<"input">, "type" | "title"> {
  title: string;
  description: string;
}

/**
 * One choice in a radio group, drawn as a card (Figma "Mode": "Ես կլրացնեմ" /
 * "Ուղարկել հղում"). The real `<input type="radio">` sits invisibly over the
 * card, so keyboard (arrows), grouping and screen readers stay native; the whole
 * card is the tap target. Put a group of these in a `<fieldset>`.
 */
export function RadioCard({ title, description, className, ...rest }: RadioCardProps) {
  return (
    <label className={cx(styles.card, className)}>
      <input type="radio" className={styles.input} {...rest} />
      <span className={styles.radio} aria-hidden="true" />
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
    </label>
  );
}
