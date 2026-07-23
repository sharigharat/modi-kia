"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function TermsAndConditionsPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="bg-bg-2 pt-32 pb-20 min-h-screen">
        <div className="container-px mx-auto max-w-4xl">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
          >
            <ChevronLeft className="h-4 w-4" />
            Go Back
          </button>
          
          <div className="rounded-xl border border-border bg-white p-8 shadow-sm sm:p-12">
            <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-sm text-muted">
              Last Updated: July 2026
            </p>

            <div className="mt-10 space-y-8 text-sm text-text">
              <section>
                <h2 className="font-display text-xl font-bold">1. Agreement to Terms</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">2. Service Modifications and Vehicle Specifications</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Modi Kia reserves the right to modify or discontinue any vehicle variant, feature, or service without notice. Vehicle specifications, features, colors, and prices depicted on this website may vary from the actual vehicles available at our dealerships. Please consult our sales advisors for the most accurate and up-to-date information before making a booking.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">3. Bookings and Test Drives</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Submitting a booking request for a service appointment or a test drive through this website does not guarantee the availability of a slot or a specific vehicle. All requests are subject to confirmation by a Modi Kia representative. Test drives are strictly subject to driver age, possession of a valid driver's license, and other dealership policies.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">4. User Provided Content and Communication</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  By providing your contact details via forms or OTP verification, you grant Modi Kia permission to contact you through phone calls, SMS, WhatsApp, and emails for transactional and promotional purposes. This consent applies regardless of your status on the National Do Not Call (NDNC) registry.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">5. Intellectual Property</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  The website and its original content, features, and functionality are owned by Modi Kia and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Use of Kia logos and branding is strictly under dealership authorization.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">6. Limitation of Liability</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Modi Kia shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">7. Governing Law</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of or related to these terms and conditions or the use of this website will be subject to the exclusive jurisdiction of the courts in Maharashtra, India.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
