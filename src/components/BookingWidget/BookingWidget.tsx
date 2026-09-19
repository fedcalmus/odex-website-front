"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CapacityProgress } from "@/components/CapacityProgress";
import { Icon } from "@/components/Icon";
import { getAvailability } from "@/lib/capacity";
import { cx } from "@/lib/cx";
import styles from "./BookingWidget.module.scss";

export interface BookingWidgetLabels {
  /** Names the landmark: "Ամրագրում". */
  title: string;
  /** Under the price: "մեկ մասնակցի համար". */
  priceNote: string;
  participants: string;
  decrease: string;
  increase: string;
  book: string;
  /** Replaces `book` when sold out. */
  waitlist: string;
  /** Under the button: "Անվճար չեղարկում մինչև 48 ժամ". */
  cancellationNote: string;
  /** After the remaining count: "տեղ մնացել". */
  spotsLeft: string;
}

export interface BookingWidgetProps {
  /** Already formatted: "12 000 ֏". */
  price: string;
  capacity: { taken: number; total: number };
  /** Booking page; `?participants=n` is appended. */
  bookHref: string;
  waitlistHref: string;
  labels: BookingWidgetLabels;
  className?: string;
}

/**
 * The booking card in the detail rail (Figma "Booking widget" 40:141): price,
 * a scarcity pill only under threshold, capacity, a participants stepper and
 * the CTA. Sold out swaps the CTA for the waitlist — the event stays visible
 * and keeps its demand instead of disappearing.
 *
 * The stepper can't go past the places left, so the only number you can send
 * to the booking page is one that can actually be booked.
 */
export function BookingWidget({
  price,
  capacity,
  bookHref,
  waitlistHref,
  labels,
  className,
}: BookingWidgetProps) {
  const { remaining, soldOut, scarce } = getAvailability(capacity.taken, capacity.total);
  const [participants, setParticipants] = useState(1);
  const participantsLabelId = useId();

  return (
    <section aria-label={labels.title} className={cx(styles.widget, className)}>
      <div className={styles.priceRow}>
        <div className={styles.price}>
          <p className={styles.amount}>{price}</p>
          <p className={styles.note}>{labels.priceNote}</p>
        </div>
        {scarce ? (
          <p className={styles.scarcity}>
            <Icon name="clock" size={16} />
            {remaining} {labels.spotsLeft}
          </p>
        ) : null}
      </div>

      <CapacityProgress taken={capacity.taken} total={capacity.total} leftLabel={labels.spotsLeft} />

      {soldOut ? (
        <Link href={waitlistHref} className={cx(styles.cta, styles.waitlist)}>
          {labels.waitlist}
        </Link>
      ) : (
        <>
          <div className={styles.participants}>
            <span className={styles.participantsLabel} id={participantsLabelId}>
              {labels.participants}
            </span>
            <button
              type="button"
              className={styles.step}
              aria-label={labels.decrease}
              disabled={participants <= 1}
              onClick={() => setParticipants((count) => Math.max(1, count - 1))}
            >
              <Icon name="minus" size={20} />
            </button>
            <output className={styles.count} aria-live="polite" aria-labelledby={participantsLabelId}>
              {participants}
            </output>
            <button
              type="button"
              className={styles.step}
              aria-label={labels.increase}
              disabled={participants >= remaining}
              onClick={() => setParticipants((count) => Math.min(remaining, count + 1))}
            >
              <Icon name="plus" size={20} />
            </button>
          </div>
          <Link href={`${bookHref}?participants=${participants}`} className={styles.cta}>
            {labels.book}
          </Link>
        </>
      )}

      <p className={styles.cancellation}>{labels.cancellationNote}</p>
    </section>
  );
}
