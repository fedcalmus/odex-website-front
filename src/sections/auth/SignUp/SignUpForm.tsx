"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { signUpCopy as copy } from "@/content/auth";
import { signUpSchema, signUpInitialValues } from "./sign-up.validation";
import styles from "./SignUpForm.module.scss";

export interface SignUpFormProps {
  /** Where a successful sign-up goes. */
  nextHref: string;
}

type FieldName = "fullName" | "email" | "phone" | "password";

/**
 * Public sign-up — full name, email, optional phone, password, terms
 * agreement, plus Google/Apple entry points (Figma "Sign up — MP-11a").
 * Validates on BLUR only: Armenian input methods produce intermediate states
 * that would fire constant false errors if we validated per keystroke.
 *
 * There is no backend yet, so a valid submit just moves on to `nextHref`.
 */
export function SignUpForm({ nextHref }: SignUpFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => router.push(nextHref),
  });

  const field = (name: FieldName) => ({
    ...formik.getFieldProps(name),
    error: formik.touched[name] ? formik.errors[name] : undefined,
    size: "form" as const,
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
          {...field("fullName")}
          label={copy.fields.fullName.label}
          placeholder={copy.fields.fullName.placeholder}
          helper={copy.fields.fullName.helper}
          required
          autoComplete="name"
        />
        <Input
          {...field("email")}
          type="email"
          label={copy.fields.email.label}
          placeholder={copy.fields.email.placeholder}
          helper={copy.fields.email.helper}
          required
          autoComplete="email"
          inputMode="email"
        />
        <Input
          {...field("phone")}
          type="tel"
          label={copy.fields.phone.label}
          optionalLabel={copy.fields.phone.optionalLabel}
          placeholder={copy.fields.phone.placeholder}
          helper={copy.fields.phone.helper}
          autoComplete="tel"
          inputMode="tel"
        />
        <Input
          {...field("password")}
          type="password"
          label={copy.fields.password.label}
          helper={copy.fields.password.helper}
          required
          autoComplete="new-password"
        />
      </div>

      <Checkbox
        name="agreeToTerms"
        checked={formik.values.agreeToTerms}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        error={formik.touched.agreeToTerms ? formik.errors.agreeToTerms : undefined}
        label={
          <>
            {copy.agreement.prefix}
            <Link href={copy.agreement.termsHref} className={styles.agreementLink}>
              {copy.agreement.terms}
            </Link>
            {copy.agreement.middle}
            <Link href={copy.agreement.privacyHref} className={styles.agreementLink}>
              {copy.agreement.privacy}
            </Link>
          </>
        }
      />

      <Button type="submit" size="large" fullWidth loading={formik.isSubmitting}>
        {copy.submit}
      </Button>

      <p className={styles.clubCta}>
        {copy.clubCta.text} ·{" "}
        <Link href={copy.clubCta.href} className={styles.clubLink}>
          {copy.clubCta.actionLabel}
        </Link>
      </p>
    </form>
  );
}
