import Link from "next/link";
import { ClubCtaBar } from "@/components/ClubCtaBar";
import type { ClubCtaBarProps } from "@/components/ClubCtaBar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { LocaleOption } from "@/components/LanguageSwitcher";
import { Wordmark } from "@/components/Wordmark";
import { FooterColumn } from "./FooterColumn";
import type { FooterColumnProps } from "./FooterColumn";
import styles from "./Footer.module.scss";

export interface FooterProps {
  description: string;
  columns: FooterColumnProps[];
  /** Full only. */
  clubCta?: ClubCtaBarProps;
  /**
   * `compact` for checkout, ticket and account pages, where a supply-side pitch
   * interrupts a task (Figma "Marketplace footer" Compact): same columns, no lime CTA bar.
   */
  variant?: "full" | "compact";
  locales: LocaleOption[];
  currentLocale: string;
  languageLabel: string;
  /** Legal name shown after "© year", e.g. "ODex". */
  legalName: string;
}

/**
 * Marketplace footer, Full variant (Figma 73:1035): the floor of the page, so
 * the deepest surface. Brand + four link columns, the club-recruitment bar,
 * then a legal bar with the language switch.
 */
export function Footer({
  description,
  columns,
  clubCta,
  variant = "full",
  locales,
  currentLocale,
  languageLabel,
  legalName,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            <Wordmark />
          </Link>
          <p className={styles.description}>{description}</p>
        </div>
        {columns.map((column) => (
          <FooterColumn key={column.title} {...column} />
        ))}
      </div>

      {variant === "full" && clubCta ? (
        <div className={styles.cta}>
          <ClubCtaBar {...clubCta} />
        </div>
      ) : null}

      <div className={styles.legal}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {legalName}
        </p>
        <LanguageSwitcher
          locales={locales}
          current={currentLocale}
          label={languageLabel}
          className={styles.language}
        />
      </div>
    </footer>
  );
}
