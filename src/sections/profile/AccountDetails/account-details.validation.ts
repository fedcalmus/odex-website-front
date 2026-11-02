import * as Yup from "yup";

// Validation for the account-details step (email + password), the first
// screen of the post-sign-up profile-completion flow. Kept apart from the
// form so the rules (and their messages) can be reused and tested without
// rendering anything.
//
// Messages say WHAT TO DO, not what went wrong ("Figma: Form field"). They
// fire on BLUR, never on keystroke — Armenian input methods produce
// intermediate states that would trigger constant false errors. The messages are
// written for this build and need a native-speaker pass.

export const accountDetailsMessages = {
  emailRequired: "Մուտքագրեք էլ. փոստի հասցեն",
  emailInvalid: "Ստուգեք հասցեն. այն պետք է լինի name@mail.com տեսքով",
  passwordRequired: "Ստեղծեք գաղտնաբառ",
  passwordShort: "Գաղտնաբառը պետք է ունենա առնվազն 8 նիշ",
  passwordWeak: "Ավելացրեք առնվազն մեկ տառ և մեկ թիվ",
  confirmRequired: "Կրկնեք գաղտնաբառը",
  confirmMismatch: "Գաղտնաբառերը չեն համընկնում. մուտքագրեք նույնը",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

export interface AccountDetailsValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const accountDetailsInitialValues: AccountDetailsValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const accountDetailsSchema: Yup.ObjectSchema<AccountDetailsValues> = Yup.object({
  email: Yup.string()
    .trim()
    .required(accountDetailsMessages.emailRequired)
    .email(accountDetailsMessages.emailInvalid),
  password: Yup.string()
    .required(accountDetailsMessages.passwordRequired)
    .min(PASSWORD_MIN_LENGTH, accountDetailsMessages.passwordShort)
    // A letter (any script — Armenian included) and a digit.
    .matches(/\p{L}/u, accountDetailsMessages.passwordWeak)
    .matches(/\d/, accountDetailsMessages.passwordWeak),
  confirmPassword: Yup.string()
    .required(accountDetailsMessages.confirmRequired)
    .oneOf([Yup.ref("password")], accountDetailsMessages.confirmMismatch),
});
