import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { DateBox } from "@/lib/format";
import styles from "./EventRow.module.scss";

export interface EventRowProps {
  date: DateBox;
  image: ImageProps["src"];
  club: { name: string; logo: ImageProps["src"] };
  title: string;
  /** Event detail page. The whole row is the link (stretched from the title). */
  href: string;
  /** Short caption line under the title: route stats, a cancellation note, etc. */
  meta?: ReactNode;
  /** An activity/status chip under the club line, e.g. `<DifficultyChip>`. */
  tag?: ReactNode;
  /** Right-hand slot: a price + book button, a "Rate"/"Ticket" action, a status label — context-specific per page. */
  action?: ReactNode;
  className?: string;
}

/**
 * A booking/saved-event row (Figma "My events — MP-06 · rows" / "Saved —
 * MP-07"): date tile, thumbnail, club + title + meta, then a right-hand slot
 * whose content differs by page (book CTA on Saved, rate/ticket/cancelled
 * note on My events) — kept as a slot rather than a closed set of variants.
 */
export function EventRow({ date, image, club, title, href, meta, tag, action, className }: EventRowProps) {
  return (
    <div className={cx(styles.row, className)}>
      <div className={styles.date}>
        <span className={styles.day}>{date.day}</span>
        <span className={styles.month}>{date.monthShort}</span>
      </div>

      <span className={styles.thumb}>
        <Image src={image} alt="" fill sizes="64px" className={styles.thumbImage} />
      </span>

      <div className={styles.body}>
        <div className={styles.clubLine}>
          <span className={styles.clubLogo}>
            <Image src={club.logo} alt="" fill sizes="20px" />
          </span>
          <span className={styles.clubName}>{club.name}</span>
        </div>
        <p className={styles.title}>
          <Link href={href} className={styles.link}>
            <span className={styles.linkStretch} />
            {title}
          </Link>
        </p>
        {tag || meta ? (
          <div className={styles.metaLine}>
            {tag}
            {meta ? <span className={styles.meta}>{meta}</span> : null}
          </div>
        ) : null}
      </div>

      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
