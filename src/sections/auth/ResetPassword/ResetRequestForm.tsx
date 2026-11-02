"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { resetPasswordCopy } from "@/content/auth";
import { resetRequestSchema, resetRequestInitialValues } from "./reset-request.validation";
import styles from "./ResetRequestForm.module.scss";

const copy = resetPasswordCopy.request;

export interface ResetRequestFormProps {
  /** Where a valid submit goes — the submitted email is appended as `?email=`. */
  nextHref: string;
}

/**
 * Step 1 of password reset — just an email address (Figma "Auth · Reset
 * request — MP-13a"). Validates on BLUR only: Armenian input methods
 * produce intermediate states that would fire constant false errors if we
 * validated per keystroke.
 *
 * There is no backend yet, so a valid submit just moves on to `nextHref`.
 */
export function ResetRequestForm({ nextHref }: ResetRequestFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: resetRequestInitialValues,
    validationSchema: resetRequestSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => router.push(`${nextHref}?email=${encodeURIComponent(values.email)}`),
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <Input
        {...formik.getFieldProps("email")}
        type="email"
        error={formik.touched.email ? formik.errors.email : undefined}
        size="form"
        required
        label={copy.fields.email.label}
        placeholder={copy.fields.email.placeholder}
        helper={copy.fields.email.helper}
        autoComplete="email"
        inputMode="email"
      />

      <Button type="submit" size="large" fullWidth loading={formik.isSubmitting}>
        {copy.submit}
      </Button>

      <Link href={copy.rememberedPassword.href} className={styles.rememberedLink}>
        {copy.rememberedPassword.label}
      </Link>
    </form>
  );
}
