// Shared header copy for every screen under the (auth) layout — booking
// account, sign-up and login all use the same stripped FocusHeader, so its
// copy lives here instead of inside one page's object.
//
// `secure` was "Ապահով վճարում" ("secure payment") until the Login mock
// ("Login — MP-13") showed this exact header with "Անվտանգ մուտք" ("secure
// sign-in") instead — a better fit for sign-up/login too, since neither
// involves a payment. Kept as one shared string across all three screens.
export const authHeaderCopy = {
  back: "Հետ",
  secure: "Անվտանգ մուտք",
} as const;

// Booking account step ("Register · 1 Account — MP-11a", Figma 327:23176)
// copy. Verbatim from Figma except strings marked "written for this build":
// the Figma frame uses placeholder fields, so the labels and helpers are
// ours. Needs a native-speaker pass.
//
// This is asked the first time someone books a spot, not at general
// sign-up — see `signUpCopy` below for the public /register screen.
export const bookingAccountCopy = {
  header: authHeaderCopy,
  stepperLabel: "Գրանցման քայլեր", // written for this build
  steps: [
    { label: "Հաշիվ", hint: "էլ. փոստ և գաղտնաբառ" },
    { label: "Համաձայնագիր", hint: "ռիսկի ընդունում" },
    { label: "Առողջություն", hint: "ոչ պարտադիր հիմա" },
    { label: "Կապ", hint: "արտակարգ դեպքի համար" },
  ],
  stepOfTotal: (step: number, total: number) => `Քայլ ${step} / ${total}`,
  title: "Ստեղծել հաշիվ",
  lead: "Տոմսերը գալիս են էլ. փոստով և պահվում ձեր հաշվում։",
  fields: {
    email: { label: "Էլ. փոստ", helper: "Այստեղ կգա ձեր տոմսը" },
    password: { label: "Գաղտնաբառ", helper: "Առնվազն 8 նիշ՝ տառեր և թվեր" },
    confirmPassword: { label: "Կրկնեք գաղտնաբառը", helper: "Նույնը՝ սխալից խուսափելու համար" },
  },
  emailNotice:
    "Օգտագործեք այն էլ. փոստը, որին հասանելիություն ունեք սարում — տոմսը և ուղեկցորդի հաղորդագրությունները գնում են այնտեղ։",
  haveAccount: "Արդեն ունե՞ք հաշիվ · Մուտք",
  submit: "Շարունակել",
} as const;

// Public sign-up screen ("Sign up — MP-11a"). Transcribed directly from the
// design screenshot, not the Figma file itself (no file link was given), so
// treat the longer sentences (lead, agreement label, club line) as
// best-effort — they need a check against the source Figma frame plus a
// native-speaker pass, same as the rest of this file.
export const signUpCopy = {
  header: authHeaderCopy,
  title: "Ստեղծել հաշիվ",
  // ⚠️ Least certain line in this file — the opening two words were hard to
  // make out at this image resolution; re-check against Figma.
  lead: "Չոր դատարկ. Առողջական տվյալները և արտակարգ կապը կպահանջենք միայն առաջին ամրագրման ժամանակ։",
  social: {
    google: "Շարունակել Google-ով",
    apple: "Շարունակել Apple-ով",
    divider: "կամ էլ. փոստով",
  },
  fields: {
    fullName: {
      label: "Անուն ազգանուն",
      placeholder: "Անուշ Օրինակյան",
      helper: "Այսպես կերևա ձեր պրոֆիլում և տոմսում",
    },
    email: {
      label: "Էլ. փոստ",
      placeholder: "anush@example.am",
      helper: "Տոմսերը և հիշեցումները գալիս են այստեղ",
    },
    phone: {
      label: "Հեռախոս",
      optionalLabel: "ոչ պարտադիր",
      placeholder: "+374 __ ___ ___",
      helper: "SMS հիշեցումների և ուղեկցորդի կապի համար",
    },
    password: {
      label: "Գաղտնաբառ",
      helper: "Առնվազն 8 նիշ և մեկ թիվ",
    },
  },
  agreement: {
    prefix: "Համաձայն եմ ",
    terms: "Օգտագործման պայմաններին",
    middle: " և ",
    privacy: "Գաղտնիության քաղաքականությանը",
    termsHref: "/terms",
    privacyHref: "/privacy",
  },
  submit: "Ստեղծել հաշիվ",
  // ⚠️ Best-effort reading — confirm exact wording against Figma.
  clubCta: { text: "Ակումբ ե՞ք ներկայացնում", actionLabel: "Գրանցեք ակումբը", href: "/clubs/register" },
} as const;

// Public sign-in screen ("Login — MP-13"). Same transcription caveat as
// `signUpCopy` above — read from the design screenshot, not the Figma file
// itself, so needs a check against the source frame plus a native-speaker
// pass.
export const loginCopy = {
  header: authHeaderCopy,
  title: "Բարի վերադարձ",
  social: {
    google: "Շարունակել Google-ով",
    apple: "Շարունակել Apple-ով",
    divider: "կամ էլ. փոստով",
  },
  fields: {
    email: { label: "Էլ. փոստ", placeholder: "anush@example.am" },
    password: { label: "Գաղտնաբառ" },
  },
  submit: "Մուտք գործել",
  // ⚠️ No phone-based sign-in flow exists in the app yet — this points at a
  // page that isn't built (/login/phone). Flagging rather than silently
  // dropping it or wiring it to something it doesn't do.
  phoneLogin: { label: "Մուտք հեռախոսահամարով", href: "/login/phone" },
  noAccount: { text: "Հաշիվ չունե՞ք", actionLabel: "Գրանցվել", href: "/register" },
  // ⚠️ Best-effort reading — confirm exact wording against Figma.
  clubCta: { text: "Ակումբ ե՞ք ներկայացնում", actionLabel: "Գրանցեք ակումբը", href: "/clubs/register" },
} as const;
