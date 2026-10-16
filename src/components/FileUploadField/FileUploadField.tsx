"use client";

import { useId, useRef, useState } from "react";
import type { DragEvent } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./FileUploadField.module.scss";

export interface FileUploadFieldProps {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  accept?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  /** "Վերբեռնել ֆայլ" */
  uploadLabel: string;
  /** "PDF · JPG · մինչև 10 ՄԲ" */
  hint: string;
  /** Accessible prefix for the remove button, e.g. "Հեռացնել". */
  removeLabel?: string;
  name?: string;
  className?: string;
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.1 ? "< 0.1" : mb.toFixed(1)} ՄԲ`;
}

/**
 * A single document upload slot (Figma "Club sign-up · 3 Documents"): a
 * dashed dropzone when empty, a filename/size card with a remove button once
 * a file is picked. There is no backend yet — this only holds the `File`
 * object in memory, nothing is actually uploaded anywhere.
 */
export function FileUploadField({
  label,
  required,
  helper,
  error,
  accept,
  file,
  onFileChange,
  uploadLabel,
  hint,
  removeLabel = "Հեռացնել",
  name,
  className,
}: FileUploadFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const describedBy = [error ? errorId : helper ? helperId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx(styles.field, className)}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
      ) : null}

      {file ? (
        <div className={cx(styles.filled, error && styles.hasError)}>
          <Icon name="file-text" size={20} className={styles.fileIcon} />
          <div className={styles.fileInfo}>
            <p className={styles.fileName}>{file.name}</p>
            <p className={styles.fileMeta}>{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            className={styles.remove}
            aria-label={`${removeLabel}: ${file.name}`}
            onClick={() => {
              onFileChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            <Icon name="trash-2" size={18} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={cx(styles.dropzone, dragging && styles.dragging, error && styles.hasError)}
          onDragOver={(event: DragEvent<HTMLLabelElement>) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event: DragEvent<HTMLLabelElement>) => {
            event.preventDefault();
            setDragging(false);
            const dropped = event.dataTransfer.files?.[0];
            if (dropped) onFileChange(dropped);
          }}
        >
          <Icon name="upload" size={20} />
          <span className={styles.uploadLabel}>{uploadLabel}</span>
          <span className={styles.hint}>{hint}</span>
          <input
            ref={inputRef}
            id={inputId}
            name={name}
            type="file"
            accept={accept}
            className={styles.input}
            aria-describedby={describedBy}
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
        </label>
      )}

      {helper ? (
        error ? (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        ) : (
          <p id={helperId} className={styles.helper}>
            {helper}
          </p>
        )
      ) : error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
