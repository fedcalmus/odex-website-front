"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { completeProfileCopy } from "@/content/complete-profile";
import { accountDetailsSchema, accountDetailsInitialValues } from "./account-details.validation";
import styles from "./AccountDetailsForm.module.scss";

const copy = completeProfileCopy.account;

export interface AccountDetailsFormProps {
  /** Where "Շարունակել" goes once the account details are valid. */
  nextHref: string;
  loginHref: string;
}

/**
 * Account-details step — email + password, the first screen of the
 * post-sign-up profile-completion flow. Formik + Yup, with the schema in
 * `account-details.validation.ts`. Validates on BLUR only: Armenian input
 * methods produce intermediate states that would fire constant false errors if
 * we validated per keystroke.
 *
 * There is no backend yet, so a valid submit just moves to the next step; the
 * account is created when the API exists.
 */
export function AccountDetailsForm({ nextHref, loginHref }: AccountDetailsFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: accountDetailsInitialValues,
    validationSchema: accountDetailsSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => router.push(nextHref),
  });

  const field = (name: keyof typeof accountDetailsInitialValues) => ({
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
