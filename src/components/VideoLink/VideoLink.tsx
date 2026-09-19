import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./VideoLink.module.scss";

export interface VideoLinkProps {
  href: string;
  label: string;
  /** Running time, e.g. "2 ր". */
  duration: string;
  className?: string;
}

/**
 * "Watch the video" affordance from the hero (Figma "Video" 194:16222): a
 * frosted 40px play button beside the label and running time.
 */
export function VideoLink({ href, label, duration, className }: VideoLinkProps) {
  return (
    <Link href={href} className={cx(styles.link, className)}>
      <span className={styles.play}>
        <Icon name="play" size={16} />
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.duration}>{duration}</span>
      </span>
    </Link>
  );
}
