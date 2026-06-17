import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import { articles } from "../articles";
import { Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const url = `https://humanizer.zerakicreative.com/insights/${slug}`;
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    authors: [{ name: "Zeraki Creative", url: "https://zerakicreative.com" }],
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      url,
      publishedTime: article.date,
      authors: ["Zeraki Creative"],
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const idx = articles.findIndex((a) => a.slug === slug);
  if (idx === -1) notFound();

  const article = articles[idx];
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "Zeraki Creative", url: "https://zerakicreative.com" },
    publisher: {
      "@type": "Organization",
      name: "AI Humanizer",
      url: "https://humanizer.zerakicreative.com",
      logo: { "@type": "ImageObject", url: "https://humanizer.zerakicreative.com/zeraki-logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://humanizer.zerakicreative.com/insights/${slug}` },
    keywords: article.keywords.join(", "),
    articleSection: article.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://humanizer.zerakicreative.com" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://humanizer.zerakicreative.com/insights" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://humanizer.zerakicreative.com/insights/${slug}` },
    ],
  };

  return (
    <ToolLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="badge text-xs font-semibold"
              style={{
                background: `${article.categoryColor}18`,
                color: article.categoryColor,
                border: `1px solid ${article.categoryColor}30`,
              }}
            >
              <BookOpen className="w-3 h-3" /> {article.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
              <span>·</span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">{article.excerpt}</p>
        </header>

        {/* Illustration */}
        <div
          className="rounded-2xl overflow-hidden mb-10 flex items-center justify-center p-10"
          style={{ background: `${article.categoryColor}08`, border: `1px solid ${article.categoryColor}20`, minHeight: 220 }}
        >
          <div className="w-full max-w-sm">{article.illustration}</div>
        </div>

        {/* Article content */}
        <div
          className="prose-custom"
          style={{
            color: "rgba(203,213,225,1)",
            lineHeight: 1.8,
          }}
        >
          <style>{`
            .prose-custom h2 {
              font-size: 1.5rem;
              font-weight: 800;
              color: white;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid rgba(255,255,255,0.07);
            }
            .prose-custom h3 {
              font-size: 1.1rem;
              font-weight: 700;
              color: rgba(165,180,252,1);
              margin-top: 1.75rem;
              margin-bottom: 0.75rem;
            }
            .prose-custom p {
              margin-bottom: 1.25rem;
              font-size: 0.9375rem;
            }
            .prose-custom ul, .prose-custom ol {
              margin-bottom: 1.25rem;
              padding-left: 1.5rem;
            }
            .prose-custom ul { list-style-type: disc; }
            .prose-custom ol { list-style-type: decimal; }
            .prose-custom li {
              margin-bottom: 0.5rem;
              font-size: 0.9375rem;
            }
            .prose-custom strong { color: white; font-weight: 700; }
            .prose-custom em { color: rgba(165,180,252,.9); font-style: italic; }
            .prose-custom a {
              color: #818CF8;
              text-decoration: underline;
              text-underline-offset: 3px;
              text-decoration-color: rgba(129,140,248,.4);
              transition: color 0.2s;
            }
            .prose-custom a:hover { color: #A5B4FC; }
          `}</style>
          {article.content}
        </div>

        {/* Keywords strip */}
        <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs text-slate-600 mb-3 uppercase tracking-wider font-semibold">Related Topics</p>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((kw) => (
              <span key={kw} className="px-3 py-1 rounded-full text-xs text-slate-400"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Tool CTA */}
        <div className="mt-10 rounded-2xl p-7 text-center"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h2 className="text-white font-bold text-lg mb-2">Try Our Free Tools — No Signup, No Limits</h2>
          <p className="text-slate-400 text-sm mb-5">
            Everything you read about in this guide is available right now, completely free.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: "/humanizer", label: "AI Humanizer", color: "#6366F1" },
              { href: "/paraphraser", label: "Paraphraser", color: "#818CF8" },
              { href: "/ai-detector", label: "AI Detector", color: "#10B981" },
              { href: "/plagiarism-checker", label: "Plagiarism Checker", color: "#F59E0B" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev && (
            <Link href={`/insights/${prev.slug}`}
              className="group rounded-xl p-4 flex items-center gap-3 transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ArrowLeft className="w-4 h-4 text-slate-500 flex-shrink-0 group-hover:text-white transition-colors" />
              <div>
                <p className="text-slate-600 text-xs mb-0.5">Previous Article</p>
                <p className="text-white text-sm font-semibold leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">{prev.title}</p>
              </div>
            </Link>
          )}
          {next && (
            <Link href={`/insights/${next.slug}`}
              className="group rounded-xl p-4 flex items-center gap-3 justify-between transition-all hover:scale-[1.02] sm:col-start-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-right">
                <p className="text-slate-600 text-xs mb-0.5">Next Article</p>
                <p className="text-white text-sm font-semibold leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">{next.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0 group-hover:text-white transition-colors" />
            </Link>
          )}
        </div>

        {/* Back to insights */}
        <div className="mt-8 text-center">
          <Link href="/insights"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all Insights
          </Link>
        </div>
      </div>
    </ToolLayout>
  );
}
