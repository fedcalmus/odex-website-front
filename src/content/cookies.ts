// Cookie policy page ("Cookie policy — MP-39"). Transcribed from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — it needs a check against the source frame plus a
// native-speaker legal review, same as the other legal pages
// ([[src/content/terms.ts]], [[src/content/privacy.ts]], [[src/content/disclaimer.ts]]).

export const cookiesCopy = {
  breadcrumb: {
    label: "Ուղենիշ",
    items: [
      { label: "Գլխավոր", href: "/" },
      // Same "/legal" stub-link convention as the other legal pages — no index page exists yet.
      { label: "Իրավական", href: "/legal" },
      { label: "Թխուկների քաղաքականություն", href: "/cookies" },
    ],
  },
  eyebrow: "ԻՐԱՎԱԿԱՆ",
  title: "Թխուկների քաղաքականություն",
  updatedLabel: "Վերջին թարմացումը՝",
  updatedDate: "07.10.2026",
  download: { label: "Ներբեռնել PDF", href: "/documents/odex-cookies.pdf" },

  intro:
    "Odex-ն օգտագործում է թխուկներ, որ կայքն աշխատի, հիշի ձեր լեզուն և հասկանանք, որ էջերն են օգտակար: Անհրաժեշտներից բացի բոլորը միացնում եք միայն դուք:",

  tocLabel: "Բաժինների ցանկ",
  // Only Cookie policy's mock shows this overline above the TOC list.
  tocHeading: "ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ",

  preferences: {
    necessary: { label: "Անհրաժեշտ", status: "Միշտ միացված" },
    statistics: { label: "Վիճակագրություն", retention: "13 ամիս" },
    marketing: { label: "Մարքեթինգ", retention: "6 ամիս" },
    save: "Պահպանել ընտրությունը",
    saved: "Ընտրությունը պահպանված է",
  },

  sections: [
    {
      id: "what-are-cookies",
      heading: "1. Ինչ են թխուկները",
      body: "Փոքր ֆայլեր, որոնք կայքը պահում է ձեր զննարկչում: Դրանցից ոչ մեկը չի պարունակում ձեր առողջական կամ վճարային տվյալները:",
    },
    {
      id: "necessary-cookies",
      heading: "2. Անհրաժեշտ թխուկներ",
      body: "Մուտքը, ամրագրման 15 րոպեանոց պահում, լեզուն և անվտանգությունը: Առանց դրանց կայքը չի աշխատի, ուստի չեն անջատվում:",
    },
    {
      id: "statistics-cookies",
      heading: "3. Վիճակագրություն",
      body: "Անանուն տվյալներ այն մասին, թե որ էջերն են բացվում: Պահվում են 13 ամիս:",
    },
    {
      id: "marketing-cookies",
      heading: "4. Մարքեթինգ",
      body: "Թույլ է տալիս ցույց տալ Odex-ի գովազդը այլ կայքերում: Լռելյայն անջատված է:",
    },
    {
      id: "how-to-change",
      heading: "5. Ինչպես փոխել ընտրությունը",
      body: "Ցանկացած պահի՝ կայքի ներքևի «Թխուկների կարգավորումներ» հղումից կամ Կարգավորումներ › Գաղտնիություն բաժնից:",
    },
  ],

  notice: {
    icon: "lock" as const,
    body: "Հարցեր այս փաստաթղթի վերաբերյալ՝ legal@odex.am",
  },
} as const;
