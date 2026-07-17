"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "MPV",
  "Electric",
];

function CarsGridInner() {
  // Read an optional ?category= filter from the URL (e.g. linked from the
  // homepage "Kia Lineup" cards) so a deep-link pre-selects the right tab.
  const searchParams = useSearchParams();
  const initial = (searchParams.get("category") as "All" | CarCategory) || "All";
  const startCategory =
    initial === "SUV" || initial === "MPV" || initial === "Electric"
      ? initial
      : "All";

  const [category, setCategory] = useState<"All" | CarCategory>(startCategory);
  const filtered =
    category === "All" ? cars : cars.filter((c) => c.category === category);

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="flex flex-wrap gap-1 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                category === cat
                  ? "border-brand text-brand"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => {
            const displayName = `Kia ${car.name}`;
            // Mirror the EV9 so it faces left like the rest of the lineup.
            const flip = car.slug === "ev9";
            return (
              <Reveal key={car.slug} delay={(i % 3) * 90} variant="fade-up">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]">
                  <div className="relative flex h-44 items-center justify-center bg-bg-2 p-6">
                    <Image
                      src={car.image}
                      alt={car.alt}
                      width={400}
                      height={150}
                      className="h-auto w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                      style={flip ? { transform: "scaleX(-1)" } : undefined}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                      {car.type}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-text">
                      {displayName}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Starts from{" "}
                      <span className="font-semibold text-text">
                        {formatINR(car.priceINR)}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-faint">{car.fuel}</p>
                    <Link
                      href={`/cars/${car.slug}`}
                      className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors after:absolute after:inset-0 after:content-[''] hover:text-brand-light"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function CarsGrid() {
  // useSearchParams requires a Suspense boundary during static rendering,
  // so the component is wrapped here.
  return (
    <Suspense fallback={null}>
      <CarsGridInner />
    </Suspense>
  );
}
