"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";

const AUTOPLAY = 6500;
// Matches the md breakpoint where the hero grows tall enough (see the
// h-[...] classes below) that hiddenOnMobile slides stop getting cropped.
const MOBILE_QUERY = "(max-width: 767px)";

export default function Hero() {
  const [index, setIndex] = useState(0);
  // Default to the full desktop list for SSR/first paint, then narrow it
  // down on mobile once we can read the real viewport — see effect below.
  const [isMobile, setIsMobile] = useState(false);
  const slides = isMobile ? heroSlides.filter((s) => !s.hiddenOnMobile) : heroSlides;
  const count = slides.length;
  const active = slides[index] ?? slides[0];

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Keep the active index in range whenever the slide list itself changes
  // length (crossing the mobile/desktop breakpoint drops or restores the
  // hiddenOnMobile slides).
  useEffect(() => {
    setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-brand-deep"
      style={{ marginTop: "60px" }} /* offset for fixed nav */
    >
      {/* Cinematic banner carousel, shown clean with no overlaid copy —
          each slide's headline/sub/price live only in its alt text.
          Full-bleed 100vh only kicks in at lg+: at that height, a phone's
          narrow width forces such an aggressive crop that every photo
          gets cut through the middle of the car. Shorter on phones/
          tablets keeps the crop gentle enough that the whole car (and
          its number plate) stays in frame — see mobileObjectPositionClass
          on the one slide that still needed a per-image nudge. */}
      <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[calc(100vh-60px)]">
        {slides.map((slide, i) => {
          const caption = `${slide.model}, ${slide.headline} ${slide.sub} Starting at ₹${slide.price} Lakh*`;
          const objectPositionClass = slide.mobileObjectPositionClass
            ? `${slide.mobileObjectPositionClass} md:object-center`
            : "object-center";
          return slide.video ? (
            <video
              key={slide.model + i}
              src={slide.video}
              poster={slide.image}
              aria-label={caption}
              autoPlay
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "none"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out ${objectPositionClass}`}
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ) : (
            <Image
              key={slide.model + i}
              src={slide.image}
              alt={caption}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-[900ms] ease-out ${objectPositionClass}`}
              style={{ opacity: i === index ? 1 : 0 }}
            />
          );
        })}

        {/* Soft edge scrim so the overlaid copy and dot indicators stay
            legible over any photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />

        {/* The page's primary H1. Visually hidden but kept in the DOM so the
            homepage carries a clear SEO heading without overlaying text on
            the manufacturer's campaign photography. */}
        <h1 className="sr-only">
          New Kia Cars, Test Drives &amp; Authorised Service in Bhiwandi &amp; Dombivli | Modi Kia
        </h1>

        {/* Overlaid headline / sub-headline, keyed so it fades between slides
            along with the photo. Bottom-centered, matching kia.com's own
            hero treatment. */}
        <div
          key={active.model}
          className="container-px absolute inset-x-0 bottom-16 z-10 mx-auto max-w-[1400px] animate-[fade-up_.5s_ease-out_both] sm:bottom-20"
        >
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {active.headline}
            </p>
            <p className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {active.sub}
            </p>
          </div>
        </div>

        {/* Slide arrows. Vertically centred on the whole section at lg+
            (tall hero, plenty of clearance from the bottom caption), but
            pinned higher up at shorter mobile/tablet heights so they don't
            sit on top of the caption text. */}
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-[30%] lg:top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-[30%] lg:top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.model + i}
              aria-label={`Show slide ${i + 1} of ${count}`}
              onClick={() => setIndex(i)}
              className="h-1.5 overflow-hidden rounded-full bg-white/30 transition-all"
              style={{ width: i === index ? 32 : 10 }}
            >
              <span
                className="block h-full rounded-full bg-white"
                style={{
                  width: i === index ? "100%" : "0%",
                  transition: i === index ? `width ${AUTOPLAY}ms linear` : "none",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
