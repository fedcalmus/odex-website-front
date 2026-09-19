import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import styles from "./Input.module.scss";

export type InputSize = "default" | "compact" | "form";

export interface InputProps extends Omit<ComponentPropsWithRef<"input">, "size"> {
  /**
   * Label rendered ABOVE the box — never a floating placeholder (Armenian
   * labels are too long and vanish on input). Omit only when the field is
   * labelled elsewhere, and then pass `aria-label`.
   */
  label?: ReactNode;
  /**
   * `default` is the 52px touch-first field (Figma "Mobile field").
   * `compact` is the 42px field used inside dense cards (Figma "Participant form").
   * `form` is the 44px marketplace form field (Figma "Form field" 18:461): label
   * above, radius 8, and a helper line that is ALWAYS present.
   */
  size?: InputSize;
  /** Marks the field required: a red asterisk after the label, plus `required` for assistive tech. */
  required?: boolean;
  /**
   * Label for an OPTIONAL field ("ոչ պարտադիր"). Required is marked, optional is
   * labelled — otherwise the user is left counting asterisks.
   */
  optionalLabel?: string;
  /**
   * Helper text under the box. When set, the line ALWAYS reserves its height — an
   * error takes over the same slot — so the form never jumps when validation fires.
   */
  helper?: string;
  /**
   * Validation message. Says what to do, not what went wrong. Turns the
   * border red, adds the alert icon and is tied to the input for AT.
   */
  error?: string;
  /**
   * Shows the check icon. For fields that have actually been VERIFIED (email
   * confirmed, phone verified) — not for every field that merely has text.
   * Purely visual, so state the verification in text elsewhere too.
   */
  validated?: boolean;
}

// Figma: 20px status icon in the 52px field. The compact field has no icon in
// the design; 16px is the icon system's size for dense UI.
const ICON_SIZE: Record<InputSize, number> = {
  default: 20,
  compact: 16,
  form: 16,
};

export function Input({
  label,
  size = "default",
  required,
  optionalLabel,
  helper,
  error,
  validated,
  disabled,
  className,
  id,
  "aria-describedby": describedBy,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const fieldClasses = [
    styles.field,
    size === "compact" ? styles.compact : size === "form" ? styles.form : styles.default,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const boxClasses = [
    styles.box,
    error ? styles.hasError : null,
    disabled ? styles.disabled : null,
  ]
    .filter(Boolean)
    .join(" ");

  // Colour is never the only channel: error = red border + icon + text.
  const status = error ? (
    <Icon name="alert-circle" size={ICON_SIZE[size]} className={styles.errorIcon} />
  ) : validated ? (
    <Icon name="check" size={ICON_SIZE[size]} className={styles.validIcon} />
  ) : null;

  return (
    <div className={fieldClasses}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
          {optionalLabel ? <span className={styles.optional}> {optionalLabel}</span> : null}
        </label>
      ) : null}
      <div className={boxClasses}>
        <input
          id={inputId}
          className={styles.control}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [describedBy, error ? errorId : helper ? helperId : null].filter(Boolean).join(" ") || undefined
          }
          {...rest}
        />
        {status}
      </div>
      {helper ? (
        // Helper and error share ONE slot, so the field's height never changes.
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
