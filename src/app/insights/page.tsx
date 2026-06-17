import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import { articles } from "./articles";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Writing Insights — Tips, Guides & Resources",
  description:
    "Expert guides on AI humanizing, bypassing AI detection, paraphrasing tools, and plagiarism checking. Stay ahead with the latest strategies for undetectable AI writing in 2026.",
  keywords: [
    "AI humanizer guide","bypass AI detection guide","AI writing tips 2026","how to humanize AI text","best AI paraphraser","free AI writing tools","AI detection bypass tutorial",
  ],
  alternates: { canonical: "https://humanizer.zerakicreative.com/insights" },
  openGraph: {
    title: "AI Writing Insights — Tips, Guides & Resources",
    description: "Expert guides on AI humanizing, bypassing AI detection, paraphrasing, and plagiarism checking.",
    type: "website",
    url: "https://humanizer.zerakicreative.com/insights",
  },
};

const insightsBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://humanizer.zerakicreative.com" },
    { "@type": "ListItem", position: 2, name: "Insights", item: "https://humanizer.zerakicreative.com/insights" },
  ],
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "AI Humanizer Insights",
  url: "https://humanizer.zerakicreative.com/insights",
  description: "Expert guides on AI humanizing, bypassing AI detection, and free writing tools.",
  publisher: {
    "@type": "Organization",
    name: "Zeraki Creative",
    url: "https://zerakicreative.com",
  },
};

export default function InsightsPage() {
  return (
    <ToolLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsBreadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Header */}
      <div
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, rgba(99,102,241,0.07) 0%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
          <span className="badge badge-primary mb-4 inline-flex">
            <BookOpen className="w-3 h-3" /> Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            AI Writing Insights
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Expert guides on humanizing AI text, bypassing AI detection, and getting the most out of
            free writing tools — updated for 2026.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured article */}
        <div className="mb-10">
          <Link
            href={`/insights/${articles[0].slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            {/* Illustration */}
            <div
              className="h-56 lg:h-auto flex items-center justify-center p-8"
              style={{ background: "rgba(99,102,241,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-full max-w-xs">{articles[0].illustration}</div>
            </div>
            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="badge text-xs font-semibold"
                  style={{
                    background: `${articles[0].categoryColor}18`,
                    color: articles[0].categoryColor,
                    border: `1px solid ${articles[0].categoryColor}30`,
                  }}
                >
                  {articles[0].category}
                </span>
                <span className="text-slate-600 text-xs">Featured</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {articles[0].title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{articles[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{articles[0].readTime}</span>
                  <span>·</span>
                  <span>{new Date(articles[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <span className="flex items-center gap-1 text-indigo-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {/* Illustration */}
              <div
                className="h-44 flex items-center justify-center p-6"
                style={{ background: `${article.categoryColor}08`, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-full max-w-[240px]">{article.illustration}</div>
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="badge text-xs"
                    style={{
                      background: `${article.categoryColor}18`,
                      color: article.categoryColor,
                      border: `1px solid ${article.categoryColor}30`,
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <h2 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-indigo-300 transition-colors flex-1">
                  {article.title}
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <span className="text-xs text-slate-600">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="mt-14 rounded-2xl p-8 text-center"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <h2 className="text-white font-bold text-xl mb-2">Ready to make your AI text undetectable?</h2>
          <p className="text-slate-400 text-sm mb-5">
            All four tools — humanizer, paraphraser, AI detector, and plagiarism checker — are 100% free with no word limits.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: "/humanizer", label: "AI Humanizer", color: "#6366F1" },
              { href: "/paraphraser", label: "Paraphraser", color: "#818CF8" },
              { href: "/ai-detector", label: "AI Detector", color: "#10B981" },
              { href: "/plagiarism-checker", label: "Plagiarism Checker", color: "#F59E0B" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
