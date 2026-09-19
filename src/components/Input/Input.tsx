import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import styles from "./Input.module.scss";

export type InputSize = "default" | "compact";

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
   */
  size?: InputSize;
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
};

export function Input({
  label,
  size = "default",
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

  const fieldClasses = [
    styles.field,
    size === "compact" ? styles.compact : styles.default,
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
        </label>
      ) : null}
      <div className={boxClasses}>
        <input
          id={inputId}
          className={styles.control}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={[describedBy, error ? errorId : null].filter(Boolean).join(" ") || undefined}
          {...rest}
        />
        {status}
      </div>
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
