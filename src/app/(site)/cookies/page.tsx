import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { cookiesCopy as copy } from "@/content/cookies";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CookiePreferences } from "@/sections/legal/CookiePreferences";
import { LegalDocument } from "@/sections/legal/LegalDocument";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.intro,
};

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(copy.breadcrumb.items.map((item) => ({ name: item.label, href: item.href })))}
      />
      <LegalDocument copy={copy} panel={<CookiePreferences copy={copy.preferences} />} />
    </>
  );
}
