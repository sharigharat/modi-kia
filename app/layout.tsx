import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import { GlobalOtpProvider } from "@/components/GlobalOtpProvider";
import UtmTracker from "@/components/UtmTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const title = "New Kia Cars, Test Drives & Authorised Service in Bhiwandi & Dombivli | Modi Kia";
const description =
  "Compare new Kia cars, variants, colours and prices at Modi Kia. Book a test drive, request a transparent quote or schedule authorised Kia service in Bhiwandi & Dombivli.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Modi Kia",
  },
  description,
  applicationName: "Modi Kia",
  keywords: [
    "Modi Kia",
    "Kia dealer Bhiwandi",
    "Kia showroom Bhiwandi",
    "Kia test drive",
    "Kia service Bhiwandi",
    "Kia Seltos price",
    "Kia Sonet",
    "Kia Syros",
    "Kia Carens",
    "authorised Kia dealer Bhiwandi",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: "Modi Kia",
    title,
    description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col antialiased" suppressHydrationWarning>
        <JsonLd />
        <UtmTracker />
        <GlobalOtpProvider>
          {children}
        </GlobalOtpProvider>
      </body>
    </html>
  );
}
