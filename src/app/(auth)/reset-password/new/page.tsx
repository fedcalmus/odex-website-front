import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { resetPasswordCopy } from "@/content/auth";
import { NewPasswordForm } from "@/sections/auth/ResetPassword";
import styles from "./page.module.scss";

const copy = resetPasswordCopy;

export const metadata: Metadata = {
  title: copy.newPassword.title,
  robots: { index: false, follow: false },
};

// In production this page is reached via the reset-link emailed to the
// user (`?token=...`, verified server-side before the form is shown — see
// docs/password-reset-api.md). There is no backend to issue or check that
// token yet, so this demo reaches the page directly, with no token
// handling.
export default function NewPasswordPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/login", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.newPassword.title}</h1>
        <p className={styles.lead}>{copy.newPassword.lead}</p>
      </header>
      <NewPasswordForm nextHref="/login?reset=success" />
    </SplitPanelLayout>
  );
}
