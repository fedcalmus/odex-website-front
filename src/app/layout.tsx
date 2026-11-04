import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { cookieBanner } from "@/content/site";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.scss";

// Mardoto (Christian Robertson + Vahan Hovhannisyan, Apache-2.0 —
// github.com/vahanhovh/mardoto, files + LICENSE vendored in
// ../fonts/mardoto/) is a Roboto-styled family that covers Armenian AND
// Latin itself, so it's the one primary face — not a Latin font plus a
// separate Armenian fallback. Only the three weights the type scale uses
// (see abstracts/_typography.scss): regular/medium/bold, no italics —
// Armenian here carries emphasis through weight, never style.
const fontSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../fonts/mardoto/Mardoto-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/mardoto/Mardoto-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/mardoto/Mardoto-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const fontMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Outdoor events marketplace, Armenia.",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "hy_AM",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0e1413", // the header bar (surface/nav)
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hy" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        {children}
        <CookieBanner copy={cookieBanner} />
      </body>
    </html>
  );
}
