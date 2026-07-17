import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LocateUs from "@/components/LocateUs";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Locate Us | Modi Kia Showroom & Service Department";
const description =
  "Find Modi Kia's showroom and service department on the Kalyan-Bhiwandi Road. View the branch on the map and open Google Maps directions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/locate-us" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/locate-us`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const locateUsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/locate-us#webpage`,
      url: `${SITE_URL}/locate-us`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Locate Us", item: `${SITE_URL}/locate-us` },
      ],
    },
  ],
};

export default function LocateUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locateUsSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="relative w-full overflow-hidden bg-bg-2 pt-14 pb-10 sm:pt-16 sm:pb-12">
          <div className="container-px mx-auto max-w-[1400px] text-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Locate Us
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                Find the Modi Kia Location
              </h1>
              <p className="mt-3 mx-auto max-w-2xl text-sm text-muted sm:text-base">
                Explore the Modi Kia showroom and service department, preview the
                branch on the map, and get live navigation in Google Maps.
              </p>
            </Reveal>
          </div>
        </section>

        <LocateUs />
      </main>
      <Footer />
    </>
  );
}
