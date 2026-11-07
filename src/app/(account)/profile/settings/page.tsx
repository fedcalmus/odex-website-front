import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { Tabs } from "@/components/Tabs";
import { PROFILE_NAV, profileFullName, settingsCopy as copy } from "@/content/profile";
import { BOOKINGS, SAVED_ITEMS } from "@/data/social";
import { CURRENT_USER } from "@/data/user";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

// No Figma frame covers Settings — it's included only because every other
// profile page's top nav links to it. Kept intentionally small: the account
// fields a real settings page would edit (email, password, notification
// preferences) have no backend yet, so this shows what's already known
// rather than a form that can't actually save anything.
export default function SettingsPage() {
  const upcomingCount = BOOKINGS.filter((b) => b.status === "upcoming").length;

  return (
    <>
      <div className={styles.navWrap}>
        <Tabs
          items={PROFILE_NAV.map((item) => ({
            ...item,
            count:
              item.key === "activities" ? upcomingCount : item.key === "saved" ? SAVED_ITEMS.length : undefined,
          }))}
          active="settings"
          label="Պրոֆիլի բաժիններ"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>{copy.title}</h1>

        <div className={styles.panel}>
          <div className={styles.row}>
            <span className={styles.label}>Անուն ազգանուն</span>
            <span className={styles.value}>{profileFullName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Բնակավայր</span>
            <span className={styles.value}>{CURRENT_USER.location}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Արտակարգ կապ</span>
            <span className={styles.value}>
              {CURRENT_USER.emergencyName} · {CURRENT_USER.emergencyPhone}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Առողջական նշում</span>
            <span className={styles.value}>{CURRENT_USER.healthNote}</span>
          </div>
        </div>

        <ButtonLink href="/complete-profile" variant="secondary">
          Խմբագրել տվյալները
        </ButtonLink>
      </div>
    </>
  );
}
