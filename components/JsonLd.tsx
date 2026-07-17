import { buildJsonLd } from "@/lib/schema";

/* Injects the page's JSON-LD graph. Rendered server-side so crawlers and
   answer engines see it in the initial HTML. */
export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Schema is built from trusted, in-repo data (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c") }}
    />
  );
}
