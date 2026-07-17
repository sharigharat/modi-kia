"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Index of the left-most card currently snapped into view. The track is
     `position: relative`, so each card's offsetLeft is measured from the
     track's content origin and equals the scrollLeft needed to align it. */
  const leftmostIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = Array.from(track.children) as HTMLElement[];
    let closest = 0;
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

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(testimonials.length - 1, i));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  const go = useCallback(
    (dir: number) => scrollToIndex(leftmostIndex() + dir),
    [leftmostIndex, scrollToIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const start = track.scrollLeft <= 1;
      const end = track.scrollLeft >= maxScroll - 1;
      setAtStart(start);
      setAtEnd(end);
      // Keep the dots honest at the extremes even when several cards share the view.
      setActive(end ? testimonials.length - 1 : start ? 0 : leftmostIndex());
    };
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [leftmostIndex]);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-text">{company.stats.satisfaction} customer satisfaction</span>{" "}
              across {company.stats.carsSold} Kia cars sold and {company.stats.servicesDone} services completed.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              disabled={atStart}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-2 disabled:hover:text-text"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              disabled={atEnd}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-2 disabled:hover:text-text"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Cards */}
        <div
          ref={trackRef}
          className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[85vw] shrink-0 snap-start flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_16px_0_rgba(0,44,95,0.07)] transition-shadow hover:shadow-[0_4px_24px_0_rgba(0,44,95,0.12)] sm:w-[360px]"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-text/80">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-4 border-t border-border pt-5">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 24 : 8,
                background: i === active ? "var(--brand)" : "#c8cfd9",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
