import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import BlogsPageClient from "@/components/BlogsPageClient";
import { SITE_URL, aboutHeroImage } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "The Modi Kia Journal ,  Kia Car Guides, Tips & Model Insights";
const description =
  "Expert Kia car guides, ownership tips, model comparisons and service advice from Modi Kia ,  your authorised Kia dealer in Bhiwandi, Dombivli and the surrounding region.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/blogs`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const blogsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blogs#blog`,
      name: title,
      description,
      url: `${SITE_URL}/blogs`,
      publisher: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blogs` },
      ],
    },
  ],
};

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogsPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="relative h-[260px] w-full overflow-hidden bg-brand-deep sm:h-[320px]">
          <Image
            src={aboutHeroImage}
            alt="Modi Kia Journal ,  Kia car guides and ownership tips"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Journal
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                The Modi Kia Journal
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                Expert car guides, ownership tips and Kia model insights ,  from
                your authorised Kia dealer in Bhiwandi, Dombivli &amp; the
                surrounding region.
              </p>
            </Reveal>
          </div>
        </section>

        <BlogsPageClient />
      </main>
      <Footer />
    </>
  );
}
