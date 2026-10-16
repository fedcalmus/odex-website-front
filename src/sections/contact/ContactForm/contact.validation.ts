import * as Yup from "yup";
import { emailSchema } from "@/validations/common.validation";

// Validation for the contact form. Messages say WHAT TO DO, not what went
// wrong, and fire on BLUR, never on keystroke — Armenian input methods
// produce intermediate states that would trigger constant false errors.
// Written for this build, needs a native-speaker pass.
//
// `name` is deliberately NOT `fullNameSchema` (which requires two words) —
// that rule exists for legal/account names elsewhere in the app; a casual
// "who's asking" field on a contact form shouldn't reject a single name.

export const contactMessages = {
  nameRequired: "Մուտքագրեք ձեր անունը",
  tooLong: "Չափազանց երկար է",
  messageRequired: "Գրեք ձեր հաղորդագրությունը",
  messageShort: "Մի փոքր ավելի մանրամասն գրեք",
} as const;

export const MESSAGE_MIN_LENGTH = 10;

export interface ContactValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export const contactInitialValues: ContactValues = {
  name: "",
  email: "",
  topic: "",
  message: "",
};

// No explicit `Yup.ObjectSchema<ContactValues>` annotation — see the note on
// `signUpSchema` in sign-up.validation.ts: forcing `topic`'s inferred type to
// match `ContactValues.topic: string` would need `.defined()`, which is a
// REAL runtime check, not just a type assertion, and it rejects `""` via
// Formik's per-field blur validation — confirmed live, it blocked
// submitting with the (optional) topic field empty.
export const contactSchema = Yup.object({
  name: Yup.string().trim().required(contactMessages.nameRequired).max(80, contactMessages.tooLong),
  email: emailSchema,
  topic: Yup.string().trim().max(120, contactMessages.tooLong),
  message: Yup.string()
    .trim()
    .required(contactMessages.messageRequired)
    .min(MESSAGE_MIN_LENGTH, contactMessages.messageShort)
    .max(2000, contactMessages.tooLong),
});
