import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Toggle.module.scss";

export interface ToggleProps extends Omit<ComponentPropsWithRef<"input">, "type" | "size"> {
  /** Bold label, e.g. "SMS ծանուցումներ". */
  label: ReactNode;
  /** Quiet description under the label. */
  description?: ReactNode;
  className?: string;
}

/**
 * An on/off switch row (Figma "Emergency contact" — SMS notifications): label
 * + description on the left, a real `<input type="checkbox">` styled as a
 * switch on the right. The whole row is NOT the tap target (unlike
 * `Checkbox`) — only the switch itself toggles, since the label text here is
 * informational, not an instruction to tap.
 */
export function Toggle({ label, description, disabled, className, id, ...rest }: ToggleProps) {
  const generatedId = useId();
  const toggleId = id ?? generatedId;

  return (
    <div className={cx(styles.row, disabled && styles.disabled, className)}>
      <div className={styles.copy}>
        <label htmlFor={toggleId} className={styles.label}>
          {label}
        </label>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <span className={styles.control}>
        <input id={toggleId} type="checkbox" className={styles.input} disabled={disabled} {...rest} />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </span>
    </div>
  );
}
