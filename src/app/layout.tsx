import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.scss";

// Mardoto (the licensed Armenian face) isn't available in this environment
// yet. Per the design foundations, every style is built on Roboto in the
// meantime — swapping this import is the only change needed once Mardoto's
// files are supplied.
const fontSans = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fontMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Odex",
  description: "Outdoor events marketplace, Armenia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
