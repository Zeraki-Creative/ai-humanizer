"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import TextInputPanel from "@/components/TextInputPanel";
import HighlightedTextView, { TextMark } from "@/components/HighlightedTextView";
import { Search, AlertCircle, Loader2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface Segment { text: string; potentialSource: string; similarity: number; type: "exact" | "near-exact" | "paraphrased"; }

interface PlagiarismResult {
  overallScore: number;
  originalityScore: number;
  verdict: string;
  suspiciousSegments: Segment[];
  sourceCategories: { academic: number; web: number; books: number; news: number; };
  summary: string;
  recommendations: string[];
  wordCount: number;
  charactersAnalyzed: number;
}

function VerdictIcon({ verdict }: { verdict: string }) {
  if (verdict === "Original" || verdict === "Mostly Original") return <CheckCircle className="w-5 h-5 text-emerald-400" />;
  if (verdict === "Some Similarities") return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
  return <XCircle className="w-5 h-5 text-red-400" />;
}

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const c = 2 * Math.PI * 40;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${(score / 100) * c} ${c}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-extrabold text-white">{score}%</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}

function segmentColor(seg: Segment): string {
  if (seg.type === "exact") return "rgba(239,68,68,0.45)";
  if (seg.type === "near-exact") return "rgba(245,158,11,0.45)";
  return "rgba(99,102,241,0.45)";
}

function segmentLabel(seg: Segment): string {
  return `${seg.type} match — Source: ${seg.potentialSource} (${seg.similarity}% similar)`;
}

export default function PlagiarismCheckerPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;
    setError("");
    setResult(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/plagiarism", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Check failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading]);

  const verdictColor = result
    ? result.overallScore >= 50 ? "#EF4444" : result.overallScore >= 20 ? "#F59E0B" : "#10B981"
    : "#10B981";

  const plagiarismMarks: TextMark[] = (result?.suspiciousSegments ?? []).map((seg) => ({
    text: seg.text,
    bg: segmentColor(seg),
    label: segmentLabel(seg),
  }));

  return (
    <ToolLayout>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg,rgba(245,158,11,0.06) 0%,transparent 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
          <span className="badge mb-4 inline-flex"
            style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" }}>
            <Search className="w-3 h-3" /> Plagiarism Checker
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Check Plagiarism Instantly
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Scan your text against academic papers, web content, books, and news sources.
            Detailed originality report — 100% free, no word limits.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Col 1: Input ── */}
          <div className="flex flex-col gap-4">
            <TextInputPanel
              value={inputText}
              onChange={setInputText}
              onClear={() => { setInputText(""); setResult(null); }}
              label="Your Text"
              minHeight={380}
              onError={setError}
            />

            {error && (
              <div className="flex items-center gap-2 text-red-400 rounded-xl px-4 py-3"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleCheck}
              disabled={!inputText.trim() || isLoading}
              className="btn-cta gap-2 justify-center py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", boxShadow: isLoading ? "none" : "0 4px 20px rgba(245,158,11,0.3)" }}
            >
              {isLoading
                ? <><Loader2 className="w-5 h-5 animate-spin" />Checking...</>
                : <><Search className="w-5 h-5" />Check Plagiarism</>}
            </button>
          </div>

          {/* ── Col 2: Highlighted text ── */}
          <div className="self-start w-full">
            <HighlightedTextView
              className=""
              text={result ? inputText : ""}
              marks={plagiarismMarks}
              title="Plagiarism Highlights"
              legend={[
                { color: "rgba(239,68,68,0.7)", label: "Exact" },
                { color: "rgba(245,158,11,0.7)", label: "Near-exact" },
                { color: "rgba(99,102,241,0.7)", label: "Paraphrased" },
              ]}
              maxHeight={460}
              emptyState={
                isLoading ? (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                    <p className="text-slate-400 text-sm">Scanning sources...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search className="w-10 h-10 text-slate-700" />
                    <p className="text-slate-500 text-sm">Highlights appear after checking</p>
                  </div>
                )
              }
            />
          </div>

          {/* ── Col 3: Matched sources + scores ── */}
          <div className="flex flex-col gap-4">

            {/* Originality report */}
            <div className="rounded-2xl p-5 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", flex: result ? "0 0 auto" : "1 1 auto" }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Originality Report</h3>

              {!result && !isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                  <Search className="w-10 h-10 text-slate-700" />
                  <p className="text-slate-500 text-sm">Results appear here</p>
                </div>
              ) : isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                  <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                  <p className="text-slate-400 text-sm">Analysing...</p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex justify-around">
                    <ScoreRing score={result.originalityScore} label="Originality" color="#10B981" />
                    <ScoreRing score={result.overallScore} label="Similarity" color={verdictColor} />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <VerdictIcon verdict={result.verdict} />
                      <span className="text-white font-bold text-sm">{result.verdict}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    {result.summary}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Matched sources */}
            {result && result.suspiciousSegments.length > 0 && (
              <div className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Matched Sources</h3>
                <div className="space-y-2.5 overflow-y-auto" style={{ maxHeight: 260 }}>
                  {result.suspiciousSegments.map((seg, i) => (
                    <div key={i} className="rounded-lg p-3"
                      style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)" }}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-slate-300 text-xs leading-relaxed flex-1 italic">
                          &ldquo;{seg.text.length > 100 ? seg.text.slice(0, 100) + "…" : seg.text}&rdquo;
                        </p>
                        <span className="text-red-400 font-bold text-xs flex-shrink-0">{seg.similarity}%</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-slate-500 text-xs">
                          Source: <span className="text-slate-300">{seg.potentialSource}</span>
                        </span>
                        <span className={`badge text-xs ${seg.type === "exact" ? "badge-danger" : seg.type === "near-exact" ? "badge-warning" : "badge-primary"}`}>
                          {seg.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source breakdown */}
            {result && (
              <div className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Source Breakdown</h3>
                <div className="space-y-2.5">
                  {Object.entries(result.sourceCategories).map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400 text-xs capitalize">{key}</span>
                        <span className="text-white text-xs font-bold">{val}%</span>
                      </div>
                      <div className="meter-track">
                        <div className="meter-fill" style={{ width: `${val}%`, background: val >= 30 ? "#EF4444" : val >= 15 ? "#F59E0B" : "#10B981" }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-2.5 flex justify-between text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-slate-500">Words Checked</span>
                    <span className="text-white font-semibold">{result.wordCount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-400 text-xs leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {[
            { title: "Academic Sources", desc: "Checks against millions of academic papers, journals, and dissertations.", color: "#6366F1" },
            { title: "Web Content", desc: "Scans billions of web pages, blogs, and online publications for matches.", color: "#F59E0B" },
            { title: "Books & News", desc: "Compares against published books, textbooks, and major news sources.", color: "#10B981" },
          ].map((card) => (
            <div key={card.title} className="p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-8 h-1 rounded-full mb-3" style={{ background: card.color }} />
              <h3 className="text-white font-bold text-sm mb-1.5">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
