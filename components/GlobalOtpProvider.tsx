"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type GlobalOtpContextType = {
  globalPhone: string;
  setGlobalPhone: (phone: string) => void;
};

const GlobalOtpContext = createContext<GlobalOtpContextType | null>(null);

const STORAGE_KEY = "modikia_verified_phone";

export function useGlobalOtp() {
  const ctx = useContext(GlobalOtpContext);
  if (!ctx) throw new Error("useGlobalOtp must be used within a GlobalOtpProvider");
  return ctx;
}

export function GlobalOtpProvider({ children }: { children: ReactNode }) {
  const [globalPhone, setGlobalPhoneState] = useState("");

  // Restore a previously OTP-verified number so it stays verified across
  // page reloads and new tabs, not just client-side navigation — once
  // verified, always verified until the user explicitly changes it.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setGlobalPhoneState(saved);
  }, []);

  const setGlobalPhone = (phone: string) => {
    setGlobalPhoneState(phone);
    if (phone) {
      window.localStorage.setItem(STORAGE_KEY, phone);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <GlobalOtpContext.Provider value={{ globalPhone, setGlobalPhone }}>
      {children}
    </GlobalOtpContext.Provider>
  );
}
