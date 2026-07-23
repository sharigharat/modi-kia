"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type GlobalOtpContextType = {
  globalPhone: string;
  setGlobalPhone: (phone: string, otpId?: string) => void;
  globalOtpId: string | null;
};

const GlobalOtpContext = createContext<GlobalOtpContextType | null>(null);

const STORAGE_KEY = "modikia_verified_phone";
const OTP_ID_KEY = "modikia_otp_id";

export function useGlobalOtp() {
  const ctx = useContext(GlobalOtpContext);
  if (!ctx) throw new Error("useGlobalOtp must be used within a GlobalOtpProvider");
  return ctx;
}

export function GlobalOtpProvider({ children }: { children: ReactNode }) {
  const [globalPhone, setGlobalPhoneState] = useState("");
  const [globalOtpId, setGlobalOtpIdState] = useState<string | null>(null);

  // Restore a previously OTP-verified number so it stays verified across
  // page reloads and new tabs, not just client-side navigation — once
  // verified, always verified until the user explicitly changes it.
  useEffect(() => {
    const savedPhone = window.localStorage.getItem(STORAGE_KEY);
    const savedOtpId = window.localStorage.getItem(OTP_ID_KEY);
    if (savedPhone) setGlobalPhoneState(savedPhone);
    if (savedOtpId) setGlobalOtpIdState(savedOtpId);
  }, []);

  const setGlobalPhone = (phone: string, otpId?: string) => {
    setGlobalPhoneState(phone);
    setGlobalOtpIdState(otpId || null);
    if (phone) {
      window.localStorage.setItem(STORAGE_KEY, phone);
      if (otpId) {
        window.localStorage.setItem(OTP_ID_KEY, otpId);
      } else {
        window.localStorage.removeItem(OTP_ID_KEY);
      }
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(OTP_ID_KEY);
    }
  };

  return (
    <GlobalOtpContext.Provider value={{ globalPhone, setGlobalPhone, globalOtpId }}>
      {children}
    </GlobalOtpContext.Provider>
  );
}
