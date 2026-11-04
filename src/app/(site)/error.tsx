"use client";

import { ErrorView } from "@/sections/errors/ErrorView";

/**
 * Error boundary for this route group (Next 16.3's `error.js`, stable
 * `retry` prop). Renders inside `(site)/layout.tsx` without unmounting it,
 * so Header/Footer stay put while only the failed segment's content swaps
 * for this fallback.
 */
export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorView error={error} retry={retry} />;
}
