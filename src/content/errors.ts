// 404 page ("Not found — MP-42a"). Transcribed from the design screenshot,
// not the Figma file itself (no file link was given), so treat this as
// best-effort — it needs a check against the source frame plus a
// native-speaker pass, same as the other screens built this way.
//
// No Figma frame was given for the runtime error boundary — its copy below
// is written for this build to match the 404 page's visual language
// (StatusPage), not transcribed from a design.

export const notFoundCopy = {
  code: "404",
  title: "Այս արահետը տանում է ոչ մի տեղ",
  description: "Էջը տեղափոխվել է կամ երբեք գոյություն չի ունեցել: Փորձեք որոնել կամ սկսեք գլխավոր էջից:",
  search: {
    action: "/events",
    placeholder: "Փնտրել միջոցառում, ակումբ, վայր",
    label: "Որոնում",
    submit: "Որոնել",
  },
  quickLinksLabel: "Արագ հղումներ",
  quickLinks: [
    { label: "Գլխավոր", href: "/" },
    { label: "Միջոցառումներ", href: "/events" },
    { label: "Վայրեր", href: "/places" },
    { label: "Օգնություն", href: "/support" },
  ],
} as const;

export const errorPageCopy = {
  title: "Ինչ-որ բան այն չէ",
  description: "Սխալ է տեղի ունեցել էջը բեռնելիս: Խնդիրն արդեն գրանցված է. փորձեք կրկին կամ վերադարձեք գլխավոր էջ:",
  retry: "Կրկին փորձել",
  home: "Վերադառնալ գլխավոր էջ",
} as const;
