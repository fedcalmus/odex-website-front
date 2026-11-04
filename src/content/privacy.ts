// Privacy Policy page ("Privacy — MP-23"). Transcribed from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — it needs a check against the source frame plus a
// native-speaker legal review, same as Terms ([[src/content/terms.ts]]).
// A couple of words in the source screenshot render ambiguously under
// compression ("մեկնարկից"/"հաշվի" below) — read against neighbouring,
// unambiguous usage of the same words elsewhere on the page and in terms.ts.

export const privacyCopy = {
  breadcrumb: {
    label: "Ուղենիշ",
    items: [
      { label: "Գլխավոր", href: "/" },
      // Same "/legal" stub-link convention as terms.ts — no index page exists yet.
      { label: "Իրավական", href: "/legal" },
      { label: "Գաղտնիության քաղաքականություն", href: "/privacy" },
    ],
  },
  eyebrow: "ԻՐԱՎԱԿԱՆ",
  title: "Գաղտնիության քաղաքականություն",
  updatedLabel: "Վերջին թարմացումը՝",
  updatedDate: "12.09.2026",
  download: { label: "Ներբեռնել PDF", href: "/documents/odex-privacy.pdf" },

  intro:
    "Այս փաստաթուղթը բացատրում է, թե ինչ տվյալներ ենք հավաքում, ինչու և ում հետ ենք կիսվում դրանցով: Առողջական տվյալները մշակվում են առանձին կանոնով:",

  tocLabel: "Բաժինների ցանկ",

  sections: [
    {
      id: "what-we-collect",
      heading: "1. Ինչ տվյալներ ենք հավաքում",
      body: "Հաշվի տվյալներ՝ անուն, էլ. փոստ, հեռախոս, քաղաք: Ամրագրման տվյալներ: Առողջական տվյալներ, եթե լրացրել եք դրանք: Վճարման տվյալները մշակում է վճարային մատակարարը, ոչ թե Odex-ը:",
    },
    {
      id: "health-data",
      heading: "2. Առողջական տվյալներ",
      body: "Սրանք երբեք հրապարակային չեն: Տեսնում է միայն այն ակումբը, որի տոմս գնել եք, և նշանակված ուղեկցորդները՝ մեկնարկից 24 ժամ առաջ և ավարտից 30 օր հետո: Յուրաքանչյուր արտահանում գրանցվում է մատյանում:",
    },
    {
      id: "who-we-share-with",
      heading: "3. Ում հետ ենք կիսվում",
      body: "Ակումբի հետ՝ մասնակիցների ցուցակը: Վճարային մատակարարի հետ՝ գործարքի տվյալները: Պետական մարմինների հետ՝ միայն օրենքի պահանջով: Տվյալները չեն վաճառվում:",
    },
    {
      id: "retention",
      heading: "4. Որքան ենք պահում",
      body: "Ամրագրումների պատմությունը՝ 3 տարի հաշվապահական պահանջով: Առողջական տվյալները՝ մինչև հաշվի ջնջումը կամ ձեր հեռացնելը:",
    },
    {
      id: "your-rights",
      heading: "5. Ձեր իրավունքները",
      body: "Կարող եք ներբեռնել, ուղղել կամ ջնջել ձեր տվյալները հաշվի կարգավորումներից: Հարցումը կատարվում է 48 ժամվա ընթացքում:",
    },
  ],

  notice: {
    icon: "lock" as const,
    body: "Հարցեր այս փաստաթղթի վերաբերյալ՝ legal@odex.am",
  },
} as const;
