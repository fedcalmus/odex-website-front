import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { Stepper } from "@/components/Stepper";
import type { StepperStep } from "@/components/Stepper";
import { completeProfileCopy } from "@/content/complete-profile";
import { EmergencyContactForm } from "@/sections/profile/EmergencyContact";
import styles from "./page.module.scss";

const copy = completeProfileCopy;

export const metadata: Metadata = {
  title: copy.emergencyContact.title,
  robots: { index: false, follow: false },
};

const steps: StepperStep[] = copy.steps.map((step, index) => ({
  ...step,
  status: index <= 1 ? "done" : "current",
  href: index === 0 ? "/complete-profile/waiver" : index === 1 ? "/complete-profile/health" : undefined,
}));

export default function EmergencyContactPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <Stepper label={copy.stepperLabel} compactLabel={copy.stepOfTotal(3, steps.length)} steps={steps} />
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.emergencyContact.title}</h1>
        <p className={styles.lead}>{copy.emergencyContact.lead}</p>
      </header>
      {/* No specific event/booking is attached to this generic flow, and there's
          no backend yet — a valid submit goes home rather than to a real payment step. */}
      <EmergencyContactForm nextHref="/" backHref="/complete-profile/health" />
    </SplitPanelLayout>
  );
}
