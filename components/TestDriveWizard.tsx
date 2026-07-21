"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { cars, cityOptions, cityLabels, locations, formatINR, getTomorrowDateString } from "@/lib/data";
import { Calendar, Check, ChevronDown, ChevronRight, X } from "./icons";
import Reveal from "./Reveal";
import { OtpGate, PhoneInput } from "./OtpGate";
import { useGlobalOtp } from "./GlobalOtpProvider";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

const steps = ["Select Car", "When & Where", "Your Details"];

function TestDriveWizardInner({ initialCarSlugProp, onClose }: { initialCarSlugProp?: string, onClose?: () => void } = {}) {
  const { globalPhone } = useGlobalOtp();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [carSlug, setCarSlug] = useState(initialCarSlugProp || "");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const mobile = globalPhone;
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const selectedCar = cars.find((c) => c.slug === carSlug);
  const showroomsInCity = locations.filter(
    (l) => l.type === "Showroom" && (city ? l.city === city : true),
  );

  const availableTimeSlots = useMemo(() => {
    if (!date || !minDate || date !== minDate) return timeSlots;
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    return timeSlots.filter((s) => s.end > currentHour);
  }, [date, minDate]);

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  const isValidMobile = /^[0-9]{10}$/.test(mobile);
  const isValidPincode = /^[0-9]{6}$/.test(pincode);

  const canProceed = () => {
    if (step === 1) return Boolean(carSlug);
    if (step === 2) return Boolean(city && date && time);
    if (step === 3)
      return Boolean(name.trim() && isValidMobile && (email.trim() ? isValidEmail : true) && isValidPincode);
    return true;
  };

  // Field-level messages, only surfaced once the user has tried to move on
  // from an incomplete step, so the reason a disabled-looking action won't
  // proceed is always spelled out rather than just greyed out.
  const fieldErrors = {
    name: attempted && step === 3 && !name.trim() ? "Please enter your name." : "",
    mobile:
      attempted && step === 3 && !isValidMobile
        ? "Enter a valid 10-digit mobile number."
        : "",
    email:
      attempted && step === 3 && email.trim() && !isValidEmail
        ? "Enter a valid email address (e.g. you@example.com)." : "",
    pincode:
      attempted && step === 3 && !isValidPincode ? "Enter a valid 6-digit pincode." : "",
  };

  const stepMessage =
    attempted && step === 1 && !carSlug
      ? "Please select a car to continue."
      : attempted && step === 2 && !city
        ? "Please select a location to continue."
        : attempted && step === 2 && city && !date
          ? "Please choose a preferred date."
          : attempted && step === 2 && city && date && !time
            ? "Please choose a preferred time slot."
            : "";

  const goNext = () => {
    if (canProceed()) {
      setAttempted(false);
      setStep((s) => Math.min(3, s + 1));
    } else {
      setAttempted(true);
    }
  };
  const goBack = () => {
    setAttempted(false);
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canProceed()) {
      setAttempted(true);
      return;
    }
    setSubmitted(true);
  };

  const resetAll = () => {
    setSubmitted(false);
    setAttempted(false);
    setStep(1);
    setCarSlug("");
    setCity("");
    setDate("");
    setTime("");
    setName("");
    setEmail("");
    setPincode("");
    setAddress("");
  };

  useEffect(() => {
    if (!submitted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [submitted]);

  return (
    <>
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(0,44,95,0.08)] sm:p-10">
        {/* Step indicator */}
        <div className="flex items-center justify-between">
          {steps.map((label, i) => {
            const n = i + 1;
            const state = n === step ? "active" : n < step ? "done" : "todo";
            return (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                      state === "done"
                        ? "bg-brand text-white"
                        : state === "active"
                          ? "bg-brand text-white ring-4 ring-brand/15"
                          : "bg-bg-2 text-faint"
                    }`}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : n}
                  </span>
                  <span
                    className={`hidden text-center text-[10px] font-medium sm:block ${
                      state === "todo" ? "text-faint" : "text-text"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {n < steps.length && (
                  <span
                    className={`mx-1.5 h-0.5 flex-1 rounded transition-colors ${
                      state === "done" ? "bg-brand" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="mt-8">
          {step === 1 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">Select Your Car</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {cars.slice(0, 12).map((car) => (
                  <button
                    type="button"
                    key={car.slug}
                    onClick={() => setCarSlug(car.slug)}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                      carSlug === car.slug
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-muted"
                    }`}
                  >
                    <Image
                      src={car.image}
                      alt={car.alt}
                      width={140}
                      height={60}
                      className="h-10 w-full object-contain"
                    />
                    <span className="text-xs font-semibold text-text">{car.name}</span>
                    <span className="text-[11px] text-faint">
                      {formatINR(car.priceINR)}
                    </span>
                  </button>
                ))}
              </div>
              {stepMessage && (
                <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
              )}
            </Reveal>
          )}

          {step === 2 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">When &amp; Where</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Location</span>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`${fieldBase} appearance-none pr-10`}
                    >
                      <option value="" disabled>
                        Select your location
                      </option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>
                          {cityLabels[c] ?? c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={getTomorrowDateString()}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTime("");
                      }}
                      suppressHydrationWarning
                      className={`${fieldBase} pr-10 ${date ? "" : "text-transparent"}`}
                    />
                    <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Time</span>
                  <div className="relative">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={!date}
                      className={`${fieldBase} appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <option value="" disabled>
                        {date && availableTimeSlots.length === 0
                          ? "No slots left today"
                          : "Select time"}
                      </option>
                      {availableTimeSlots.map((s) => (
                        <option key={s.label} value={s.label}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
              </div>
              {city && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted">
                    Showrooms in {cityLabels[city] ?? city}
                  </p>
                  {showroomsInCity.length === 0 && (
                    <p className="text-sm text-faint">
                      No showroom listed in {cityLabels[city] ?? city} yet ,  our nearest team will reach out.
                    </p>
                  )}
                  {showroomsInCity.map((s) => (
                    <div
                      key={s.name}
                      className="rounded border border-border bg-bg-2 px-4 py-3 text-sm text-text"
                    >
                      {s.name} ,  <span className="text-muted">{s.address}</span>
                    </div>
                  ))}
                </div>
              )}
              {stepMessage && (
                <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
              )}
            </Reveal>
          )}

          {step === 3 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">Your Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`${fieldBase} ${fieldErrors.name ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.name}</p>
                  )}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`${fieldBase} ${fieldErrors.email ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit pincode"
                    className={`${fieldBase} ${fieldErrors.pincode ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {fieldErrors.pincode && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.pincode}</p>
                  )}
                </label>
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Address <span className="font-normal text-faint">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House no., street, area"
                    className={fieldBase}
                  />
                </label>
              </div>
            </Reveal>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              className="rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className={`group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light ${
                  !canProceed() ? "opacity-50" : ""
                }`}
              >
                Next Step
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="rounded bg-brand px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Confirmation popup */}
      {submitted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={resetAll}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-lg bg-white p-8 text-center shadow-2xl sm:p-10"
          >
            <button
              onClick={() => {
                resetAll();
                if (onClose) onClose();
              }}
              className="absolute right-4 top-4 rounded-full p-2 text-faint transition-colors hover:bg-bg-2 hover:text-text"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
              <Check className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-text">
              Test drive booked!
            </h3>
            <p className="mt-2 text-muted">
              Thank you, {name}. A Modi Kia representative will call you at{" "}
              {mobile} shortly to confirm your{" "}
              {selectedCar ? `Kia ${selectedCar.name}` : ""} test drive on{" "}
              {date} ({time}) at {city}.
            </p>
            <button
              onClick={resetAll}
              className="mt-6 rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
            >
              Book another test drive
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function TestDriveWizard(props: { initialCarSlugProp?: string, onClose?: () => void }) {
  return (
    <OtpGate>
      <TestDriveWizardInner {...props} />
    </OtpGate>
  );
}
