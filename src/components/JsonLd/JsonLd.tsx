export interface JsonLdProps {
  /** One schema.org object, or several — each becomes its own script tag. */
  data: object | object[];
}

/**
 * Structured data for search engines. `<` is escaped to its unicode form so a
 * string containing `</script>` can't break out of the tag (Next.js JSON-LD guide).
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
