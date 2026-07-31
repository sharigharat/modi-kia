"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs, type Blog } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

const categories = ["All", "Models", "Ownership", "Service", "Electric"] as const;
type CategoryFilter = (typeof categories)[number];

const ITEMS_PER_PAGE = 6;

export default function BlogsPageClient() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isSearching = Boolean(search.trim());

  const searchFiltered = useMemo(() => {
    if (!isSearching) return blogs;
    const q = search.trim().toLowerCase();
    return blogs.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q),
    );
  }, [search, isSearching]);

  const isAll = category === "All";

  const categoryFiltered: Blog[] = isAll
    ? searchFiltered
    : searchFiltered.filter((post) => post.category === category);

  const featured = searchFiltered[0];
  const grid = isSearching
    ? categoryFiltered
    : isAll
      ? categoryFiltered.filter((post) => post.title !== featured.title)
      : categoryFiltered;

  const noResults = isSearching
    ? categoryFiltered.length === 0
    : grid.length === 0;

  const totalPages = Math.ceil(grid.length / ITEMS_PER_PAGE);
  const paginatedGrid = grid.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: CategoryFilter) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Search bar */}
      <section className="bg-white pb-0 pt-8">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder='Search articles (e.g. "Seltos", "EV", "service")'
                className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-faint transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/20"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    handleSearchChange("");
                    handleCategoryChange("All");
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-text"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search results header */}
      {isSearching && (
        <section className="bg-white pb-2 pt-3">
          <div className="container-px mx-auto max-w-[1400px]">
            <p className="text-sm text-muted">
              {categoryFiltered.length === 0
                ? `No articles found for "${search}"`
                : `Showing ${categoryFiltered.length} ${categoryFiltered.length === 1 ? "result" : "results"} for "${search}"`}
            </p>
          </div>
        </section>
      )}

      {/* Category tabs — hidden when searching */}
      {!isSearching && (
        <section className="bg-white pb-2 pt-6">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="flex flex-wrap justify-center gap-1 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={category === cat}
                  className={`shrink-0 rounded border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                    category === cat
                      ? "border-brand text-brand"
                      : "border-transparent text-muted hover:text-text"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Featured post — only on "All" tab when not searching */}
      {!isSearching && isAll && featured && (
        <section className="bg-white py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Featured
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group mt-3 grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)] lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-2 lg:aspect-auto">
                  <Image
                    src={featured.image}
                    alt={featured.alt}
                    title={featured.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                      {featured.category}
                    </span>
                    <span className="text-xs text-faint">{featured.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold leading-tight text-text transition-colors group-hover:text-brand sm:text-2xl lg:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {featured.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-faint">{featured.date}</p>
                </div>
                </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Card grid */}
      <section id="blog-grid" className="scroll-mt-20 bg-white py-8 lg:py-10">
        <div className="container-px mx-auto max-w-[1400px]">
          {noResults ? (
            <p className="py-10 text-center text-sm text-muted">
              {isSearching
                ? `No articles found for "${search}". Try a different search term.`
                : "No articles in this category yet, check back soon."}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedGrid.map((post, i) => (
                  <Reveal key={post.title} delay={(i % 3) * 80} variant="fade-up">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.alt}
                          title={post.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                          {post.category}
                        </span>
                        <h3 className="mt-3 flex-1 text-base font-bold leading-snug text-text transition-colors group-hover:text-brand sm:text-lg">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-faint">
                          <span>{post.date}</span>
                          <span aria-hidden>·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                  <p className="text-xs text-muted sm:text-sm">
                    Showing <span className="font-semibold text-text">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>–
                    <span className="font-semibold text-text">{Math.min(currentPage * ITEMS_PER_PAGE, grid.length)}</span> of{" "}
                    <span className="font-semibold text-text">{grid.length}</span> articles
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="rounded border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-bg-2 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={`min-w-[32px] rounded px-2.5 py-1.5 text-xs font-semibold transition-colors sm:min-w-[36px] sm:text-sm ${
                            currentPage === p
                              ? "bg-brand text-white"
                              : "border border-border bg-white text-text hover:bg-bg-2"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="rounded border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-bg-2 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-brand py-12 lg:py-16">
        <div className="container-px mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Found a Kia you like?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/70">
              Book a no-obligation test drive at our Bhiwandi or Dombivli
              showroom, or ask our team to build a shortlist around your budget.
            </p>
          </div>
          <Link
            href="/book-a-test-drive"
            className="group inline-flex shrink-0 items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-white/90"
          >
            Book a Test Drive
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
