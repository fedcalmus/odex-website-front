import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { resetPasswordCopy } from "@/content/auth";
import { ResetSentScreen } from "@/sections/auth/ResetPassword";

const copy = resetPasswordCopy;

export const metadata: Metadata = {
  title: copy.sent.title,
  robots: { index: false, follow: false },
};

// `?email=` comes from the reset-request form's redirect — there's no
// session yet to read the address back from (no backend). Falls back to a
// generic placeholder if someone lands here directly without it.
export default async function ResetPasswordSentPage({ searchParams }: PageProps<"/reset-password/sent">) {
  const { email } = await searchParams;
  const resolvedEmail = typeof email === "string" && email ? email : copy.sent.fallbackEmail;

  return (
    <SplitPanelLayout
      image="/images/auth/register-panel.png"
      back={{ href: "/login", label: copy.header.back }}
      secureLabel={copy.header.secure}
    >
      <ResetSentScreen email={resolvedEmail} />
    </SplitPanelLayout>
  );
}
