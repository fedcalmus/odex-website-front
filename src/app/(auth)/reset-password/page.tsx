import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { resetPasswordCopy } from "@/content/auth";
import { ResetRequestForm } from "@/sections/auth/ResetPassword";
import styles from "./page.module.scss";

const copy = resetPasswordCopy;

export const metadata: Metadata = {
  title: copy.request.title,
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/login", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.request.title}</h1>
      </header>
      <ResetRequestForm nextHref="/reset-password/sent" />
    </SplitPanelLayout>
  );
}
