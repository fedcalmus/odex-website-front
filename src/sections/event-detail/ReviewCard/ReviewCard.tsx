"use client";

import { useState } from "react";
import Image from "next/image";
import { Chip } from "@/components/Chip";
import { Icon } from "@/components/Icon";
import { StarRow } from "@/components/StarRow";
import type { EventReview } from "@/data/events";
import { cx } from "@/lib/cx";
import styles from "./ReviewCard.module.scss";

export interface ReviewCardCopy {
  verifiedLabel: string;
  /** Suffix after the raw count — "{n} {eventsOnOdexLabel}". */
  eventsOnOdexLabel: string;
  helpful: string;
  helpfulActive: string;
  report: string;
  reported: string;
  replyBadge: string;
}

const VISIBLE_PHOTOS = 3;

/**
 * One review (Figma "Event detail - MP-03 (1)" reviews list): rating,
 * aspect tags, optional photos, an optional club reply, then
 * helpful/report. "Helpful" and "report" are real local toggles (no
 * backend to persist them, same pattern as FollowButton elsewhere); a
 * per-review "⋯" menu from the mock was left out rather than shipped as a
 * button with nothing behind it.
 */
export function ReviewCard({ review, copy }: { review: EventReview; copy: ReviewCardCopy }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  const photos = review.photos?.slice(0, VISIBLE_PHOTOS) ?? [];
  const morePhotos = (review.photos?.length ?? 0) - photos.length;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          {review.authorPhoto ? (
            <Image src={review.authorPhoto} alt="" fill sizes="40px" className={styles.avatarImage} />
          ) : (
            review.authorName.charAt(0)
          )}
        </span>
        <div className={styles.identity}>
          <p className={styles.name}>
            {review.authorName}
            {review.verifiedParticipant ? (
              <span className={styles.verified}>
                <Icon name="check-circle" size={14} />
                {copy.verifiedLabel}
              </span>
            ) : null}
          </p>
          <p className={styles.meta}>
            {review.postedLabel} · {review.eventsOnOdex} {copy.eventsOnOdexLabel}
          </p>
        </div>
      </header>

      <div className={styles.ratingRow}>
        <StarRow value={review.rating} label={`${review.rating} / 5`} />
        <span className={styles.postedLabel}>{review.postedLabel}</span>
      </div>

      <p className={styles.body}>{review.body}</p>

      {review.tags && review.tags.length > 0 ? (
        <ul role="list" className={styles.tags}>
          {review.tags.map((tag) => (
            <li key={tag.label}>
              <Chip className={cx(styles.tag, tag.sentiment === "negative" && styles.tagNegative)}>
                {tag.sentiment === "positive" ? "+" : "–"} {tag.label}
              </Chip>
            </li>
          ))}
        </ul>
      ) : null}

      {photos.length > 0 ? (
        <ul role="list" className={styles.photos}>
          {photos.map((src) => (
            <li key={src} className={styles.photo}>
              <Image src={src} alt="" fill sizes="80px" className={styles.photoImage} />
            </li>
          ))}
          {morePhotos > 0 ? <li className={styles.morePhotos}>+{morePhotos}</li> : null}
        </ul>
      ) : null}

      {review.reply ? (
        <div className={styles.reply}>
          <p className={styles.replyHeader}>
            <span className={styles.replyAuthor}>{review.reply.authorName}</span>
            <span className={styles.replyBadge}>{copy.replyBadge}</span>
            <span className={styles.replyPosted}>{review.reply.postedLabel}</span>
          </p>
          <p className={styles.replyBody}>{review.reply.body}</p>
        </div>
      ) : null}

      <footer className={styles.footer}>
        <button
          type="button"
          aria-pressed={markedHelpful}
          className={cx(styles.helpful, markedHelpful && styles.helpfulActive)}
          onClick={() => {
            setMarkedHelpful(!markedHelpful);
            setHelpfulCount((count) => count + (markedHelpful ? -1 : 1));
          }}
        >
          <Icon name={markedHelpful ? "heart-filled" : "heart"} size={16} />
          {markedHelpful ? copy.helpfulActive : copy.helpful} · {helpfulCount}
        </button>
        <button type="button" disabled={reported} className={styles.report} onClick={() => setReported(true)}>
          {reported ? copy.reported : copy.report}
        </button>
      </footer>
    </article>
  );
}
