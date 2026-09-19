import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { LanguageSwitcherProps } from "@/components/LanguageSwitcher";
import { Wordmark } from "@/components/Wordmark";
import { cx } from "@/lib/cx";
import styles from "./FocusHeader.module.scss";

export interface FocusHeaderProps {
  /** Where returning is legitimate (step two of registration). Omit at checkout — no way back but the flow. */
  back?: { href: string; label: string };
  /** "Ապահով վճարում" */
  secureLabel: string;
  /** Checkout keeps the language switch; the register screens don't. */
  language?: Pick<LanguageSwitcherProps, "locales" | "current" | "label">;
  className?: string;
}

/**
 * The stripped header for registration and checkout (Figma "Checkout header" /
 * Marketplace nav · Checkout). NO navigation links, deliberately: every link out
 * of a checkout is a chance to lose the sale. But a header stripped to nothing
 * looks like a phishing page, so the wordmark and the secure mark stay — reduce
 * the exits, keep the legitimacy. Same 76px as the marketplace nav, so the page
 * doesn't jump when someone moves from browsing into checkout.
 */
export function FocusHeader({ back, secureLabel, language, className }: FocusHeaderProps) {
  return (
    <header className={cx(styles.header, className)}>
      <div className={styles.bar}>
        {back ? (
          <Link href={back.href} className={styles.back}>
            <Icon name="arrow-left" size={20} />
            {back.label}
          </Link>
        ) : null}
        <Link href="/" className={styles.brand}>
          <Wordmark />
        </Link>
        <span className={styles.spacer} />
        <p className={styles.secure}>
          <Icon name="lock" size={16} />
          {secureLabel}
        </p>
        {language ? <LanguageSwitcher variant="menu" {...language} /> : null}
      </div>
    </header>
  );
}
