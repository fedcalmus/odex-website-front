"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { loginCopy as copy } from "@/content/auth";
import { loginSchema, loginInitialValues } from "./login.validation";
import styles from "./LoginForm.module.scss";

export interface LoginFormProps {
  /** Where a successful sign-in goes. */
  nextHref: string;
}

type FieldName = "email" | "password";

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
        <Input
          {...field("password")}
          type="password"
          label={copy.fields.password.label}
          autoComplete="current-password"
        />
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
