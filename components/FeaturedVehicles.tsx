"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "MPV",
  "Electric",
];

export default function FeaturedVehicles() {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(1000);

  const filtered =
    category === "All" ? cars : cars.filter((c) => c.category === category);
  const active = filtered[index] ?? filtered[0];

  const selectCategory = (nextCategory: "All" | CarCategory) => {
    setCategory(nextCategory);
    setIndex(0);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const len = filtered.length;
  const canGoBack = len > 1;
  const canGoForward = len > 1;
  const go = (dir: number) => {
    if (len < 2) return;
    setIndex((i) => (i + dir + len) % len);
  };

  // Step distance and scale/opacity falloff are proportional to the stage's
  // own measured width, so the "coverflow" spacing stays consistent across
  // breakpoints without a hardcoded pixel value.
  const step = Math.min(stageWidth * 0.36, 380);
  // The centre card renders larger than its neighbours, so a purely linear
  // step makes the main-to-neighbour gap look tighter than the gaps further
  // out. A small constant push on every non-zero offset widens just that
  // first gap, without changing the spacing between the side cards.
  const centreGapBoost = 28;

  return (
    <section
      id="cars"
      className="scroll-mt-24 overflow-hidden bg-white py-12 lg:py-16"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Category tabs. relative z-30 keeps the tabs above the absolutely
            positioned, scaled-up carousel cards (max z-20) that would
            otherwise overflow upward and swallow tab clicks. */}
        <Reveal className="relative z-30 flex justify-center">
          <div className="flex gap-1 overflow-x-auto sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                aria-pressed={category === cat}
                className={`shrink-0 border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                  category === cat
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Coverflow stage */}
        <div
          ref={stageRef}
          className="relative mt-4 h-[300px] select-none sm:h-[360px] lg:h-[400px]"
        >
          <button
            aria-label="Previous car"
            onClick={() => go(-1)}
            disabled={!canGoBack}
            aria-disabled={!canGoBack}
            className={`absolute left-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center transition-colors sm:h-12 sm:w-12 ${
              canGoBack ? "text-text hover:text-brand" : "cursor-not-allowed text-faint/45"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {filtered.map((car, i) => {
            let offset = i - index;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            if (Math.abs(offset) > 3) return null;
            const abs = Math.abs(offset);
            // The focused car is scaled up clearly so it dominates as the hero
            // of the section; neighbours fall away more steeply so the centre
            // reads as the clear focal point. Kept below 1.3 so the wider
            // centre card doesn't push the side cards out of the stage.
            const scale = offset === 0 ? 1.28 : Math.max(0.4, 0.62 - abs * 0.15);
            const opacity = abs > 2 ? 0 : 1 - abs * 0.34;
            // Mirror the EV9 so it faces left like the rest of the lineup.
            const flip = car.slug === "ev9";
            const translateX =
              offset === 0
                ? 0
                : Math.sign(offset) * (abs * step + centreGapBoost);
            return (
              <div
                key={car.name}
                onClick={() => {
                  if (offset !== 0) {
                    setIndex(i);
                  }
                }}
                className="absolute left-1/2 top-1/2 flex h-full w-[70%] items-center justify-center transition-all duration-500 ease-out sm:w-[55%] lg:w-[46%]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: offset !== 0 ? "pointer" : "default",
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                {offset === 0 ? (
                  <Link
                    href={`/cars/${car.slug}`}
                    aria-label={`View Kia ${car.name} details`}
                    className="block w-full"
                  >
                    <Image
                      src={car.image}
                      alt={car.alt}
                      width={800}
                      height={295}
                      priority
                      className="h-auto w-full object-contain drop-shadow-xl"
                      style={flip ? { transform: "scaleX(-1)" } : undefined}
                    />
                  </Link>
                ) : (
                  <Image
                    src={car.image}
                    alt={car.alt}
                    width={800}
                    height={295}
                    priority={false}
                    className="h-auto w-full object-contain drop-shadow-xl"
                    style={flip ? { transform: "scaleX(-1)" } : undefined}
                  />
                )}
              </div>
            );
          })}

          <button
            aria-label="Next car"
            onClick={() => go(1)}
            disabled={!canGoForward}
            aria-disabled={!canGoForward}
            className={`absolute right-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center transition-colors sm:h-12 sm:w-12 ${
              canGoForward ? "text-text hover:text-brand" : "cursor-not-allowed text-faint/45"
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Info row, keyed so it fades between models. relative z-30 lifts the
            name link + spec grid above the overflowing carousel cards so the
            car-name link is actually clickable. */}
        <div
          key={active.name}
          className="relative z-30 mx-auto mt-4 max-w-2xl text-center animate-[fade-up_.35s_ease-out both]"
        >
          <Link
            href={`/cars/${active.slug}`}
            className="group mx-auto inline-flex items-center gap-1 text-xl font-bold text-brand transition-colors hover:text-brand-light sm:text-2xl"
          >
            Kia {active.name}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-2 grid grid-cols-1 gap-2 border-t border-border pt-2 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-muted">Starting at</p>
              <p className="mt-0.5 text-base font-semibold text-text">
                {formatINR(active.priceINR)}
              </p>
              <p className="text-xs text-faint">*Ex Showroom Price</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Engine</p>
              <p className="mt-0.5 text-sm text-text">{active.engine}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Transmission available</p>
              <p className="mt-0.5 text-sm text-text">{active.transmission}</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
