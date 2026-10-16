"use client";

import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import type { StepperStep } from "@/components/Stepper";
import { clubRegisterCopy as copy } from "@/content/clubs";
import { AccountStep } from "./AccountStep";
import { ClubDetailsStep } from "./ClubDetailsStep";
import { DocumentsStep } from "./DocumentsStep";
import { SubmittedStep } from "./SubmittedStep";
import styles from "./ClubRegisterWizard.module.scss";

type WizardStep = 1 | 2 | 3 | "submitted";

/**
 * Club sign-up — Account → Club details → Documents → Submitted (Figma
 * "Club sign-up · 1 Account/2 Club/3 Documents/Submitted — MP-30a–d"). A
 * single page with client-side step state, not one route per step: step 3
 * holds `File` objects that can't round-trip through a URL, and there's no
 * backend yet to persist a partially-filled wizard between page loads
 * anyway. `SplitPanelLayout`/`FocusHeader` (from the `(auth)` layout) wrap
 * this the same way they wrap sign-up and login.
 */
export function ClubRegisterWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [contactEmail, setContactEmail] = useState("");

  if (step === "submitted") {
    return (
      <div className={styles.wizard}>
        <SubmittedStep email={contactEmail} />
      </div>
    );
  }

  const steps: StepperStep[] = copy.steps.map((s, index) => {
    const stepNumber = index + 1;
    return {
      ...s,
      status: stepNumber < step ? "done" : stepNumber === step ? "current" : "upcoming",
    };
  });

  return (
    <div className={styles.wizard}>
      <Stepper label={copy.stepperLabel} compactLabel={copy.stepOfTotal(step, steps.length)} steps={steps} />

      {step === 1 ? (
        <>
          <header className={styles.head}>
            <h1 className={styles.title}>{copy.account.title}</h1>
            <p className={styles.lead}>{copy.account.lead}</p>
          </header>
          <AccountStep
            onContinue={(values) => {
              setContactEmail(values.email);
              setStep(2);
            }}
          />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <header className={styles.head}>
            <h1 className={styles.title}>{copy.club.title}</h1>
            <p className={styles.lead}>{copy.club.lead}</p>
          </header>
          <ClubDetailsStep onBack={() => setStep(1)} onContinue={() => setStep(3)} />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <header className={styles.head}>
            <h1 className={styles.title}>{copy.documents.title}</h1>
            <p className={styles.lead}>{copy.documents.lead}</p>
          </header>
          <DocumentsStep onSubmit={() => setStep("submitted")} />
        </>
      ) : null}
    </div>
  );
}
