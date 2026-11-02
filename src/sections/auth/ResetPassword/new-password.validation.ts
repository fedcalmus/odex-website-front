import * as Yup from "yup";

export const newPasswordMessages = {
  passwordRequired: "Ստեղծեք նոր գաղտնաբառ",
  passwordShort: "Ավելացրեք առնվազն 8 նիշ",
  passwordNeedsDigit: "Ավելացրեք առնվազն մեկ թիվ",
  confirmRequired: "Կրկնեք գաղտնաբառը",
  confirmMismatch: "Գաղտնաբառերը չեն համընկնում. մուտքագրեք նույնը",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

export interface NewPasswordValues {
  password: string;
  confirmPassword: string;
}

export const newPasswordInitialValues: NewPasswordValues = {
  password: "",
  confirmPassword: "",
};

export const newPasswordSchema: Yup.ObjectSchema<NewPasswordValues> = Yup.object({
  password: Yup.string()
    .required(newPasswordMessages.passwordRequired)
    .min(PASSWORD_MIN_LENGTH, newPasswordMessages.passwordShort)
    .matches(/\d/, newPasswordMessages.passwordNeedsDigit),
  confirmPassword: Yup.string()
    .required(newPasswordMessages.confirmRequired)
    .oneOf([Yup.ref("password")], newPasswordMessages.confirmMismatch),
});
