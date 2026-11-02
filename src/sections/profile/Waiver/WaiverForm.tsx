"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button, ButtonLink } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Icon } from "@/components/Icon";
import { Notice } from "@/components/Notice";
import { completeProfileCopy } from "@/content/complete-profile";
import { waiverSchema, waiverInitialValues } from "./waiver.validation";
import styles from "./WaiverForm.module.scss";

export interface WaiverFormProps {
  /** Where accepting the waiver goes — the Health step. */
  nextHref: string;
  /** Where "Հետ" goes — the account step. */
  backHref: string;
}

const copy = completeProfileCopy.waiver;

/**
 * Step 1 of the profile-completion flow — read and accept the risk waiver
 * (Figma "First booking · Waiver — MP-11"). Two separate confirmations, as
 * shown: one for having read the agreement card's terms, one for accepting
 * the agreement overall. Validates on BLUR only: Armenian input methods
 * produce intermediate states that would fire constant false errors if we
 * validated per keystroke.
 *
 * There is no backend yet, so a valid submit just moves on to `nextHref`.
 */
export function WaiverForm({ nextHref, backHref }: WaiverFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: waiverInitialValues,
    validationSchema: waiverSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => router.push(nextHref),
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <span className={styles.cardTitle}>
            <Icon name="shield-check" size={18} />
            {copy.card.title}
          </span>
          <span className={styles.version}>{copy.card.version}</span>
        </div>
        <div className={styles.cardBody}>
          <p>{copy.card.intro}</p>
          <ul className={styles.bullets}>
            {copy.card.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <Checkbox
          name="acceptedTerms"
          checked={formik.values.acceptedTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.acceptedTerms ? formik.errors.acceptedTerms : undefined}
          label={copy.card.acceptTerms}
          className={styles.cardCheckbox}
        />
      </div>

      <div className={styles.practical}>
        <p className={styles.practicalTitle}>{copy.practical.title}</p>
        <ul className={styles.checklist}>
          {copy.practical.items.map((item) => (
            <li key={item}>
              <Icon name="check" size={16} className={styles.checkIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Notice tone="warning">{copy.minorWarning}</Notice>

      <Checkbox
        name="acceptedAgreement"
        checked={formik.values.acceptedAgreement}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.acceptedAgreement ? formik.errors.acceptedAgreement : undefined}
        label={copy.acceptAgreement}
      />

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

      <p className={styles.footnote}>{copy.footnote}</p>
    </form>
  );
}
