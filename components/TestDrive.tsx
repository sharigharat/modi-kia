"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { carModels, cityOptions, cityLabels, testDriveImage } from "@/lib/data";
import { Calendar, Check, ChevronDown } from "./icons";
import Reveal from "./Reveal";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

function SelectField({
  label,
  options,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      <div className="relative">
        <select
          {...(controlled
            ? { value, onChange: (e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
            : { defaultValue: "" })}
          required
          className={`${fieldBase} appearance-none pr-10`}
        >
          <option value="" disabled className="text-faint">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
      </div>
    </label>
  );
}

export default function TestDrive() {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emailError, setEmailError] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const availableTimeSlots = useMemo(() => {
    if (!date || !minDate || date !== minDate) return timeSlots;
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    return timeSlots.filter((s) => s.end > currentHour);
  }, [date, minDate]);

  const effectiveTime = availableTimeSlots.some((s) => s.label === time)
    ? time
    : "";

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

  return (
    <section id="test-drive" className="scroll-mt-24 bg-white py-14 lg:py-20 overflow-hidden">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-lg border border-border shadow-[0_4px_32px_0_rgba(0,44,95,0.08)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* Visual side */}
          <Reveal variant="slide-right" className="relative min-h-[280px] overflow-hidden lg:min-h-full">
            <Image
              src={testDriveImage}
              alt="Kia Syros interior and dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Book a Test Drive
              </p>
              <h2 className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                Take Your Favourite Kia for a Spin
              </h2>
              <p className="mt-3 max-w-sm text-sm text-white/70">
                Pick a date, time and location, and we&apos;ll have the car ready,
                at our showroom or your home.
              </p>
            </div>
          </Reveal>

          {/* Form side */}
          <Reveal delay={200} variant="slide-left" className="bg-bg-2 p-8 sm:p-10 lg:p-12">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-text">
                  Booking received!
                </h3>
                <p className="mt-2 max-w-sm text-muted">
                  Thank you. A Modi Kia representative will call you shortly to confirm your test drive.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setEmailError(""); }}
                  className="mt-6 rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
                >
                  Book another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Select Car Model"
                  placeholder="Select Car Model"
                  options={carModels}
                />
                <SelectField
                  label="Select Location"
                  placeholder="Select Location"
                  options={cityOptions.map((c) => cityLabels[c] ?? c)}
                />

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                  <input type="text" required placeholder="Your name" className={fieldBase} />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Mobile number"
                    className={fieldBase}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Email <span className="font-normal text-faint">(optional)</span>
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
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    placeholder="6-digit pincode"
                    className={fieldBase}
                  />
                </label>

                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Address <span className="font-normal text-faint">(optional)</span>
                  </span>
                  <input
                    type="text"
                    placeholder="House no., street, area"
                    className={fieldBase}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      suppressHydrationWarning
                      className={`${fieldBase} pr-10 ${date ? "" : "text-transparent"}`}
                    />
                    <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>

                <SelectField
                  label="Preferred Time"
                  placeholder={
                    date && availableTimeSlots.length === 0
                      ? "No slots left today"
                      : "Select time"
                  }
                  options={availableTimeSlots.map((s) => s.label)}
                  value={effectiveTime}
                  onChange={setTime}
                />

                <button
                  type="submit"
                  className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                >
                  Book My Test Drive
                </button>
                <p className="col-span-full text-center text-xs text-faint">
                  By submitting, you agree to be contacted by Modi Kia about
                  your test drive request. See our{" "}
                  <a href="#" className="font-medium text-brand hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
