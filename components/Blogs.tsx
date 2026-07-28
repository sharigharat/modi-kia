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
      setActive(end ? initialPosts.length - 1 : start ? 0 : leftmostIndex());
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
    <section id="blogs" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            Latest from our Blog
          </h2>

          <div className="flex items-center gap-3">
            {/* Prev / Next — only shown on mobile/tablet (lg uses the grid) */}
            <div className="flex gap-2 lg:hidden">
              <button
                aria-label="Previous blog post"
                onClick={() => go(-1)}
                disabled={atStart}
                className="grid h-11 w-11 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next blog post"
                onClick={() => go(1)}
                disabled={atEnd}
                className="grid h-11 w-11 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <Link
              href="/blogs"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
            >
              View All Blogs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Mobile / tablet — horizontal scroll track (hidden on lg+) */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {initialPosts.map((post) => (
            <article
              key={post.title}
              className="group flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)] sm:w-[320px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  title={post.title}
                  fill
                  sizes="78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-muted">{post.date}</p>
                <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-text transition-colors group-hover:text-brand">
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

        {/* Dot indicators — mobile/tablet only */}
        <div className="mt-4 flex justify-center gap-2 lg:hidden">
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

        {/* Desktop — 4-column grid (hidden below lg) */}
        <div className="hidden grid-cols-4 gap-5 lg:grid">
          {initialPosts.map((post, i) => (
            <Reveal key={post.title} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    title={post.title}
                    fill
                    sizes="25vw"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
