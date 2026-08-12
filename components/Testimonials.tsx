"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { company, testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

// Create 3 cloned sets of items for seamless forward-only infinite looping
const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];
const N = testimonials.length;

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  /* Index of the card closest to the track's scroll position (0 to 3N-1). */
  const getClosestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return N;
    const cards = Array.from(track.children) as HTMLElement[];
    let closest = N;
    let min = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.scrollLeft);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    return closest;
  }, []);

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({
        left: card.offsetLeft,
        behavior: smooth ? "smooth" : "instant" as ScrollBehavior,
      });
    }
  }, []);

  const go = useCallback(
    (dir: number) => {
      const current = getClosestIndex();
      const next = current + dir;
      scrollToIndex(next, true);
    },
    [getClosestIndex, scrollToIndex],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  // Set initial scroll position to start at Set 1 (middle set)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const initialCard = track.children[N] as HTMLElement | undefined;
    if (initialCard) {
      track.scrollLeft = initialCard.offsetLeft;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isResetting = false;

    const sync = () => {
      const closest = getClosestIndex();
      setActive(((closest % N) + N) % N);

      // If we scroll into Set 2 (2N to 3N-1) or Set 0 (0 to N-1),
      // seamlessly jump back into Set 1 without animation when scrolling stops/pauses.
      if (!isResetting) {
        if (closest >= 2 * N) {
          isResetting = true;
          const targetIndex = closest - N;
          scrollToIndex(targetIndex, false);
          setTimeout(() => { isResetting = false; }, 100);
        } else if (closest < N) {
          isResetting = true;
          const targetIndex = closest + N;
          scrollToIndex(targetIndex, false);
          setTimeout(() => { isResetting = false; }, 100);
        }
      }
    };

    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [getClosestIndex, scrollToIndex]);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-8 flex items-end justify-between gap-4 sm:mb-10 sm:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-sm text-muted">
              <span className="font-semibold text-text">{company.stats.satisfaction} customer satisfaction</span>{" "}
              across {company.stats.carsSold} Kia cars sold and {company.stats.servicesDone} services completed.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Cards — Triple cloned array for seamless forward-only infinite looping */}
        <div
          ref={trackRef}
          suppressHydrationWarning
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tripleTestimonials.map((t, index) => (
            <figure
              key={`${t.name}-${index}`}
              className="flex w-[85vw] shrink-0 snap-start flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_16px_0_rgba(0,44,95,0.07)] transition-shadow hover:shadow-[0_4px_24px_0_rgba(0,44,95,0.12)] sm:w-[360px] lg:w-[calc((100%-40px)/3)]"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-text/80">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-5">
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dots — Accurately tracks current active card (0 to N-1) */}
        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => {
                const current = getClosestIndex();
                const setOffset = Math.floor(current / N) * N;
                scrollToIndex(setOffset + i, true);
              }}
              className="p-2 -m-2"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  active === i ? "bg-brand w-6 h-1.5" : "bg-[#c8cfd9] w-2 h-1.5 hover:bg-muted/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
