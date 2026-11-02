import { SkipLink } from "@/components/SkipLink";
import { skipLinkLabel } from "@/content/site";

// Account creation, sign-in, club sign-up and profile-completion screens: "the
// only screens that do not use the marketplace nav" (Figma). FocusHeader and
// the page's <main> landmark now live in SplitPanelLayout itself — every
// page here uses it, and each needs its own back link / secure-mark text
// (confirmed different across mocks: icon-only at sign-up, "Անվտանգ մուտք" at
// login, "Ապահով վճարում" in the profile-completion flow) — a single shared
// layout-level header couldn't express that.
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink>{skipLinkLabel}</SkipLink>
      {children}
    </>
  );
}
