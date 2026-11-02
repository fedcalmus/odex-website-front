import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { Stepper } from "@/components/Stepper";
import type { StepperStep } from "@/components/Stepper";
import { completeProfileCopy } from "@/content/complete-profile";
import { HealthForm } from "@/sections/profile/Health";
import styles from "./page.module.scss";

const copy = completeProfileCopy;

export const metadata: Metadata = {
  title: copy.health.title,
  robots: { index: false, follow: false },
};

const steps: StepperStep[] = copy.steps.map((step, index) => ({
  ...step,
  status: index === 0 ? "done" : index === 1 ? "current" : "upcoming",
  href: index === 0 ? "/complete-profile/waiver" : undefined,
}));

export default function HealthPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <Stepper label={copy.stepperLabel} compactLabel={copy.stepOfTotal(2, steps.length)} steps={steps} />
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.health.title}</h1>
        <p className={styles.lead}>{copy.health.lead}</p>
      </header>
      <HealthForm nextHref="/complete-profile/emergency-contact" backHref="/complete-profile/waiver" />
    </SplitPanelLayout>
  );
}
