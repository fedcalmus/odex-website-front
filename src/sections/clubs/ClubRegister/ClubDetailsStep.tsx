"use client";

import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { ChipToggleGroup } from "@/components/ChipToggleGroup";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { REGION_LABELS } from "@/content/taxonomy";
import { clubRegisterCopy as copy } from "@/content/clubs";
import { clubDetailsSchema, clubDetailsInitialValues } from "./club-register.validation";
import styles from "./ClubRegisterWizard.module.scss";

export interface ClubDetailsStepProps {
  onBack: () => void;
  onContinue: () => void;
}

const REGION_OPTIONS = Object.entries(REGION_LABELS).map(([value, label]) => ({ value, label }));

type FieldName = "clubName" | "legalName" | "tin" | "region";

/** Step 2 — the club's public identity, legal identity, and what it runs. */
export function ClubDetailsStep({ onBack, onContinue }: ClubDetailsStepProps) {
  const formik = useFormik({
    initialValues: clubDetailsInitialValues,
    validationSchema: clubDetailsSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => onContinue(),
  });

  const field = (name: FieldName) => ({
    ...formik.getFieldProps(name),
    error: formik.touched[name] ? formik.errors[name] : undefined,
    size: "form" as const,
    required: true,
  });

  const activitiesError = formik.touched.activities ? (formik.errors.activities as string | undefined) : undefined;

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.fields}>
        <Input
          {...field("clubName")}
          label={copy.club.fields.clubName.label}
          placeholder={copy.club.fields.clubName.placeholder}
          helper={copy.club.fields.clubName.helper}
          autoComplete="organization"
        />
        <Input
          {...field("legalName")}
          label={copy.club.fields.legalName.label}
          placeholder={copy.club.fields.legalName.placeholder}
          helper={copy.club.fields.legalName.helper}
        />
        <Input
          {...field("tin")}
          label={copy.club.fields.tin.label}
          placeholder={copy.club.fields.tin.placeholder}
          helper={copy.club.fields.tin.helper}
          inputMode="numeric"
        />
        <Select
          {...field("region")}
          label={copy.club.fields.region.label}
          placeholder={copy.club.fields.region.placeholder}
          helper={copy.club.fields.region.helper}
          options={REGION_OPTIONS}
        />

        <div className={styles.chipField}>
          <span className={styles.label}>
            {copy.club.fields.activities.label}
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
          </span>
          <p className={styles.chipHelper}>{copy.club.fields.activities.helper}</p>
          <ChipToggleGroup
            label={copy.club.fields.activities.label}
            options={copy.club.fields.activities.options}
            value={formik.values.activities}
            onChange={(next) => formik.setFieldValue("activities", next)}
          />
          {activitiesError ? (
            <p className={styles.error} role="alert">
              {activitiesError}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" size="large" onClick={onBack}>
          {copy.club.back}
        </Button>
        <Button
          type="submit"
          size="large"
          icon="arrow-right"
          loading={formik.isSubmitting}
          className={styles.continueButton}
        >
          {copy.club.submit}
        </Button>
      </div>
    </form>
  );
}
