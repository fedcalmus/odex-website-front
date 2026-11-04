// Shared between the cookie banner (src/components/CookieBanner) and the
// preferences panel on /cookies (src/sections/legal/CookiePreferences) —
// one storage key/shape so a choice made in either place is honoured by
// the other, not two independent consent records.

export const COOKIE_CONSENT_STORAGE_KEY = "odex-cookie-consent";

export interface CookieConsent {
  statistics: boolean;
  marketing: boolean;
}

// Figma default for the preferences panel: Statistics on, Marketing off.
// The banner's own "accept all" / "necessary only" actions write their own
// explicit values and don't rely on this.
export const DEFAULT_COOKIE_CONSENT: CookieConsent = { statistics: true, marketing: false };

/** Returns null if nothing is stored yet, or storage is unavailable (private browsing). */
export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof parsed.statistics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { statistics: parsed.statistics, marketing: parsed.marketing };
  } catch {
    return null;
  }
}

/** No-op (not thrown) if storage is unavailable — the caller's in-memory state still reflects the choice for this visit. */
export function writeCookieConsent(consent: CookieConsent): void {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Private browsing / blocked storage.
  }
}
