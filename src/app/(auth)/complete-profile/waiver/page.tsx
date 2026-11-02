import type { Metadata } from "next";
import Image from "next/image";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { Stepper } from "@/components/Stepper";
import type { StepperStep } from "@/components/Stepper";
import { completeProfileCopy } from "@/content/complete-profile";
import { WaiverForm } from "@/sections/profile/Waiver";
import styles from "./page.module.scss";

const copy = completeProfileCopy;

export const metadata: Metadata = {
  title: copy.waiver.title,
  robots: { index: false, follow: false },
};

const steps: StepperStep[] = copy.steps.map((step, index) => ({
  ...step,
  status: index === 0 ? "current" : "upcoming",
}));

export default function WaiverPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/", label: copy.header.back }}
      secureLabel={copy.header.secure}
      panelOverlay={
        <div className={styles.quote}>
          <p className={styles.quoteText}>{copy.waiver.quote.text}</p>
          <div className={styles.quoteAuthor}>
            <Image
              src={copy.waiver.quote.avatar}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div>
              <p className={styles.quoteName}>{copy.waiver.quote.name}</p>
              <p className={styles.quoteRole}>{copy.waiver.quote.role}</p>
            </div>
          </div>
        </div>
      }
    >
      <Stepper label={copy.stepperLabel} compactLabel={copy.stepOfTotal(1, steps.length)} steps={steps} />
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.waiver.title}</h1>
        <p className={styles.lead}>{copy.waiver.lead}</p>
      </header>
      <WaiverForm nextHref="/complete-profile/health" backHref="/complete-profile" />
    </SplitPanelLayout>
  );
}
