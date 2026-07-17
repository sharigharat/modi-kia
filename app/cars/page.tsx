import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { cars, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";
import CarsGrid from "@/components/CarsGrid";

const title = "New Kia Cars, Prices, Variants & Specifications";
const description =
  "Browse the full Kia lineup at Modi Kia ,  SUVs, MPVs and electric vehicles, with on-road prices, specs and colours for every model.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cars" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/cars`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const carsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/cars#webpage`,
      url: `${SITE_URL}/cars`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cars", item: `${SITE_URL}/cars` },
      ],
    },
    {
      "@type": "ItemList",
      itemListElement: cars.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/cars/${c.slug}`,
        name: `Kia ${c.name}`,
      })),
    },
  ],
};

export default function CarsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carsPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="bg-bg-2 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Our Cars
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                Compare New Kia Cars with Confidence
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
                From compact SUVs to Kia&apos;s flagship electric lineup, find
                the Kia that fits your life, with pricing, specs and real
                colours for every model.
              </p>
            </Reveal>
          </div>
        </section>

        <CarsGrid />

        <section className="bg-brand py-12 lg:py-16">
          <div className="container-px mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Want a Shortlist Built Around You?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/70">
                Tell us how you drive, who travels with you and your budget. Our
                Kia specialists will help you compare the right variants.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="group inline-flex shrink-0 items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-white/90"
            >
              Get My Shortlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
