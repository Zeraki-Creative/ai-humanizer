import Link from "next/link";
import Image from "next/image";
import { Share2, ExternalLink, Link2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-1.5 mb-4">
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.45, color: "rgba(255,255,255,0.55)", textAlign: "right", whiteSpace: "nowrap" }}>
                AI<br />Humanizer
              </span>
              <span style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)", flexShrink: 0, display: "inline-block" }} aria-hidden="true" />
              <Image src="/zeraki-logo.png" alt="Zeraki" width={82} height={33} style={{ display: "block" }} />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The best free AI text humanizer and paraphraser. No word limits, no
              signups — just powerful AI tools for everyone.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                aria-label="Share"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="External link"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Link"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all cursor-pointer"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/humanizer", label: "AI Humanizer" },
                { href: "/paraphraser", label: "Paraphraser" },
                { href: "/ai-detector", label: "AI Detector" },
                { href: "/plagiarism-checker", label: "Plagiarism Checker" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Why Us?
            </h3>
            <ul className="space-y-2.5">
              {[
                "100% Free Forever",
                "No Word Limits",
                "No Signup Required",
                "Advanced AI Models",
                "Turnitin-Level Detection",
              ].map((item) => (
                <li key={item} className="text-slate-400 text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/cookie-policy", label: "Cookie Policy" },
                { href: "/insights", label: "Insights" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="text-slate-500 text-sm">
              © 2026 AI Humanizer by Zeraki Creative. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-700 text-xs">·</span>
              <Link href="/cookie-policy" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            Designed &amp; developed by{" "}
            <a
              href="https://zerakicreative.com/?utm_source=ai-humanizer&utm_medium=footer_link&utm_campaign=website_build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Zeraki Creative
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
