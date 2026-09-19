import * as Yup from "yup";

// Error copy says what to DO, not what went wrong (Figma "Mobile field · Error").
// `emailIncomplete` is the exact string from the Figma error state; the rest
// follow the same tone and should be reviewed by whoever owns the Armenian copy.
export const validationMessages = {
  required: "Լրացրու այս դաշտը",
  emailIncomplete: "Հասցեն թերի է — ավելացրու տիրույթը",
  fullName: "Մուտքագրիր անունը և ազգանունը",
  phone: "Մուտքագրիր հեռախոսահամարը, օրինակ՝ (093) 442-118",
  emergencyContact: "Նշիր շտապ կոնտակտի անունը և հեռախոսահամարը",
  tooLong: "Չափազանց երկար է",
} as const;

const PHONE_CHARS = /^[\d\s()+-]+$/;
// Lowest / highest digit counts seen in the Figma samples, with room for +374.
const PHONE_MIN_DIGITS = 8;
const PHONE_MAX_DIGITS = 12;

const digitCount = (value: string) => value.replace(/\D/g, "").length;

export const hasPhoneNumber = (value: string) => {
  const digits = digitCount(value);
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
};

// Requires a dot in the domain: Yup's built-in `.email()` accepts `aram@odex`,
// which is exactly the incomplete address the Figma error state rejects.
export const emailSchema = Yup.string()
  .trim()
  .required(validationMessages.required)
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, validationMessages.emailIncomplete);

export const fullNameSchema = Yup.string()
  .trim()
  .required(validationMessages.required)
  .max(80, validationMessages.tooLong)
  .test(
    "first-and-last-name",
    validationMessages.fullName,
    (value) => !value || value.split(/\s+/).length >= 2,
  );

export const phoneSchema = Yup.string()
  .trim()
  .required(validationMessages.required)
  .matches(PHONE_CHARS, validationMessages.phone)
  .test("phone-length", validationMessages.phone, (value) => !value || hasPhoneNumber(value));
