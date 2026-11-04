// Support page ("Support — MP-28"). Transcribed from the design screenshot,
// not the Figma file itself (no file link was given), so treat this as
// best-effort — it needs a check against the source frame plus a
// native-speaker pass, same as the other screens built this way.
//
// The mock shows FAQ rows as plain chevron links with no visible answer —
// this is built as a real accordion, so the answer copy below was written
// for this build, grounded in the policies already defined in
// [[src/content/cancellation.ts]] and [[src/content/privacy.ts]] rather than
// invented from nothing. Needs the same legal/native-speaker review as those.

import type { IconName } from "@/components/Icon";

export interface SupportCategory {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export interface SupportFaq {
  id: string;
  question: string;
  answer: string;
  /** Which `SupportCategory.id`s this answers — drives the category-tile quick filter. */
  categories: readonly string[];
}

export const supportCopy = {
  breadcrumb: {
    label: "Ուղենիշ",
    items: [
      { label: "Գլխավոր", href: "/" },
      { label: "Աջակցություն", href: "/support" },
    ],
  },
  eyebrow: "ԱՋԱԿՑՈՒԹՅՈՒՆ",
  title: "Ինչո՞վ կարող ենք օգնել",

  search: {
    label: "Որոնել հարցերի մեջ",
    placeholder: "Փնտրեք հարց, օրինակ՝ չեղարկում",
  },

  categories: [
    {
      id: "booking",
      icon: "ticket",
      title: "Ամրագրում և տոմսեր",
      description: "Ինչպես ամրագրել, փոխել կամ ջնջել տոմսը",
    },
    {
      id: "payment",
      icon: "credit-card",
      title: "Վճարում և վերադարձ",
      description: "Վճարման եղանակներ, վերադարձի ժամկետներ",
    },
    {
      id: "safety",
      icon: "info",
      title: "Անվտանգություն",
      description: "Առողջական տվյալներ, ուղեկցորդներ, ապահովագրություն",
    },
    {
      id: "clubs",
      icon: "users",
      title: "Ակումբների համար",
      description: "Գրանցում, միջոցառումներ, փոխանցումներ",
    },
    {
      id: "account",
      icon: "user",
      title: "Հաշիվ",
      description: "Մուտք, գաղտնաբառ, ծանուցումներ",
    },
    {
      id: "event-issue",
      icon: "alert-circle",
      title: "Խնդիր միջոցառման հետ",
      description: "Չեղարկում, ուշացում, վեճ",
    },
  ] as const satisfies readonly SupportCategory[],

  faqHeading: "Հաճախ տրվող հարցեր",

  faqs: [
    {
      id: "cancel-and-refund",
      question: "Ինչպես չեղարկել ամրագրումը և ստանալ վերադարձ",
      answer:
        "Բացեք «Իմ ամրագրումները» բաժինը, ընտրեք միջոցառումը և սեղմեք «Չեղարկել»: Վերադարձի չափը կախված է նրանից, թե մեկնումից որքան առաջ եք չեղարկում՝ 48+ ժամ՝ 100%, 24–48 ժամ՝ 50%, 24 ժամից պակաս՝ վերադարձ չկա: Մանրամասները՝ Չեղարկում և վերադարձ էջում:",
      categories: ["booking", "payment"],
    },
    {
      id: "find-ticket-qr",
      question: "Որտեղ գտնել իմ տոմսը և QR կոդը",
      answer:
        "Ձեր տոմսերը հասանելի են «Իմ տոմսերը» բաժնում՝ հաշվի մուտքից հետո, ինչպես նաև ուղարկվում են հաստատման էլ. նամակով: QR կոդը ներկայացրեք հավաքատեղում՝ ուղեկցորդին ստուգման համար:",
      categories: ["booking"],
    },
    {
      id: "guide-not-reached",
      question: "Ի՞նչ անեմ, եթե ուղեկցորդը չի կապվել",
      answer:
        "Եթե մեկնարկից 24 ժամ առաջ ուղեկցորդը դեռ չի կապվել, գրեք մեզ Աջակցության բաժնից կամ ուղղակիորեն ակումբին: Սովորաբար պատասխանում ենք մինչև 2 ժամում:",
      categories: ["safety", "event-issue"],
    },
    {
      id: "transfer-ticket",
      question: "Ինչպես փոխանցել տոմսը ընկերոջը",
      answer:
        "«Իմ տոմսերը» բաժնում ընտրեք տոմսը և սեղմեք «Փոխանցել»՝ նշելով ստացողի էլ. փոստը: Փոխանցումը հնարավոր է մինչև միջոցառման մեկնարկը:",
      categories: ["booking"],
    },
    {
      id: "who-sees-health-data",
      question: "Ո՞վ է տեսնում իմ առողջական տվյալները",
      answer:
        "Ձեր առողջական տվյալները տեսնում է միայն այն ակումբը, որի տոմսը գնել եք, և նշանակված ուղեկցորդները՝ մեկնարկից 24 ժամ առաջ և ավարտից 30 օր հետո: Դրանք երբեք հրապարակային չեն: Մանրամասները՝ Գաղտնիության քաղաքականություն էջում:",
      categories: ["safety", "account"],
    },
    {
      id: "weather-changes",
      question: "Ի՞նչ է լինում, եթե եղանակը փոխվում է",
      answer:
        "Ակումբը կարող է չեղարկել կամ փոխել երթուղին անվտանգության նկատառումներով: Նման դեպքերում վերադարձն ամբողջական է՝ անկախ մեկնումից մնացած ժամանակից:",
      categories: ["event-issue", "payment"],
    },
  ] as const satisfies readonly SupportFaq[],

  emptyState: {
    title: "Ոչինչ չի գտնվել",
    description: "Փորձեք այլ բառեր, կամ գրեք մեզ ուղղակիորեն ստորև:",
  },

  contactHeading: "Չգտա՞ք պատասխանը",

  contactOptions: [
    {
      icon: "message-circle" as const,
      title: "Գրել մեզ",
      description: "Պատասխանում ենք մինչև 2 ժամում",
      action: { label: "Բացել զրույցը", href: "/contact" },
    },
    {
      icon: "mail" as const,
      title: "Էլ. փոստ",
      description: "hello@odex.am",
      action: { label: "Գրել նամակ", href: "mailto:hello@odex.am" },
    },
    {
      icon: "phone" as const,
      title: "Հեռախոս",
      description: "(010) 55-00-22 · 10:00–19:00",
      action: { label: "Զանգահարել", href: "tel:+37410550022" },
    },
  ],
} as const;
