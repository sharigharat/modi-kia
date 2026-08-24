"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { locations, type Location } from "@/lib/data";
import { MapPin, Phone, ArrowRight } from "./icons";
import Reveal from "./Reveal";

const tabs: { label: string; type: Location["type"] }[] = [
  { label: "Showrooms", type: "Showroom" },
  { label: "Service Centres", type: "Service Centre" },
];

export default function Locations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Location["type"]>("Showroom");
  const items = locations.filter((loc) => loc.type === tab);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, [tab]);

  return (
    <section id="locations" className="scroll-mt-24 bg-brand py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Find Modi Kia {tab === "Showroom" ? "Showrooms" : "Service Centre"} in {tab === "Showroom" ? "Bhiwandi, Dombivli & Ambernath" : "Bhiwandi"}
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {tab === "Showroom"
                ? "Our showrooms across Bhiwandi, Dombivli and Ambernath."
                : "Our authorised service department on Kalyan-Bhiwandi Road."}
            </p>
          </div>
          <Link
            href="/locate-us"
            className="group hidden items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 sm:inline-flex shrink-0"
          >
            View on Map
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* Type tabs */}
        <Reveal className="mb-6 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.type}
                type="button"
                onClick={() => setTab(t.type)}
                aria-pressed={tab === t.type}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === t.type
                    ? "bg-white text-brand"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Scrollable location row */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((loc, i) => (
            <Reveal
              key={loc.name}
              delay={(i % 4) * 70}
              variant="slide-left"
              className="w-[240px] shrink-0 snap-start sm:w-[260px]"
            >
              <Link href={`/locate-us?loc=${encodeURIComponent(loc.name)}`} className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-lg block">
                <Image
                  src={loc.image}
                  alt={`${loc.name} in ${loc.city}`}
                  title={`${loc.name} in ${loc.city}`}
                  fill
                  sizes="260px"
                  className={`object-cover ${loc.imagePosition || "object-center"} transition-transform duration-500 ease-out group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="relative p-4">
                  <span className="mb-1.5 inline-block rounded bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                    {loc.type}
                  </span>
                  <h3 className="font-display text-sm font-bold leading-snug text-white">
                    {loc.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 flex items-start gap-1 text-[11px] text-white/75">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-white/60" />
                    <span>{loc.city}</span>
                  </p>
                  <div
                    className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-white/90 transition-colors group-hover:text-white"
                  >
                    <Phone className="h-3 w-3 shrink-0 text-white/60" />
                    {loc.phone}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <Link
          href="/locate-us"
          className="group mt-6 inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 sm:hidden"
        >
          View on Map
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
