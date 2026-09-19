import * as Yup from "yup";

// Validation for the checkout "participants" step, one block per extra ticket.
// A block is filled in by the buyer ("self") or sent to the participant as a
// link ("invite") — an invited participant fills their own details, so nothing
// is required of the buyer for them. Messages are written for this build.

export type ParticipantMode = "self" | "invite";

export interface ParticipantValues {
  mode: ParticipantMode;
  firstName: string;
  lastName: string;
  /** Optional. */
  healthNotes: string;
  /** Optional. */
  allergies: string;
  emergencyName: string;
  emergencyPhone: string;
  /** The participant knows and accepts the risk terms. */
  waiver: boolean;
}

export interface CheckoutValues {
  participants: ParticipantValues[];
}

export const emptyParticipant = (): ParticipantValues => ({
  mode: "self",
  firstName: "",
  lastName: "",
  healthNotes: "",
  allergies: "",
  emergencyName: "",
  emergencyPhone: "",
  waiver: false,
});

export const participantMessages = {
  firstName: "Մուտքագրեք մասնակցի անունը",
  lastName: "Մուտքագրեք մասնակցի ազգանունը",
  emergencyName: "Մուտքագրեք մեկին, ում կարող ենք զանգահարել արտակարգ դեպքում",
  emergencyPhone: "Մուտքագրեք հեռախոսահամար. օրինակ՝ 091 55 00 22",
  emergencyPhoneInvalid: "Ստուգեք համարը. հայաստանյան համարը 8 թվանշան է՝ 091 55 00 22",
  waiver: "Հաստատեք, որ մասնակիցը ծանոթ է ռիսկի պայմաններին",
} as const;

/** 8 digits after an optional +374 / 374 / 0 prefix; spaces, dashes and brackets are ignored. */
export function isArmenianPhone(value: string): boolean {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("374")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.length === 8;
}

// Required only when the buyer fills the block in themselves.
const requiredWhenSelf = (message: string) =>
  Yup.string()
    .default("")
    .when("mode", { is: "self", then: (schema) => schema.trim().required(message) });

export const participantSchema = Yup.object({
  mode: Yup.mixed<ParticipantMode>().oneOf(["self", "invite"]).required(),
  firstName: requiredWhenSelf(participantMessages.firstName),
  lastName: requiredWhenSelf(participantMessages.lastName),
  healthNotes: Yup.string().default(""),
  allergies: Yup.string().default(""),
  emergencyName: requiredWhenSelf(participantMessages.emergencyName),
  emergencyPhone: Yup.string()
    .default("")
    .when("mode", {
      is: "self",
      then: (schema) =>
        schema
          .trim()
          .required(participantMessages.emergencyPhone)
          .test("armenian-phone", participantMessages.emergencyPhoneInvalid, (value) =>
            isArmenianPhone(value ?? ""),
          ),
    }),
  waiver: Yup.boolean()
    .default(false)
    .when("mode", { is: "self", then: (schema) => schema.oneOf([true], participantMessages.waiver) }),
});

export const checkoutSchema = Yup.object({
  participants: Yup.array().of(participantSchema).required(),
});
