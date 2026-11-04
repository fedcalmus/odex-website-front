import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import styles from "./ContactOptions.module.scss";

export interface ContactOption {
  icon: IconName;
  title: string;
  description: string;
  action: { label: string; href: string };
}

export interface ContactOptionsCopy {
  heading: string;
  options: readonly ContactOption[];
}

/**
 * "Didn't find the answer?" fallback (Figma "Support — MP-28"): three ways
 * to reach a human. "Բացել զրույցը" routes to the real Contact page — no
 * live-chat widget exists yet, and that's the closest working equivalent
 * rather than a dead link. `mailto:`/`tel:` hrefs work fine through
 * `ButtonLink` (next/link only intercepts internal navigation).
 */
export function ContactOptions({ copy }: { copy: ContactOptionsCopy }) {
  return (
    <section aria-labelledby="support-contact-heading" className={styles.wrap}>
      <SectionHeading id="support-contact-heading" title={copy.heading} />

      <ul role="list" className={styles.grid}>
        {copy.options.map((option) => (
          <li key={option.title} className={styles.card}>
            <Icon name={option.icon} size={20} className={styles.icon} />
            <p className={styles.title}>{option.title}</p>
            <p className={styles.description}>{option.description}</p>
            <ButtonLink href={option.action.href} variant="secondary" size="medium" fullWidth className={styles.action}>
              {option.action.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
