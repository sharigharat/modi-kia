"use client";

import { createContext, useContext, useState, useRef, useEffect, type ReactNode, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, ChevronDown } from "./icons";
import Reveal from "./Reveal";
import { useGlobalOtp } from "./GlobalOtpProvider";
import { countryCodes } from "@/lib/countries";
const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

export function CountrySelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const getFullName = (iso: string) => {
    try {
      return regionNames.of(iso) || iso;
    } catch {
      return iso;
    }
  };

  const selected = countryCodes.find(c => c.code === value) || countryCodes[0];

  const filteredCodes = countryCodes
    .filter((c) => {
      const fullName = getFullName(c.name).toLowerCase();
      return fullName.includes(search.toLowerCase()) || c.code.includes(search);
    })
    .sort((a, b) => getFullName(a.name).localeCompare(getFullName(b.name)));

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-full items-center gap-1.5 rounded-l border-r border-border bg-bg-2 px-3 py-3 text-sm font-semibold text-text outline-none transition-colors hover:bg-bg-3 focus:bg-bg-3 min-w-[85px] max-w-[100px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/flags/${selected.name.toLowerCase()}.png`} alt={selected.name} className="w-5 h-[15px] object-cover rounded-[2px]" />
        {selected.code}
        <ChevronDown className="ml-0.5 h-3 w-3 text-muted" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-72 w-64 overflow-hidden rounded-md border border-border bg-white shadow-lg flex flex-col">
          <div className="p-2 border-b border-border bg-bg-2/50">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand/20"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto p-1">
            {filteredCodes.map((c) => (
              <button
                key={`${c.code}-${c.name}`}
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm rounded-sm transition-colors hover:bg-bg-2 ${
                  value === c.code ? "bg-brand/5 font-semibold text-text" : "text-text"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/flags/${c.name.toLowerCase()}.png`} alt={c.name} className="w-5 h-[15px] object-cover rounded-[2px] shadow-sm" />
                <span className="flex-1 truncate">{getFullName(c.name)}</span>
                <span className="text-muted text-xs">{c.code}</span>
              </button>
            ))}
            {filteredCodes.length === 0 && (
              <div className="px-3 py-4 text-center text-sm text-muted">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function OtpGate({ children, className, autoFocus = true, formSource = "unknown", alignTop = false }: { children: ReactNode, className?: string, autoFocus?: boolean, formSource?: string, alignTop?: boolean }) {
  const { globalPhone, setGlobalPhone } = useGlobalOtp();
  const initialCode = globalPhone && globalPhone.includes(" ") ? globalPhone.split(" ")[0] : "+91";
  const initialNumber = globalPhone && globalPhone.includes(" ") ? globalPhone.split(" ")[1] : (globalPhone || "");

  const [step, setStep] = useState<"phone" | "otp" | "verified">(globalPhone ? "verified" : "phone");
  const [countryCode, setCountryCode] = useState(initialCode);
  const [phone, setPhone] = useState(initialNumber);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate unverified phone number from sessionStorage (for when users click T&C and navigate back)
  useEffect(() => {
    if (globalPhone) return;
    const stored = sessionStorage.getItem("otp_draft_phone");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.p && !phone) setPhone(parsed.p);
        if (parsed.c && countryCode === "+91") setCountryCode(parsed.c);
        if (parsed.s && step === "phone") setStep(parsed.s);
      } catch (e) {}
    }
  }, [globalPhone]); // run once, basically

  // Persist unverified phone number to sessionStorage
  useEffect(() => {
    if (!globalPhone && (phone || countryCode !== "+91" || step !== "phone")) {
      sessionStorage.setItem("otp_draft_phone", JSON.stringify({ p: phone, c: countryCode, s: step }));
    }
  }, [phone, countryCode, step, globalPhone]);

  useEffect(() => {
    if (globalPhone) {
      setStep("verified");
      const parts = globalPhone.split(" ");
      if (parts.length > 1) {
        setCountryCode(parts[0]);
        setPhone(parts[1]);
      } else {
        setCountryCode("+91");
        setPhone(globalPhone);
      }
    } else {
      setStep("phone");
    }
  }, [globalPhone]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to ensure any layout transitions have completed
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, step]);

  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (countryCode === "+91") {
      if (!/^[6-9]\d{9}$/.test(phone)) {
        setError("Please enter a valid 10-digit mobile number starting with 6-9.");
        return;
      }
    } else {
      if (phone.length < 6 || phone.length > 15) {
        setError("Please enter a valid mobile number.");
        return;
      }
    }
    setError("");
    setIsLoading(true);

    try {
      const formattedPhone = `${countryCode}${phone}`;
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: formattedPhone, form_source: formSource }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to send OTP");
        return;
      }
      setStep("otp");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    try {
      const formattedPhone = `${countryCode}${phone}`;
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: formattedPhone, otp_code: otp, form_source: formSource }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Invalid OTP");
        return;
      }

      const verifiedPhone = `${countryCode} ${phone}`;
      setGlobalPhone(verifiedPhone, data.otp_verification_id);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`relative w-full ${className || ""}`}>
        {/* Background Form */}
        <div
          className={
            step !== "verified"
              ? "pointer-events-none select-none opacity-30 blur-[2px] transition-all duration-300"
              : "transition-all duration-300"
          }
        >
          {children}
        </div>

        {/* Overlay Modal */}
        {step !== "verified" && (
          <div className={`absolute inset-x-0 z-[50] flex justify-center p-4 ${alignTop ? "top-10 sm:top-20" : "top-1/2 -translate-y-1/2"}`}>
            <Reveal variant="fade-up" className="flex w-full max-w-2xl rounded-xl border border-border bg-white shadow-2xl">
              <div className="relative hidden w-5/12 overflow-hidden rounded-l-xl md:block">
                <Image
                  src="/showrooms/otp-showroom-v3.png"
                  alt="Modi Kia Showroom"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover scale-110 origin-bottom"
                />
              </div>
              <div className="relative w-full rounded-xl bg-white p-6 sm:p-8 md:w-7/12 md:rounded-l-none">
                {step === "phone" ? (
                <>
                  <h3 className="font-display text-lg font-bold text-text">Verify your Mobile Number</h3>
                  <p className="mt-1.5 text-xs text-muted">
                    To serve you better, please verify your phone number to proceed.
                  </p>
                  <form onSubmit={handlePhoneSubmit} className="mt-5 space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                      <div className="flex w-full rounded border border-border bg-white transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10">
                        <CountrySelect
                          value={countryCode}
                          onChange={(val) => {
                            setCountryCode(val);
                            setError("");
                          }}
                        />
                        <input
                          type="tel"
                          required
                          maxLength={countryCode === "+91" ? 10 : 15}
                          pattern={countryCode === "+91" ? "^[6-9]\\d{9}$" : "^\\d{6,15}$"}
                          placeholder={countryCode === "+91" ? "10-digit mobile number" : "Mobile number"}
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setPhone(val);
                            if (countryCode === "+91") {
                              if (val.length > 0 && !/^[6-9]/.test(val)) {
                                setError("Invalid mobile number.");
                              } else if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
                                setError("Invalid mobile number.");
                              } else {
                                setError("");
                              }
                            } else {
                              setError("");
                            }
                          }}
                          className="w-full rounded-r bg-transparent px-4 py-3 text-sm text-text outline-none placeholder:text-faint"
                          ref={step === "phone" ? inputRef : null}
                        />
                      </div>
                      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand cursor-pointer" />
                      <span className="text-[11px] leading-relaxed text-muted">
                        I agree to Modi Kia's <Link href="/terms-and-conditions" className="text-brand font-medium hover:underline">T&C</Link> and <Link href="/privacy-policy" className="text-brand font-medium hover:underline">Privacy Policy</Link>. This consent overrides any DNC/NDNC registrations.
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading || (countryCode === "+91" ? !/^[6-9]\d{9}$/.test(phone) : phone.length < 6)}
                      className="group flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                      {!isLoading && <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h3 className="font-display text-lg font-bold text-text">Enter OTP</h3>
                  <p className="mt-1.5 text-xs text-muted">
                    We've sent a code to <strong>{countryCode} {phone}</strong>.{" "}
                    <button type="button" onClick={() => setStep("phone")} className="text-brand hover:underline">
                      Change
                    </button>
                  </p>
                  <form onSubmit={handleOtpSubmit} className="mt-5 space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">One-Time Password</span>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="Enter 4-digit OTP"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, ""));
                          setError("");
                        }}
                        className={`${fieldBase} text-center tracking-widest text-lg font-bold`}
                        ref={step === "otp" ? inputRef : null}
                      />
                      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 4}
                      className="flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
                    >
                      {isLoading ? "Verifying..." : "Verify & Proceed"}
                      {!isLoading && <Check className="h-4 w-4" />}
                    </button>
                  </form>
                </>
              )}
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </>
  );
}

export function PhoneInput({ name = "mobile" }: { name?: string }) {
  const { globalPhone, setGlobalPhone } = useGlobalOtp();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <>
      <div className="relative">
        <input
          type="tel"
          name={name}
          required
          readOnly
          value={globalPhone}
          onClick={handleClick}
          className={`${fieldBase} cursor-pointer bg-bg-2 text-muted focus:ring-0 focus:border-border`}
          title="Click to edit and re-verify"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
          <Check className="h-3 w-3" /> VERIFIED
        </div>
      </div>
      
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Reveal variant="fade-up" className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h4 className="font-display text-lg font-bold text-text">Change Mobile Number?</h4>
            <p className="mt-2 text-sm text-muted">
              If you want to change the number, you will have to re-verify it with a new OTP. Your current form progress will be saved.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded border border-border px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-bg-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  setGlobalPhone("");
                }}
                className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
              >
                Okay, Re-verify
              </button>
            </div>
          </Reveal>
        </div>
      )}
    </>
  );
}
