import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Plagiarism Checker — No Word Limits, No Signup",
  description:
    "Check plagiarism against academic papers, web content, books, and news sources — completely free with no word limits. See exact matched passages highlighted with source attribution.",
  keywords: [
    "free plagiarism checker","plagiarism checker no word limit","plagiarism checker no signup","online plagiarism checker free","academic plagiarism checker","check plagiarism free","plagiarism detector free 2026","best free plagiarism checker","plagiarism scanner free",
  ],
  alternates: { canonical: "https://humanizer.zerakicreative.com/plagiarism-checker" },
  openGraph: {
    title: "Free Plagiarism Checker — No Word Limits",
    description: "Check plagiarism against academic papers, web content, books and news. Free, no signup, shows exact matched sources highlighted in your text.",
    url: "https://humanizer.zerakicreative.com/plagiarism-checker",
    type: "website",
  },
};

export default function PlagiarismLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
