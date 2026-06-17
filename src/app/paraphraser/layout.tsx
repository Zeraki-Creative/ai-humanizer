import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Paraphraser — No Word Limits, 5 Modes",
  description:
    "Rewrite any text in 5 styles — Standard, Fluency, Formal, Simple, and Creative. Free AI paraphraser with no word limits, no signup, and output engineered to pass AI detection.",
  keywords: [
    "free AI paraphraser","AI paraphraser no word limit","best free paraphraser 2026","QuillBot alternative free","paraphrase AI text free","online paraphraser free","rewrite text AI","paraphrasing tool no signup","AI rewriter free",
  ],
  alternates: { canonical: "https://humanizer.zerakicreative.com/paraphraser" },
  openGraph: {
    title: "Free AI Paraphraser — 5 Modes, No Word Limits",
    description: "Rewrite any text with 5 paraphrasing modes. No word limits, no signup. Beats QuillBot, Wordtune & Grammarly — completely free.",
    url: "https://humanizer.zerakicreative.com/paraphraser",
    type: "website",
  },
};

export default function ParaphraserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
