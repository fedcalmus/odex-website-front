import * as Yup from "yup";
import { fullNameSchema, phoneSchema } from "@/validations/common.validation";

export const emergencyContactMessages = {
  relationshipRequired: "Ընտրեք, թե ով է ձեզ համար",
} as const;

export interface EmergencyContactValues {
  name: string;
  relationship: string;
  phone: string;
  smsNotifications: boolean;
  saveForFuture: boolean;
}

export const emergencyContactInitialValues: EmergencyContactValues = {
  name: "",
  relationship: "",
  phone: "",
  smsNotifications: true,
  saveForFuture: true,
};

export const emergencyContactSchema = Yup.object({
  name: fullNameSchema,
  relationship: Yup.string().trim().required(emergencyContactMessages.relationshipRequired),
  phone: phoneSchema,
  smsNotifications: Yup.boolean().required(),
  saveForFuture: Yup.boolean().required(),
});
