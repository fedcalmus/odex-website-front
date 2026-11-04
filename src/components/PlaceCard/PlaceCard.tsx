import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./PlaceCard.module.scss";

export interface PlaceCardProps {
  name: string;
  /** Place detail page. The whole card is the link (stretched from the title). */
  href: string;
  image: ImageProps["src"];
  /** Region name in caps, or "ՄԱՐԶ" for a kind:"region" entry — matches the mock exactly. */
  badgeLabel: string;
  /** The headline figure: elevation for a peak/lake, trail count for a region/forest, century for a monastery/cave. */
  headline: { icon: IconName; value: string };
  photoCount: number;
  photoCountLabel?: string;
  /** Already composed: "4 միջոցառում". */
  eventsLine: string;
  sizes?: string;
  /** Set on cards visible without scrolling (LCP) so the cover loads eagerly. */
  preload?: boolean;
  className?: string;
}

/**
 * Places directory card (Figma "Places — MP-17"): region/kind badge over the
 * photo, title, a kind-dependent headline stat beside the photo count, then
 * the upcoming-event count as a quieter footer line — same photo-top,
 * body-below shape as EventCard/ClubCard, not DestinationCard's
 * text-on-photo treatment (the mock keeps the photo clean).
 */
export function PlaceCard({
  name,
  href,
  image,
  badgeLabel,
  headline,
  photoCount,
  photoCountLabel = "լուսանկար",
  eventsLine,
  sizes = "(min-width: 1200px) 316px, (min-width: 768px) 50vw, 100vw",
  preload,
  className,
}: PlaceCardProps) {
  return (
    <article className={cx(styles.card, className)}>
      <div className={styles.media}>
        <Image src={image} alt="" fill sizes={sizes} preload={preload} className={styles.image} />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.badge}>{badgeLabel}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>
            {name}
          </Link>
        </h3>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <Icon name={headline.icon} size={16} className={styles.statIcon} />
            {headline.value}
          </span>
          <span className={styles.stat}>
            <Icon name="camera" size={16} className={styles.statIcon} />
            {photoCount} {photoCountLabel}
          </span>
        </div>

        <p className={styles.events}>{eventsLine}</p>
      </div>
    </article>
  );
}
