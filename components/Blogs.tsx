"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

export type BlogSummary = {
  slug: string;
  image: string;
  title: string;
  category: string;
  date: string;
};

export default function Blogs({ initialPosts }: { initialPosts: BlogSummary[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Find the index of the left-most card currently snapped into view. */
  const leftmostIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = Array.from(track.children) as HTMLElement[];
    let closest = 0;
    let min = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.scrollLeft);
      if (d < min) { min = d; closest = i; }
    });
    return closest;
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(initialPosts.length - 1, i));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, [initialPosts]);

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
      setActive(end ? initialPosts.length - 1 : start ? 0 : leftmostIndex());
    };
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [leftmostIndex, initialPosts]);

  return (
    <section id="blogs" className="scroll-mt-24 bg-bg-2 pt-14 pb-6 lg:pt-20 lg:pb-8">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header — Arrows on the right side, View All Blogs link stacked below */}
        <Reveal className="mb-8 flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Latest from our Blog
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted">
              Buying guides, car comparisons and maintenance tips from Modi Kia.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            {/* Prev / Next — available on all screen sizes */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous blog post"
                onClick={() => go(-1)}
                disabled={atStart}
                className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next blog post"
                onClick={() => go(1)}
                disabled={atEnd}
                className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <Link
              href="/blogs"
              className="group inline-flex shrink-0 items-center gap-1 text-xs sm:text-sm font-semibold text-brand transition-colors hover:text-brand-light whitespace-nowrap"
            >
              View All Blogs
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Scroll track across all viewports — cards peek on right & left so adjacent blogs are always visible */}
        <div
          ref={trackRef}
          className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {initialPosts.map((post) => (
            <article
              key={post.title}
              className="group flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)] sm:w-[320px] lg:w-[350px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  title={post.title}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 320px, 350px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-muted">{post.date}</p>
                <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-text transition-colors group-hover:text-brand sm:text-base">
                  <Link href={`/blogs/${post.slug}`} className="hover:text-brand">
                    {post.title}
                  </Link>
                </h3>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group/link mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-brand-light"
                >
                  <span className="sr-only">Read more about {post.title}</span>
                  <span aria-hidden="true">Read more</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {initialPosts.map((post, i) => (
            <button
              key={post.title}
              aria-label={`Go to blog ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="p-2 -m-2"
            >
              <div
                className={`rounded-full transition-all ${
                  active === i ? "bg-brand w-6 h-1.5" : "bg-[#c8cfd9] w-2 h-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
