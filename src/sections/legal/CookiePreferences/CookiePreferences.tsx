"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Toggle } from "@/components/Toggle";
import type { CookieConsent } from "@/lib/cookie-consent";
import { DEFAULT_COOKIE_CONSENT, readCookieConsent, writeCookieConsent } from "@/lib/cookie-consent";
import styles from "./CookiePreferences.module.scss";

export interface CookiePreferencesCopy {
  necessary: { label: string; status: string };
  statistics: { label: string; retention: string };
  marketing: { label: string; retention: string };
  save: string;
  saved: string;
}

/**
 * The interactive consent card (Figma "Cookie policy — MP-39"): Necessary is
 * locked on, Statistics/Marketing are real switches, Save persists the
 * choice. Reads/writes `localStorage` directly — there's no consent backend
 * to call, and a cookie panel that doesn't actually remember the choice
 * across visits would defeat the entire point of the page.
 */
export function CookiePreferences({ copy }: { copy: CookiePreferencesCopy }) {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_COOKIE_CONSENT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    if (!stored) return;
    setConsent(stored);
    setSaved(true);
  }, []);

  const update = (patch: Partial<CookieConsent>) => {
    setConsent((current) => ({ ...current, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    writeCookieConsent(consent);
    setSaved(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.lockedRow}>
        <div className={styles.copy}>
          <p className={styles.label}>{copy.necessary.label}</p>
          <p className={styles.description}>{copy.necessary.status}</p>
        </div>
        <Icon name="lock" size={18} className={styles.lockIcon} />
      </div>

      <Toggle
        label={copy.statistics.label}
        description={copy.statistics.retention}
        checked={consent.statistics}
        onChange={(event) => update({ statistics: event.target.checked })}
        className={styles.toggleRow}
      />

      <Toggle
        label={copy.marketing.label}
        description={copy.marketing.retention}
        checked={consent.marketing}
        onChange={(event) => update({ marketing: event.target.checked })}
        className={styles.toggleRow}
      />

      <div className={styles.actions}>
        <Button type="button" size="medium" onClick={handleSave}>
          {copy.save}
        </Button>
        <p className={styles.savedNote} role="status">
          {saved ? copy.saved : ""}
        </p>
      </div>
    </div>
  );
}
