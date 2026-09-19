import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./LanguageSwitcher.module.scss";

export interface LocaleOption {
  /** BCP 47 code, used for `lang` / `hrefLang`. */
  code: string;
  /** Short label shown in the control: "ՀԱՅ", "ENG", "РУС". */
  label: string;
  /** Full name in its own language — the accessible name of the link. */
  name: string;
  href: string;
}

export interface LanguageSwitcherProps {
  locales: LocaleOption[];
  /** `code` of the active locale. */
  current: string;
  /**
   * `menu` — the header's compact control: the current language, opening a
   * list (native `<details>`, no JS). `segmented` — the footer's
   * three-way switch, all languages visible.
   */
  variant?: "menu" | "segmented";
  /** Accessible name of the control. */
  label: string;
  className?: string;
}

/**
 * Language switch. Lives in the footer's legal bar as well as the nav: someone
 * who scrolled the whole page without finding what they wanted may simply be
 * reading the wrong language.
 */
export function LanguageSwitcher({
  locales,
  current,
  variant = "segmented",
  label,
  className,
}: LanguageSwitcherProps) {
  const active = locales.find((locale) => locale.code === current) ?? locales[0];

  const items = locales.map((locale) => {
    const isActive = locale.code === active.code;
    return (
      <li key={locale.code}>
        <Link
          href={locale.href}
          lang={locale.code}
          hrefLang={locale.code}
          aria-current={isActive ? "true" : undefined}
          aria-label={locale.name}
          className={cx(styles.option, isActive && styles.active)}
        >
          {locale.label}
        </Link>
      </li>
    );
  });

  if (variant === "menu") {
    return (
      <details className={cx(styles.menu, className)}>
        <summary className={styles.summary} aria-label={label}>
          {active.label}
        </summary>
        <ul role="list" className={styles.popover}>
          {items}
        </ul>
      </details>
    );
  }

  return (
    <nav aria-label={label} className={cx(styles.segmented, className)}>
      <ul role="list" className={styles.list}>
        {items}
      </ul>
    </nav>
  );
}
