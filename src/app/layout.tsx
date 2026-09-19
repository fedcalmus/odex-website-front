import type { Metadata, Viewport } from "next";
import { Noto_Sans_Armenian, Roboto, Roboto_Mono } from "next/font/google";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.scss";

// Mardoto (the licensed Armenian face) isn't available in this environment
// yet. Per the design foundations, every style is built on Roboto in the
// meantime — swapping this import is the only change needed once Mardoto's
// files are supplied.
const fontSans = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Roboto's latin subset has no Armenian glyphs. Without this the whole site —
// which is Armenian copy — would render in whatever the OS falls back to.
// Second in the font stack (see abstracts/_typography.scss); drop it when
// Mardoto lands.
const fontArmenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
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
    <html
      lang="hy"
      className={`${fontSans.variable} ${fontArmenian.variable} ${fontMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
