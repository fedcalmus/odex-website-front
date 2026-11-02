import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { signUpCopy as copy } from "@/content/auth";
import { SignUpForm } from "@/sections/auth/SignUp";
import styles from "./page.module.scss";

// Account screens are not for search engines.
export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.lead}>{copy.lead}</p>
      </header>
      {/* Demo wiring: into the "check your inbox" screen, whose own
          "Շարունակել առանց հաստատման" link continues into the
          profile-completion flow's first real step (Waiver) — skipping its
          own account-details step, since sign-up here already captured
          email + password. */}
      <SignUpForm nextHref="/verify-email" />
    </SplitPanelLayout>
  );
}
