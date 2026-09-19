import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps
  extends Omit<ComponentPropsWithRef<"input">, "type" | "children" | "size"> {
  /**
   * Visible label. The whole row (box + label) is the tap target. Omit it only
   * when the checkbox is labelled elsewhere, and then pass `aria-label`.
   */
  label?: ReactNode;
  /** Validation message. Turns the box red and is announced via aria-describedby. */
  error?: string;
  /** `small` is the 18px box used in dense lists such as the discovery filter panel. */
  size?: "default" | "small";
  /** Trailing, quiet detail after the label — e.g. a facet count ("24"). */
  meta?: ReactNode;
}

// Confirmed from the Figma checkbox (554:2377): 22px box, 16px check glyph.
const MARK_SIZE = 16;

export function Checkbox({
  label,
  error,
  size = "default",
  meta,
  disabled,
  className,
  "aria-describedby": describedBy,
  ...rest
}: CheckboxProps) {
  const errorId = useId();

  const rowClasses = [
    styles.row,
    size === "small" ? styles.small : null,
    disabled ? styles.disabled : null,
    error ? styles.hasError : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <label className={rowClasses}>
        <span className={styles.control}>
          <input
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={[describedBy, error ? errorId : null].filter(Boolean).join(" ") || undefined}
            {...rest}
          />
          {/* Purely visual: the native input above carries role/state. */}
          <span className={styles.box} aria-hidden="true">
            <Icon name="check" size={MARK_SIZE} className={styles.mark} />
          </span>
        </span>
        {label ? <span className={styles.label}>{label}</span> : null}
        {meta !== undefined && meta !== null && meta !== false ? <span className={styles.meta}>{meta}</span> : null}
      </label>
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
