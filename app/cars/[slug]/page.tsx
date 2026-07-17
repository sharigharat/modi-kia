import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CarDetailClient from "@/components/CarDetailClient";
import { cars, formatINR, SITE_URL } from "@/lib/data";
import { getCarDetail } from "@/lib/car-details";
import { carGallery } from "@/lib/carGallery";
import { DEALER_ID } from "@/lib/schema";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  const detail = getCarDetail(car);

  const displayName = `Kia ${car.name}`;
  const title = `${displayName}: Price, Specs, Colours & Test Drive`;
  const description = `${detail.overview} Starting at ${formatINR(car.priceINR)}* ex-showroom. Compare variants, colours, features and specifications, then book a Kia test drive with Modi Kia.`;

  return {
    title,
    description,
    alternates: { canonical: `/cars/${car.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/cars/${car.slug}`,
      images: [car.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const displayName = `Kia ${car.name}`;
  const detail = getCarDetail(car);
  const gallery = carGallery[car.slug] ?? [];

  const carPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Car",
        "@id": `${SITE_URL}/cars/${car.slug}#product`,
        name: displayName,
        description: detail.overview,
        image: [car.image, ...gallery.map((image) => image.src)],
        brand: { "@type": "Brand", name: "Kia" },
        vehicleConfiguration: car.type,
        fuelType: car.fuel.replace(/\s·\s/g, ", "),
        vehicleEngine: { "@type": "EngineSpecification", name: car.engine },
        vehicleTransmission: car.transmission,
        numberOfSeats: car.seating,
        additionalProperty: detail.specifications.map((spec) => ({
          "@type": "PropertyValue",
          name: spec.label,
          value: spec.value,
        })),
        offers: {
          "@type": "Offer",
          price: car.priceINR,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": DEALER_ID },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cars", item: `${SITE_URL}/#cars` },
          {
            "@type": "ListItem",
            position: 3,
            name: displayName,
            item: `${SITE_URL}/cars/${car.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/cars/${car.slug}#faq`,
        mainEntity: [
          `What is the price of the ${displayName} in Bhiwandi and Dombivli?`,
          `How many variants does the ${displayName} offer?`,
          `What engine and mileage does the ${displayName} deliver?`,
          `What are the key features of the ${displayName}?`,
          `How safe is the ${displayName}?`,
          `Where can I test drive the ${displayName}?`,
        ].map((question) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: `See the ${displayName} FAQs section on this page for the full answer.` },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <CarDetailClient car={car} />
      </main>
      <Footer />
    </>
  );
}
