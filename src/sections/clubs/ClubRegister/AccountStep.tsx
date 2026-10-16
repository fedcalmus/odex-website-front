"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { clubRegisterCopy as copy } from "@/content/clubs";
import { clubAccountSchema, clubAccountInitialValues } from "./club-register.validation";
import type { ClubAccountValues } from "./club-register.validation";
import styles from "./ClubRegisterWizard.module.scss";

export interface AccountStepProps {
  onContinue: (values: ClubAccountValues) => void;
}

type FieldName = "contactName" | "email" | "phone" | "password";

/** Step 1 — the contact person ODex reaches during verification. */
export function AccountStep({ onContinue }: AccountStepProps) {
  const formik = useFormik({
    initialValues: clubAccountInitialValues,
    validationSchema: clubAccountSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => onContinue(values),
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
        <Input
          {...field("contactName")}
          label={copy.account.fields.contactName.label}
          placeholder={copy.account.fields.contactName.placeholder}
          helper={copy.account.fields.contactName.helper}
          autoComplete="name"
        />
        <Input
          {...field("email")}
          type="email"
          label={copy.account.fields.email.label}
          placeholder={copy.account.fields.email.placeholder}
          helper={copy.account.fields.email.helper}
          autoComplete="email"
          inputMode="email"
        />
        <Input
          {...field("phone")}
          type="tel"
          label={copy.account.fields.phone.label}
          placeholder={copy.account.fields.phone.placeholder}
          helper={copy.account.fields.phone.helper}
          autoComplete="tel"
          inputMode="tel"
        />
        <Input
          {...field("password")}
          type="password"
          label={copy.account.fields.password.label}
          helper={copy.account.fields.password.helper}
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
            {copy.account.agreement.prefix}
            <Link href={copy.account.agreement.termsHref} className={styles.inlineLink}>
              {copy.account.agreement.terms}
            </Link>
            {copy.account.agreement.middle}
            <Link href={copy.account.agreement.privacyHref} className={styles.inlineLink}>
              {copy.account.agreement.privacy}
            </Link>
          </>
        }
      />

      <Button type="submit" size="large" fullWidth icon="arrow-right" loading={formik.isSubmitting}>
        {copy.account.submit}
      </Button>
    </form>
  );
}
