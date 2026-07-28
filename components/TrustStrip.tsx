import { trust } from "@/lib/data";
import { iconMap, type IconName } from "./icons";
import Reveal from "./Reveal";

// Pre-compute border classes per item so every class string is a plain
// literal that Tailwind's scanner can always detect.
// Mobile: 2-col grid  |  md: 3-col  |  lg: 5-col
function borderClass(i: number, total: number): string {
  const isLast = i === total - 1;
  const parts: string[] = [
    // Row dividers come from divide-y on the container; we only need right borders.
    // mobile (2-col): even index = left col → border-r; odd = right col → no right border
    i % 2 === 0 ? "border-r" : "border-r-0",
    // md (3-col): item 0,1 in a row → border-r; item 2 → no right border
    i % 3 === 2 ? "md:border-r-0" : "md:border-r",
    // lg (5-col): all get border-r except the very last
    isLast ? "lg:border-r-0" : "lg:border-r",
  ];
  return parts.join(" ");
}

const LAST_ITEM = trust[trust.length - 1];
const OTHER_ITEMS = trust.slice(0, -1);
const IS_ODD_TOTAL = trust.length % 2 !== 0;

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* On mobile (2-col): items split 2+2+1. The lone last item gets
            col-span-2 so it fills the row and centres its content.
            col-span classes are plain literals so Tailwind always scans them. */}
        <div className="grid grid-cols-2 divide-y divide-border md:grid-cols-3 lg:grid-cols-5">
          {OTHER_ITEMS.map((item, i) => {
            const Icon = iconMap[item.icon as IconName];
            return (
              <Reveal
                key={item.title}
                delay={i * 100}
                variant="scale-up"
                className={`flex flex-col items-center gap-2 px-3 py-7 text-center transition-colors hover:bg-bg-2 border-border sm:px-4 ${borderClass(i, trust.length)}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-sm font-semibold text-text">{item.title}</h2>
                <p className="text-xs leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}

          {/* Last item — col-span-2 on mobile centres it when it's alone in the row */}
          {LAST_ITEM && (() => {
            const Icon = iconMap[LAST_ITEM.icon as IconName];
            const lastIndex = trust.length - 1;
            return (
              <Reveal
                key={LAST_ITEM.title}
                delay={lastIndex * 100}
                variant="scale-up"
                className="flex flex-col items-center gap-2 px-3 py-7 text-center transition-colors hover:bg-bg-2 border-border sm:px-4 col-span-2 border-r-0 md:col-span-1 md:border-r lg:border-r-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-sm font-semibold text-text">{LAST_ITEM.title}</h2>
                <p className="text-xs leading-relaxed text-muted">{LAST_ITEM.text}</p>
              </Reveal>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
