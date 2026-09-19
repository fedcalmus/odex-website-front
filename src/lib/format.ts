// Formatting for Armenian marketplace copy. Events happen in Armenia, so dates
// and times are always shown in Yerevan time — never the visitor's timezone,
// which would show a 06:00 departure as a different hour abroad.
const TIME_ZONE = "Asia/Yerevan";

const dateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// NUMBER formatting is deliberately hand-rolled, not Intl: several of these run
// in client components (price slider, ratings), and a browser without hy-AM
// data would print "AMD 40,000" where the server printed "40 000 ֏" — a
// hydration mismatch, and different text for different visitors. (Dates below
// stay on Intl: their locale data is universal and the Yerevan zone is what matters.)
const NBSP = "\u00A0";
const CURRENCY_SYMBOL: Record<string, string> = { AMD: "֏" };

const groupThousands = (integerPart: string) => integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

/** "12.09.2026" */
export function formatEventDate(iso: string): string {
  return dateParts.format(new Date(iso)).replaceAll("/", ".");
}

/** "12.09" — the day and month only, for tight spots like the weather pill. */
export function formatShortDate(iso: string): string {
  return formatEventDate(iso).slice(0, 5);
}

/** "06:00" */
export function formatEventTime(iso: string): string {
  return timeFormat.format(new Date(iso));
}

/** Decimal comma, at most one fraction digit: 14.2 → "14,2". */
export function formatDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const [whole, fraction] = String(Math.abs(rounded)).split(".");
  return `${rounded < 0 ? "-" : ""}${groupThousands(whole)}${fraction ? `,${fraction}` : ""}`;
}

/** "1 200" — whole numbers grouped by non-breaking spaces, as Figma writes them. */
export function formatInteger(value: number): string {
  return `${value < 0 ? "-" : ""}${groupThousands(String(Math.round(Math.abs(value))))}`;
}

/** "12 000 ֏" — grouped with non-breaking spaces so the price never wraps. */
export function formatPrice(amount: number, currency = "AMD"): string {
  return `${formatInteger(amount)}${NBSP}${CURRENCY_SYMBOL[currency] ?? currency}`;
}

// ── Calendar labels (Armenian names come from Intl, never hand-typed) ──────
const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const weekdayFormat = new Intl.DateTimeFormat("hy-AM", { timeZone: TIME_ZONE, weekday: "long" });
const monthFormat = new Intl.DateTimeFormat("hy-AM", { timeZone: TIME_ZONE, month: "long" });
const dayMonthFormat = new Intl.DateTimeFormat("hy-AM", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "long",
});
const dayNumberFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric" });

const upperFirst = (value: string) => value.charAt(0).toLocaleUpperCase("hy") + value.slice(1);

/** "2026-09-11" — the Yerevan calendar day, used to group and window events. */
export function formatDayKey(iso: string): string {
  return dayKeyFormat.format(new Date(iso));
}

export interface DayLabel {
  /** "11" */
  day: string;
  /** Three-letter caps abbreviation of the weekday: "ՈՒՐ". */
  weekdayShort: string;
  /** "Ուրբաթ, 11 սեպտեմբեր" */
  full: string;
}

export function getDayLabel(iso: string): DayLabel {
  const date = new Date(iso);
  const weekday = weekdayFormat.format(date);
  const day = dayNumberFormat.format(date);
  return {
    day,
    weekdayShort: weekday.slice(0, 3).toLocaleUpperCase("hy"),
    full: `${upperFirst(weekday)}, ${day} ${monthFormat.format(date)}`,
  };
}

/** "11–13 սեպտեմբերի" (genitive month, as after a date range). */
export function formatDateRange(fromIso: string, toIso: string): string {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  const genitive = (date: Date) => dayMonthFormat.format(date).replace(/[\d\s]/g, "");
  const fromDay = dayNumberFormat.format(from);
  const toDay = dayNumberFormat.format(to);
  return genitive(from) === genitive(to)
    ? `${fromDay}–${toDay} ${genitive(to)}`
    : `${fromDay} ${genitive(from)} – ${toDay} ${genitive(to)}`;
}

/** "18 սեպտեմբերին" — day + month in the dative, as after "next departure". */
export function formatDayMonthDative(iso: string): string {
  const date = new Date(iso);
  return `${dayNumberFormat.format(date)} ${monthFormat.format(date)}ին`;
}

/** "22 օգոստոսի" — day + month in the genitive, as in a compact "date · time · club" line. */
export function formatDayMonthGenitive(iso: string): string {
  return dayMonthFormat.format(new Date(iso)).replace(/(\d+)\s*(\D+)|(\D+)\s*(\d+)/, (_, a, b, c, d) =>
    a ? `${a} ${b}` : `${d} ${c}`,
  );
}
