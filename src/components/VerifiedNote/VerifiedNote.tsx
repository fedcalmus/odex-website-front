import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./VerifiedNote.module.scss";

export interface VerifiedNoteProps {
  title: string;
  description: string;
  className?: string;
}

/** "Ամեն ակումբ ստուգված է" — the trust note under the filters (Figma "Verified note"): the platform's promise, said once, where people are choosing. */
export function VerifiedNote({ title, description, className }: VerifiedNoteProps) {
  return (
    <aside className={cx(styles.note, className)}>
      <p className={styles.head}>
        <Icon name="shield-check" size={16} className={styles.icon} />
        {title}
      </p>
      <p className={styles.description}>{description}</p>
    </aside>
  );
}
