import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { verifyEmailCopy as copy } from "@/content/auth";
import { VerifyEmailScreen } from "@/sections/auth/VerifyEmail";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

// `?email=` comes from the sign-up form's redirect — there's no session yet
// to read the address back from (no backend). Falls back to generic copy if
// someone lands here directly without it.
export default async function VerifyEmailPage({ searchParams }: PageProps<"/verify-email">) {
  const { email } = await searchParams;
  const resolvedEmail = typeof email === "string" && email ? email : copy.fallbackEmail;

  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <VerifyEmailScreen email={resolvedEmail} />
    </SplitPanelLayout>
  );
}
