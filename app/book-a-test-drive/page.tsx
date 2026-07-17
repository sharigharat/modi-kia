import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TestDriveWizard from "@/components/TestDriveWizard";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Book a Kia Test Drive in Bhiwandi & Dombivli";
const description =
  "Book a no-obligation Kia test drive in Bhiwandi or Dombivli. Choose your model, preferred time and showroom or doorstep location online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/book-a-test-drive" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/book-a-test-drive`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const testDrivePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/book-a-test-drive#webpage`,
      url: `${SITE_URL}/book-a-test-drive`,
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
          name: "Book a Test Drive",
          item: `${SITE_URL}/book-a-test-drive`,
        },
      ],
    },
  ],
};

export default function BookTestDrivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testDrivePageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="bg-bg-2 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Book a Test Drive
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                Drive the Kia You&apos;re Comparing
              </h1>
              <p className="mt-3 text-sm text-muted sm:text-base">
                Choose your model, a convenient time and a showroom or doorstep
                location. We&apos;ll confirm the car and help you compare the right
                variant, without any pressure to buy.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-10 lg:py-16">
          <div className="container-px mx-auto max-w-[1400px]">
            <TestDriveWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
