import * as Yup from "yup";
import {
  fullNameSchema,
  hasPhoneNumber,
  phoneSchema,
  validationMessages,
} from "./common.validation";

// Every participant needs a name, a phone and an emergency contact — not just
// the person paying (Figma "Participant form"). Health is a plain opt-in
// checkbox: details live in the account, never asked at checkout.
export const participantSchema = Yup.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  emergencyContact: Yup.string()
    .trim()
    .required(validationMessages.required)
    .max(120, validationMessages.tooLong)
    // Free text like "Արամ Օրինակյան · (091) 55-0022" — must carry a phone number.
    .test(
      "has-phone",
      validationMessages.emergencyContact,
      (value) => !value || hasPhoneNumber(value.replace(/[^\d\s()+-]/g, "")),
    ),
  hasHealthCondition: Yup.boolean().required(),
});

export type ParticipantValues = Yup.InferType<typeof participantSchema>;

export const participantInitialValues: ParticipantValues = {
  fullName: "",
  phone: "",
  emergencyContact: "",
  hasHealthCondition: false,
};
