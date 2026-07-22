"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { carModels, serviceCentres, getTomorrowDateString } from "@/lib/data";
import { Calendar, Check, ChevronDown } from "./icons";
import Reveal from "./Reveal";
import { OtpGate, PhoneInput } from "./OtpGate";
import { useGlobalOtp } from "./GlobalOtpProvider";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

const serviceCentreOptions = serviceCentres.map((s) => `${s.name} ,  ${s.city}`);
const carModelOptions = [...carModels, "Other"];

const serviceTypes = ["Free Service", "Paid Service", "Running Repair"];

export function SelectField({
  label,
  name,
  options,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name?: string;
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
          name={name}
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

export default function ServiceBooking() {
  const { globalPhone } = useGlobalOtp();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emailError, setEmailError] = useState("");
  const [carModel, setCarModel] = useState("");
  const [otherModel, setOtherModel] = useState("");

  const availableTimeSlots = useMemo(() => {
    if (!date) return timeSlots;
    const isToday = date === new Date().toISOString().slice(0, 10);
    if (!isToday) return timeSlots;
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    return timeSlots.filter((s) => s.end > currentHour);
  }, [date]);

  const effectiveTime = availableTimeSlots.some((s) => s.label === time)
    ? time
    : "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const emailValue = (formData.get("email") as string)?.trim() || "";
    
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Enter a valid email address (e.g. you@example.com).");
      return;
    }
    
    setEmailError("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const payload = {
        formType: "service",
        carModel: carModel === "Other" ? otherModel : carModel,
        serviceCentre: formData.get("serviceCentre") as string,
        typeOfService: formData.get("typeOfService") as string,
        name: formData.get("name") as string,
        mobile: globalPhone,
        email: emailValue,
        registrationNumber: formData.get("registrationNumber") as string,
        preferredDate: date,
        preferredTime: effectiveTime,
        pickupDrop: formData.get("pickupDrop") === "on",
        pageSource: window.location.pathname,
      };

      const res = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      
      setSubmitted(true);
      form.reset();
      setCarModel("");
      setOtherModel("");
      setDate("");
      setTime("");
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (carModel !== "Other") setOtherModel("");
  }, [carModel]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Clear the flag in case it was set
    sessionStorage.removeItem("autoScroll");

    // Fire multiple times to win the race against Next.js scroll restoration
    const scroll = () => {
      document.getElementById("booking-card")?.scrollIntoView({ behavior: "smooth" });
    };
    const t1 = setTimeout(scroll, 100);
    const t2 = setTimeout(scroll, 450);
    const t3 = setTimeout(scroll, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section id="book-service" className="scroll-mt-24 relative z-10 -mt-10 sm:-mt-16 lg:-mt-20 pb-14 lg:pb-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <div id="booking-card" className="scroll-mt-20">
        <Reveal delay={150} className="mx-auto max-w-4xl rounded-xl border border-border bg-white p-8 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.15)] sm:p-10">
          <OtpGate formSource="service">
          <div className="mb-8 border-b border-border pb-6 text-left">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Book a Service Appointment
            </h2>
            <p className="mt-2 text-sm text-muted">
              Choose your nearest service centre and a slot that works for you.
              Our team will confirm your booking shortly.
            </p>
          </div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                <Check className="h-8 w-8" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-text">
                Service booking received!
              </h3>
              <p className="mt-2 max-w-sm text-muted">
                Thank you. A Modi Kia service advisor will call you shortly to confirm your appointment.
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
                name="carModel"
                placeholder="Select Car Model"
                options={carModelOptions}
                value={carModel}
                onChange={setCarModel}
              />
              <SelectField
                label="Select Service Centre"
                name="serviceCentre"
                placeholder="Select Service Centre"
                options={serviceCentreOptions}
              />

              {carModel === "Other" && (
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Your Car Model
                  </span>
                  <input
                    type="text"
                    name="otherModel"
                    required
                    value={otherModel}
                    onChange={(e) => setOtherModel(e.target.value)}
                    placeholder="e.g. Kia Sportage"
                    className={fieldBase}
                  />
                </label>
              )}

              <SelectField
                label="Type of Service"
                name="typeOfService"
                placeholder="Select Type of Service"
                options={serviceTypes}
              />

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                <input type="text" name="name" required placeholder="Your name" className={fieldBase} />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                <PhoneInput name="mobile" />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">
                  Email <span className="font-normal text-faint">(optional)</span>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={() => setEmailError("")}
                  className={`${fieldBase} ${emailError ? "border-red-400 focus:border-red-400" : ""}`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{emailError}</p>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">
                  Registration Number{" "}
                  <span className="font-normal text-faint">(optional)</span>
                </span>
                <input
                  type="text"
                  name="registrationNumber"
                  maxLength={12}
                  placeholder="e.g. MH04AB1234"
                  className={fieldBase}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={getTomorrowDateString()}
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
                name="preferredTime"
                placeholder={
                  date && availableTimeSlots.length === 0
                    ? "No slots left today"
                    : "Select time"
                }
                options={availableTimeSlots.map((s) => s.label)}
                value={effectiveTime}
                onChange={setTime}
              />

              <label className="col-span-full flex items-center gap-2.5 rounded border border-border bg-white px-4 py-3">
                <input
                  type="checkbox"
                  name="pickupDrop"
                  className="h-4 w-4 shrink-0 rounded border-border text-brand accent-brand focus:ring-2 focus:ring-brand/10"
                />
                <span className="text-sm text-text">Pick-up &amp; Drop required</span>
              </label>

              {submitError && (
                <div className="col-span-full mt-2 rounded bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="col-span-full mt-2 flex items-center justify-center gap-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
              >
                {isSubmitting ? "Booking..." : "Book My Service"}
              </button>
              <p className="col-span-full text-center text-xs text-faint">
                By submitting, you agree to be contacted by Modi Kia about
                your service request. See our{" "}
                <a href="#" className="font-medium text-brand hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
          </OtpGate>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
