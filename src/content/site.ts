import type { FooterProps } from "@/components/Footer";
import type { HeaderProps } from "@/components/Header";
import type { LocaleOption } from "@/components/LanguageSwitcher";

// Site-wide chrome content (header, footer). Copy is verbatim from Figma
// "Marketplace nav" / "Marketplace footer". Routes are the English paths the
// pages will live at — most don't exist yet.

export const locales: LocaleOption[] = [
  { code: "hy", label: "ՀԱՅ", name: "Հայերեն", href: "/" },
  // No i18n routing yet: these links 404 until the locale routes exist.
  { code: "en", label: "ENG", name: "English", href: "/en" },
  { code: "ru", label: "РУС", name: "Русский", href: "/ru" },
];

export const currentLocale = "hy";

// The accessible labels below are not in Figma — they were written for this
// build and should be reviewed by a native speaker.
export const skipLinkLabel = "Անցնել հիմնական բովանդակությանը";

export const header: HeaderProps = {
  nav: [
    // The homepage is the events marketplace, so `/` keeps "Events" lit (as in Figma).
    { label: "Միջոցառումներ", href: "/events", alsoActiveOn: ["/"] },
    { label: "Ակումբներ", href: "/clubs" },
    { label: "Վայրեր", href: "/places" },
    { label: "Մեր մասին", href: "/about" },
  ],
  search: { action: "/events", placeholder: "Գագաթ, ակումբ…", label: "Որոնում" },
  auth: {
    signIn: { label: "Մուտք", href: "/login" },
    signUp: { label: "Գրանցվել", href: "/register" },
  },
  locales,
  currentLocale,
  labels: {
    primaryNav: "Հիմնական մենյու",
    menu: "Մենյու",
    closeMenu: "Փակել մենյուն",
    language: "Լեզու",
  },
};

export const footer: FooterProps = {
  description: "Հայաստանի արտադուրս միջոցառումների շուկա։ Երևան, Հայաստան։",
  columns: [
    {
      title: "ՀԱՐԹԱԿ",
      links: [
        { label: "Միջոցառումներ", href: "/events" },
        { label: "Ակումբներ", href: "/clubs" },
        { label: "Վայրեր", href: "/places" },
        { label: "Մեր մասին", href: "/about" },
      ],
    },
    {
      title: "ԱԿՈՒՄԲՆԵՐԻ ՀԱՄԱՐ",
      links: [
        { label: "Գրանցել ակումբը", href: "/clubs/register" },
        { label: "Գնացուցակ", href: "/pricing" },
        // Figma flags this: a guide-certification programme isn't in the PRD or
        // the admin panel, so this points at a page nobody has specified.
        { label: "Գիդի հավաստագիր", href: "/guide-certification" },
        { label: "Աջակցություն", href: "/support" },
      ],
    },
    {
      title: "ԻՐԱՎԱԿԱՆ",
      links: [
        { label: "Օգտագործման պայմաններ", href: "/terms" },
        { label: "Գաղտնիություն", href: "/privacy" },
        { label: "Պատասխանատվության հրաժարում", href: "/disclaimer" },
        { label: "Կապ", href: "/contact" },
      ],
    },
  ],
  clubCta: {
    text: "Ակումբ ունե՞ս։ Առաջին երեք ամիսն՝ առանց միջնորդավճարի։",
    actionLabel: "Գրանցել ակումբը",
    href: "/clubs/register",
  },
  locales,
  currentLocale,
  languageLabel: "Լեզու",
  legalName: "ODex",
};
