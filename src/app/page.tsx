"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles, Zap, Shield, Search,
  ArrowRight, Check, Star, Users, Globe, Lock,
} from "lucide-react";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });

const tools = [
  {
    href: "/humanizer", icon: Sparkles, title: "AI Humanizer",
    description: "Transform robotic AI text into natural, undetectable human writing that bypasses Turnitin, GPTZero, and Copyleaks.",
    color: "#6366F1", glow: "rgba(99,102,241,0.18)", badge: "Most Popular",
  },
  {
    href: "/paraphraser", icon: Zap, title: "Paraphraser",
    description: "Instantly rewrite any text with fresh wording, improved fluency, and five style modes to fit any purpose.",
    color: "#818CF8", glow: "rgba(129,140,248,0.14)", badge: null,
  },
  {
    href: "/ai-detector", icon: Shield, title: "AI Detector",
    description: "Turnitin-level accuracy using perplexity scoring, burstiness analysis, and vocabulary richness metrics.",
    color: "#10B981", glow: "rgba(16,185,129,0.14)", badge: "Turnitin-Level",
  },
  {
    href: "/plagiarism-checker", icon: Search, title: "Plagiarism Checker",
    description: "Scan your text against academic papers, web sources, and books. Get a detailed originality report instantly.",
    color: "#F59E0B", glow: "rgba(245,158,11,0.14)", badge: null,
  },
];

const features = [
  { icon: Lock, title: "No Signup Required", desc: "Start immediately — no account, no email, nothing." },
  { icon: Globe, title: "No Word Limits", desc: "Process any length of text, from a paragraph to a full dissertation." },
  { icon: Zap, title: "Lightning Fast", desc: "Streaming responses deliver results in real time as they're generated." },
  { icon: Shield, title: "Bypass All Detectors", desc: "Undetectable by Turnitin, Copyleaks, GPTZero, ZeroGPT, and more." },
  { icon: Star, title: "Multiple Modes", desc: "Standard, Enhanced, Creative — choose the style that fits your needs." },
  { icon: Users, title: "100% Free Forever", desc: "All tools, all features, always free. No premium tier, ever." },
];

const stats = [
  { value: "50M+", label: "Words Humanized" },
  { value: "99.1%", label: "Bypass Rate" },
  { value: "2M+", label: "Happy Users" },
  { value: "0", label: "Word Limits" },
];

