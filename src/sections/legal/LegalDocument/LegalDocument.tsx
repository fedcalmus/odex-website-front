import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { Notice } from "@/components/Notice";
import { TableOfContents } from "@/components/TableOfContents";
import styles from "./LegalDocument.module.scss";

export interface LegalDocumentSection {
  /** Anchor id — must be unique within the page; drives the TOC and in-page scrolling. */
  id: string;
  /** Includes the leading number, e.g. "1. Ինչ է Odex-ը" — matches the TOC label verbatim. */
  heading: string;
  body: string;
}

export interface LegalDocumentCopy {
  breadcrumb: { label: string; items: readonly BreadcrumbItem[] };
  eyebrow: string;
  title: string;
  updatedLabel: string;
  updatedDate: string;
  download: { label: string; href: string };
  intro: string;
  tocLabel: string;
  /** Overline above the TOC list, e.g. "ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ" (Figma "Cookie policy — MP-39"). */
  tocHeading?: string;
  sections: readonly LegalDocumentSection[];
  notice: { icon: IconName; body: string };
}

export interface LegalDocumentProps {
  copy: LegalDocumentCopy;
  /** Extra content rendered between the intro paragraph and the numbered sections — the cookie-preferences card on Cookie policy. */
  panel?: ReactNode;
}

/**
 * Long-form legal document shell (Figma "Terms — MP-22" / "Privacy —
 * MP-23" / "Disclaimer — MP-24" / "Cookie policy — MP-39"): breadcrumb +
 * header + an "on this page" TOC rail beside numbered sections, closing
 * with a contact notice. All four legal pages share this exact shape —
 * built once here instead of duplicating the layout per page.
 */
export function LegalDocument({ copy, panel }: LegalDocumentProps) {
  const tocItems = copy.sections.map((section) => ({ id: section.id, label: section.heading }));

  return (
    <>
      <header className={styles.head}>
        <div className={styles.headInner}>
          <Breadcrumb items={copy.breadcrumb.items} label={copy.breadcrumb.label} />
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.h1}>{copy.title}</h1>

          <div className={styles.meta}>
            <p className={styles.updated}>
              {copy.updatedLabel} {copy.updatedDate}
            </p>
            <a href={copy.download.href} className={styles.download} download>
              <Icon name="download" size={16} />
              {copy.download.label}
            </a>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <TableOfContents items={tocItems} label={copy.tocLabel} heading={copy.tocHeading} />

        <div className={styles.content}>
          <p className={styles.intro}>{copy.intro}</p>

          {panel}

          {copy.sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section}>
              <h2 className={styles.h2}>{section.heading}</h2>
              <p className={styles.body2}>{section.body}</p>
            </section>
          ))}

          <Notice tone="info" icon={copy.notice.icon} className={styles.notice}>
            {copy.notice.body}
          </Notice>
        </div>
      </div>
    </>
  );
}
