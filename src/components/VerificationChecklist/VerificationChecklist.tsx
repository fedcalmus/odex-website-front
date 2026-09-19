import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./VerificationChecklist.module.scss";

export interface VerificationChecklistProps {
  /** "Ի՞նչ ենք ստուգում" */
  title: string;
  items: string[];
  className?: string;
}

/** What the platform checks before a club is listed (Figma "Verification"): the promise behind the shield, spelled out where clubs are compared. */
export function VerificationChecklist({ title, items, className }: VerificationChecklistProps) {
  return (
    <aside className={cx(styles.checklist, className)}>
      <p className={styles.head}>
        <Icon name="shield-check" size={16} className={styles.shield} />
        {title}
      </p>
      <ul role="list" className={styles.items}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <Icon name="check" size={16} className={styles.check} />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
