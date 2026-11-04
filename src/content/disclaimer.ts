// Disclaimer page ("Disclaimer — MP-24"). Transcribed from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — it needs a check against the source frame plus a
// native-speaker legal review, same as Terms/Privacy
// ([[src/content/terms.ts]], [[src/content/privacy.ts]]).
// Section 2's activity list was garbled under screenshot compression;
// "մագլցումը" (climbing) is read against the established
// ACTIVITY_TYPE_LABELS.climbing = "Մագլցում" in taxonomy.ts.

export const disclaimerCopy = {
  breadcrumb: {
    label: "Ուղենիշ",
    items: [
      { label: "Գլխավոր", href: "/" },
      // Same "/legal" stub-link convention as terms.ts/privacy.ts — no index page exists yet.
      { label: "Իրավական", href: "/legal" },
      { label: "Պատասխանատվության հրաժարում", href: "/disclaimer" },
    ],
  },
  eyebrow: "ԻՐԱՎԱԿԱՆ",
  title: "Պատասխանատվության հրաժարում",
  updatedLabel: "Վերջին թարմացումը՝",
  updatedDate: "12.09.2026",
  download: { label: "Ներբեռնել PDF", href: "/documents/odex-disclaimer.pdf" },

  intro:
    "Կարդացեք ուշադիր՝ սա բացատրում է, թե ինչի համար է պատասխանատու ակումբը, ինչի համար՝ Odex-ը, և ինչի համար՝ դուք:",

  tocLabel: "Բաժինների ցանկ",

  sections: [
    {
      id: "club-runs-the-event",
      heading: "1. Միջոցառումն անցկացնում է ակումբը",
      body: "Odex-ը չի կազմակերպում միջոցառումները: Երթուղին, անվտանգությունը և ուղեկցորդների որակավորումը ակումբի պատասխանատվությունն են:",
    },
    {
      id: "physical-risk",
      heading: "2. Ֆիզիկական ռիսկ",
      body: "Լեռնային արահետները, մագլցումը և ջրային միջոցառումները ներառում են վնասվածքի ռիսկ: Մասնակցությունը ձեր ազատ ընտրությունն է:",
    },
    {
      id: "weather-and-cancellation",
      heading: "3. Եղանակ և չեղարկում",
      body: "Ակումբը կարող է չեղարկել կամ փոխել երթուղին անվտանգության նկատառումներով: Այդ դեպքում վերադարձն ամբողջական է:",
    },
    {
      id: "health-data-accuracy",
      heading: "4. Առողջական տվյալների ճշտություն",
      body: "Սխալ կամ թերի առողջական տվյալները կարող են վտանգել ձեզ: Ուղեկցորդը գործում է այն տվյալների հիման վրա, որոնք դուք տրամադրել եք:",
    },
    {
      id: "insurance",
      heading: "5. Ապահովագրություն",
      body: "Ակումբների ապահովագրությունը ծածկում է կազմակերպչական պատասխանատվությունը: Անձնական ապահովագրությունը ձեր որոշումն է:",
    },
  ],

  notice: {
    icon: "lock" as const,
    body: "Հարցեր այս փաստաթղթի վերաբերյալ՝ legal@odex.am",
  },
} as const;
