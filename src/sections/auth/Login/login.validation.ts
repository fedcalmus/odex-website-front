import * as Yup from "yup";
import { emailSchema } from "@/validations/common.validation";

// Validation for sign-in. Unlike sign-up, the password isn't being CREATED
// here, so there's no min-length/digit rule to enforce client-side — just
// that something was typed. The server is the source of truth for whether
// the credentials are actually correct.

export const loginMessages = {
  passwordRequired: "Մուտքագրեք գաղտնաբառը",
} as const;

export interface LoginValues {
  email: string;
  password: string;
}

export const loginInitialValues: LoginValues = {
  email: "",
  password: "",
};

export const loginSchema: Yup.ObjectSchema<LoginValues> = Yup.object({
  email: emailSchema,
  password: Yup.string().required(loginMessages.passwordRequired),
});
