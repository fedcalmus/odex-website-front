import type { HeaderUser } from "@/components/Header";
import type { BadgeCategory } from "@/data/social";
import { CURRENT_USER } from "@/data/user";

// Copy for the signed-in "My profile" section (Figma "MP-09" family: Profile,
// My events, Saved, My following, Follow requests, Ticket). Account screens
// aren't in Figma's content export the way the public marketplace is —
// labels below were written for this build and should get a native-speaker
// pass, same caveat as the rest of this app's Armenian a11y copy.

export const profileFullName = `${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`;

export const headerUser: HeaderUser = {
  name: profileFullName,
  avatar: CURRENT_USER.avatar,
  profileHref: "/profile",
  // No notifications centre exists yet — stubbed to the profile page itself,
  // same convention as this app's other not-yet-built destinations.
  notificationsHref: "/profile",
  notificationsLabel: "Ծանուցումներ",
};

export const profileBreadcrumbLabel = "Իմ պրոֆիլը";
export const homeBreadcrumb = { label: "Գլխավոր", href: "/" };
export const profileBreadcrumb = { label: profileBreadcrumbLabel, href: "/profile" };
// Accessible name for the breadcrumb nav landmark — same label already used
// by the other breadcrumb trails in this app (see content/place-detail.ts).
export const breadcrumbNavLabel = "Ուղի";

export interface ProfileNavItem {
  key: string;
  href: string;
  label: string;
}

export const PROFILE_NAV: readonly ProfileNavItem[] = [
  { key: "profile", href: "/profile", label: "Պրոֆիլ" },
  { key: "activities", href: "/profile/activities", label: "Իմ միջոցառումները" },
  { key: "tickets", href: "/profile/tickets", label: "Տոմսեր" },
  { key: "saved", href: "/profile/saved", label: "Պահպանված" },
  { key: "settings", href: "/profile/settings", label: "Կարգավորումներ" },
];

export const statLabels = {
  distance: "ԱՆՑԱԾ ՃԱՆԱՊԱՐՀ",
  ascent: "ԵՆԹԱԴՐՎԱԾ ԲԱՐՁՐՈՒԹՅՈՒՆ",
  completed: "ՄԻՋՈՑԱՌՈՒՄ",
  badges: "ԲԵՋ",
};

export const badgeCategoryLabels: Record<BadgeCategory, string> = {
  all: "Բոլորը",
  peaks: "Գագաթներ",
  distance: "Հեռավորություն",
  endurance: "Հանդուրժողականություն",
};

export const profileOverviewCopy = {
  title: "Պրոֆիլ",
  qrAction: "Իմ QR կոդը",
  memberSince: (year: number) => `${CURRENT_USER.location} · Միացել է ${year} թվականին`,
  badgesTitle: "Բեյջեր",
  badgesCount: (earned: number, total: number) => `${earned} / ${total}`,
  followRequestsTitle: "Հետևելու հայցեր",
  followRequestsView: "Դիտել",
  nextBadgeTitle: "Հաջորդ բեյջը",
  nextBadgeDistance: (remainingKm: number) => `Մնացել է ${remainingKm} կմ`,
  followingTitle: "Հետևում եմ",
  followingManage: "Կառավարել",
  followersSuffix: "հետևորդ",
  activityEyebrow: "ԱՐՇԱՎՆԵՐ",
  activityTitle: "Սեզոնի գրանցամատյան",
  activityNote: (count: number) =>
    `${count} միջոցառում այս տարի։ Ամենաակտիվ ամիսը՝ հուլիս։ Ձմռանը արշավները քիչ են՝ եղանակային պատճառներով։`,
  recentEyebrow: "ՎԵՐՋԻՆ ԱՐՇԱՎՆԵՐԸ",
  recentTitle: "Որտեղ եք եղել",
  recentLink: (count: number) => `Բոլոր ${count}-ը`,
  galleryTitle: (count: number) => `${count} լուսանկար պատկերասրահում`,
  galleryAdd: "+ Ավելացնել լուսանկար",
  completedMetaDistance: (distanceKm: number, ascentM: number) => `+${distanceKm} կմ +${ascentM} մ`,
};

export const activitiesCopy = {
  title: "Իմ միջոցառումները",
  summary: (count: number, nights: number, distanceKm: number) =>
    `${count} առաջիկա · ${nights} ավարտված · ${distanceKm} կմ անցած ճանապարհի`,
  newBooking: "Գտնել նոր միջոցառում",
  status: {
    upcoming: "Առաջիկա",
    completed: "Ավարտված",
    cancelled: "Չեղարկված",
    saved: "Պահպանված",
  },
  activeTicketLabel: "Ակտիվ ամրագրում",
  nextDepartureLabel: "Հաջորդ մեկնումը",
  navigate: "Նավիգացիա",
  cancelBooking: "Չեղարկել ամրագրումը",
  rate: "Գնահատել",
  ticket: "Տոմս",
  details: "Մանրամասներ",
  validTicket: "Վավեր տոմս",
  sectionUpcoming: "Առաջիկա",
  sectionCompleted: "Ավարտված",
  sectionCancelled: "Չեղարկված է",
  completedSeeAll: (count: number, distanceKm: number) => `${count} միջոցառում · ${distanceKm} կմ`,
  emptyTitle: "Առաջիկա միջոցառում չկա",
  emptyDescription: "Գտեք հաջորդ արշավը մեր կատալոգում։",
  emptyAction: "Դիտել միջոցառումները",
};

