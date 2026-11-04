"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/Button";
import { readCookieConsent, writeCookieConsent } from "@/lib/cookie-consent";
import styles from "./CookieBanner.module.scss";

export interface CookieBannerCopy {
  title: string;
  body: string;
  policyLink: { label: string; href: string };
  acceptAll: string;
  necessaryOnly: string;
  customize: string;
}

/**
 * Site-wide consent banner (Figma "Cookie banner — MP-39b"): floats above
 * every page until a choice is made, then never again. Reads/writes the
 * same `localStorage` record as the preferences panel on /cookies (see
 * src/lib/cookie-consent.ts), so an "Ընդունել բոլորը" here is honoured
 * there and vice versa — not two independent consent records.
 *
 * Renders nothing until the client-side storage check resolves (avoids a
 * server/client mismatch, since the server can't know what's stored) —
 * the brief absence on first paint is the correct tradeoff, not a bug.
 */
export function CookieBanner({ copy }: { copy: CookieBannerCopy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  if (!visible) return null;

  const decide = (consent: { statistics: boolean; marketing: boolean }) => {
    writeCookieConsent(consent);
    setVisible(false);
  };

  return (
    <div role="dialog" aria-label={copy.title} className={styles.banner}>
      <div className={styles.copy}>
        <p className={styles.title}>{copy.title}</p>
        <p className={styles.body}>
          {copy.body}{" "}
          <Link href={copy.policyLink.href} className={styles.policyLink}>
            {copy.policyLink.label}
          </Link>
        </p>
      </div>

      <div className={styles.actions}>
        <Button type="button" size="medium" onClick={() => decide({ statistics: true, marketing: true })}>
          {copy.acceptAll}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="medium"
          onClick={() => decide({ statistics: false, marketing: false })}
        >
          {copy.necessaryOnly}
        </Button>
        <ButtonLink href="/cookies" variant="ghost" size="medium">
          {copy.customize}
        </ButtonLink>
      </div>
    </div>
  );
}
