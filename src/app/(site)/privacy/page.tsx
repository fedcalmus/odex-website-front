import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { privacyCopy as copy } from "@/content/privacy";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { LegalDocument } from "@/sections/legal/LegalDocument";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.intro,
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(copy.breadcrumb.items.map((item) => ({ name: item.label, href: item.href })))}
      />
      <LegalDocument copy={copy} />
    </>
  );
}
