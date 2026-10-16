import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { clubRegisterCopy as copy } from "@/content/clubs";
import { ClubRegisterWizard } from "@/sections/clubs/ClubRegister";

// Account screens are not for search engines.
export const metadata: Metadata = {
  title: copy.account.title,
  robots: { index: false, follow: false },
};

// Lives under the `(auth)` route group — not `(site)/clubs` — so it gets the
// stripped FocusHeader/SplitPanelLayout chrome the mock shows, not the
// marketplace nav the rest of /clubs uses. Next.js resolves this to
// /clubs/register regardless of which group it sits in; the static
// `/clubs/register` segment always wins over the sibling `(site)/clubs/[slug]`
// dynamic route.
export default function ClubRegisterPage() {
  return (
    <SplitPanelLayout image="/images/auth/register-panel.png">
      <ClubRegisterWizard />
    </SplitPanelLayout>
  );
}
