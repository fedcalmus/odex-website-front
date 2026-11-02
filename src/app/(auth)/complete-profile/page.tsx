import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { completeProfileCopy } from "@/content/complete-profile";
import { AccountDetailsForm } from "@/sections/profile/AccountDetails";
import styles from "./page.module.scss";

const copy = completeProfileCopy.account;

// Account screens are not for search engines.
export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

// Account details — email + password. No stepper here — the source mock has
// none; the Waiver → Health → Emergency-contact stepper only starts on the
// next screen. This step itself is skipped when arriving straight from
// public sign-up (which already captured email + password); reached
// directly only via a standalone /complete-profile link.
export default function CompleteProfileAccountPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/", label: completeProfileCopy.header.back }}
      secureLabel={completeProfileCopy.header.secure}
    >
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.lead}>{copy.lead}</p>
      </header>
      <AccountDetailsForm nextHref="/complete-profile/waiver" loginHref="/login" />
    </SplitPanelLayout>
  );
}
