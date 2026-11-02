import * as Yup from "yup";

// Both checkboxes gate continuing — the mock shows two separate
// confirmations (one inside the agreement card, one after the "what this
// means" box and the under-18 warning), not one checkbox shown twice.

export const waiverMessages = {
  acceptTermsRequired: "Հաստատեք, որ կարդացել եք պայմանները",
  acceptAgreementRequired: "Հաստատեք համաձայնագիրը շարունակելու համար",
} as const;

export interface WaiverValues {
  acceptedTerms: boolean;
  acceptedAgreement: boolean;
}

export const waiverInitialValues: WaiverValues = {
  acceptedTerms: false,
  acceptedAgreement: false,
};

export const waiverSchema = Yup.object({
  acceptedTerms: Yup.boolean().required(waiverMessages.acceptTermsRequired).oneOf([true], waiverMessages.acceptTermsRequired),
  acceptedAgreement: Yup.boolean()
    .required(waiverMessages.acceptAgreementRequired)
    .oneOf([true], waiverMessages.acceptAgreementRequired),
});
