import * as Yup from "yup";

// Validation for the booking account step (email + password), asked the first
// time someone books — not at general sign-up. Kept apart from the form so the
// rules (and their messages) can be reused and tested without rendering anything.
//
// Messages say WHAT TO DO, not what went wrong ("Figma: Form field"). They
// fire on BLUR, never on keystroke — Armenian input methods produce
// intermediate states that would trigger constant false errors. The messages are
// written for this build and need a native-speaker pass.

export const bookingAccountMessages = {
  emailRequired: "Մուտքագրեք էլ. փոստի հասցեն",
  emailInvalid: "Ստուգեք հասցեն. այն պետք է լինի name@mail.com տեսքով",
  passwordRequired: "Ստեղծեք գաղտնաբառ",
  passwordShort: "Գաղտնաբառը պետք է ունենա առնվազն 8 նիշ",
  passwordWeak: "Ավելացրեք առնվազն մեկ տառ և մեկ թիվ",
  confirmRequired: "Կրկնեք գաղտնաբառը",
  confirmMismatch: "Գաղտնաբառերը չեն համընկնում. մուտքագրեք նույնը",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

export interface BookingAccountValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const bookingAccountInitialValues: BookingAccountValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const bookingAccountSchema: Yup.ObjectSchema<BookingAccountValues> = Yup.object({
  email: Yup.string()
    .trim()
    .required(bookingAccountMessages.emailRequired)
    .email(bookingAccountMessages.emailInvalid),
  password: Yup.string()
    .required(bookingAccountMessages.passwordRequired)
    .min(PASSWORD_MIN_LENGTH, bookingAccountMessages.passwordShort)
    // A letter (any script — Armenian included) and a digit.
    .matches(/\p{L}/u, bookingAccountMessages.passwordWeak)
    .matches(/\d/, bookingAccountMessages.passwordWeak),
  confirmPassword: Yup.string()
    .required(bookingAccountMessages.confirmRequired)
    .oneOf([Yup.ref("password")], bookingAccountMessages.confirmMismatch),
});
