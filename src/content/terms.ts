// Terms of Use page ("Terms — MP-22"). Transcribed from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — it needs a check against the source frame plus a
// native-speaker legal review, same as the other screens built this way.
// "արտադուրս" (outdoor) spelled to match the established usage in site.ts,
// not the screenshot's compressed rendering of the word.

export const termsCopy = {
  breadcrumb: {
    label: "Ուղենիշ",
    items: [
      { label: "Գլխավոր", href: "/" },
      // ⚠️ No "/legal" index page exists yet — same stub-link convention
      // already used by the Contact page's "/support" breadcrumb step.
      { label: "Իրավական", href: "/legal" },
      { label: "Օգտագործման պայմաններ", href: "/terms" },
    ],
  },
  eyebrow: "ԻՐԱՎԱԿԱՆ",
  title: "Օգտագործման պայմաններ",
  updatedLabel: "Վերջին թարմացումը՝",
  updatedDate: "12.09.2026",
  // No PDF has actually been generated/uploaded — this points at a document
  // that doesn't exist on disk yet, matching the page's own "pending" bits.
  download: { label: "Ներբեռնել PDF", href: "/documents/odex-terms.pdf" },

  intro:
    "Այս պայմանները կարգավորում են Odex հարթակի օգտագործումը մասնակիցների և ակումբների կողմից: Հարթակը միջնորդ է՝ միջոցառում անցկացնում է ակումբը, ոչ թե Odex-ը:",

  tocLabel: "Բաժինների ցանկ",

  sections: [
    {
      id: "what-is-odex",
      heading: "1. Ինչ է Odex-ը",
      body: "Odex-ը հարթակ է, որտեղ ստուգված ակումբները հրապարակում են արտադուրս միջոցառումներ, իսկ մասնակիցները ամրագրում են տեղեր: Պայմանագիրը կնքվում է մասնակցի և ակումբի միջև: Odex-ը գանձում է միջնորդավճար յուրաքանչյուր վճարված տոմսից:",
    },
    {
      id: "account-and-age",
      heading: "2. Հաշիվ և տարիք",
      body: "16 տարեկանից ցածր մասնակիցները գրանցվում են խնամակալի հաստատմամբ: Դուք պատասխանատու եք ձեր հաշվի տվյալների ճշտության համար՝ ներառյալ առողջական տվյալներն ու արտակարգ կապը:",
    },
    {
      id: "booking-and-payment",
      heading: "3. Ամրագրում և վճարում",
      body: "Տեղը պահվում է 15 րոպե վճարման ընթացքում: Վճարումը ընդունվում է Odex-ի միջոցով, և գումարը պահվում է մինչև միջոցառման ավարտը:",
    },
    {
      id: "cancellation-and-refund",
      heading: "4. Չեղարկում և վերադարձ",
      body: "Մինչև 48 ժամ՝ ամբողջական վերադարձ: 24–48 ժամից՝ 50%: 24 ժամից պակաս՝ վերադարձ չկա: Եթե ակումբը չեղարկում է, վերադարձն ամբողջական է անկախ ժամկետից:",
    },
    {
      id: "risk-and-liability",
      heading: "5. Ռիսկ և պատասխանատվություն",
      body: "Արտադուրս միջոցառումները կապված են ֆիզիկական ռիսկի հետ: Մասնակիցը հաստատում է ռիսկը համաձայնագիր ընդունելով ամրագրման ժամանակ:",
    },
    {
      id: "club-obligations",
      heading: "6. Ակումբների պարտավորությունները",
      body: "Ակումբը պարտավոր է ունենալ վավեր գրանցում, հավաստագրված ուղեկցորդներ և գործող ապահովագրություն:",
    },
  ],

  notice: {
    icon: "lock" as const,
    body: "Հարցեր այս փաստաթղթի վերաբերյալ՝ legal@odex.am",
  },
} as const;
