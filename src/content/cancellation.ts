// Cancellation & refunds page ("Cancellation & refunds — MP-40").
// Transcribed from the design screenshot, not the Figma file itself (no
// file link was given), so treat this as best-effort — it needs a check
// against the source frame plus a native-speaker legal review, same as the
// other legal pages ([[src/content/terms.ts]], [[src/content/privacy.ts]],
// [[src/content/disclaimer.ts]], [[src/content/cookies.ts]]).

export const cancellationCopy = {
  breadcrumb: {
    label: "Ուղենիշ",
    items: [
      { label: "Գլխավոր", href: "/" },
      // Same "/legal" stub-link convention as the other legal pages — no index page exists yet.
      { label: "Իրավական", href: "/legal" },
      { label: "Չեղարկում և վերադարձ", href: "/refunds" },
    ],
  },
  eyebrow: "ԻՐԱՎԱԿԱՆ",
  title: "Չեղարկում և վերադարձ",
  updatedLabel: "Վերջին թարմացումը՝",
  updatedDate: "07.10.2026",
  download: { label: "Ներբեռնել PDF", href: "/documents/odex-cancellation-refunds.pdf" },

  intro:
    "Մեկ կանոն բոլոր ակումբների համար: Վերադարձի չափը կախված է նրանից, թե մեկնումից որքան առաջ եք չեղարկում, և թե ով է չեղարկել:",

  tocLabel: "Բաժինների ցանկ",
  tocHeading: "ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ",

  scale: {
    label: "ՄԵԿՆՈՒՄԻՑ ԱՌԱՋ",
    tiers: [
      { percent: "100%", window: "48+ ժ", tone: "full" },
      { percent: "50%", window: "24–48 ժ", tone: "partial" },
      { percent: "0%", window: "<24 ժ", tone: "none" },
    ],
    notice: "Ակումբը չեղարկում է կամ եղանակը վատանում՝ միշտ 100%:",
  },

  sections: [
    {
      id: "when-you-cancel",
      heading: "1. Երբ չեղարկում եք դուք",
      body: "48+ ժամ առաջ՝ 100%, 24-48 ժամ՝ 50%, 24 ժամից պակաս՝ վերադարձ չկա: Ժամը հաշվվում է հավաքի ժամից:",
    },
    {
      id: "when-club-cancels",
      heading: "2. Երբ չեղարկում է ակումբը",
      body: "Ամբողջ գումարը՝ անկախ ժամկետից, ներառյալ եղանակային կամ անվտանգության պատճառով չեղարկումը:",
    },
    {
      id: "waitlist",
      heading: "3. Սպասման ցուցակ",
      body: "Եթե ազատված տեղը վերցնում է սպասման ցուցակից մեկը, ստանում եք 100%՝ նույնիսկ 48 ժամից պակաս մնացած դեպքում:",
    },
    {
      id: "how-refunds-work",
      heading: "4. Ինչպես է վերադարձվում գումարը",
      body: "Նույն քարտին կամ դրամապանակին, 3–5 աշխատանքային օրում: Odex-ի միջնորդավճարը նույնպես վերադարձվում է:",
    },
    {
      id: "no-show",
      heading: "5. Չներկայանալ",
      body: "Եթե չեք եկել և չեք չեղարկել, վերադարձ չկա: Ակումբը կարող է բացառություն անել իր կողմից:",
    },
    {
      id: "disputes",
      heading: "6. Վեճեր",
      body: "Գրեք մեզ 14 օրվա ընթացքում: Որոշումը կայացնում ենք 5 աշխատանքային օրում:",
    },
  ],

  notice: {
    icon: "lock" as const,
    body: "Հարցեր այս փաստաթղթի վերաբերյալ՝ legal@odex.am",
  },
} as const;
