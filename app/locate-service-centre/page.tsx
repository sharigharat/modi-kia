import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ServiceBooking from "@/components/ServiceBooking";
import ServiceCentres from "@/components/ServiceCentres";
import Reveal from "@/components/Reveal";
import { serviceHeroImage, serviceCentres, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Locate a Service Centre & Book a Service Appointment";
const description =
  "Book authorised Kia service online in Bhiwandi & Dombivli. Choose a convenient slot for maintenance, repairs, genuine parts and pickup/drop support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/locate-service-centre" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/locate-service-centre`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const servicePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/locate-service-centre#webpage`,
      url: `${SITE_URL}/locate-service-centre`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locate a Service Centre",
          item: `${SITE_URL}/locate-service-centre`,
        },
      ],
    },
    {
      "@type": "ItemList",
      itemListElement: serviceCentres.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "AutomotiveBusiness",
          name: s.name,
          address: s.address,
          telephone: s.phone,
        },
      })),
    },
  ],
};

export default function LocateServiceCentrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        {/* Hero */}
        <section className="relative h-[280px] w-full overflow-hidden bg-brand-deep sm:h-[340px]">
          <Image
            src={serviceHeroImage}
            alt="Kia service centre bay"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Service
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Locate a Service Centre & Book a Service
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Keep your Kia performing at its best with genuine parts,
                trained technicians, clear estimates and convenient
                service booking.
              </p>
            </Reveal>
          </div>
        </section>

        <ServiceBooking />
        <ServiceCentres />
      </main>
      <Footer />
    </>
  );
}
