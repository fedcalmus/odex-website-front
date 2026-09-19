import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./ParticipantRow.module.scss";

export interface ParticipantRowProps {
  /** "1 · Անուշ Օրինակյան (դուք)" */
  title: string;
  /** "Ասթմա · Արամ Օ. (091) 55-0022 · պրոֆիլից" — health note, emergency contact, where it came from. */
  details: string;
  changeLabel: string;
  changeHref: string;
  className?: string;
}

/** A participant whose details are already complete (Figma: the buyer, filled in from their profile): a check, who, a one-line summary, and "Փոխել". */
export function ParticipantRow({ title, details, changeLabel, changeHref, className }: ParticipantRowProps) {
  return (
    <div className={cx(styles.row, className)}>
      <Icon name="check-circle" size={20} className={styles.check} />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.details}>{details}</p>
      </div>
      <Link href={changeHref} className={styles.change}>
        {changeLabel}
      </Link>
    </div>
  );
}
