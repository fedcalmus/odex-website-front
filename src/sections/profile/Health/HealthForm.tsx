"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button, ButtonLink } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { ChipToggleGroup } from "@/components/ChipToggleGroup";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { Select } from "@/components/Select";
import { completeProfileCopy } from "@/content/complete-profile";
import { healthSchema, healthInitialValues } from "./health.validation";
import styles from "./HealthForm.module.scss";

export interface HealthFormProps {
  /** Where continuing goes — the Emergency contact step. Also where "Լրացնել ավելի ուշ" goes, unfilled. */
  nextHref: string;
  /** Where "Հետ" goes — the Waiver step. */
  backHref: string;
}

const copy = completeProfileCopy.health;

/**
 * Step 2 of the profile-completion flow — health details, every field optional
 * (Figma "First booking · Health — MP-11c"). Checking "Նշելու բան չունեմ"
 * clears and disables the rest, matching its label ("nothing to disclose").
 *
 * There is no backend yet, so a valid submit (or the "fill in later" skip
 * link) just moves on to `nextHref`.
 */
export function HealthForm({ nextHref, backHref }: HealthFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: healthInitialValues,
    validationSchema: healthSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => router.push(nextHref),
  });

  const nothingToDisclose = formik.values.nothingToDisclose;

  const field = (name: "allergies" | "medications") => ({
    ...formik.getFieldProps(name),
    error: formik.touched[name] ? formik.errors[name] : undefined,
    size: "form" as const,
    disabled: nothingToDisclose,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <Notice tone="info" icon="lock">
        {copy.notice}
      </Notice>

      <Checkbox
        name="nothingToDisclose"
        checked={nothingToDisclose}
        onChange={(event) => {
          const checked = event.target.checked;
          formik.setFieldValue("nothingToDisclose", checked);
          if (checked) {
            formik.setValues({
              nothingToDisclose: true,
              allergies: "",
              conditions: [],
              medications: "",
              bloodType: "",
            });
          }
        }}
        label={copy.skipLabel}
      />

      <div className={styles.fields}>
        <Input
          {...field("allergies")}
          label={copy.fields.allergies.label}
          optionalLabel={copy.fields.allergies.optionalLabel}
          placeholder={copy.fields.allergies.placeholder}
          helper={copy.fields.allergies.helper}
        />

        <div className={styles.chipField}>
          <span className={styles.label}>{copy.fields.conditions.label}</span>
          <ChipToggleGroup
            label={copy.fields.conditions.label}
            options={copy.fields.conditions.options}
            value={formik.values.conditions}
            onChange={(next) => formik.setFieldValue("conditions", next)}
            className={nothingToDisclose ? styles.chipsDisabled : undefined}
          />
        </div>

        <Input
          {...field("medications")}
          label={copy.fields.medications.label}
          optionalLabel={copy.fields.medications.optionalLabel}
          placeholder={copy.fields.medications.placeholder}
          helper={copy.fields.medications.helper}
        />

        <Select
          {...formik.getFieldProps("bloodType")}
          disabled={nothingToDisclose}
          label={copy.fields.bloodType.label}
          placeholder={copy.fields.bloodType.placeholder}
          options={copy.fields.bloodType.options}
        />
      </div>

      <div className={styles.why}>
        <p className={styles.whyTitle}>{copy.why.title}</p>
        <ul className={styles.checklist}>
          {copy.why.items.map((item) => (
            <li key={item}>
              <Icon name="check" size={16} className={styles.checkIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>

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

      <Link href={nextHref} className={styles.skipLink}>
        {copy.skipLink}
      </Link>

      <p className={styles.footnote}>{copy.footnote}</p>
    </form>
  );
}
