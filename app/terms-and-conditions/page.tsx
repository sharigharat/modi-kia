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
                  By accessing, browsing, and using this website, you accept and agree to be bound by the comprehensive terms and provisions of this agreement. These terms apply to all visitors, users, and others who access or use our services. If you do not agree to abide by the above, please discontinue your use of this service immediately.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">2. Service Modifications and Vehicle Specifications</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Modi Kia reserves the right to modify, suspend, or discontinue any vehicle variant, feature, offer, or service without prior notice. Vehicle specifications, features, colors, and prices depicted on this website are for illustrative purposes and may vary from the actual vehicles available at our dealerships. We recommend consulting our authorized sales advisors for the most accurate, real-time, and up-to-date information before making any booking or financial decision.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">3. Bookings, Test Drives, and Service Appointments</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Submitting a booking request for a service appointment or a test drive through this website constitutes an inquiry and does not guarantee the availability of a specific time slot or vehicle model. All requests are strictly subject to confirmation by a Modi Kia representative. Test drives are further subject to dealership policies, including driver age restrictions, the possession of a valid government-issued driver's license, and adherence to safety protocols.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">4. User Provided Content and OTP Verification</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  To ensure the authenticity of inquiries, we utilize an OTP (One-Time Password) verification system. By entering your mobile number and completing the OTP verification, you confirm that you are the lawful owner of the provided number and authorize Modi Kia to associate this number with your profile.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">5. Explicit Communication Consent and DNC Override</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  By providing your contact details via forms, WhatsApp links, or OTP verifications on our website, you grant Modi Kia and its authorized third-party partners explicit permission to contact you. This contact may occur through:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-muted">
                  <li>Phone calls from our sales or service representatives</li>
                  <li>SMS and WhatsApp messages for updates, reminders, and promotional offers</li>
                  <li>Email communications regarding your inquiry or vehicle lifecycle</li>
                </ul>
                <p className="mt-3 leading-relaxed text-muted">
                  <strong>DNC/NDNC Override:</strong> You expressly acknowledge that your request to be contacted supersedes and overrides any active registration on the Do Not Call (DNC) or National Do Not Call (NDNC) registry.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">6. Tracking and Analytics Consent</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  By using this website, you consent to the collection of anonymized and campaign-specific tracking data. When you arrive at our site via digital advertisements, we store tracking parameters (such as Google Click IDs, Facebook Click IDs, and UTM tags) in your browser's local storage. This data is transmitted alongside your form submissions strictly to help us evaluate the effectiveness of our marketing campaigns.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">7. Intellectual Property</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  The website and its original content, features, layout, and functionality are owned by Modi Kia and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. The use of Kia logos, imagery, and branding is strictly under authorization from Kia India. Unauthorized use, reproduction, or distribution of this material is prohibited.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">8. Limitation of Liability</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Modi Kia, its directors, employees, partners, agents, and affiliates shall not be held liable for any indirect, incidental, special, consequential, or punitive damages. This includes, but is not limited to, loss of profits, data, use, goodwill, or other intangible losses resulting from (i) your access to or use of or inability to access or use the website; (ii) any conduct or content of any third party on the website; and (iii) unauthorized access, use, or alteration of your transmissions or content.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">9. Governing Law and Jurisdiction</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or related to these terms and conditions, or the use of this website, will be subject to the exclusive jurisdiction of the courts located in Mumbai/Thane, Maharashtra, India.
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
