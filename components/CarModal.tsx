"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/data";
import { formatINR } from "@/lib/data";
import { Check, X } from "./icons";

export default function CarModal({
  car,
  onClose,
}: {
  car: Car;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const displayName = `Kia ${car.name}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={displayName}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-text shadow transition-colors hover:bg-bg-2"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex h-56 items-center justify-center bg-bg-2 sm:h-72">
          <Image
            src={car.image}
            alt={car.alt}
            width={800}
            height={295}
            className="h-auto w-[85%] object-contain drop-shadow-xl"
            style={car.slug === "ev9" ? { transform: "scaleX(-1)" } : undefined}
          />
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            {car.type}
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-text sm:text-3xl">
            {displayName}
          </h2>
          <p className="mt-2 text-sm text-muted">{car.blurb}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-muted">Starting at</p>
              <p className="mt-0.5 text-base font-semibold text-text">
                {formatINR(car.priceINR)}
              </p>
              <p className="text-xs text-faint">*Ex Showroom Price</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Engine</p>
              <p className="mt-0.5 text-sm text-text">{car.engine}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Transmission</p>
              <p className="mt-0.5 text-sm text-text">{car.transmission}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Seating</p>
              <p className="mt-0.5 text-sm text-text">{car.seating}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Mileage / Range</p>
              <p className="mt-0.5 text-sm text-text">{car.mileage}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Boot Space</p>
              <p className="mt-0.5 text-sm text-text">{car.bootSpace}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Highlights
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {car.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-text">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/cars/${car.slug}`}
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded border border-brand py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
            >
              View Full Details &amp; Colours
            </Link>
            <Link
              href="/book-a-test-drive"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
            >
              Book a Test Drive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
