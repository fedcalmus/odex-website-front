import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { disclaimerCopy as copy } from "@/content/disclaimer";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { LegalDocument } from "@/sections/legal/LegalDocument";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.intro,
};

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(copy.breadcrumb.items.map((item) => ({ name: item.label, href: item.href })))}
      />
      <LegalDocument copy={copy} />
    </>
  );
}
