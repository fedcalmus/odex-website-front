import { ButtonLink } from "@/components/Button";
import { Countdown } from "@/components/Countdown";
import type { CountdownProps } from "@/components/Countdown";
import { cx } from "@/lib/cx";
import styles from "./FeaturedEventCard.module.scss";

export interface FeaturedEventCardProps {
  /** Caps eyebrow, e.g. "ՀԱՋՈՐԴ ՄԵԿՆՈՒՄԸ". */
  eyebrow: string;
  /** ISO 8601 departure. */
  startsAt: string;
  countdownLabels: CountdownProps["labels"];
  title: string;
  /** Meeting point · time · club. */
  meta: string;
  /** Places still free, out of the total. Shows places REMAINING — on the hero the question is "can I still go". */
  places: { free: number; total: number };
  freeLabel: string;
  cta: { label: string; href: string };
  className?: string;
}

/**
 * Featured event card (Figma "Featured event card" 71:972) — the hero's
 * "next departure" with a live countdown. It does the job a hero CTA usually
 * does: a reason to act now, without inventing urgency.
 *
 * ALWAYS the soonest departure that still has places — never a curated slot
 * (a homepage promoting a full event wastes the position; promoting a paid
 * placement stops being trustworthy). Once it departs, swap to the next one
 * rather than showing 00:00.
 */
export function FeaturedEventCard({
  eyebrow,
  startsAt,
  countdownLabels,
  title,
  meta,
  places,
  freeLabel,
  cta,
  className,
}: FeaturedEventCardProps) {
  const takenPercent = places.total > 0 ? Math.round(((places.total - places.free) / places.total) * 100) : 0;

  return (
    <div className={cx(styles.card, className)}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Countdown target={startsAt} labels={countdownLabels} />
      <div className={styles.event}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.meta}>{meta}</p>
      </div>
      <div className={styles.capacity}>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.fill} style={{ width: `${takenPercent}%` }} />
        </div>
        <p className={styles.free}>
          {places.free} / {places.total} {freeLabel}
        </p>
      </div>
      <ButtonLink href={cta.href} icon="arrow-right" fullWidth>
        {cta.label}
      </ButtonLink>
    </div>
  );
}
