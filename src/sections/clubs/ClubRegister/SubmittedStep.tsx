import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { clubRegisterCopy as copy } from "@/content/clubs";
import styles from "./SubmittedStep.module.scss";

export interface SubmittedStepProps {
  email: string;
}

/** The wizard's final screen (Figma "Club sign-up · Submitted — MP-30d"). */
export function SubmittedStep({ email }: SubmittedStepProps) {
  return (
    <div className={styles.submitted}>
      <span className={styles.badge} aria-hidden="true">
        <Icon name="check-circle" size={32} />
      </span>
      <h1 className={styles.title}>{copy.submitted.title}</h1>
      <p className={styles.lead}>{copy.submitted.lead(email)}</p>

      <dl className={styles.details}>
        <div className={styles.row}>
          <Icon name="check-circle" size={20} className={styles.rowIcon} />
          <div>
            <p className={styles.rowTitle}>{copy.submitted.rows.submittedTitle}</p>
            <p className={styles.rowMeta}>{copy.submitted.rows.submittedMeta}</p>
          </div>
        </div>
        <div className={styles.row}>
          <Icon name="clock" size={20} className={styles.rowIcon} />
          <div>
            <p className={styles.rowTitle}>{copy.submitted.rows.reviewTitle}</p>
            <p className={styles.rowMeta}>{copy.submitted.rows.reviewMeta}</p>
          </div>
        </div>
        <div className={styles.row}>
          <Icon name="calendar" size={20} className={styles.rowIcon} />
          <div>
            <p className={styles.rowTitle}>{copy.submitted.rows.nextTitle}</p>
            <p className={styles.rowMeta}>{copy.submitted.rows.nextMeta}</p>
          </div>
        </div>
      </dl>

      <ButtonLink href={copy.submitted.cta.href} size="large" fullWidth icon="arrow-right">
        {copy.submitted.cta.label}
      </ButtonLink>
    </div>
  );
}
