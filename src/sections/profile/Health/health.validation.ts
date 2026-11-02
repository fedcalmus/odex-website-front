import * as Yup from "yup";

// Every field here is optional — "Բոլոր դաշտերը ոչ պարտադիր են" is the
// page's own lead copy. No `Yup.ObjectSchema<Values>` annotation and no
// `.defined()`: that combination looks like it only affects TypeScript, but
// `.defined()` is a REAL runtime check that rejects `""` through Formik's
// per-field blur validation — confirmed as a live bug elsewhere in this app
// (sign-up's phone field, the contact form's topic field) before being
// removed there. Left untyped and inferred instead.

export const healthMessages = {
  tooLong: "Չափազանց երկար է",
} as const;

export interface HealthValues {
  nothingToDisclose: boolean;
  allergies: string;
  conditions: string[];
  medications: string;
  bloodType: string;
}

export const healthInitialValues: HealthValues = {
  nothingToDisclose: false,
  allergies: "",
  conditions: [],
  medications: "",
  bloodType: "",
};

export const healthSchema = Yup.object({
  nothingToDisclose: Yup.boolean().required(),
  allergies: Yup.string().trim().max(200, healthMessages.tooLong),
  conditions: Yup.array(Yup.string().required()),
  medications: Yup.string().trim().max(200, healthMessages.tooLong),
  bloodType: Yup.string().trim(),
});
