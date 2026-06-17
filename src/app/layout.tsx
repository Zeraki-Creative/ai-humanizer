import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://humanizer.zerakicreative.com";
const SITE_NAME = "AI Humanizer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Humanizer — Best Free AI Text Humanizer, Paraphraser & Detector (No Limits)",
    template: "%s | AI Humanizer — Free & Unlimited",
  },
  description:
    "The #1 free AI humanizer with no word limits and no signup. Bypass Turnitin, GPTZero & Copyleaks AI detection instantly. Also includes free AI Paraphraser, AI Detector, and Plagiarism Checker. Used by 500,000+ students and writers.",
  keywords: [
    "AI humanizer",
    "free AI humanizer",
    "best free AI humanizer",
    "AI text humanizer",
    "humanize AI text",
    "make AI text undetectable",
    "AI to human text converter",
    "bypass AI detection",
    "bypass Turnitin AI detection",
    "bypass GPTZero",
    "bypass Copyleaks",
    "undetectable AI text",
    "AI writing humanizer",
    "ChatGPT humanizer",
    "humanize ChatGPT text",
    "make ChatGPT undetectable",
    "AI paraphraser",
    "free AI paraphraser",
    "best free paraphraser",
    "paraphrase AI text",
    "AI detector",
    "free AI detector",
    "AI content detector",
    "detect AI generated text",
    "GPTZero alternative",
    "plagiarism checker free",
    "free plagiarism checker",
    "plagiarism checker no word limit",
    "online plagiarism checker free",
    "AI humanizer no signup",
    "AI humanizer no word limit",
    "free AI humanizer no limits",
    "humanizer tool free",
    "AI text converter human",
    "QuillBot alternative free",
    "Turnitin AI bypass",
    "AI humanizer 2026",
    "best AI humanizer 2026",
    "free unlimited AI humanizer",
    "humanize text online free",
    "convert AI to human writing",
    "AI essay humanizer",
    "academic AI humanizer",
    "AI humanizer for students",
    "remove AI detection",
    "AI writing detector bypass",
    "paraphraser no word limit",
    "free paraphrasing tool",
    "rewrite AI text human",
    "AI content humanizer",
  ],
  authors: [{ name: "Zeraki Creative", url: "https://zerakicreative.com" }],
  creator: "Zeraki Creative",
  publisher: "Zeraki Creative",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "AI Humanizer — Best Free AI Text Humanizer, Paraphraser & Detector",
    description:
      "Humanize AI text, bypass Turnitin & GPTZero, paraphrase, detect AI, and check plagiarism — 100% free, unlimited, no signup.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Humanizer — Free AI Text Humanizer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Humanizer — Best Free AI Text Humanizer & Paraphraser",
    description:
      "Make AI text undetectable. Bypass Turnitin, GPTZero & Copyleaks. 100% free, no limits, no signup.",
    images: ["/og-image.png"],
    creator: "@ZerakiCreative",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Technology",
  classification: "AI Writing Tools",
  verification: {
    google: "google-site-verification-placeholder",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon-32x32.png", color: "#07071A" },
    ],
  },
  manifest: "/site.webmanifest",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Free AI text humanizer, paraphraser, AI detector, and plagiarism checker with no word limits and no signup required.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/insights?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zeraki Creative",
  url: "https://zerakicreative.com",
  logo: `${SITE_URL}/zeraki-logo.png`,
  sameAs: ["https://zerakicreative.com"],
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Humanizer",
  applicationCategory: "WritingApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12847",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "The best free AI text humanizer that bypasses Turnitin, GPTZero and Copyleaks AI detection. No word limits, no signup required.",
  featureList: [
    "AI Text Humanizer",
    "AI Paraphraser",
    "AI Content Detector",
    "Plagiarism Checker",
    "No Word Limits",
    "No Signup Required",
    "Bypasses Turnitin",
    "Bypasses GPTZero",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#07071A" />
        <meta name="msapplication-TileColor" content="#07071A" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="msapplication-config" content="none" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>

      {/* Zeraki Cookie Consent — auto-loads GA4 after consent */}
      <Script id="zeraki-cookie-consent" strategy="afterInteractive">
        {`
          (function() {
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/@zerakicreative/cookie-consent@1.0.3/dist/zeraki-cookie-consent.iife.js';
            s.onload = function() {
              ZerakiCookieBanner.init({
                "position": "bottom-left",
                "floatingButtonPosition": "bottom-left",
                "googleAnalytics": {
                  "measurementId": "G-76L8YMEVG0",
                  "autoLoad": true
                }
              });
            };
            document.head.appendChild(s);
          })();
        `}
      </Script>
    </html>
  );
}
