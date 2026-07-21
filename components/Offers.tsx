import { offers } from "@/lib/data";
import { iconMap, type IconName } from "./icons";
import Reveal from "./Reveal";

export default function Offers() {
  return (
    <section id="offers" className="scroll-mt-24 bg-brand py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header row */}
        <Reveal className="mb-10">
          <div>
            <p className="text-sm font-medium text-white/70">Current Offers</p>
            <h2 className="mt-1 max-w-2xl font-display text-2xl font-bold text-white sm:text-3xl">
              Save up to{" "}
              <span className="underline decoration-white/40 underline-offset-4">
                ₹1.25 Lakh*
              </span>{" "}
              with cash discount, exchange bonus and corporate benefits on select
              Kia models.
            </h2>
          </div>
        </Reveal>

        {/* Offer cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-stretch">
          {offers.map((offer, i) => {
            const Icon = iconMap[offer.icon as IconName];
            return (
              <Reveal
                key={offer.title}
                delay={i * 100}
                variant="slide-right"
                className="h-full"
              >
                <div className="group h-full flex items-center gap-5 rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur will-change-transform transition-[transform,box-shadow,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.13] hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)]">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-colors duration-300 group-hover:bg-white/25">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white/70">{offer.title}</p>
                    <p className="font-display text-2xl font-extrabold text-white">
                      Up to {offer.amount}
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">{offer.caption}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
