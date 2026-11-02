import { MailCheckScreen } from "@/components/MailCheckScreen";
import { verifyEmailCopy as copy } from "@/content/auth";

export interface VerifyEmailScreenProps {
  email: string;
}

const RESEND_SECONDS = 59;

/**
 * "Check your inbox" screen shown right after sign-up (Figma "Auth · Verify
 * email — MP-13e"). Thin wrapper over the shared `MailCheckScreen` — see
 * that component for the shared behavior (countdown, "open mail" link,
 * etc.) and `src/sections/auth/ResetPassword/ResetSentScreen.tsx` for the
 * other screen built on it.
 */
export function VerifyEmailScreen({ email }: VerifyEmailScreenProps) {
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
      continueLink={copy.continueWithoutVerifying}
    />
  );
}
