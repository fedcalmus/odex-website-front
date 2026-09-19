import Image from "next/image";
import type { ImageProps } from "next/image";
import { HoldCountdown } from "@/components/HoldCountdown";
import { cx } from "@/lib/cx";
import styles from "./OrderSummary.module.scss";

export interface OrderSummaryLine {
  label: string;
  /** Already formatted: "24 000 ֏". */
  amount: string;
}

export interface OrderSummaryProps {
  /** "Ձեր պատվերը" */
  title: string;
  /** When the held places expire. */
  holdEndsAt: string;
  holdLabel: string;
  event: { title: string; meta: string; image: ImageProps["src"] };
  /**
   * EVERY line is named. If a service fee is ever introduced it is its own line,
   * never folded into the ticket price — a total that doesn't match the
   * advertised price is how a marketplace loses trust in one transaction.
   */
  lines: OrderSummaryLine[];
  totalLabel: string;
  total: string;
  className?: string;
}

/** Order summary, Holding state (Figma 40:224): the hold countdown, what you're buying, named lines, the total. */
export function OrderSummary({
  title,
  holdEndsAt,
  holdLabel,
  event,
  lines,
  totalLabel,
  total,
  className,
}: OrderSummaryProps) {
  return (
    <section aria-label={title} className={cx(styles.summary, className)}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <HoldCountdown endsAt={holdEndsAt} label={holdLabel} />
      </header>

      <div className={styles.event}>
        <span className={styles.thumb}>
          <Image src={event.image} alt="" fill sizes="48px" className={styles.thumbImage} />
        </span>
        <div className={styles.eventText}>
          <p className={styles.eventTitle}>{event.title}</p>
          <p className={styles.eventMeta}>{event.meta}</p>
        </div>
      </div>

      <dl className={styles.lines}>
        {lines.map((line) => (
          <div key={line.label} className={styles.line}>
            <dt className={styles.lineLabel}>{line.label}</dt>
            <dd className={styles.lineAmount}>{line.amount}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.total}>
        <p className={styles.totalLabel}>{totalLabel}</p>
        <p className={styles.totalAmount}>{total}</p>
      </div>
    </section>
  );
}
