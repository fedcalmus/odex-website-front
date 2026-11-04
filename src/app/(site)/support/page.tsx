import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { supportCopy as copy } from "@/content/support";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { ContactOptions } from "@/sections/support/ContactOptions";
import { HelpFinder } from "@/sections/support/HelpFinder";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  description: "Օգնության կենտրոն՝ հաճախ տրվող հարցեր և կապի եղանակներ:",
};

export default function SupportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(copy.breadcrumb.items.map((item) => ({ name: item.label, href: item.href })))}
      />
      <div className={styles.page}>
        <Breadcrumb items={copy.breadcrumb.items} label={copy.breadcrumb.label} />

        <header className={styles.head}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.h1}>{copy.title}</h1>
        </header>

        <HelpFinder
          copy={{
            search: copy.search,
            categories: copy.categories,
            faqHeading: copy.faqHeading,
            faqs: copy.faqs,
            emptyState: copy.emptyState,
          }}
        />

        <ContactOptions copy={{ heading: copy.contactHeading, options: copy.contactOptions }} />
      </div>
    </>
  );
}
