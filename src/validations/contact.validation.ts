import * as Yup from "yup";
import { emailSchema } from "./common.validation";

export const contactEmailSchema = Yup.object({
  email: emailSchema,
});

export type ContactEmailValues = Yup.InferType<typeof contactEmailSchema>;
