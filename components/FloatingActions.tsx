"use client";

import { useState } from "react";
import { nav } from "@/lib/data";
import { Calendar, WhatsApp, Phone, ChevronRight, ChevronLeft } from "./icons";

const WHATSAPP_URL = "https://wa.me/918879020761?text=Hello,%20I%20want%20to%20book%20a%20test%20drive";

const actions = [
  { label: "Book a\nTest Drive", href: "/book-a-test-drive", Icon: Calendar },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: WhatsApp },
  { label: "Call Us", href: `tel:${nav.phone.replace(/\s/g, "")}`, Icon: Phone },
];

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Standalone WhatsApp bubble, bottom-right, on every page and screen size */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Modi Kia on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
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
    </>
  );
}