export const ticketsCopy = {
  title: "Տոմսեր",
  summary: (count: number) => `${count} ակտիվ տոմս`,
  open: "Բացել տոմսը",
  empty: "Ակտիվ տոմս չկա",
};

export const ticketDetailCopy = {
  downloadPdf: "Ներբեռնել PDF",
  dateLabel: "Ամսաթիվ",
  placeLabel: "Հանդիպման վայր",
  guideLabel: "Գիդ",
  navigate: "Նավիգացիա",
  cancel: "Չեղարկել ամրագրումը",
  cancelDeadline: (label: string) => `Չեղարկում մինչև ${label}՝ անվճար`,
  routeTitle: "Որ ու ուր գալ",
  meeting: "Հանդիպման վայր",
  departure: "Մեկնակետի կետ",
  returnPoint: "Վերադարձ",
  warning: "Խմբերը միավորվում են ճշգրիտ ժամին։ Ուշացողներին սպասելը ճամփորդությանը չի ազդի:",
  contactTitle: "Կապ",
  driverRole: "ՈՒՂԵՎՈՐԻՉ",
  guideRole: "ՀԵՏԵՆԱՊԱՀ",
  emergencyRole: "ԱՐՏԱԿԱՐԳ",
  emergencyNumber: "911",
  gearTitle: "Անհրաժեշտ սարքավորում",
  validLabel: "Վավեր",
};

export const savedCopy = {
  title: "Պահպանված",
  filters: { all: "Բոլորը", upcoming: "Առաջիկա", past: "Անցած" },
  book: "Ամրագրել",
  remove: "Հեռացնել պահպանվածներից",
  notificationsTitle: "Ծանուցումներ",
  notificationsBody: "Ստանաք ծանուցում, երբ պահպանված միջոցառման տեղերը սկսում են սակավանալ:",
  notificationsAction: "Կարգավորել",
  fromClubsTitle: "Ակումբներից",
  emptyTitle: "Պահպանված միջոցառում չկա",
  emptyDescription: "Սրտիկով նշեք միջոցառումները, որ հետո հեշտ գտնեք:",
  emptyAction: "Դիտել միջոցառումները",
};

export const followingCopy = {
  title: "Հետևում եմ",
  tabs: { clubs: "Ակումբներ", people: "Մարդիկ", followers: "Հետևորդներ" },
  searchClubsPlaceholder: "Փնտրել ակումբ",
  searchPeoplePlaceholder: "Փնտրել անունով",
  follow: "Հետևել",
  following: "Հետևում եմ",
  addBack: "Ավելացնել",
  requestsBannerTitle: (count: number) => `Հետևելու հայցեր · ${count}`,
  requestsBannerBody: (name: string, othersCount: number) =>
    othersCount > 0 ? `${name}-ը և եւս ${othersCount} մարդ ուզում են հետևել ձեզ:` : `${name}-ը ուզում է հետևել ձեզ:`,
  requestsBannerAction: "Դիտել",
  clubsNote: "«Հետևում եմ» կոճակը թույլ է տալիս ստանալ ակումբի նոր միջոցառումների մասին ծանուցումներ:",
  peopleNote: "Հետևելը թույլ է տալիս տեսնել նրանց հրապարակային ակտիվությունը՝ ում արշավների, ում ակումբների։",
  followersNote: "Փակ պրոֆիլի դեպքում նոր հետևորդները նախ հայց են ուղարկում․ հայցերը տեսնում եք միայն դուք:",
  eventsCountSuffix: "միջոցառում",
};

export const followRequestsCopy = {
  title: "Հետևելու հայցեր",
  count: (n: number) => `Հետևելու հայցեր · ${n}`,
  description:
    "Ձեր պրոֆիլը փակ է։ Հաստատվածները կտեսնեն ձեր կիրառանշումները, միջոցառումները և ուղեսանկարները:",
  confirmAll: "Հաստատել բոլորը",
  confirm: "Ընդունել",
  remove: "Մերժել",
  allConfirmedNote: "Ձեր հաստատեցիք Մարիամ Հովհաննիսյանին · Հետարկել",
  footnote: "Մերժված հայցերը ծանուցում չեն ստանում և կարող են կրկին հայց ուղարկել 30 օր հետո:",
  eventsCountSuffix: "միջոցառում",
  mutualSuffix: "ընդհանուր ծանոթ",
};

export const settingsCopy = {
  title: "Կարգավորումներ",
};
