"use client";

import { useEffect, useState, type FormEvent } from "react";
import { company, locations } from "@/lib/data";
import { Check, Clock, Mail, MapPin, Phone, WhatsApp } from "./icons";
import Reveal from "./Reveal";
import { OtpGate, PhoneInput } from "./OtpGate";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>('input[type="email"]');
    const emailValue = emailInput?.value.trim();
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Enter a valid email address (e.g. you@example.com).");
      return;
    }
    setEmailError("");
    setSubmitted(true);
  };

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#contact-form-card") return;
    const scroll = () => {
      document.getElementById("contact-form-card")?.scrollIntoView({ behavior: "smooth" });
    };
    const t1 = setTimeout(scroll, 100);
    const t2 = setTimeout(scroll, 450);
    const t3 = setTimeout(scroll, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1180px]">
        {/* The "Get in Touch" heading was removed from here because it's already in the hero section above it */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal variant="slide-right" className="rounded-lg border border-border bg-bg-2 p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-text">
              Contact Information
            </h3>
            <p className="mt-1 text-sm text-muted">
              We are here to help with bookings, service queries, finance questions
              and anything else you need.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Call Us</p>
                  <a
                    href={`tel:${company.phoneE164}`}
                    className="text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <WhatsApp className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">WhatsApp</p>
                  <a
                    href={`https://wa.me/${company.phoneE164.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Email Us</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Working Hours</p>
                  <p className="text-sm font-semibold text-text">{company.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Pincode</p>
                  <div className="text-sm font-semibold text-text">
                    {locations
                      .filter((l) => l.type === "Showroom")
                      .map((l) => {
                        const pin = l.address.match(/\b\d{6}\b/)?.[0];
                        return `${l.city} - ${pin}`;
                      })
                      .join("  ·  ")}
                  </div>
                </div>
              </li>
            </ul>
          </Reveal>

          <div id="contact-form-card" className="scroll-mt-20">
          <Reveal
            delay={120}
            variant="slide-left"
            className="rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(0,44,95,0.06)] sm:p-8"
          >
            <h3 className="font-display text-lg font-bold text-text">
              Send Us a Message
            </h3>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-7 w-7" />
                </span>
                <h4 className="mt-4 font-display text-lg font-bold text-text">
                  Message sent!
                </h4>
                <p className="mt-1 max-w-xs text-sm text-muted">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setEmailError(""); }}
                  className="mt-5 rounded border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
                >
                  Send another
                </button>
              </div>
            ) : (
              <OtpGate>
                <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                    <input type="text" required placeholder="Your name" className={fieldBase} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                    <PhoneInput name="mobile" />
                  </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Your Email <span className="font-normal text-faint">(optional)</span>
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    onChange={() => setEmailError("")}
                    className={`${fieldBase} ${emailError ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {emailError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{emailError}</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Subject</span>
                  <input type="text" required placeholder="How can we help?" className={fieldBase} />
                </label>
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Message</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us more..."
                    className={`${fieldBase} resize-none`}
                  />
                </label>
                <button
                  type="submit"
                  className="col-span-full mt-1 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                >
                  Send Message
                </button>
              </form>
              </OtpGate>
            )}
          </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
