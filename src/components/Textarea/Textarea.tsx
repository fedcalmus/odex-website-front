import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  /** Label rendered ABOVE the box, same convention as `Input`. */
  label?: ReactNode;
  /** Red asterisk after the label, plus `required` for assistive tech. */
  required?: boolean;
  /** Helper text under the box — always reserves its height, same as `Input`. */
  helper?: string;
  /** Validation message. Turns the border red, tied to the textarea for AT. */
  error?: string;
}

/** A multi-line field, styled like `Input`'s "form" variant — label above, helper/error below, same box language. */
export function Textarea({
  label,
  required,
  helper,
  error,
  disabled,
  className,
  id,
  rows = 4,
  "aria-describedby": describedBy,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  const boxClasses = cx(styles.box, error && styles.hasError, disabled && styles.disabled);

  return (
    <div className={cx(styles.field, className)}>
      {label ? (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className={boxClasses}>
        <textarea
          id={textareaId}
          rows={rows}
          className={styles.control}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [describedBy, error ? errorId : helper ? helperId : null].filter(Boolean).join(" ") || undefined
          }
          {...rest}
        />
      </div>
      {helper ? (
        error ? (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        ) : (
          <p id={helperId} className={styles.helper}>
            {helper}
          </p>
        )
      ) : error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
