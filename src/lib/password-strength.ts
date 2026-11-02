// Scoring for PasswordStrengthMeter (Figma "Auth · New password — MP-13c").
// 1 = below the app's own minimum (8 chars + a digit, enforced by every
// password field's own Yup schema) — this score should never actually be
// submittable, the meter just shows it while typing.

export type PasswordStrength = 1 | 2 | 3 | 4;

const LOWER = /[a-zա-և]/; // Latin + Armenian lowercase
const UPPER = /[A-ZԱ-Ֆ]/; // Latin + Armenian uppercase
const DIGIT = /\d/;
const SYMBOL = /[^a-zA-Z0-9Ա-և]/;

export function getPasswordStrength(value: string): PasswordStrength {
  const meetsMinimum = value.length >= 8 && DIGIT.test(value);
  if (!meetsMinimum) return 1;

  let bonus = 0;
  if (LOWER.test(value) && UPPER.test(value)) bonus++;
  if (SYMBOL.test(value)) bonus++;
  if (value.length >= 12) bonus++;

  if (bonus >= 3) return 4;
  if (bonus >= 1) return 3;
  return 2;
}
