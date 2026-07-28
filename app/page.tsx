import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import Offers from "@/components/Offers";
import TestDrive from "@/components/TestDrive";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import FAQ from "@/components/FAQ";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import HomeSeoContent from "@/components/HomeSeoContent";
import { cars, blogs } from "@/lib/data";

export default function Home() {
  const featuredCars = cars.map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image,
    alt: c.alt,
    category: c.category,
    priceINR: c.priceINR,
    engine: c.engine,
    transmission: c.transmission,
  }));

  const blogSummaries = blogs.slice(0, 4).map((b) => ({
    slug: b.slug,
    image: b.image,
    title: b.title,
    category: b.category,
    date: b.date,
  }));

  return (
    <>
      <Navbar />
      <FloatingActions />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedVehicles initialCars={featuredCars} />
        <Offers />
        <HomeSeoContent />
        <TestDrive />
        <Services />
        <Testimonials />
        <Blogs initialPosts={blogSummaries} />
        <FAQ />
        <Locations />
      </main>
      <Footer />
    </>
  );
}
