import * as Yup from "yup";
import { emailSchema, fullNameSchema, hasPhoneNumber } from "@/validations/common.validation";

// Validation for the public sign-up form (full name, email, optional phone,
// password, terms agreement). Kept apart from the form so the rules (and
// their messages) can be reused and tested without rendering anything.
//
// Messages say WHAT TO DO, not what went wrong, and fire on BLUR, never on
// keystroke — Armenian input methods produce intermediate states that would
// trigger constant false errors. Written for this build, needs a
// native-speaker pass.

export const signUpMessages = {
  phoneInvalid: "Ստուգեք հեռախոսահամարը, օրինակ՝ +374 __ ___ ___",
  passwordRequired: "Ստեղծեք գաղտնաբառ",
  passwordShort: "Ավելացրեք առնվազն 8 նիշ",
  passwordNeedsDigit: "Ավելացրեք առնվազն մեկ թիվ",
  agreementRequired: "Պետք է ընդունեք պայմանները շարունակելու համար",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

const PHONE_CHARS = /^[\d\s()+-]+$/;

export interface SignUpValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agreeToTerms: boolean;
}

export const signUpInitialValues: SignUpValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  agreeToTerms: false,
};

// No explicit `Yup.ObjectSchema<SignUpValues>` annotation: forcing `phone`'s
// inferred type to match `SignUpValues.phone: string` previously required
// `.defined()`, which doesn't just affect TypeScript — it adds a REAL runtime
// check that rejects `""` through Formik's per-field blur validation
// (`Yup.reach`), even though `.defined()` alone passes a direct
// `schema.validate()` call. Confirmed live: it blocked submitting with the
// phone field empty, the one case it's explicitly optional for. Left
// untyped and inferred instead.
export const signUpSchema = Yup.object({
  fullName: fullNameSchema,
  email: emailSchema,
  // Optional — "ոչ պարտադիր" in the design — so only validated when filled in.
  phone: Yup.string()
    .trim()
    .test(
      "phone-valid",
      signUpMessages.phoneInvalid,
      (value) => !value || (PHONE_CHARS.test(value) && hasPhoneNumber(value)),
    ),
  password: Yup.string()
    .required(signUpMessages.passwordRequired)
    .min(PASSWORD_MIN_LENGTH, signUpMessages.passwordShort)
    .matches(/\d/, signUpMessages.passwordNeedsDigit),
  agreeToTerms: Yup.boolean()
    .required(signUpMessages.agreementRequired)
    .oneOf([true], signUpMessages.agreementRequired),
});
