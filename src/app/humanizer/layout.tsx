import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Humanizer — Bypass Turnitin & GPTZero Instantly",
  description:
    "The best free AI humanizer with no word limits. Convert AI-generated text from ChatGPT, Claude & Gemini into undetectable human writing. Bypasses Turnitin, GPTZero & Copyleaks — no signup required.",
  keywords: [
    "AI humanizer","free AI humanizer","humanize AI text","make AI text undetectable","bypass Turnitin","bypass GPTZero","bypass Copyleaks","ChatGPT humanizer","AI to human text","AI humanizer no word limit","AI humanizer no signup","best free AI humanizer 2026",
  ],
  alternates: { canonical: "https://humanizer.zerakicreative.com/humanizer" },
  openGraph: {
    title: "Free AI Humanizer — Make AI Text Undetectable Instantly",
    description: "Convert AI text into natural, undetectable human writing. Bypasses Turnitin, GPTZero & Copyleaks. 100% free, no limits, no signup.",
    url: "https://humanizer.zerakicreative.com/humanizer",
    type: "website",
  },
};

export default function HumanizerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