const testimonials = [
  {
    text: "I've tried every AI humanizer out there. This one actually bypasses Turnitin every single time. Complete game changer for my thesis.",
    name: "Alex M.", role: "Graduate Student", rating: 5,
  },
  {
    text: "Finally a free tool with no word cap. I processed my entire 8,000 word dissertation in one go. Saved me hours.",
    name: "Sarah K.", role: "PhD Researcher", rating: 5,
  },
  {
    text: "The AI detector is scarily accurate. It caught subtle AI patterns in text I thought was completely clean.",
    name: "James R.", role: "Content Manager", rating: 5,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupFn: (() => void) | undefined;
    const initGSAP = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll("[data-gsap='hero']"),
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power3.out" }
        );
      }
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll("[data-gsap='stat']"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" } }
        );
      }
      gsap.fromTo("[data-gsap='tool-card']",
        { opacity: 0, y: 48, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.11, ease: "power3.out",
          scrollTrigger: { trigger: "[data-gsap='tools-section']", start: "top 78%" } }
      );
      gsap.fromTo("[data-gsap='feature-card']",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: "[data-gsap='features-section']", start: "top 78%" } }
      );
      gsap.fromTo("[data-gsap='testimonial']",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: "[data-gsap='testimonials-section']", start: "top 78%" } }
      );
      cleanupFn = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    initGSAP();
    return () => cleanupFn?.();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ThreeBackground />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div ref={heroRef} className="max-w-5xl mx-auto text-center relative z-10">

          <div data-gsap="hero" className="mb-5">
            <span className="badge badge-primary">
              <Sparkles className="w-3 h-3" />
              100% Free — No Signup, No Limits
            </span>
          </div>

          <h1 data-gsap="hero"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            The Best{" "}
            <span className="gradient-text">AI Humanizer</span>
            <br />&amp; Paraphraser
          </h1>

          <p data-gsap="hero" className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Transform AI text into natural human writing that bypasses Turnitin, GPTZero &amp; Copyleaks.{" "}
            <span className="text-white font-semibold">No word limits. No signup. Completely free.</span>
          </p>

          <div data-gsap="hero" className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/humanizer">
              <button className="btn-cta gap-2 text-base px-8 py-4">
                <Sparkles className="w-5 h-5" />
                Humanize AI Text Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/ai-detector">
              <button className="btn-ghost gap-2 text-base px-8 py-4">
                <Shield className="w-5 h-5" />
                Detect AI Content
              </button>
            </Link>
          </div>

          <div data-gsap="hero" className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
            {["No Signup", "No Word Limits", "No Cost Ever", "Bypasses Turnitin"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative glow orbs */}
        <div className="absolute top-24 left-[10%] w-80 h-80 rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(99,102,241,0.10)" }} />
        <div className="absolute top-32 right-[12%] w-64 h-64 rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(16,185,129,0.07)" }} />
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef}
        className="py-14 border-y"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(99,102,241,0.04)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label} data-gsap="stat" className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold gradient-text mb-1">{s.value}</div>
                <div className="text-slate-400 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section data-gsap="tools-section" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Four Powerful Free Tools</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              No premium plans, no hidden limits — every feature available to everyone, forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div data-gsap="tool-card"
                  className="glass glass-hover p-7 cursor-pointer h-full relative overflow-hidden group rounded-2xl"
                  style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px ${tool.glow}` }}>

                  {tool.badge && (
                    <span className="absolute top-5 right-5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${tool.color}22`, color: tool.color, border: `1px solid ${tool.color}35` }}>
                      {tool.badge}
                    </span>
                  )}

                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${tool.color}18`, border: `1px solid ${tool.color}30` }}>
                    <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5">{tool.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-[15px] mb-5">{tool.description}</p>

                  <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: tool.color }}>
                    Try Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: tool.glow }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section data-gsap="features-section"
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.04) 0%, rgba(7,7,26,0) 100%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Built different</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Why Choose <span className="gradient-text">AIHumanizer</span>?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              The most powerful free AI writing toolkit — built for students, writers, and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} data-gsap="feature-card"
                className="glass p-6 rounded-2xl group hover:border-indigo-500/25 transition-all duration-200"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/12 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <f.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">How It Works</h2>
            <p className="text-slate-400 text-lg">Three steps to undetectable human writing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Paste Your Text", desc: "Drop in any AI-generated content. No length limits — paste an essay, article, or full dissertation." },
              { step: "02", title: "Choose a Mode", desc: "Standard for everyday use, Enhanced for academic writing, Creative for bold distinctive voice." },
              { step: "03", title: "Get Human Text", desc: "Receive natural, fluent text that reads authentically human and bypasses every AI detector." },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px z-0"
                    style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)" }} />
                )}
                <div className="glass p-7 rounded-2xl relative z-10 h-full"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                  <div className="text-4xl font-extrabold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section data-gsap="testimonials-section"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, rgba(16,185,129,0.03) 0%, rgba(7,7,26,0) 100%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Trusted worldwide</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Loved by Millions</h2>
            <p className="text-slate-400 text-lg">Join 2M+ users who trust AIHumanizer daily</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} data-gsap="testimonial"
                className="glass p-7 rounded-2xl flex flex-col"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl p-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(16,185,129,0.07) 100%)",
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 0 60px rgba(99,102,241,0.12)",
            }}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(99,102,241,0.1)" }} />
            <div className="relative z-10">
              <div className="inline-flex mb-5">
                <span className="badge badge-success">
                  <Sparkles className="w-3 h-3" /> Zero Cost. Always.
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Start Humanizing for Free
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                No credit card. No account. No limits. Paste your text and go.
              </p>
              <Link href="/humanizer">
                <button className="btn-cta text-lg px-10 py-4 gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  Try AI Humanizer Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
