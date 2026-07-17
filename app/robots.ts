import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

/* Allow standard crawlers and, explicitly, the AI answer-engine bots so
   Modi Kia can be cited in AI Overviews, ChatGPT, Perplexity, Gemini
   and Copilot. Blocking any of these would prevent that platform from
   citing the site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
