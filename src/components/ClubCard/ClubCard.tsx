import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ScarcityBadge } from "@/components/ScarcityBadge";
import { StatPair } from "@/components/StatPair";
import { cx } from "@/lib/cx";
import styles from "./ClubCard.module.scss";

export interface ClubCardProps {
  name: string;
  /** Club page. The whole card is the link (stretched from the name). */
  href: string;
  cover: ImageProps["src"];
  logo: ImageProps["src"];
  /** Caps classification under the name, e.g. "ԱՐՇԱՎ · ԵՐԵՎԱՆ" — it classifies, it doesn't describe. */
  classification: string;
  description: string;
  eventsCount: number;
  guidesCount: number;
  /** Shown on a verified club with fewer than three events — an invitation, not a warning. */
  newBadgeLabel?: string;
  eventsLabel?: string;
  guidesLabel?: string;
  verifiedLabel?: string;
  sizes?: string;
  /** Set on cards visible without scrolling (LCP) so the cover loads eagerly. */
  preload?: boolean;
  className?: string;
}

/**
 * Club card (Figma 68:904): 118px cover, 56px logo overlapping it by 28,
 * name with the verified shield, then the two figures a participant compares
 * between clubs. Only VERIFIED clubs are ever shown publicly — listing an
 * unverified one would imply the platform vouched for it.
 */
export function ClubCard({
  name,
  href,
  cover,
  logo,
  classification,
  description,
  eventsCount,
  guidesCount,
  newBadgeLabel,
  eventsLabel = "ՄԻՋՈՑԱՌՈՒՄ",
  guidesLabel = "ԳԻԴ",
  verifiedLabel = "Ստուգված",
  sizes = "(min-width: 1200px) 321px, (min-width: 768px) 50vw, 100vw",
  preload,
  className,
}: ClubCardProps) {
  return (
    <article className={cx(styles.card, className)}>
      <div className={styles.cover}>
        <Image src={cover} alt="" fill sizes={sizes} preload={preload} className={styles.coverImage} />
        <span className={styles.scrim} aria-hidden="true" />
        {newBadgeLabel ? (
          <ScarcityBadge type="new-club" className={styles.badge}>
            {newBadgeLabel}
          </ScarcityBadge>
        ) : null}
      </div>

      <div className={styles.body}>
        <span className={styles.logo}>
          <Image src={logo} alt="" fill sizes="56px" className={styles.logoImage} />
        </span>

        <div className={styles.identity}>
          <h3 className={styles.nameRow}>
            <Link href={href} className={styles.link}>
              {name}
            </Link>
            {/* The shield is the trust mechanic — brand colour reads as endorsement, green would read as a state. */}
            <Icon name="shield-check" size={16} title={verifiedLabel} className={styles.verified} />
          </h3>
          <p className={styles.classification}>{classification}</p>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <dl className={styles.stats}>
            <StatPair value={eventsCount} label={eventsLabel} />
            <StatPair value={guidesCount} label={guidesLabel} size="small" />
          </dl>
          <Icon name="arrow-right" size={20} className={styles.arrow} />
        </div>
      </div>
    </article>
  );
}
