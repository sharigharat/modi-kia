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
                  At Modi Kia, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website, book a test drive, schedule a service, or engage with our dealership services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">2. Information We Collect</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  We collect information that you voluntarily provide to us when you fill out forms on our website. This includes:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-muted">
                  <li>Personal details such as your name, mobile number, and email address.</li>
                  <li>Vehicle preferences and current vehicle registration numbers.</li>
                  <li>Location data, such as your city and pincode.</li>
                  <li>Any additional information you provide in messages or inquiries.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">3. How We Use Your Information</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Your information is used to provide you with a seamless automotive experience:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-muted">
                  <li>To schedule and confirm test drives, service appointments, and showroom visits.</li>
                  <li>To communicate with you regarding your inquiries, quotations, and financing requests.</li>
                  <li>To send you OTPs (One-Time Passwords) to verify your contact number.</li>
                  <li>To improve our website functionality, customer service, and dealership offerings.</li>
                  <li>To comply with legal and regulatory obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">4. Data Sharing and Protection</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  We do not sell, rent, or trade your personal information to third parties. We may share your data with trusted partners (such as Kia India) strictly for fulfilling your requests (e.g., warranty claims, manufacturer updates, or financing approvals). We implement robust security measures to protect your data from unauthorized access or disclosure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">5. Consent and DNC/NDNC Override</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  By submitting your mobile number and verifying it via OTP, you explicitly consent to receive calls, SMS, and WhatsApp messages from Modi Kia and its authorized representatives regarding your inquiry. This consent overrides any registration on the Do Not Call (DNC) or National Do Not Call (NDNC) registry.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">6. Your Rights</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, or ask us to delete your data where applicable. If you wish to exercise these rights, please contact our support team.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold">7. Contact Us</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  If you have any questions or concerns about this Privacy Policy, please reach out to us at our official contact email or visit our dealership in person.
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
