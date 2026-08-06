"use client";

import { useState } from "react";
import { nav } from "@/lib/data";
import { Calendar, WhatsApp, Phone, ChevronRight, ChevronLeft } from "./icons";
import dynamic from "next/dynamic";
const TestDriveWizard = dynamic(() => import("./TestDriveWizard"), { ssr: false });

const WHATSAPP_URL = "https://wa.me/918828118139?text=Hello,%20I%20want%20to%20book%20a%20test%20drive";

const actions = [
  { label: "Book a\nTest Drive", href: "/book-a-test-drive", Icon: Calendar },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: WhatsApp },
  { label: "Call Us", href: `tel:${nav.phone.replace(/\s/g, "")}`, Icon: Phone },
];

export default function FloatingActions({ hideMobileBar = false }: { hideMobileBar?: boolean } = {}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showTestDrive, setShowTestDrive] = useState(false);

  return (
    <>
      {/* Standalone WhatsApp bubble, bottom-right, on every page and screen size */}
      <a
        href={WHATSAPP_URL}
        suppressHydrationWarning
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Modi Kia on WhatsApp"
        className="fixed bottom-20 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 active:scale-95 md:bottom-6 md:right-6"
      >
        <WhatsApp className="h-7 w-7" />
      </a>

      <div
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center transition-transform duration-300 ease-in-out md:flex"
        style={{
          transform: isOpen
            ? "translateY(-50%) translateX(0)"
            : "translateY(-50%) translateX(100%)",
        }}
      >
      {/* Toggle Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle floating actions"
        className="absolute right-full top-1/2 flex h-12 w-5 -translate-y-1/2 items-center justify-center rounded-l-md border border-r-0 border-white/20 bg-brand text-white shadow-md transition-colors hover:bg-brand-light"
      >
        {isOpen ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Action Tiles */}
      <div className="flex flex-col shadow-2xl">
        {actions.map(({ label, href, Icon }, i) => (
          <a
            key={label}
            href={href}
            suppressHydrationWarning
            aria-label={label}
            className={`group flex items-center bg-brand text-white transition-colors hover:bg-brand-light ${
              i === 0 ? "rounded-tl-lg" : ""
            } ${i === actions.length - 1 ? "rounded-bl-lg" : ""}`}
          >
            {/* Hover label */}
            <span className="pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded border border-border bg-white px-3 py-1.5 text-xs font-semibold text-brand opacity-0 shadow-md transition-all group-hover:-translate-x-1 group-hover:opacity-100">
              {label.replace("\n", " ")}
            </span>
            {/* Icon tile */}
            <span className="flex h-[56px] w-14 flex-col items-center justify-center gap-0.5 border-b border-white/20 last:border-0">
              <Icon className="h-5 w-5" />
              <span className="text-center text-[8px] font-semibold leading-tight opacity-90">
                {label.split("\n").map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </span>
          </a>
        ))}
      </div>
      </div>

      {/* Mobile / Tablet sticky bottom bar — hidden on md+ (where the side panel shows) */}
      {!hideMobileBar && (
        <div className="fixed -bottom-2 inset-x-0 z-[60] flex h-[64px] w-full items-stretch border-t border-border bg-white pb-2 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] md:hidden">
          {/* Call Us */}
          <a
            href={`tel:${nav.phone.replace(/\s/g, "")}`}
            aria-label="Call Modi Kia"
            className="flex flex-1 items-center justify-center gap-2 bg-white px-3 py-2.5 text-brand transition-colors active:bg-bg-2"
          >
            <Phone className="h-5 w-5 shrink-0 text-brand" />
            <span className="text-sm font-semibold tracking-wide text-brand whitespace-nowrap">Call Us</span>
          </a>

          {/* Divider */}
          <div className="h-full w-px bg-border shrink-0" />

          {/* Book a Test Drive */}
          <button
            onClick={() => setShowTestDrive(true)}
            aria-label="Book a Test Drive"
            className="flex flex-1 items-center justify-center gap-2 bg-brand px-3 py-2.5 text-white transition-colors active:bg-brand-light"
          >
            <Calendar className="h-5 w-5 shrink-0 text-white" />
            <span className="text-sm font-semibold tracking-wide text-white whitespace-nowrap">Book a Test Drive</span>
          </button>
        </div>
      )}

      {/* Test Drive fullscreen overlay (triggered from mobile bar) */}
      {showTestDrive && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto text-left">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-6 py-4 shadow-sm">
            <span className="font-display text-xl font-bold text-text">Book a Test Drive</span>
            <button
              onClick={() => setShowTestDrive(false)}
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded border border-border bg-bg-2 text-text"
            >
              <span aria-hidden="true" className="text-lg font-bold leading-none">&times;</span>
            </button>
          </div>
          <div className="py-10 lg:py-16">
            <div className="container-px mx-auto max-w-[1400px]">
              <TestDriveWizard onClose={() => setShowTestDrive(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
