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

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedVehicles />
        <Offers />
        <HomeSeoContent />
        <TestDrive />
        <Services />
        <Testimonials />
        <Blogs />
        <FAQ />
        <Locations />
      </main>
      <Footer />
    </>
  );
}
