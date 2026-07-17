import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function Blogs() {
  return (
    <section id="blogs" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            Latest from our Blog
          </h2>
          <Link
            href="/blogs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* 4-column equal grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.slice(0, 4).map((post, i) => (
            <Reveal key={post.title} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs text-muted">{post.date}</p>
                  <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-text transition-colors group-hover:text-brand sm:text-base">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:text-brand"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group/link mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-brand-light"
                  >
                    Read more
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
