"use client";

import { createContext, useContext, useState, useRef, useEffect, type ReactNode, type FormEvent } from "react";
import { Check, ChevronRight } from "./icons";
import Reveal from "./Reveal";
import { useGlobalOtp } from "./GlobalOtpProvider";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

export function OtpGate({ children, className, autoFocus = true }: { children: ReactNode, className?: string, autoFocus?: boolean }) {
  const { globalPhone, setGlobalPhone } = useGlobalOtp();
  const [step, setStep] = useState<"phone" | "otp" | "verified">(globalPhone ? "verified" : "phone");
  const [phone, setPhone] = useState(globalPhone || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (globalPhone) {
      setStep("verified");
      setPhone(globalPhone);
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

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Please enter a valid OTP.");
      return;
    }
    setError("");
    setGlobalPhone(phone);
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
          <div className="absolute left-0 right-0 top-8 z-[50] flex justify-center p-4 sm:top-12">
            <Reveal variant="fade-up" className="w-full max-w-sm rounded-xl border border-border bg-white p-6 shadow-2xl sm:p-8">
              {step === "phone" ? (
                <>
                  <h3 className="font-display text-lg font-bold text-text">Verify your Mobile Number</h3>
                  <p className="mt-1.5 text-xs text-muted">
                    To serve you better, please verify your phone number to proceed.
                  </p>
                  <form onSubmit={handlePhoneSubmit} className="mt-5 space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          pattern="^[6-9]\d{9}$"
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setPhone(val);
                            if (val.length > 0 && !/^[6-9]/.test(val)) {
                              setError("Invalid mobile number.");
                            } else if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
                              setError("Invalid mobile number.");
                            } else {
                              setError("");
                            }
                          }}
                          className={`${fieldBase} pl-12`}
                          ref={step === "phone" ? inputRef : null}
                        />
                      </div>
                      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
                    </label>
                    <button
                      type="submit"
                      disabled={!/^[6-9]\d{9}$/.test(phone)}
                      className="group flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
                    >
                      Send OTP
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h3 className="font-display text-lg font-bold text-text">Enter OTP</h3>
                  <p className="mt-1.5 text-xs text-muted">
                    We've sent a code to <strong>+91 {phone}</strong>.{" "}
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
                        maxLength={6}
                        placeholder="Enter 4- or 6-digit OTP"
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
                      disabled={otp.length < 4}
                      className="flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
                    >
                      Verify & Proceed
                      <Check className="h-4 w-4" />
                    </button>
                  </form>
                </>
              )}
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
