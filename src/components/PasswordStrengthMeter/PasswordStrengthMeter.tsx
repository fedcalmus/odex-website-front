import { cx } from "@/lib/cx";
import { getPasswordStrength } from "@/lib/password-strength";
import styles from "./PasswordStrengthMeter.module.scss";

export interface PasswordStrengthMeterProps {
  value: string;
  className?: string;
}

// Written for this build — no strength-label copy exists in any of the
// source mocks beyond the single "Ուժեղ գաղտնաբառ" (strong) example shown.
const LABELS = {
  1: "Թույլ գաղտնաբառ",
  2: "Միջին գաղտնաբառ",
  3: "Ուժեղ գաղտնաբառ",
  4: "Շատ ուժեղ գաղտնաբառ",
} as const;

/**
 * The 4-segment strength bar under the "new password" field (Figma "Auth ·
 * New password — MP-13c"). Hidden while the field is empty — nothing to
 * show yet, and showing "weak" for an empty box reads as a false alarm.
 */
export function PasswordStrengthMeter({ value, className }: PasswordStrengthMeterProps) {
  if (!value) return null;

  const strength = getPasswordStrength(value);
  const label = LABELS[strength];

  return (
    <div className={cx(styles.meter, className)}>
      <div className={styles.segments} role="img" aria-label={label}>
        {([1, 2, 3, 4] as const).map((step) => (
          <span key={step} className={cx(styles.segment, step <= strength && styles.filled)} />
        ))}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
