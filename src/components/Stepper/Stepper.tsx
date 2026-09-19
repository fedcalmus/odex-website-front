import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./Stepper.module.scss";

export type StepStatus = "done" | "current" | "upcoming";

export interface StepperStep {
  label: string;
  /** What THIS step asks for — "ռիսկի ընդունում". A stepper that only names steps says how far along you are; one that says what each wants says how much is LEFT. */
  hint: string;
  status: StepStatus;
  /** Completed steps are clickable. */
  href?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Accessible name of the navigation, e.g. "Գրանցման քայլեր". */
  label: string;
  /** Below md the row collapses to this ("Քայլ 2 / 4") plus the current label. */
  compactLabel: string;
  className?: string;
}

/**
 * Stepper (web) (Figma 139:1424). The label sits BENEATH its dot, not beside it —
 * beside, Armenian labels collided with the connectors and clipped. The connector
 * lives in the marker row, so it stays on the dot's centre however tall the labels
 * grow. Current is a RING, not a fill: a filled current step reads as done.
 */
export function Stepper({ steps, label, compactLabel, className }: StepperProps) {
  const current = steps.find((step) => step.status === "current");

  return (
    <nav aria-label={label} className={cx(styles.stepper, className)}>
      <p className={styles.compact}>
        <span className={styles.compactCount}>{compactLabel}</span>
        {current ? <span className={styles.compactLabel}>{current.label}</span> : null}
      </p>
      <ol role="list" className={styles.steps}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const text = (
            <>
              <span className={styles.label}>{step.label}</span>
              <span className={styles.hint}>{step.hint}</span>
            </>
          );
          return (
            <li
              key={step.label}
              aria-current={step.status === "current" ? "step" : undefined}
              className={cx(styles.step, styles[step.status], isLast && styles.last)}
            >
              <span className={styles.marker}>
                <span className={styles.dot}>
                  {step.status === "done" ? <Icon name="check" size={16} /> : index + 1}
                </span>
                {!isLast ? <span className={styles.rule} /> : null}
              </span>
              {step.status === "done" && step.href ? (
                <Link href={step.href} className={styles.text}>
                  {text}
                </Link>
              ) : (
                <span className={styles.text}>{text}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
