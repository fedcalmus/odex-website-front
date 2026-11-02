import { MailCheckScreen } from "@/components/MailCheckScreen";
import { resetPasswordCopy } from "@/content/auth";

export interface ResetSentScreenProps {
  email: string;
}

const copy = resetPasswordCopy.sent;

// "Wait 2 minutes before resending" per the notice copy — started one
// second under so the first tick reads "1:59", never a stray "2:00".
const RESEND_SECONDS = 119;

/**
 * Step 2 of password reset — "check your inbox" (Figma "Auth · Reset sent
 * — MP-13b"). Thin wrapper over the shared `MailCheckScreen` — no
 * `continueLink`, unlike the verify-email screen built on the same
 * component: there's nothing to continue to without the reset link.
 */
export function ResetSentScreen({ email }: ResetSentScreenProps) {
  return (
    <MailCheckScreen
      email={email}
      title={copy.title}
      lead={copy.lead(email)}
      notice={copy.notice}
      openMailLabel={copy.openMail}
      resendLabel={copy.resend}
      resendSeconds={RESEND_SECONDS}
      wrongAddress={copy.wrongAddress}
    />
  );
}
