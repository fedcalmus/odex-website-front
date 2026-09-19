/**
 * Share the current page: the native share sheet where there is one (phones),
 * else copy the link. Dismissing the sheet rejects — that isn't an error worth
 * surfacing, so failures are swallowed.
 */
export async function shareCurrentPage(title: string): Promise<void> {
  const url = window.location.href;
  if (navigator.share) {
    await navigator.share({ title, url }).catch(() => undefined);
  } else {
    await navigator.clipboard?.writeText(url).catch(() => undefined);
  }
}
