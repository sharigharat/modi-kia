"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-muted">
              Last Updated: July 2026
            </p>

            <div className="mt-10 space-y-8 text-sm text-text">
              <section>
                <h2 className="font-display text-xl font-bold">1. Introduction</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  At Modi Kia, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains in detail how we collect, use, store, and safeguard your information when you interact with our website, book a test drive, schedule a service, submit an inquiry, or engage with our dealership services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">2. Information We Collect</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  We collect information that you voluntarily provide to us when you fill out forms on our website, as well as data collected automatically for analytics and attribution. This includes:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-muted">
                  <li><strong>Personal Identifiable Information (PII):</strong> Your full name, mobile number, email address, and physical address or pincode.</li>
                  <li><strong>Vehicle & Service Data:</strong> Preferred car models for test drives, current vehicle registration numbers, preferred service centres, service types, and pickup/drop preferences.</li>
                  <li><strong>Scheduling Data:</strong> Preferred dates and times for test drives or service appointments.</li>
                  <li><strong>Inquiry Data:</strong> Any custom messages, subjects, or feedback provided through our Contact Us forms.</li>
                  <li><strong>Verification Data:</strong> OTP (One-Time Password) verification records used to validate your mobile number.</li>
                  <li><strong>Tracking & Analytics Data:</strong> Ad campaign attribution parameters including UTM tags (utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_id), Google Click IDs (gclid), and Facebook/Meta Click IDs (fbclid).</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">3. Cookies and Local Storage</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Our website utilizes browser local storage (such as <code>localStorage</code> and <code>sessionStorage</code>) to enhance your user experience and track the effectiveness of our marketing campaigns. Specifically, we store marketing attribution tokens (UTM parameters, gclid, and fbclid) locally on your device when you click our advertisements. This data is attached to your form submissions to help us understand which campaigns led to your inquiry. We do not use intrusive tracking cookies to monitor your browsing behavior across third-party websites.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">4. How We Use Your Information</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Your information is exclusively used to provide you with a seamless and personalized automotive experience:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-muted">
                  <li>To schedule, confirm, and manage test drives, service appointments, and showroom visits.</li>
                  <li>To communicate with you regarding your inquiries, price quotations, and vehicle financing requests.</li>
                  <li>To send OTPs (One-Time Passwords) for secure phone number validation.</li>
                  <li>To analyze the performance of our marketing channels (Google Ads, Meta Ads) using the collected attribution parameters.</li>
                  <li>To improve our website functionality, customer service processes, and dealership offerings.</li>
                  <li>To comply with legal and regulatory obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">5. Data Sharing and Protection</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  We do not sell, rent, or trade your personal information to third parties. We may share your data with trusted entities strictly for fulfilling your requests. This includes Kia India (the manufacturer) for warranty claims, product updates, or official communications, as well as our internal CRM systems (such as Supabase and Google Workspace) to manage your bookings. We implement robust, industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">6. Explicit Consent and Communication Permissions</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  By submitting your mobile number and verifying it via OTP on our website, you explicitly grant Modi Kia and its authorized representatives the permission to contact you. This consent encompasses communications via:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-muted">
                  <li>Voice Calls</li>
                  <li>SMS (Short Message Service)</li>
                  <li>WhatsApp Messages</li>
                  <li>Emails</li>
                </ul>
                <p className="mt-3 leading-relaxed text-muted">
                  <strong>DNC/NDNC Override:</strong> You acknowledge and agree that your explicit consent to be contacted for transactional, informational, and promotional purposes overrides any registration you may have on the Do Not Call (DNC) or National Do Not Call (NDNC) registry.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">7. Your Rights</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, or ask us to delete your data where applicable by law. If you wish to opt-out of marketing communications or exercise any of these rights, please contact our support team.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">8. Contact Us</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  If you have any questions, concerns, or grievances regarding this Privacy Policy or our data practices, please reach out to us at our official contact email or visit our dealership in person.
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
