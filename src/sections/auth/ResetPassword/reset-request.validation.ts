import * as Yup from "yup";
import { emailSchema } from "@/validations/common.validation";

export interface ResetRequestValues {
  email: string;
}

export const resetRequestInitialValues: ResetRequestValues = {
  email: "",
};

export const resetRequestSchema = Yup.object({
  email: emailSchema,
});
