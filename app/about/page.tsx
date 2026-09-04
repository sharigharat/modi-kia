import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { ArrowRight, Check } from "@/components/icons";
import {
  company,
  groupInfo,
  kiaIndiaFacts,
  aboutFaqData,
  aboutHeroImage,
  aboutCultureImage,
  SITE_URL,
} from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "About Modi Kia: Our Story, Values and Group";
const description =
  "Modi Kia is an authorised Kia dealership owned by the Gautam Modi Group, serving Kalyan, Dombivli & Ambernath with genuine parts and dedicated service.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
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
          name: "About Us",
          item: `${SITE_URL}/about`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/about#faq`,
      mainEntity: aboutFaqData.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        {/* Hero */}
        <section className="relative h-[320px] w-full overflow-hidden bg-brand-deep sm:h-[380px]">
          <Image
            src={aboutHeroImage}
            alt="Modi Kia showroom"
            title="Modi Kia showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Who We Are
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                About Modi Kia
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                An authorised Kia dealership from the Gautam Modi Group,
                serving Kalyan, Dombivli & Ambernath with genuine cars, honest service
                and a customer-first promise.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Our story */}
        <section className="bg-white pt-14 pb-6 lg:pt-20 lg:pb-8">
          <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <Reveal variant="slide-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Our Story
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Part of the Gautam Modi Group
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>
                  Modi Kia is an authorised Kia dealership, owned and
                  operated by the {groupInfo.name}. We operate sales showrooms in
                  Kalyan, Dombivli and Ambernath, alongside a dedicated
                  service centre on the Kalyan–Bhiwandi Road in Kalyan. Kia is the
                  featured brand in our corner of the group&apos;s wider
                  multi-brand portfolio.
                </p>
                <p>
                  Built on a long-standing commitment to responsible growth, the
                  Group continues to earn customer trust through experienced
                  teams, dependable service and strong partner relationships.
                </p>
              </div>
            </Reveal>
            <Reveal
              variant="slide-left"
              delay={150}
              className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] overflow-hidden rounded-lg"
            >
              <Image
                src={aboutCultureImage}
                alt="Modi Kia team culture"
                title="Modi Kia team culture"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Local commitment */}
        <section className="bg-white py-6 lg:py-8">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <div className="overflow-hidden rounded-2xl bg-brand-deep p-8 sm:p-10 lg:p-14 text-white shadow-xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                  <div className="lg:col-span-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Our Local Commitment
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                      Here for every milestone on the road.
                    </h2>
                  </div>
                  <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                    <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                      Whether you are buying your first car, upgrading your family SUV or arranging routine service, our showroom and service teams provide practical help close to home. Visit Modi Kia across Kalyan, Dombivli and Ambernath for new Kia cars, test drives, genuine parts and expert service support.
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {["Kalyan", "Dombivli", "Ambernath"].map((loc) => (
                        <span
                          key={loc}
                          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Core values */}
        <section className="bg-white pt-6 pb-14 lg:pt-8 lg:pb-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                What Drives Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Our Core Values
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {groupInfo.values.map((v, i) => (
                <Reveal
                  key={v.title}
                  delay={i * 100}
                  variant="scale-up"
                  className="rounded-lg border border-border bg-white p-6 text-center transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_0_rgba(0,44,95,0.12)]"
                >
                  <h3 className="text-sm font-semibold text-text">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {v.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>



        <FAQ
          id="about-faq"
          data={aboutFaqData}
          title="About Modi Kia: Frequently Asked Questions"
          subtitle="Quick answers about our ownership, group and track record."
        />

        {/* CTA */}
        <section className="bg-white py-14 lg:py-16">
          <Reveal className="container-px mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Ready to visit a showroom?
            </h2>
            <p className="max-w-md text-sm text-muted">
              Book a free test drive or visit our Modi Kia showroom and
              service department.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/#test-drive"
                className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#locations"
                className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                Find a Showroom
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
