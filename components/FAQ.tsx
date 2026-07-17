"use client";

import { useState } from "react";
import Link from "next/link";
import { faqData as defaultFaqData } from "@/lib/data";
import { X, ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function FAQ({
  id = "faq",
  data = defaultFaqData,
  title = "Questions, answered.",
  subtitle = "Still unsure about something? Talk to our team and we'll clear it up faster than any FAQ.",
}: {
  id?: string;
  data?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const words = title.trim().split(" ");
  const last = words.pop() ?? "";
  const rest = words.join(" ");

  return (
    <section id={id} className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: heading */}
          <Reveal variant="slide-right">
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-text sm:text-5xl">
              {rest && <>{rest} </>}
              <span className="relative inline-block">
                {last}
                <span className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-brand" />
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm text-muted sm:text-base">{subtitle}</p>
            <Link
              href="/contact-us"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text transition-colors hover:border-brand hover:text-brand"
            >
              Ask Us Directly
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          {/* Right: accordion */}
          <Reveal delay={120} variant="slide-left">
            <div className="border-t border-border">
              {data.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-b border-border">
                    <button
                      onClick={() => toggle(i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={`text-base font-semibold sm:text-lg ${
                          isOpen ? "text-brand" : "text-text"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center text-2xl font-light leading-none transition-colors ${
                          isOpen ? "text-brand" : "text-faint"
                        }`}
                      >
                        {isOpen ? <X className="h-4 w-4" /> : "+"}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
