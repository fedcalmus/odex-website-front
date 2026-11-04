import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { cancellationCopy as copy } from "@/content/cancellation";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { LegalDocument } from "@/sections/legal/LegalDocument";
import { RefundScale } from "@/sections/legal/RefundScale";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.intro,
};

export default function RefundsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(copy.breadcrumb.items.map((item) => ({ name: item.label, href: item.href })))}
      />
      <LegalDocument copy={copy} panel={<RefundScale copy={copy.scale} />} />
    </>
  );
}
