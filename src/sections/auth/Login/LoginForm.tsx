"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { loginCopy as copy } from "@/content/auth";
import { loginSchema, loginInitialValues } from "./login.validation";
import styles from "./LoginForm.module.scss";

export interface LoginFormProps {
  /** Where a successful sign-in goes. */
  nextHref: string;
}

type FieldName = "email" | "password";

// `useSearchParams` opts a Client Component out of static rendering unless
// it's isolated behind its own Suspense boundary — kept to just this one
// line of UI so the rest of the form stays static.
function ResetSuccessNotice() {
  const justReset = useSearchParams().get("reset") === "success";
  if (!justReset) return null;
  return (
    <Notice tone="info" icon="check-circle">
      {copy.resetSuccess}
    </Notice>
  );
}

/**
 * Public sign-in — email + password, plus Google/Apple entry points
 * (Figma "Login — MP-13"). Validates on BLUR only: Armenian input methods
 * produce intermediate states that would fire constant false errors if we
 * validated per keystroke.
 *
 * There is no backend yet, so a valid submit just moves on to `nextHref`.
 */
export function LoginForm({ nextHref }: LoginFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
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
      <Suspense fallback={null}>
        <ResetSuccessNotice />
      </Suspense>

      <SocialAuthButtons
        googleLabel={copy.social.google}
        appleLabel={copy.social.apple}
        dividerLabel={copy.social.divider}
      />

      <div className={styles.fields}>
        <Input
          {...field("email")}
          type="email"
          label={copy.fields.email.label}
          placeholder={copy.fields.email.placeholder}
          autoComplete="email"
          inputMode="email"
        />
        <div className={styles.passwordField}>
          <Input
            {...field("password")}
            type="password"
            label={copy.fields.password.label}
            autoComplete="current-password"
          />
          <Link href={copy.forgotPassword.href} className={styles.forgotPassword}>
            {copy.forgotPassword.label}
          </Link>
        </div>
      </div>

      <Button type="submit" size="large" fullWidth loading={formik.isSubmitting}>
        {copy.submit}
      </Button>

      <Link href={copy.phoneLogin.href} className={styles.phoneLogin}>
        {copy.phoneLogin.label}
      </Link>

      <p className={styles.noAccount}>
        {copy.noAccount.text}{" "}
        <Link href={copy.noAccount.href} className={styles.inlineLink}>
          {copy.noAccount.actionLabel}
        </Link>
      </p>

      <p className={styles.clubCta}>
        {copy.clubCta.text} ·{" "}
        <Link href={copy.clubCta.href} className={styles.clubLink}>
          {copy.clubCta.actionLabel}
        </Link>
      </p>
    </form>
  );
}
