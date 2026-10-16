// Contact page ("Contact — MP-29"). Transcribed directly from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — it needs a check against the source frame plus a
// native-speaker pass, same as the other screens built this way.

export const contactCopy = {
  breadcrumb: {
    label: "Ուղենիշ", // written for this build — accessible name of the breadcrumb nav
    items: [
      { label: "Գլխավոր", href: "/" },
      { label: "Աջակցություն", href: "/support" },
      { label: "Կապ", href: "/contact" },
    ],
  },
  eyebrow: "ԿԱՊ",
  title: "Կապ մեզ հետ",
  lead: "Գրեք մեզ ցանկացած հարցով՝ ամրագրում, ակումբի գրանցում, համագործակցություն կամ մամուլ:",

  form: {
    title: "Ուղարկեք հաղորդագրություն",
    fields: {
      name: { label: "Անուն", placeholder: "Անուշ Օրինակյան" },
      email: { label: "Էլ. փոստ", placeholder: "anush@example.am" },
      // ⚠️ The mock's placeholder ("Choose a topic") reads like a dropdown
      // prompt, but the screenshot shows a plain text box — no chevron, no
      // option list. Built as free text to match the visual exactly.
      topic: { label: "Թեմա", placeholder: "Ընտրեք թեման" },
      message: { label: "Հաղորդագրություն", placeholder: "Գրեք ձեր հարցը…" },
    },
    submit: "Ուղարկել",
    responseTime: "Պատասխանում ենք մինչև 2 աշխատանքային ժամում:",
    success: {
      title: "Հաղորդագրությունը ուղարկված է",
      body: "Պատասխանում ենք մինչև 2 աշխատանքային ժամում:",
      again: "Ուղարկել ևս մեկ հաղորդագրություն",
    },
  },

  info: {
    email: { label: "Էլ. փոստ", value: "hello@odex.am" },
    phone: { label: "Հեռախոս", value: "(010) 55-00-22" },
    address: { label: "Հասցե", value: "Երևան, Բաղրամյան 24" },
    hours: { label: "Աշխատաժամեր", value: "Երկ–Ուրբ · 10:00–19:00" },
  },

  // The mock itself shows an empty placeholder box with this exact caption —
  // no map provider has been chosen yet, so there's nothing to embed.
  map: { placeholder: "Քարտեզի մատակարարը որոշված չէ" },

  press: {
    title: "Մամուլի համար",
    body: "press@odex.am — լոգոներ, լուսանկարներ և տվյալներ:",
  },
} as const;
