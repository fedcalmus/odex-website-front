import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { FollowButton } from "@/components/FollowButton";
import { Icon } from "@/components/Icon";
import { StatPair } from "@/components/StatPair";
import styles from "./PlaceClubRow.module.scss";

export interface PlaceClubRowProps {
  name: string;
  href: string;
  logo?: ImageProps["src"];
  /** "ԱՐՇԱՎ · ԵՐԵՎԱՆ" — same classification string as ClubCard. */
  classification: string;
  description: string;
  eventsCount: number;
  guidesCount: number;
  eventsLabel: string;
  guidesLabel: string;
  verifiedLabel: string;
  followLabel: string;
  followingLabel: string;
}

/**
 * Compact club row for "clubs that run events here" (Figma "Place detail —
 * MP-34"): a horizontal list row, not a full ClubCard — logo, name,
 * classification, one line of description, the same two stats ClubCard
 * shows, and a follow action.
 */
export function PlaceClubRow({
  name,
  href,
  logo,
  classification,
  description,
  eventsCount,
  guidesCount,
  eventsLabel,
  guidesLabel,
  verifiedLabel,
  followLabel,
  followingLabel,
}: PlaceClubRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.logo}>
        {logo ? (
          <Image src={logo} alt="" fill sizes="48px" className={styles.logoImage} />
        ) : (
          <span className={styles.logoEmpty} aria-hidden="true">
            -
          </span>
        )}
      </span>

      <div className={styles.identity}>
        <p className={styles.nameRow}>
          <Link href={href} className={styles.link}>
            {name}
          </Link>
          <Icon name="shield-check" size={16} title={verifiedLabel} className={styles.verified} />
        </p>
        <p className={styles.classification}>{classification}</p>
        <p className={styles.description}>{description}</p>
      </div>

      <dl className={styles.stats}>
        <StatPair value={eventsCount} label={eventsLabel} size="small" />
        <StatPair value={guidesCount} label={guidesLabel} size="small" />
      </dl>

      <FollowButton label={followLabel} followingLabel={followingLabel} className={styles.follow} />
    </div>
  );
}
