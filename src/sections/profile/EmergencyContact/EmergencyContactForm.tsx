"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button, ButtonLink } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { completeProfileCopy } from "@/content/complete-profile";
import { emergencyContactSchema, emergencyContactInitialValues } from "./emergency-contact.validation";
import styles from "./EmergencyContactForm.module.scss";

export interface EmergencyContactFormProps {
  /** Where a valid submit goes — there's no specific booking/payment attached to this generic flow, so this points home. */
  nextHref: string;
  /** Where "Հետ" goes — the Health step. */
  backHref: string;
}

const copy = completeProfileCopy.emergencyContact;

type FieldName = "name" | "relationship" | "phone";

/**
 * Step 3 of the profile-completion flow, and the last one — who to call if
 * something happens (Figma "First booking · Emergency contact — MP-11d").
 * Required, unlike Health: there's no "fill in later" skip here.
 *
 * There is no backend yet, so a valid submit just moves on to `nextHref`.
 */
export function EmergencyContactForm({ nextHref, backHref }: EmergencyContactFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: emergencyContactInitialValues,
    validationSchema: emergencyContactSchema,
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
        <Input
          {...field("name")}
          label={copy.fields.name.label}
          placeholder={copy.fields.name.placeholder}
          autoComplete="name"
        />
        <Select
          {...field("relationship")}
          label={copy.fields.relationship.label}
          placeholder={copy.fields.relationship.placeholder}
          options={copy.fields.relationship.options}
        />
        <Input
          {...field("phone")}
          type="tel"
          label={copy.fields.phone.label}
          placeholder={copy.fields.phone.placeholder}
          helper={copy.fields.phone.helper}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <Toggle
        label={copy.sms.label}
        description={copy.sms.description}
        checked={formik.values.smsNotifications}
        onChange={(event) => formik.setFieldValue("smsNotifications", event.target.checked)}
      />

      <Checkbox
        name="saveForFuture"
        checked={formik.values.saveForFuture}
        onChange={formik.handleChange}
        label={copy.saveForFuture}
      />

      <Notice tone="warning">{copy.warning}</Notice>

      <div className={styles.actions}>
        <ButtonLink href={backHref} variant="secondary" size="large">
          {copy.back}
        </ButtonLink>
        <Button
          type="submit"
          size="large"
          icon="arrow-right"
          loading={formik.isSubmitting}
          className={styles.continueButton}
        >
          {copy.submit}
        </Button>
      </div>
    </form>
  );
}
