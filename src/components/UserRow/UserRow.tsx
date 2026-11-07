import type { ImageProps } from "next/image";
import type { ReactNode } from "react";
import { Avatar } from "@/components/Avatar";
import { cx } from "@/lib/cx";
import styles from "./UserRow.module.scss";

export interface UserRowProps {
  name: string;
  photo?: ImageProps["src"];
  /** "Երևան · 14 միջոցառում" — already composed, since the separator/label order vary slightly per page. */
  meta: string;
  /** Right-hand slot: a follow-back button, a confirm/delete pair, or nothing for a mutual connection. */
  action?: ReactNode;
  className?: string;
}

/**
 * A person row (Figma "Follow requests — MP-36" / "My following — MP-09h"):
 * avatar, name, one meta line, optional action(s) on the right.
 */
export function UserRow({ name, photo, meta, action, className }: UserRowProps) {
  return (
    <div className={cx(styles.row, className)}>
      <Avatar name={name} photo={photo} size="md" />
      <div className={styles.body}>
        <p className={styles.name}>{name}</p>
        <p className={styles.meta}>{meta}</p>
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
