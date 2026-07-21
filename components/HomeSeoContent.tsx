import Link from "next/link";
import { company, cars } from "@/lib/data";
import Reveal from "./Reveal";

/* ============================================================
   Homepage SEO & AEO content blocks.

   These sections give the homepage meaningful, crawlable copy so
   it ranks for dealer-level and model-level queries (e.g. "Kia
   dealer in Bhiwandi", "Kia Seltos price Kalyan"). Content is
   written to be useful to human buyers and extractable by answer
   engines — short definitional sentences, clear lists and an FAQ
   close. Layout stays clean and on-brand: light surfaces, the
   brand accent and the existing card / eyebrow styling.
   ============================================================ */

const lineages = [
  {
    name: "SUVs",
    blurb:
      "Compact to flagship SUVs covering every budget, from the value-focused Sonet to the tech-forward Syros and the segment-leading Seltos.",
    models: ["SONET", "SYROS", "SELTOS"],
    href: "/cars?category=SUV",
  },
  {
    name: "MPVs",
    blurb:
      "Family-friendly MPVs with genuine 6/7-seat flexibility, from the practical Carens to the premium Carens Clavis and the flagship Carnival.",
    models: ["CARENS", "CARENS CLAVIS", "CARNIVAL"],
    href: "/cars?category=MPV",
  },
  {
    name: "Electric",
    blurb:
      "Kia's electric range combines ultra-fast charging, Vehicle-to-Load (V2L) and long range for silent, spacious everyday driving.",
    models: ["CARENS CLAVIS EV", "EV6", "EV9"],
    href: "/cars?category=Electric",
  },
];

const buyingSteps = [
  {
    step: "01",
    title: "Shortlist your Kia",
    text: "Browse the full lineup by body style, fuel type and budget. Compare variants, colours, mileage and on-road pricing for every model in one place.",
  },
  {
    step: "02",
    title: "Book a test drive",
    text: "Pick a date and visit our Kalyan-Bhiwandi Road showroom, or request a home test drive at no obligation.",
  },
  {
    step: "03",
    title: "Finalise finance & exchange",
    text: "Get a transparent quote with flexible EMI plans from leading banks, plus instant exchange value on your existing car.",
  },
  {
    step: "04",
    title: "Delivery & aftercare",
    text: "Take delivery of your new Kia, then rely on our trained technicians, genuine parts and free pickup-and-drop service for the years ahead.",
  },
];

const servicePoints = [
  "Periodic maintenance on the manufacturer-recommended schedule, done right the first time.",
  "Only genuine, warranty-backed Kia parts, never aftermarket substitutes.",
  "Free pickup and drop for every service booking in our service area.",
  "Roadside assistance and extendable warranty plans for total peace of mind.",
];

export default function HomeSeoContent() {
  return (
    <>
      {/* Lineup by category */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-3 block">The Kia Lineup</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              New Kia cars for every driver, family and budget
            </h2>
            <p className="mt-3 text-base text-muted">
              As an authorised Kia India dealership, Modi Kia stocks the
              complete Kia range, compact SUVs, flagship SUVs, 6/7-seat MPVs
              and fully electric vehicles. Explore each category below or
              compare{" "}
              <Link
                href="/cars"
                className="font-semibold text-brand underline underline-offset-4 hover:text-brand-light"
              >
                all Kia models
              </Link>{" "}
              side by side.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lineages.map((group, i) => (
              <Reveal key={group.name} delay={i * 90} variant="fade-up">
                <Link
                  href={group.href}
                  className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_12px_0_rgba(10,10,10,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(10,10,10,0.12)]"
                >
                  <h3 className="font-display text-lg font-bold text-text">
                    {group.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {group.blurb}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">
                    {group.models.join(" · ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why buy from an authorised dealer */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal variant="slide-right">
            <span className="eyebrow mb-3 block">Why Modi Kia</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Your authorised Kia dealer in Bhiwandi &amp; Dombivli
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                Modi Kia is an authorised Kia India dealership on the
                Kalyan-Bhiwandi Road. Every new car, genuine part and
                accessory we supply is sourced directly from Kia, so your
                purchase is backed by the full manufacturer warranty and
                nationwide service network.
              </p>
              <p>
                Part of the Gautam Modi Group, our team brings decades of
                combined authorised-dealership experience to every test
                drive, finance plan and service booking.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book-a-test-drive"
                className="btn-primary"
              >
                Book a Test Drive
              </Link>
              <Link href="/about" className="btn-outline">
                About Modi Kia
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} variant="slide-left">
            <dl className="grid grid-cols-2 gap-4">
              {[
                [company.stats.carsSold, "New cars delivered"],
                [company.stats.usedCarsSold, "Pre-owned cars sold"],
                [company.stats.servicesDone, "Services completed"],
                [company.stats.satisfaction, "Customer satisfaction"],
              ].map(([stat, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-bg-2 p-6 text-center"
                >
                  <dt className="font-display text-3xl font-bold text-brand sm:text-4xl">
                    {stat}
                  </dt>
                  <dd className="mt-1 text-xs font-medium text-muted sm:text-sm">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* How buying works */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-3 block">How It Works</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Buying a Kia in four simple steps
            </h2>
            <p className="mt-3 text-base text-muted">
              From shortlisting to delivery and aftercare, we make buying and
              owning a Kia straightforward and transparent, no pressure,
              no hidden charges.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyingSteps.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 90} variant="fade-up">
                <div className="flex h-full flex-col rounded-lg border border-border bg-white p-6">
                  <span className="font-display text-3xl font-bold text-brand/20">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Authorised service */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal variant="slide-right">
            <span className="eyebrow mb-3 block">Authorised Service</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Genuine Kia service, on the Kalyan-Bhiwandi Road
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Keep your Kia performing like new with trained technicians,
              genuine parts and manufacturer-approved service schedules.
              Book online and we will collect your car for service and drop
              it back, at no extra cost, anywhere in our service area.
            </p>
            <div className="mt-6">
              <Link href="/locate-service-centre" className="btn-primary">
                Book a Service
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} variant="slide-left">
            <ul className="grid gap-3 sm:grid-cols-2">
              {servicePoints.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-border bg-bg-2 p-5 text-sm leading-relaxed text-text"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>


    </>
  );
}
