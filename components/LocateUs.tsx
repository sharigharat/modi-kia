"use client";

import { useMemo, useState } from "react";
import { locations, type Location } from "@/lib/data";
import { ArrowRight, MapPin, Phone } from "./icons";
import Reveal from "./Reveal";

const tabs: { label: string; type: Location["type"] }[] = [
  { label: "Showrooms", type: "Showroom" },
  { label: "Service Centres", type: "Service Centre" },
];

const mapEmbedSrc = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

export default function LocateUs() {
  const [activeType, setActiveType] = useState<Location["type"]>("Showroom");
  const filteredLocations = useMemo(
    () => locations.filter((location) => location.type === activeType),
    [activeType],
  );
  const [selectedName, setSelectedName] = useState(filteredLocations[0]?.name ?? "");

  const selectedLocation =
    filteredLocations.find((location) => location.name === selectedName) ??
    filteredLocations[0];

  if (!selectedLocation) return null;

  return (
    <section id="locate-us" className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            Locate Us
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
            Explore the Modi Kia Location
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Browse our showroom and service department on the Kalyan-Bhiwandi
            Road, preview the branch on the map, and open turn-by-turn
            directions in Google Maps.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              type="button"
              onClick={() => {
                setActiveType(tab.type);
                const next = locations.find((location) => location.type === tab.type);
                setSelectedName(next?.name ?? "");
              }}
              aria-pressed={activeType === tab.type}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeType === tab.type
                  ? "bg-brand text-white"
                  : "bg-bg-2 text-muted hover:bg-bg-3 hover:text-brand"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal
            variant="slide-right"
            className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_10px_40px_0_rgba(0,44,95,0.08)]"
          >
            <div className="border-b border-border bg-bg-2 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                {activeType}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-text">
                Choose a branch
              </h3>
              <p className="mt-1 text-sm text-muted">
                {filteredLocations.length} {activeType === "Showroom" ? "locations" : "service points"} available.
              </p>
            </div>

            <div className="max-h-[760px] space-y-3 overflow-y-auto p-4 sm:p-5">
              {filteredLocations.map((location) => {
                const active = location.name === selectedLocation.name;

                return (
                  <button
                    key={location.name}
                    type="button"
                    onClick={() => setSelectedName(location.name)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-brand bg-brand text-white shadow-[0_10px_30px_0_rgba(0,44,95,0.18)]"
                        : "border-border bg-white hover:border-brand/40 hover:shadow-[0_8px_24px_0_rgba(0,44,95,0.08)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                            active ? "bg-white/15 text-white" : "bg-brand/10 text-brand"
                          }`}
                        >
                          {location.city}
                        </span>
                        <h4 className={`mt-2 font-display text-base font-bold ${active ? "text-white" : "text-text"}`}>
                          {location.name}
                        </h4>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                          active ? "bg-white/12 text-white/85" : "bg-bg-2 text-muted"
                        }`}
                      >
                        {location.type}
                      </span>
                    </div>
                    <p className={`mt-3 flex items-start gap-2 text-sm ${active ? "text-white/82" : "text-muted"}`}>
                      <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-white/70" : "text-faint"}`} />
                      <span>{location.address}</span>
                    </p>
                    <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${active ? "text-white" : "text-brand"}`}>
                      <Phone className="h-4 w-4" />
                      {location.phone}
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal
            delay={140}
            variant="slide-left"
            className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_10px_40px_0_rgba(0,44,95,0.08)]"
          >
            <div className="relative h-[320px] border-b border-border bg-bg-2 sm:h-[420px]">
              <iframe
                key={selectedLocation.name}
                src={mapEmbedSrc(selectedLocation.address)}
                title={`Map for ${selectedLocation.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
            </div>

            <div className="grid gap-5 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Now Viewing
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-text">
                    {selectedLocation.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted">
                    {selectedLocation.type} in {selectedLocation.city}. Use the
                    map preview here or jump straight into Google Maps for live
                    navigation.
                  </p>
                </div>
                <a
                  href={selectedLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
                >
                  Get Directions
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-bg-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Address
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-text">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{selectedLocation.address}</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-bg-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Contact
                  </p>
                  <a
                    href={`tel:${selectedLocation.phone.replace(/[^0-9+]/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    <Phone className="h-4 w-4 text-brand" />
                    {selectedLocation.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
