"use client";

import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./QuantityStepper.module.scss";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  /** Accessible names of the buttons and of the current value's group. */
  labels: { group: string; decrease: string; increase: string };
  className?: string;
}

/**
 * A pill "− 2 +" stepper (Figma "Stepper" in the checkout quantity block): 44px
 * round buttons in a rounded track, the plus in lime. Bounded on both sides, so
 * the only value you can pick is one that can actually be booked.
 */
export function QuantityStepper({ value, min = 1, max, onChange, labels, className }: QuantityStepperProps) {
  return (
    <div role="group" aria-label={labels.group} className={cx(styles.stepper, className)}>
      <button
        type="button"
        className={styles.button}
        aria-label={labels.decrease}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Icon name="minus" size={20} />
      </button>
      <output className={styles.value} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className={cx(styles.button, styles.plus)}
        aria-label={labels.increase}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Icon name="plus" size={20} />
      </button>
    </div>
  );
}
