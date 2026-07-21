import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="bg-bg-2 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-muted sm:text-base">
              Our privacy policy is currently being updated and will be published here shortly. 
              Please check back soon for detailed information on how we handle and protect your data.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
