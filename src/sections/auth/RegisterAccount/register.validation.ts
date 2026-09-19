import * as Yup from "yup";

// Validation for registration step 1. Kept apart from the form so the rules
// (and their messages) can be reused and tested without rendering anything.
//
// Messages say WHAT TO DO, not what went wrong ("Figma: Form field"). They
// fire on BLUR, never on keystroke — Armenian input methods produce
// intermediate states that would trigger constant false errors. The messages are
// written for this build and need a native-speaker pass.

export const registerMessages = {
  emailRequired: "Մուտքագրեք էլ. փոստի հասցեն",
  emailInvalid: "Ստուգեք հասցեն. այն պետք է լինի name@mail.com տեսքով",
  passwordRequired: "Ստեղծեք գաղտնաբառ",
  passwordShort: "Գաղտնաբառը պետք է ունենա առնվազն 8 նիշ",
  passwordWeak: "Ավելացրեք առնվազն մեկ տառ և մեկ թիվ",
  confirmRequired: "Կրկնեք գաղտնաբառը",
  confirmMismatch: "Գաղտնաբառերը չեն համընկնում. մուտքագրեք նույնը",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

export interface RegisterAccountValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerInitialValues: RegisterAccountValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerAccountSchema: Yup.ObjectSchema<RegisterAccountValues> = Yup.object({
  email: Yup.string()
    .trim()
    .required(registerMessages.emailRequired)
    .email(registerMessages.emailInvalid),
  password: Yup.string()
    .required(registerMessages.passwordRequired)
    .min(PASSWORD_MIN_LENGTH, registerMessages.passwordShort)
    // A letter (any script — Armenian included) and a digit.
    .matches(/\p{L}/u, registerMessages.passwordWeak)
    .matches(/\d/, registerMessages.passwordWeak),
  confirmPassword: Yup.string()
    .required(registerMessages.confirmRequired)
    .oneOf([Yup.ref("password")], registerMessages.confirmMismatch),
});
