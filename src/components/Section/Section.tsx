import { useId } from "react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import type { SectionHeadingProps } from "@/components/SectionHeading";
import { cx } from "@/lib/cx";
import styles from "./Section.module.scss";

export interface SectionProps {
  heading: Omit<SectionHeadingProps, "id" | "className">;
  /** Side padding at desktop: 40 on most homepage sections, 48 on Clubs (Figma). */
  gutter?: "default" | "wide";
  /** Less room above (Figma: 40 instead of 80) when the section follows a block that already has padding. */
  paddingTop?: "default" | "small";
  /** Extra room under the last section before the footer (Figma: 120 instead of 80). */
  paddingBottom?: "default" | "large";
  /** Let the content run edge to edge (the Guide carousel). The heading keeps the gutter. */
  bleed?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * One homepage section: a landmark named by its heading, the heading in the
 * page container, then the content 36px below. `aria-labelledby` makes each
 * section navigable by screen-reader landmark lists.
 */
export function Section({
  heading,
  gutter = "default",
  paddingBottom = "default",
  paddingTop = "default",
  bleed,
  children,
  className,
}: SectionProps) {
  const headingId = useId();
  const containerClass = gutter === "wide" ? styles.containerWide : styles.container;

  return (
    <section
      aria-labelledby={headingId}
      className={cx(
        styles.section,
        paddingBottom === "large" && styles.roomy,
        paddingTop === "small" && styles.tight,
        className,
      )}
    >
      <div className={containerClass}>
        <SectionHeading {...heading} id={headingId} />
      </div>
      {bleed ? children : <div className={containerClass}>{children}</div>}
    </section>
  );
}
