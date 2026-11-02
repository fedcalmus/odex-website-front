"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";
import { resetPasswordCopy } from "@/content/auth";
import { newPasswordSchema, newPasswordInitialValues } from "./new-password.validation";
import styles from "./NewPasswordForm.module.scss";

const copy = resetPasswordCopy.newPassword;

export interface NewPasswordFormProps {
  /** Where a successful reset goes — back to sign-in, with the new password. */
  nextHref: string;
}

type FieldName = "password" | "confirmPassword";

/**
 * Step 3 of password reset — the new password itself (Figma "Auth · New
 * password — MP-13c"). The submit button has no visible label in the
 * mock, just a trailing arrow — `aria-label` carries its accessible name.
 * Validates on BLUR only: Armenian input methods produce intermediate
 * states that would fire constant false errors if we validated per
 * keystroke.
 *
 * There is no backend yet, so a valid submit just moves on to `nextHref`.
 */
export function NewPasswordForm({ nextHref }: NewPasswordFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: newPasswordInitialValues,
    validationSchema: newPasswordSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => router.push(nextHref),
  });

  const field = (name: FieldName) => ({
    ...formik.getFieldProps(name),
    error: formik.touched[name] ? formik.errors[name] : undefined,
    size: "form" as const,
    required: true,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.fields}>
        <div className={styles.passwordField}>
          <Input
            {...field("password")}
            type="password"
            label={copy.fields.password.label}
            helper={copy.fields.password.helper}
            autoComplete="new-password"
          />
          <PasswordStrengthMeter value={formik.values.password} />
        </div>
        <Input
          {...field("confirmPassword")}
          type="password"
          label={copy.fields.confirmPassword.label}
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        size="large"
        fullWidth
        icon="arrow-right"
        loading={formik.isSubmitting}
        aria-label={copy.submitAriaLabel}
      >
        <span className={styles.visuallyHidden}>{copy.submitAriaLabel}</span>
      </Button>
    </form>
  );
}
