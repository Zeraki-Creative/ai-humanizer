import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Content Detector — Perplexity & Burstiness Analysis",
  description:
    "Detect AI-generated text with Turnitin-level accuracy. Measures perplexity, burstiness, and vocabulary richness — the same signals used by GPTZero and Turnitin. Free, no signup, no word limits.",
  keywords: [
    "free AI detector","AI content detector","detect AI generated text","GPTZero alternative free","AI writing detector","free AI checker","check if text is AI","AI detection tool free","Turnitin AI detector alternative","detect ChatGPT text",
  ],
  alternates: { canonical: "https://humanizer.zerakicreative.com/ai-detector" },
  openGraph: {
    title: "Free AI Content Detector — Turnitin-Level Accuracy",
    description: "Detect AI-generated content with perplexity and burstiness analysis. Free alternative to GPTZero and Turnitin's AI indicator.",
    url: "https://humanizer.zerakicreative.com/ai-detector",
    type: "website",
  },
};

export default function AIDetectorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
