"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Notice } from "@/components/Notice";
import { formatCountdown } from "@/lib/format";
import styles from "./MailCheckScreen.module.scss";

export interface MailCheckScreenProps {
  email: string;
  title: string;
  /** Already has the email interpolated — the two callers phrase it slightly differently. */
  lead: string;
  notice: string;
  openMailLabel: string;
  resendLabel: string;
  /** How long the resend button stays disabled, in seconds. */
  resendSeconds: number;
  /** One uniformly lime link (e.g. "Սխա՞լ հասցե · Փոխել") — confirmed from the mock, not muted-text + a lime action word. */
  wrongAddress: { label: string; href: string };
  /** Only the verify-email screen has a way to skip ahead; password reset has nothing to continue to without it. */
  continueLink?: { label: string; href: string };
}

// Best-effort "open my inbox" link — there's no universal way to open an
// arbitrary mail client from the web. Common webmail domains get their
// actual inbox URL; anything else falls back to `mailto:`, which at least
// opens the user's configured mail app (to compose, not the inbox, but
// that's the best a browser can do for an unrecognised provider).
const WEBMAIL_BY_DOMAIN: Record<string, string> = {
  "gmail.com": "https://mail.google.com/mail/u/0/#inbox",
  "googlemail.com": "https://mail.google.com/mail/u/0/#inbox",
  "yahoo.com": "https://mail.yahoo.com/",
  "outlook.com": "https://outlook.live.com/mail/0/inbox",
  "hotmail.com": "https://outlook.live.com/mail/0/inbox",
  "live.com": "https://outlook.live.com/mail/0/inbox",
  "icloud.com": "https://www.icloud.com/mail",
  "mail.ru": "https://e.mail.ru/inbox/",
  "yandex.com": "https://mail.yandex.com/",
  "yandex.ru": "https://mail.yandex.com/",
};

function mailHref(email: string): string {
  const domain = email.split("@")[1]?.toLowerCase();
  return (domain && WEBMAIL_BY_DOMAIN[domain]) || `mailto:${email}`;
}

/**
 * The "check your inbox" shell shared by the verify-email screen (Figma
 * "Auth · Verify email — MP-13e") and the password-reset-sent screen
 * (Figma "Auth · Reset sent — MP-13b") — same mail badge, title, lead,
 * notice, "open mail" + countdown-gated resend, and a "wrong address?
 * change" footer link. Only the optional `continueLink` differs between the
 * two: verify-email lets you skip ahead, password reset has nothing to
 * continue to without the email.
 *
 * There's no email-sending backend yet, so "resend" only restarts its own
 * countdown — see docs/email-verification-api.md and
 * docs/password-reset-api.md.
 *
 * The countdown label is built here (`${resendLabel} · m:ss`), not passed
 * in as a function prop: both callers (`VerifyEmailScreen`,
 * `ResetSentScreen`) are plain Server Components with no "use client" of
 * their own, and a function prop passed from a Server Component into this
 * Client Component fails at runtime ("Functions cannot be passed directly
 * to Client Components") — confirmed live, not just a lint concern.
 */
export function MailCheckScreen({
  email,
  title,
  lead,
  notice,
  openMailLabel,
  resendLabel,
  resendSeconds,
  wrongAddress,
  continueLink,
}: MailCheckScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const href = mailHref(email);
  const isWebLink = !href.startsWith("mailto:");

  return (
    <div className={styles.screen}>
      <span className={styles.badge} aria-hidden="true">
        <Icon name="mail" size={32} />
      </span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>

      <Notice tone="info" icon="lock">
        {notice}
      </Notice>

      <div className={styles.actions}>
        <ButtonLink
          href={href}
          target={isWebLink ? "_blank" : undefined}
          rel={isWebLink ? "noopener noreferrer" : undefined}
          size="large"
          fullWidth
        >
          {openMailLabel}
        </ButtonLink>
        <Button
          type="button"
          variant="secondary"
          size="large"
          fullWidth
          disabled={secondsLeft > 0}
          onClick={() => setSecondsLeft(resendSeconds)}
        >
          {secondsLeft > 0 ? `${resendLabel} · ${formatCountdown(secondsLeft)}` : resendLabel}
        </Button>
      </div>

      <div className={styles.footerLinks}>
        <Link href={wrongAddress.href} className={styles.footerLink}>
          {wrongAddress.label}
        </Link>
        {continueLink ? (
          <Link href={continueLink.href} className={styles.footerLink}>
            {continueLink.label} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
