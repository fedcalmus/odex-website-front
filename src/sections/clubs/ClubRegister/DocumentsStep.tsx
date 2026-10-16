"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { FileUploadField } from "@/components/FileUploadField";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { clubRegisterCopy as copy } from "@/content/clubs";
import type { ClubGuideEntry } from "./club-register.validation";
import styles from "./ClubRegisterWizard.module.scss";

export interface DocumentsStepProps {
  onSubmit: () => void;
}

function createGuide(): ClubGuideEntry {
  return { id: crypto.randomUUID(), name: "", file: null };
}

/**
 * Step 3 — insurance (required) plus any number of guide certificates
 * (optional, supporting evidence). There's no backend yet, so submitting
 * only holds the files in memory; "Վերբեռնել հետո" skips straight through,
 * matching the lead copy ("you can also upload later from the dashboard").
 */
export function DocumentsStep({ onSubmit }: DocumentsStepProps) {
  const [insurance, setInsurance] = useState<File | null>(null);
  const [insuranceError, setInsuranceError] = useState<string | undefined>();
  const [guides, setGuides] = useState<ClubGuideEntry[]>([createGuide()]);

  const updateGuide = (id: string, patch: Partial<ClubGuideEntry>) => {
    setGuides((current) => current.map((guide) => (guide.id === id ? { ...guide, ...patch } : guide)));
  };

  const removeGuide = (id: string) => {
    setGuides((current) => current.filter((guide) => guide.id !== id));
  };

  const trySubmit = (requireInsurance: boolean) => {
    if (requireInsurance && !insurance) {
      setInsuranceError(copy.documents.fields.insurance.required);
      return;
    }
    setInsuranceError(undefined);
    onSubmit();
  };

  return (
    <div className={styles.form}>
      <div className={styles.fields}>
        <FileUploadField
          label={copy.documents.fields.insurance.label}
          required
          helper={insuranceError ? undefined : copy.documents.fields.insurance.helper}
          error={insuranceError}
          accept=".pdf,.jpg,.jpeg"
          file={insurance}
          onFileChange={(file) => {
            setInsurance(file);
            if (file) setInsuranceError(undefined);
          }}
          uploadLabel={copy.documents.uploadLabel}
          hint={copy.documents.fileHint}
        />

        {guides.map((guide, index) => (
          <div key={guide.id} className={styles.guide}>
            <div className={styles.guideHead}>
              <Input
                label={copy.documents.guideNameLabel(index + 1)}
                placeholder={copy.documents.guideNamePlaceholder}
                value={guide.name}
                onChange={(event) => updateGuide(guide.id, { name: event.target.value })}
                size="form"
                autoComplete="name"
              />
              {guides.length > 1 ? (
                <button
                  type="button"
                  className={styles.removeGuide}
                  aria-label={`${copy.documents.removeGuide}: ${guide.name || copy.documents.guideNameLabel(index + 1)}`}
                  onClick={() => removeGuide(guide.id)}
                >
                  <Icon name="trash-2" size={16} />
                </button>
              ) : null}
            </div>
            <FileUploadField
              helper={copy.documents.fields.guideFile.helper}
              accept=".pdf,.jpg,.jpeg"
              file={guide.file}
              onFileChange={(file) => updateGuide(guide.id, { file })}
              uploadLabel={copy.documents.uploadLabel}
              hint={copy.documents.fileHint}
            />
          </div>
        ))}

        <button
          type="button"
          className={styles.addGuide}
          onClick={() => setGuides((current) => [...current, createGuide()])}
        >
          + {copy.documents.addGuide}
        </button>
      </div>

      <Notice tone="info" icon="lock">
        {copy.documents.lockNotice}
      </Notice>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" size="large" onClick={() => trySubmit(false)}>
          {copy.documents.deferLabel}
        </Button>
        <Button
          type="button"
          size="large"
          icon="arrow-right"
          onClick={() => trySubmit(true)}
          className={styles.continueButton}
        >
          {copy.documents.submitLabel}
        </Button>
      </div>
    </div>
  );
}
