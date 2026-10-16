import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { contactCopy as copy } from "@/content/contact";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { ContactForm } from "@/sections/contact/ContactForm";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.lead,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(copy.breadcrumb.items.map((item) => ({ name: item.label, href: item.href })))}
      />
      <header className={styles.head}>
        <Breadcrumb items={copy.breadcrumb.items} label={copy.breadcrumb.label} />
        <div className={styles.title}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.h1}>{copy.title}</h1>
          <p className={styles.lead}>{copy.lead}</p>
        </div>
      </header>

      <div className={styles.body}>
        <ContactForm />

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <Icon name="mail" size={20} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>{copy.info.email.label}</p>
                <p className={styles.infoValue}>{copy.info.email.value}</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon name="phone" size={20} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>{copy.info.phone.label}</p>
                <p className={styles.infoValue}>{copy.info.phone.value}</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon name="map-pin" size={20} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>{copy.info.address.label}</p>
                <p className={styles.infoValue}>{copy.info.address.value}</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon name="clock" size={20} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>{copy.info.hours.label}</p>
                <p className={styles.infoValue}>{copy.info.hours.value}</p>
              </div>
            </div>
          </div>

          {/* No map provider has been chosen yet (per the mock's own caption) — an empty placeholder, not a fabricated embed. */}
          <div>
            <div className={styles.mapPlaceholder} aria-hidden="true" />
            <p className={styles.mapCaption}>{copy.map.placeholder}</p>
          </div>

          <div className={styles.pressCard}>
            <p className={styles.pressTitle}>{copy.press.title}</p>
            <p className={styles.pressBody}>{copy.press.body}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
