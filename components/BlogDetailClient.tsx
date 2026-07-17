"use client";

import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/data";
import { blogs } from "@/lib/data";
import { getBlogContent } from "@/lib/blog-details";
import { ArrowRight, ArrowLeft, Clock, Calendar, Tag } from "./icons";
import Reveal from "./Reveal";

export default function BlogDetailClient({ blog }: { blog: Blog }) {
  const content = getBlogContent(blog);
  const idx = blogs.findIndex((b) => b.slug === blog.slug);
  const prev = idx > 0 ? blogs[idx - 1] : null;
  const next = idx < blogs.length - 1 ? blogs[idx + 1] : null;

  const related = blogs
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 3);

  return (
    <article>
      {/* Hero banner */}
      <section className="relative h-[280px] w-full overflow-hidden bg-brand-deep sm:h-[380px] lg:h-[420px]">
        <Image
          src={blog.image}
          alt={blog.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="container-px absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] pb-8 sm:pb-10">
          <Reveal>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>
            <span className="mt-4 inline-block rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-light">
              {blog.category}
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {blog.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/60 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {blog.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {blog.readTime}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white py-10 lg:py-14">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-3xl">
            <Reveal variant="fade-up">
              <p className="text-lg leading-relaxed text-text">
                {content.introduction}
              </p>
            </Reveal>

            <div className="mt-10 space-y-10">
              {content.sections.map((section, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 60}>
                  <section>
                    <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
                      {section.heading}
                    </h2>
                    {section.body.split("\n\n").map((para, j) => (
                      <p
                        key={j}
                        className={`${j === 0 ? "mt-3" : "mt-4"} leading-relaxed text-muted`}
                      >
                        {para}
                      </p>
                    ))}
                  </section>
                </Reveal>
              ))}
            </div>

            {content.conclusion && (
              <Reveal variant="fade-up" delay={200}>
                <div className="mt-10 rounded-lg border border-brand/20 bg-brand/5 p-6">
                  <p className="text-base font-semibold text-brand">
                    In conclusion
                  </p>
                  <p className="mt-2 leading-relaxed text-muted">
                    {content.conclusion}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Previous / Next navigation */}
      <section className="border-t border-border bg-bg-2 py-10">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  href={`/blogs/${prev.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-white p-4 transition-all hover:shadow-[0_4px_16px_0_rgba(0,44,95,0.08)] sm:max-w-[48%]"
                >
                  <ArrowLeft className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-brand" />
                  <div>
                    <span className="text-xs text-faint">Previous</span>
                    <p className="mt-0.5 text-sm font-semibold text-text transition-colors group-hover:text-brand">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/blogs/${next.slug}`}
                  className="group ml-auto flex items-start gap-3 rounded-lg border border-border bg-white p-4 text-right transition-all hover:shadow-[0_4px_16px_0_rgba(0,44,95,0.08)] sm:max-w-[48%]"
                >
                  <div>
                    <span className="text-xs text-faint">Next</span>
                    <p className="mt-0.5 text-sm font-semibold text-text transition-colors group-hover:text-brand">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-brand" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-white py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal>
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-brand" />
                <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
                  More in {blog.category}
                </h2>
              </div>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post, i) => (
                <Reveal key={post.slug} delay={i * 70} variant="fade-up">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.alt}
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
          </div>
        </section>
      )}

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
    </article>
  );
}
