import { QrCode } from "@/components/QrCode";
import { cx } from "@/lib/cx";
import styles from "./TicketCard.module.scss";

export interface TicketCardProps {
  title: string;
  /** "Վավեր" — omitted on a cancelled/expired ticket. */
  validLabel?: string;
  code: string;
  className?: string;
}

/**
 * The white QR panel (Figma "Ticket — MP-05"): a ticket is shown — not a
 * link, not a row — because this is what gets scanned at check-in. White on
 * purpose, the one light surface in an otherwise dark UI, so it reads
 * unmistakably as "this is the physical pass".
 */
export function TicketCard({ title, validLabel, code, className }: TicketCardProps) {
  return (
    <div className={cx(styles.card, className)}>
      <div className={styles.head}>
        <p className={styles.title}>{title}</p>
        {validLabel ? <span className={styles.valid}>{validLabel}</span> : null}
      </div>
      <div className={styles.qrWrap}>
        <QrCode value={code} size={176} />
      </div>
      <p className={styles.code}>{code}</p>
    </div>
  );
}
