import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BlogDetailClient from "@/components/BlogDetailClient";
import { blogs, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

function getBlog(slug: string) {
  return blogs.find((b) => b.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return {};

  const title = `${blog.title} ,  Modi Kia Journal`;
  const description = blog.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blogs/${blog.slug}`,
      images: [blog.image],
      publishedTime: blog.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  const categoryLabel =
    blog.category === "Models"
      ? "Kia Model Comparisons & Guides"
      : blog.category === "Ownership"
        ? "Kia Ownership Tips & Advice"
        : blog.category === "Service"
          ? "Kia Service & Maintenance"
          : "Kia Electric Vehicle Guides";

  const blogPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blogs/${blog.slug}#article`,
        headline: blog.title,
        description: blog.excerpt,
        image: blog.image,
        datePublished: blog.date,
        dateModified: blog.date,
        author: {
          "@type": "Organization",
          name: "Modi Kia",
          url: SITE_URL,
        },
        publisher: { "@id": DEALER_ID },
        about: categoryLabel,
        url: `${SITE_URL}/blogs/${blog.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: `${SITE_URL}/blogs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: blog.title,
            item: `${SITE_URL}/blogs/${blog.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <BlogDetailClient blog={blog} />
      </main>
      <Footer />
    </>
  );
}
