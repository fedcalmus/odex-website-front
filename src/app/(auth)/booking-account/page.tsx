import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { Stepper } from "@/components/Stepper";
import { bookingAccountCopy as copy } from "@/content/auth";
import { BookingAccountForm } from "@/sections/auth/BookingAccount";
import styles from "./page.module.scss";

// Account screens are not for search engines.
export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

// Collects email + password the first time someone books (not at general
// sign-up, which is the separate /register flow).
export default function BookingAccountPage() {
  return (
    <SplitPanelLayout image="/images/auth/register-panel.png">
      <Stepper
        label={copy.stepperLabel}
        compactLabel={copy.stepOfTotal(1, copy.steps.length)}
        steps={copy.steps.map((step, index) => ({
          ...step,
          // Figma's frame paints step 1 as done and step 2 as current while the form is step 1's;
          // here the step you are ON is the current one.
          status: index === 0 ? "current" : "upcoming",
        }))}
      />
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.lead}>{copy.lead}</p>
      </header>
      <BookingAccountForm nextHref="/booking-account/agreement" loginHref="/login" />
    </SplitPanelLayout>
  );
}
