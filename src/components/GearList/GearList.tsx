import { Chip } from "@/components/Chip";
import { DetailBlock } from "@/components/DetailBlock";
import styles from "./GearList.module.scss";

export interface GearListProps {
  title: string;
  items: string[];
  /** Small print beneath, e.g. "The list repeats on your ticket". */
  note?: string;
}

/** "Անհրաժեշտ սարքավորում" — the checklist as chips (Figma "Detail block · Gear"). */
export function GearList({ title, items, note }: GearListProps) {
  return (
    <DetailBlock title={title}>
      <ul role="list" className={styles.items}>
        {items.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
      {note ? <p className={styles.note}>{note}</p> : null}
    </DetailBlock>
  );
}
