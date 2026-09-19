"use client";

import { Button } from "@/components/Button";
import { shareCurrentPage } from "@/lib/share";

export interface ShareButtonProps {
  label: string;
  /** Title handed to the native share sheet. */
  title: string;
  className?: string;
}

/** "Կիսվել" — a secondary pill that shares this page (native sheet, else copies the link). */
export function ShareButton({ label, title, className }: ShareButtonProps) {
  return (
    <Button variant="secondary" className={className} onClick={() => shareCurrentPage(title)}>
      {label}
    </Button>
  );
}
