import Image from "next/image";
import type { ImageProps } from "next/image";
import { cx } from "@/lib/cx";
import styles from "./GuideRow.module.scss";

export interface GuideRowProps {
  name: string;
  /** "Հիմնական ուղեկցորդ" (lead) or "Հետնապահ" (sweep). */
  roleLabel: string;
  /** "9 տարի · 240 արշավ". */
  experience: string;
  photo: ImageProps["src"];
  className?: string;
}

/** One guide on the team (Figma "Guide row" 107:1086): photo, name, role in lime, experience. */
export function GuideRow({ name, roleLabel, experience, photo, className }: GuideRowProps) {
  return (
    <div className={cx(styles.row, className)}>
      <span className={styles.photo}>
        <Image src={photo} alt="" fill sizes="52px" className={styles.image} />
      </span>
      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{roleLabel}</p>
        <p className={styles.experience}>{experience}</p>
      </div>
    </div>
  );
}
