import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ContactUs from "@/components/ContactUs";
import Reveal from "@/components/Reveal";
import { company, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Contact Us";
const description =
  "Get in touch with Modi Kia. Call, WhatsApp, email us, or send a message to our team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/contact-us`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact-us#webpage`,
      url: `${SITE_URL}/contact-us`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contact Us", item: `${SITE_URL}/contact-us` },
      ],
    },
  ],
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="relative h-[240px] w-full overflow-hidden bg-brand-deep sm:h-[300px]">
          <Image
            src="/showrooms/service-hero.jpg"
            alt="Modi Kia Service Care"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Contact
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Get in Touch
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Call {company.phone}, WhatsApp us, email us, or send a message and
                our team will get back to you.
              </p>
            </Reveal>
          </div>
        </section>

        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
