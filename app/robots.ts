import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

/* Allow standard crawlers and, explicitly, the AI answer-engine bots so
   Modi Kia can be cited in AI Overviews, ChatGPT, Perplexity, Gemini
   and Copilot. Blocking any of these would prevent that platform from
   citing the site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/blogs", "/blogs/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/blogs", "/blogs/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
