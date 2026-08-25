"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { formatINR, type CarCategory } from "@/lib/data";

export type FeaturedCar = {
  name: string;
  slug: string;
  image: string;
  alt: string;
  category: CarCategory;
  priceINR: number;
  engine: string;
  transmission: string;
};
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "MPV",
  "Electric",
];

export default function FeaturedVehicles({ initialCars }: { initialCars: FeaturedCar[] }) {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const transitionFrameRef = useRef<number | null>(null);
  const [stageWidth, setStageWidth] = useState(1000);

  // ── Touch / swipe state ──────────────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const gestureAxis = useRef<"h" | "v" | null>(null);
  const SWIPE_THRESHOLD = 30;

  const filtered = (() => {
    if (category === "SUV") {
      return [
        ...initialCars.filter((c) => c.category === "SUV" && c.name === "Syros"),
        ...initialCars.filter((c) => c.category === "SUV" && c.name !== "Syros"),
      ];
    }
    if (category !== "All") {
      return initialCars.filter((c) => c.category === category);
    }
    
    const suvs = initialCars.filter(c => c.category === "SUV");
    const others = initialCars.filter(c => c.category !== "SUV");
    const interleaved = [];
    const max = Math.max(suvs.length, others.length);
    for (let i = 0; i < max; i++) {
      if (others[i]) interleaved.push(others[i]);
      if (suvs[i]) interleaved.push(suvs[i]);
    }
    return interleaved;
  })();
  const active = filtered[index] ?? filtered[0];

  const selectCategory = (nextCategory: "All" | CarCategory) => {
    setIsTransitioning(true);
    setCategory(nextCategory);
    setIndex(0);
    if (transitionFrameRef.current !== null) {
      cancelAnimationFrame(transitionFrameRef.current);
    }
    transitionFrameRef.current = requestAnimationFrame(() => {
      transitionFrameRef.current = requestAnimationFrame(() => {
        transitionFrameRef.current = null;
        setIsTransitioning(false);
      });
    });
  };

  useEffect(() => {
    return () => {
      if (transitionFrameRef.current !== null) {
        cancelAnimationFrame(transitionFrameRef.current);
      }
    };
  }, []);

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
  const go = useCallback((dir: number) => {
    if (len < 2) return;
    setIndex((i) => (i + dir + len) % len);
  }, [len]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    gestureAxis.current = null;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    gestureAxis.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD && len >= 2) {
      go(dx < 0 ? 1 : -1);
    }
  }, [go, len]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (gestureAxis.current === null) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          gestureAxis.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        }
      }
      if (gestureAxis.current === "h") {
        e.preventDefault();
      }
    };
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => el.removeEventListener("touchmove", onMove);
  }, []);

  const isMobile = stageWidth < 640;
  const step = stageWidth * (isMobile ? 0.38 : 0.33);
  const centreGapBoost = isMobile ? 35 : 40;

  return (
    <section
      id="cars"
      className="scroll-mt-24 overflow-hidden bg-white py-8 lg:py-10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
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

        {/* Coverflow stage - tightly framed on desktop so cars and arrows are comfortably positioned */}
        <div
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative -mx-5 sm:-mx-8 lg:mx-0 mt-2 h-[260px] select-none overflow-hidden sm:h-[300px] lg:h-[320px]"
          style={{ touchAction: "pan-y" }}
        >
          <button
            aria-label="Previous car"
            onClick={() => go(-1)}
            disabled={!canGoBack}
            aria-disabled={!canGoBack}
            className={`absolute left-2 sm:left-4 lg:left-2 top-1/2 z-40 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/80 text-text shadow-md backdrop-blur transition-colors sm:h-12 sm:w-12 ${
              canGoBack ? "hover:bg-black/10 hover:text-brand" : "cursor-not-allowed text-faint/45 opacity-50"
            }`}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {filtered.map((car, i) => {
            let offset = i - index;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            if (isMobile ? Math.abs(offset) > 1 : Math.abs(offset) > 2) return null;
            const abs = Math.abs(offset);
            const scale = offset === 0 ? (isMobile ? 1.20 : 1.05) : Math.max(0.4, 0.65 - abs * 0.10);
            const opacity = abs > 2 ? 0 : offset === 0 ? 1 : 0.90;
            const translateX = Math.sign(offset) * (abs * step + centreGapBoost);

            return (
              <div
                key={car.name}
                onClick={() => {
                  if (offset !== 0) {
                    setIndex(i);
                  }
                }}
                className={`absolute left-1/2 top-1/2 flex h-full w-[65%] items-center justify-center transition-all duration-500 cubic-bezier(0.2,1,0.3,1) sm:w-[50%] lg:w-[42%]`}
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
                    draggable={false}
                  >
                    <Image
                      src={car.image}
                      alt={car.alt}
                      title={car.alt}
                      width={800}
                      height={295}
                      draggable={false}
                      className="h-auto w-full object-contain drop-shadow-xl"
                    />
                  </Link>
                ) : (
                  <Image
                    src={car.image}
                    alt={car.alt}
                    title={car.alt}
                    width={800}
                    height={295}
                    priority={false}
                    draggable={false}
                    className="h-auto w-full object-contain drop-shadow-xl"
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
            className={`absolute right-1 sm:right-2 top-1/2 z-40 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/80 text-text shadow-md backdrop-blur transition-colors sm:h-12 sm:w-12 ${
              canGoForward ? "hover:bg-black/10 hover:text-brand" : "cursor-not-allowed text-faint/45 opacity-50"
            }`}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Car selector"
          className="relative z-30 mt-3 flex items-center justify-center gap-1.5"
        >
          {filtered.map((car, i) => (
            <button
              key={car.slug}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to Kia ${car.name}`}
              onClick={() => setIndex(i)}
              className="p-2 -m-2"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 h-2 bg-brand"
                    : "w-2 h-2 bg-border hover:bg-muted/50"
                }`}
              />
            </button>
          ))}
        </div>

        <div
          key={active.name}
          className="relative z-30 mx-auto mt-4 max-w-2xl text-center animate-[fade-up_.35s_ease-out_both]"
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
              <p className="text-xs font-medium text-muted">
                {active.priceINR > 0 ? "Starting at" : "Status"}
              </p>
              <p className="mt-0.5 text-base font-semibold text-text">
                {formatINR(active.priceINR)}
              </p>
              {active.priceINR > 0 && <p className="text-xs text-faint">*Ex Showroom Price</p>}
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
