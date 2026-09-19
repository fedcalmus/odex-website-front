import { ButtonLink } from "@/components/Button";
import { cx } from "@/lib/cx";
import styles from "./ClubCtaBar.module.scss";

export interface ClubCtaBarProps {
  text: string;
  actionLabel: string;
  href: string;
  className?: string;
}

/**
 * Club-recruitment bar (Figma "Footer CTA bar" 72:937): supply-side conversion
 * at the base of the footer on every browse page.
 *
 * It is the ONLY full-width lime surface on the marketplace — that scarcity is
 * what makes it read as an offer rather than noise. Don't add a second. The
 * button inverts (dark fill, lime text) because a lime button on a lime bar
 * would disappear; this is the one place in the system where that happens.
 *
 * The promise in the copy (three months without commission) is a commercial
 * commitment: it must match what the commission setting actually does, and it
 * needs an end date or it becomes permanent by default.
 */
export function ClubCtaBar({ text, actionLabel, href, className }: ClubCtaBarProps) {
  return (
    <aside className={cx(styles.bar, className)}>
      <p className={styles.text}>{text}</p>
      <ButtonLink href={href} size="small" icon="arrow-right" className={styles.action}>
        {actionLabel}
      </ButtonLink>
    </aside>
  );
}
