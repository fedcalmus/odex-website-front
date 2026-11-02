// Shared across every screen under the (auth) layout — just the back-button
// label, which is consistent everywhere. The lock-icon text next to it is
// NOT shared: confirmed different per screen (icon-only at sign-up and club
// sign-up, "Անվտանգ մուտք" at login, "Ապահով վճարում" in the profile-completion
// flow — see `content/complete-profile.ts`), so each copy object below sets
// its own `secure`.
export const authHeaderCopy = {
  back: "Հետ",
} as const;

// Public sign-up screen ("Sign up — MP-11a"). Transcribed directly from the
// design screenshot, not the Figma file itself (no file link was given), so
// treat the longer sentences (lead, agreement label, club line) as
// best-effort — they need a check against the source Figma frame plus a
// native-speaker pass, same as the rest of this file.
export const signUpCopy = {
  // Icon-only — confirmed from both this mock and the club sign-up one, no text next to the lock.
  header: { back: authHeaderCopy.back, secure: "" },
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
  header: { back: authHeaderCopy.back, secure: "Անվտանգ մուտք" },
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
  // Not in the Login mock itself, but it links to a real flow now — written
  // for this build, needs a native-speaker pass same as the rest of this file.
  forgotPassword: { label: "Մոռացե՞լ եք գաղտնաբառը", href: "/reset-password" },
  submit: "Մուտք գործել",
  resetSuccess: "Գաղտնաբառը փոխվեց։ Մուտք գործեք նոր գաղտնաբառով։",
  // ⚠️ No phone-based sign-in flow exists in the app yet — this points at a
  // page that isn't built (/login/phone). Flagging rather than silently
  // dropping it or wiring it to something it doesn't do.
  phoneLogin: { label: "Մուտք հեռախոսահամարով", href: "/login/phone" },
  noAccount: { text: "Հաշիվ չունե՞ք", actionLabel: "Գրանցվել", href: "/register" },
  // ⚠️ Best-effort reading — confirm exact wording against Figma.
  clubCta: { text: "Ակումբ ե՞ք ներկայացնում", actionLabel: "Գրանցեք ակումբը", href: "/clubs/register" },
} as const;

// "Check your inbox" screen shown right after sign-up (Figma "Auth · Verify
// email — MP-13e"). Transcribed directly from the design screenshot, not
// the Figma file itself (no file link was given), so treat this as
// best-effort — it needs a check against the source frame plus a
// native-speaker pass, same as the other screens built this way.
//
// There is no email-sending backend yet (see docs/email-verification-api.md)
// — the "resend" button just restarts its own countdown, and "Շարունակել
// առանց հաստատման" (continue without confirming) is the only real way
// forward, matching the notice's own claim that confirmation isn't required
// to browse, only to book.
export const verifyEmailCopy = {
  // Icon-only — same convention as sign-up/club sign-up, no text next to the lock.
  header: { back: authHeaderCopy.back, secure: "" },
  title: "Հաստատեք էլ. փոստը",
  lead: (email: string) => `Նամակ ուղարկվեց ${email} հասցեին: Բացեք այն և սեղմեք հաստատման հղումը:`,
  fallbackEmail: "ձեր էլ. փոստին",
  notice: "Կարող եք գնել միջոցառումները առանց հաստատման, բայց ամրագրելու համար հաստատումը պարտադիր է:",
  openMail: "Բացել փոստը",
  resend: "Ուղարկել կրկին",
  // One uniformly lime link, not muted-text + a lime action word — confirmed
  // from the mock, same treatment as `continueWithoutVerifying` below.
  wrongAddress: { label: "Սխա՞լ հասցե · Փոխել", href: "/register" },
  continueWithoutVerifying: { label: "Շարունակել առանց հաստատման", href: "/complete-profile/waiver" },
} as const;

// Password reset — 3 screens (Figma "Auth · Reset request — MP-13a",
// "· Reset sent — MP-13b", "· New password — MP-13c"). Transcribed directly
// from the design screenshots, not the Figma file itself (no file link was
// given), so treat this as best-effort — it needs a check against the
// source frames plus a native-speaker pass, same as the other screens built
// this way.
//
// There is no backend yet (see docs/password-reset-api.md) — "Ուղարկել
// հղումը" just moves to the "sent" screen, "resend" there only restarts its
// own countdown, and the "new password" screen's submit goes straight to
// login.
export const resetPasswordCopy = {
  // Icon-only — same convention as sign-up/club sign-up, no text next to the lock.
  header: { back: authHeaderCopy.back, secure: "" },

  request: {
    title: "Վերականգնել գաղտնաբառը",
    // ⚠️ The mock's lead line under the title is a single "." with no other
    // visible text — reads like an emptied Figma text layer, not real copy.
    // Treated as "no lead" here rather than reproducing a stray period.
    fields: {
      email: {
        label: "Էլ. փոստ",
        placeholder: "anush@example.am",
        helper: "Կուղարկենք գաղտնաբառի վերականգնման հղում",
      },
    },
    submit: "Ուղարկել հղումը",
    // Unlike other footer links in this app, the mock renders this whole
    // line as one uniformly lime link, not muted-text + a lime action word.
    rememberedPassword: { label: "Հիշեցի՞ք գաղտնաբառը · Մուտք", href: "/login" },
  },

  sent: {
    title: "Ստուգեք ձեր փոստը",
    lead: (email: string) => `Վերականգնման հղումն ուղարկվեց ${email} հասցեին: Այն գործում է 30 րոպե:`,
    fallbackEmail: "ձեր էլ. փոստին",
    notice: "Չե՞ք գտնում նամակը: Ստուգեք «Սպամ» պանակը կամ սպասեք 2 րոպե՝ կրկին ուղարկելուց առաջ:",
    openMail: "Բացել փոստը",
    resend: "Ուղարկել կրկին",
    wrongAddress: { label: "Սխա՞լ հասցե · Փոխել", href: "/reset-password" },
  },

  newPassword: {
    title: "Նոր գաղտնաբառ",
    lead: "Առնվազն 8 նիշ և մեկ թիվ: Հին գաղտնաբառը կդադարի գործել:",
    fields: {
      password: { label: "Նոր գաղտնաբառ", helper: "Առնվազն 8 նիշ և մեկ թիվ" },
      confirmPassword: { label: "Կրկնեք գաղտնաբառը" },
    },
    // No visible label on the submit button in the mock — just a trailing
    // arrow icon. `aria-label` is required for assistive tech since the
    // button otherwise has no accessible name.
    submitAriaLabel: "Հաստատել նոր գաղտնաբառը",
  },
} as const;
