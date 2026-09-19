import { ButtonLink } from "@/components/Button";
import { cx } from "@/lib/cx";
import styles from "./ClubCtaCard.module.scss";

export interface ClubCtaCardProps {
  /** "Ակո՞ւմբ եք վարում" */
  title: string;
  text: string;
  actionLabel: string;
  href: string;
  className?: string;
}

/**
 * Supply-side pitch in the clubs sidebar (Figma "Club CTA"). A quieter cousin
 * of the footer's lime bar — this one is a card with a single small lime
 * button, so the page never carries two loud recruitment surfaces.
 */
export function ClubCtaCard({ title, text, actionLabel, href, className }: ClubCtaCardProps) {
  return (
    <aside className={cx(styles.card, className)}>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
      <ButtonLink href={href} size="small" icon="arrow-right" fullWidth>
        {actionLabel}
      </ButtonLink>
    </aside>
  );
}
