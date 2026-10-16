"use client";

import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { contactCopy as copy } from "@/content/contact";
import { contactSchema, contactInitialValues } from "./contact.validation";
import styles from "./ContactForm.module.scss";

type FieldName = "name" | "email" | "topic";

/**
 * The contact form card (Figma "Contact — MP-29"). Validates on BLUR only:
 * Armenian input methods produce intermediate states that would fire
 * constant false errors if we validated per keystroke.
 *
 * There is no backend yet — a valid submit just swaps the card for an
 * inline confirmation (there's no "next page" to send a contact message to,
 * unlike the account/booking flows, which redirect).
 */
export function ContactForm() {
  const formik = useFormik({
    initialValues: contactInitialValues,
    validationSchema: contactSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (_values, helpers) => {
      helpers.setSubmitting(false);
    },
  });

  const field = (name: FieldName) => ({
    ...formik.getFieldProps(name),
    error: formik.touched[name] ? formik.errors[name] : undefined,
    size: "form" as const,
  });

  if (formik.submitCount > 0 && Object.keys(formik.errors).length === 0 && !formik.isSubmitting) {
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <Icon name="check-circle" size={32} className={styles.successIcon} />
          <p className={styles.successTitle}>{copy.form.success.title}</p>
          <p className={styles.successBody}>{copy.form.success.body}</p>
          <button type="button" className={styles.again} onClick={() => formik.resetForm()}>
            {copy.form.success.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{copy.form.title}</h2>
      <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          {...field("name")}
          label={copy.form.fields.name.label}
          placeholder={copy.form.fields.name.placeholder}
          validated={formik.touched.name && !formik.errors.name}
          autoComplete="name"
        />
        <Input
          {...field("email")}
          type="email"
          label={copy.form.fields.email.label}
          placeholder={copy.form.fields.email.placeholder}
          validated={formik.touched.email && !formik.errors.email}
          autoComplete="email"
          inputMode="email"
        />
        <Input
          {...field("topic")}
          label={copy.form.fields.topic.label}
          placeholder={copy.form.fields.topic.placeholder}
        />
        <Textarea
          {...formik.getFieldProps("message")}
          error={formik.touched.message ? formik.errors.message : undefined}
          label={copy.form.fields.message.label}
          placeholder={copy.form.fields.message.placeholder}
        />

        <Button type="submit" size="large" fullWidth loading={formik.isSubmitting}>
          {copy.form.submit}
        </Button>
        <p className={styles.responseTime}>{copy.form.responseTime}</p>
      </form>
    </div>
  );
}
