// Checkout, step 1 "Participants" ("Checkout · 1 Participants (2 tickets) —
// MP-04b", Figma 270:11436). Verbatim from Figma except strings marked "written
// for this build" (the frame's form fields are placeholders, and a few
// accessible names aren't in the design).

export const checkoutCopy = {
  header: { secure: "Ապահով վճարում" },
  stepperLabel: "Ամրագրման քայլեր", // written for this build
  steps: {
    participants: { label: "Մասնակիցներ", hint: (tickets: number) => `${tickets} տոմս` },
    payment: { label: "Վճարում", hint: "քարտ կամ Idram" },
    confirmation: { label: "Հաստատում", hint: "տոմսը փոստով" },
  },
  stepOfTotal: (step: number, total: number) => `Քայլ ${step} / ${total}`,

  title: "Ո՞վ է գնում",
  lead: "Ամեն մասնակցի համար պետք է առանձին տվյալներ։ Ուղեկցորդը դրանք տեսնում է մասնակիցների ցուցակում։",

  quantity: {
    title: "Մասնակիցներ",
    maxNote: (max: number) => `Առավելագույնը ${max} տոմս մեկ ամրագրման համար`,
    group: "Տոմսերի քանակ", // written for this build
    decrease: "Պակասեցնել", // written for this build
    increase: "Ավելացնել", // written for this build
  },

  buyer: {
    title: (name: string) => `1 · ${name} (դուք)`,
    details: (health: string, contact: string) => `${health} · ${contact} · պրոֆիլից`,
    change: "Փոխել",
  },

  participant: {
    title: (index: number) => `${index} · ${ORDINALS[index] ?? `${index}-րդ`} մասնակից`,
    modeGroup: "Ո՞վ կլրացնի տվյալները", // written for this build
    self: { title: "Ես կլրացնեմ", description: "Գիտեմ նրա տվյալները" },
    invite: { title: "Ուղարկել հղում", description: "Ինքը կլրացնի" },
    fields: {
      firstName: { label: "Անուն", helper: "Ինչպես գրված է փաստաթղթում" }, // written for this build
      lastName: { label: "Ազգանուն", helper: "Ինչպես գրված է փաստաթղթում" }, // written for this build
      healthNotes: { label: "Առողջական նշումներ", helper: "Ուղեկցորդը կիմանա՝ ինչ հաշվի առնել" }, // written for this build
      allergies: { label: "Ալերգիաներ", helper: "Սնունդ, դեղամիջոցներ, միջատների խայթոց" }, // written for this build
      emergencyName: { label: "Շտապ կապի անուն", helper: "Մեկը, ում կզանգենք արտակարգ դեպքում" }, // written for this build
      emergencyPhone: { label: "Շտապ կապի հեռախոս", helper: "Օրինակ՝ 091 55 00 22" }, // written for this build
    },
    optional: "ոչ պարտադիր",
    waiver: "Հաստատում եմ, որ այս մասնակիցը ծանոթ է ռիսկի պայմաններին և համաձայն է դրանց։",
  },

  healthNotice:
    "Չգիտե՞ք նրա առողջական վիճակը։ Ընտրեք «Ուղարկել հղում» — ավելի լավ է, որ ինքը լրացնի, քան թե դատարկ մնա։",

  actions: { back: "Միջոցառման էջ", continue: "Շարունակել" },

  summary: {
    title: "Ձեր պատվերը",
    hold: "Տեղերը պահվում են", // written for this build
    tickets: (count: number) => `Տոմս × ${count}`,
    fee: "Սպասարկման վճար",
    total: "Ընդամենը",
  },
} as const;

// "2 · Երկրորդ մասնակից" — Armenian ordinals (written for this build beyond the second).
const ORDINALS: Record<number, string> = { 2: "Երկրորդ", 3: "Երրորդ", 4: "Չորրորդ" };

/** A booking holds at most this many tickets (Figma: "Առավելագույնը 4 տոմս"). */
export const MAX_TICKETS_PER_BOOKING = 4;
/** Places are held for this long while the buyer completes checkout. */
export const HOLD_MINUTES = 15;
