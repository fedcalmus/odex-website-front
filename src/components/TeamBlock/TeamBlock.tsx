import { DetailBlock } from "@/components/DetailBlock";
import { GuideRow } from "@/components/GuideRow";
import type { GuideRowProps } from "@/components/GuideRow";
import styles from "./TeamBlock.module.scss";

export interface TeamBlockProps {
  title: string;
  guides: Array<GuideRowProps & { id: string }>;
}

/** "Ձեր ուղեկցորդները" — who takes you up and who brings up the rear (Figma "Detail block · Team"). */
export function TeamBlock({ title, guides }: TeamBlockProps) {
  return (
    <DetailBlock title={title}>
      <ul role="list" className={styles.guides}>
        {guides.map(({ id, ...guide }) => (
          <li key={id}>
            <GuideRow {...guide} />
          </li>
        ))}
      </ul>
    </DetailBlock>
  );
}
