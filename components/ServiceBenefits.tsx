"use client";

import { Wrench, Shield, Truck, Road, Badge, ArrowRight } from "./icons";
import Reveal from "./Reveal";

const benefits = [
  {
    icon: Wrench,
    title: "Periodic Maintenance",
    description: "Manufacturer-recommended service schedules, done right the first time.",
  },
  {
    icon: Shield,
    title: "Kia Genuine Parts",
    description: "Only authentic, warranty-backed Kia parts, never aftermarket substitutes.",
  },
  {
    icon: Truck,
    title: "Free Pickup & Drop",
    description: "We collect your car for service and drop it back, at no extra cost.",
  },
  {
    icon: Road,
    title: "Roadside Assistance",
    description: "Stuck on the road? Our service team is a call away.",
  },
  {
    icon: Badge,
    title: "Extended Warranty",
    description: "Extend your protection well beyond the standard three-year cover.",
  },
];

export default function ServiceBenefits() {
  return (
    <section className="bg-bg-2 py-16 sm:py-24">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">Service That Cares</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              From routine maintenance to unexpected repairs, our trained team uses genuine Kia parts, explains the work clearly and keeps you moving from our Kalyan-Bhiwandi service department.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <button
              onClick={() => {
                document.getElementById("booking-card")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded border border-border bg-white px-6 py-3.5 text-sm font-semibold text-text shadow-sm transition-all hover:border-brand hover:text-brand"
            >
              Book a Service Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 100} variant="fade-up">
              <div className="group flex h-full flex-col items-center rounded-xl bg-white p-4 text-center border border-border shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-[0_12px_40px_-10px_rgba(0,44,95,0.12)] sm:p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/5 text-brand transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-text">{b.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
