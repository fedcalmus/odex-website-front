import type { Metadata } from "next";
import { NotFoundView } from "@/sections/errors/NotFoundView";

export const metadata: Metadata = {
  title: "Էջը չի գտնվել",
};

/**
 * Catches `notFound()` thrown by a page inside this route group (e.g. a bad
 * `/events/[slug]`). Renders as `children` of `(site)/layout.tsx`, so the
 * Header/Footer chrome comes for free — unlike the root `not-found.tsx`,
 * which handles genuinely unmatched URLs and has to build its own chrome.
 */
export default function SiteNotFound() {
  return <NotFoundView />;
}
