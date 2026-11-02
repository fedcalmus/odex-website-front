import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<ComponentPropsWithRef<"select">, "size"> {
  /** Label rendered ABOVE the box, same convention as `Input`. */
  label?: ReactNode;
  options: readonly SelectOption[];
  /** First, disabled option shown until something is picked — "Ընտրեք մարզը". */
  placeholder?: string;
  /** Red asterisk after the label, plus `required` for assistive tech. */
  required?: boolean;
  /** Helper text under the box — always reserves its height, same as `Input`. */
  helper?: string;
  /** Validation message. Turns the border red, tied to the select for AT. */
  error?: string;
  /** Only one visual size exists today; accepted so `Select` drops into the same `field()` helper as `Input` without leaking the prop onto the native element. */
  size?: "form";
}

/** A native `<select>` styled like `Input`'s "form" field — label above, helper/error below, radius/height matched so the two sit flush in the same form. */
export function Select({
  label,
  options,
  placeholder,
  required,
  helper,
  error,
  disabled,
  className,
  id,
  size: _size,
  "aria-describedby": describedBy,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const boxClasses = cx(styles.box, error && styles.hasError, disabled && styles.disabled);

  return (
    <div className={cx(styles.field, className)}>
      {label ? (
        <label htmlFor={selectId} className={styles.label}>
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
        <select
          id={selectId}
          className={styles.control}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [describedBy, error ? errorId : helper ? helperId : null].filter(Boolean).join(" ") || undefined
          }
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={16} className={styles.chevron} />
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
