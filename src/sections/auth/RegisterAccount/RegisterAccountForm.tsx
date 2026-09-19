"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { registerCopy as copy } from "@/content/auth";
import { registerAccountSchema, registerInitialValues } from "./register.validation";
import styles from "./RegisterAccountForm.module.scss";

export interface RegisterAccountFormProps {
  /** Where "Շարունակել" goes once the account details are valid. */
  nextHref: string;
  loginHref: string;
}

/**
 * Registration step 1 — account (email + password). Formik + Yup, with the
 * schema in `register.validation.ts`. Validates on BLUR only: Armenian input
 * methods produce intermediate states that would fire constant false errors if
 * we validated per keystroke.
 *
 * There is no backend yet, so a valid submit just moves to the next step; the
 * account is created when the API exists.
 */
export function RegisterAccountForm({ nextHref, loginHref }: RegisterAccountFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerAccountSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => router.push(nextHref),
  });

  const field = (name: keyof typeof registerInitialValues) => ({
    ...formik.getFieldProps(name),
    error: formik.touched[name] ? formik.errors[name] : undefined,
    size: "form" as const,
    required: true,
    label: copy.fields[name].label,
    helper: copy.fields[name].helper,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.fields}>
        <Input {...field("email")} type="email" autoComplete="email" inputMode="email" />
        <Input {...field("password")} type="password" autoComplete="new-password" />
        <Input {...field("confirmPassword")} type="password" autoComplete="new-password" />
      </div>

      <Notice tone="info" icon="lock">
        {copy.emailNotice}
      </Notice>

      <div className={styles.actions}>
        <Link href={loginHref} className={styles.login}>
          {copy.haveAccount}
        </Link>
        <Button type="submit" size="large" icon="arrow-right" loading={formik.isSubmitting} className={styles.submit}>
          {copy.submit}
        </Button>
      </div>
    </form>
  );
}
