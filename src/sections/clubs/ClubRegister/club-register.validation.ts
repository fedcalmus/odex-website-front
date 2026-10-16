import * as Yup from "yup";
import { emailSchema, fullNameSchema, phoneSchema } from "@/validations/common.validation";

// Validation for the club sign-up wizard. Messages say WHAT TO DO, not what
// went wrong, and fire on BLUR, never on keystroke — Armenian input methods
// produce intermediate states that would trigger constant false errors.
// Written for this build, needs a native-speaker pass.

export const clubRegisterMessages = {
  passwordRequired: "Ստեղծեք գաղտնաբառ",
  passwordShort: "Ավելացրեք առնվազն 8 նիշ",
  passwordNeedsDigit: "Ավելացրեք առնվազն մեկ թիվ",
  agreementRequired: "Պետք է ընդունեք պայմանները շարունակելու համար",
  clubNameRequired: "Մուտքագրեք ակումբի անվանումը",
  legalNameRequired: "Մուտքագրեք իրավաբանական անվանումը",
  tooLong: "Չափազանց երկար է",
  tinInvalid: "ՀՎՀՀ-ն պետք է ունենա 8 նիշ",
  regionRequired: "Ընտրեք մարզը",
  activitiesRequired: "Ընտրեք առնվազն մեկ ուղղություն",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

// Step 1 — Account (the contact person reached during verification).
export interface ClubAccountValues {
  contactName: string;
  email: string;
  phone: string;
  password: string;
  agreeToTerms: boolean;
}

export const clubAccountInitialValues: ClubAccountValues = {
  contactName: "",
  email: "",
  phone: "",
  password: "",
  agreeToTerms: false,
};

export const clubAccountSchema: Yup.ObjectSchema<ClubAccountValues> = Yup.object({
  contactName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: Yup.string()
    .required(clubRegisterMessages.passwordRequired)
    .min(PASSWORD_MIN_LENGTH, clubRegisterMessages.passwordShort)
    .matches(/\d/, clubRegisterMessages.passwordNeedsDigit),
  agreeToTerms: Yup.boolean()
    .required(clubRegisterMessages.agreementRequired)
    .oneOf([true], clubRegisterMessages.agreementRequired),
});

// Step 2 — Club details.
export interface ClubDetailsValues {
  clubName: string;
  legalName: string;
  tin: string;
  region: string;
  activities: string[];
}

export const clubDetailsInitialValues: ClubDetailsValues = {
  clubName: "",
  legalName: "",
  tin: "",
  region: "",
  activities: [],
};

export const clubDetailsSchema: Yup.ObjectSchema<ClubDetailsValues> = Yup.object({
  clubName: Yup.string().trim().required(clubRegisterMessages.clubNameRequired).max(80, clubRegisterMessages.tooLong),
  legalName: Yup.string()
    .trim()
    .required(clubRegisterMessages.legalNameRequired)
    .max(120, clubRegisterMessages.tooLong),
  tin: Yup.string().trim().required(clubRegisterMessages.tinInvalid).matches(/^\d{8}$/, clubRegisterMessages.tinInvalid),
  region: Yup.string().trim().required(clubRegisterMessages.regionRequired),
  activities: Yup.array(Yup.string().required())
    .min(1, clubRegisterMessages.activitiesRequired)
    .required(clubRegisterMessages.activitiesRequired),
});

// Step 3 — Documents. Files only ever live in memory (no backend yet), so
// this step isn't Yup-validated — see DocumentsStep for its light client-side
// check (the insurance policy is required, guide uploads aren't).
export interface ClubGuideEntry {
  id: string;
  name: string;
  file: File | null;
}
