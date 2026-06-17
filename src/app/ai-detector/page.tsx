"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import TextInputPanel from "@/components/TextInputPanel";
import HighlightedTextView from "@/components/HighlightedTextView";
import { Shield, AlertCircle, Loader2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface Indicator { type: "ai" | "human"; indicator: string; weight: "low" | "medium" | "high"; }

interface DetectionResult {
  aiProbability: number;
  humanProbability: number;
  confidence: "low" | "medium" | "high";
  verdict: string;
  keyIndicators: Indicator[];
  analysis: string;
  aiSegments: string[];
  metrics: { perplexity: number; burstiness: number; vocabularyRichness: number; avgSentenceLength: number; };
  wordCount: number;
}

function VerdictBadge({ verdict }: { verdict: string }) {
  const map: Record<string, { icon: typeof CheckCircle; cls: string }> = {
    "Human Written": { icon: CheckCircle,    cls: "badge-success" },
    "Likely Human":  { icon: CheckCircle,    cls: "badge-success" },
    "Uncertain":     { icon: AlertTriangle,  cls: "badge-warning" },
    "Likely AI":     { icon: AlertCircle,    cls: "badge-danger" },
    "AI Generated":  { icon: XCircle,        cls: "badge-danger" },
  };
  const c = map[verdict] || map["Uncertain"];
  return (
    <span className={`badge ${c.cls} text-xs`}>
      <c.icon className="w-3.5 h-3.5" />
      {verdict}
    </span>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-slate-400 text-xs font-medium">{label}</span>
        <span className="text-white text-xs font-bold">{value}%</span>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

export default function AIDetectorPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetect = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;
    setError("");
    setResult(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/detect-ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Detection failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading]);

  const aiColor = result
    ? result.aiProbability >= 70 ? "#EF4444" : result.aiProbability >= 40 ? "#F59E0B" : "#10B981"
    : "#6366F1";

  const aiMarks = (result?.aiSegments ?? []).map((seg) => ({
    text: seg,
    bg: "rgba(239,68,68,0.45)",
    label: "AI-generated content",
  }));

  return (
    <ToolLayout>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg,rgba(16,185,129,0.06) 0%,transparent 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
          <span className="badge badge-success mb-4 inline-flex">
            <Shield className="w-3 h-3" /> AI Detector
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Detect AI-Generated Content
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Turnitin-level accuracy using perplexity scoring, burstiness analysis, and vocabulary
            richness metrics — the same methods used by leading AI detectors.
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
              label="Text to Analyze"
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
              onClick={handleDetect}
              disabled={!inputText.trim() || isLoading}
              className="btn-cta gap-2 justify-center py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#10B981,#059669)", boxShadow: isLoading ? "none" : "0 4px 20px rgba(16,185,129,0.3)" }}
            >
              {isLoading
                ? <><Loader2 className="w-5 h-5 animate-spin" />Analyzing...</>
                : <><Shield className="w-5 h-5" />Detect AI Content</>}
            </button>
          </div>

          {/* ── Col 2: Highlighted text ── */}
          <div className="flex flex-col">
            <HighlightedTextView
              className="flex-1"
              text={result ? inputText : ""}
              marks={aiMarks}
              title="Content Analysis"
              legend={[{ color: "rgba(239,68,68,0.7)", label: "AI-generated" }]}
              maxHeight={460}
              emptyState={
                isLoading ? (
                  <div className="flex flex-col items-center justify-center gap-3 flex-1 py-16">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    <p className="text-slate-400 text-sm">Analyzing content...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 flex-1 py-16">
                    <Shield className="w-10 h-10 text-slate-700" />
                    <p className="text-slate-500 text-sm">Highlights appear after detection</p>
                  </div>
                )
              }
            />
          </div>

          {/* ── Col 3: Result + Metrics + Indicators ── */}
          <div className="flex flex-col gap-4">

            {/* Detection result card — always visible */}
            <div className="rounded-2xl p-5 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", flex: result ? "0 0 auto" : "1 1 auto" }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Detection Result</h3>

              {!result && !isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                  <Shield className="w-12 h-12 text-slate-700" />
                  <p className="text-slate-500 text-sm">Results appear here after analysis</p>
                </div>
              ) : isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                  <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
                  <p className="text-slate-400 text-sm">Running analysis...</p>
                </div>
              ) : result ? (
                <div className="space-y-5">
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke={aiColor} strokeWidth="10"
                          strokeDasharray={`${(result.aiProbability / 100) * 314} 314`}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dasharray 1.1s ease" }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-white">{result.aiProbability}%</span>
                        <span className="text-[11px] text-slate-400">AI</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <VerdictBadge verdict={result.verdict} />
                    <p className="text-xs text-slate-500 mt-2 capitalize">{result.confidence} confidence</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    {result.analysis}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Analysis metrics */}
            {result && (
              <div className="rounded-2xl p-5 space-y-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Metrics</h3>
                <MetricBar label="Perplexity Score"    value={result.metrics.perplexity}          color="#6366F1" />
                <MetricBar label="Burstiness"          value={result.metrics.burstiness}           color="#818CF8" />
                <MetricBar label="Vocabulary Richness" value={result.metrics.vocabularyRichness}   color="#10B981" />
                <div className="pt-3 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Avg Sentence Length</span>
                    <span className="text-white font-semibold">{result.metrics.avgSentenceLength} words</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Words Analyzed</span>
                    <span className="text-white font-semibold">{result.wordCount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Key indicators */}
            {result && result.keyIndicators.length > 0 && (
              <div className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Key Indicators</h3>
                <div className="space-y-3">
                  {result.keyIndicators.map((ind, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ind.type === "ai" ? "bg-red-400" : "bg-emerald-400"}`} />
                      <span className="text-slate-300 text-xs leading-relaxed">
                        {ind.indicator}
                        <span className={`ml-1 ${ind.weight === "high" ? "text-orange-400" : ind.weight === "medium" ? "text-yellow-400" : "text-slate-500"}`}>
                          ({ind.weight})
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {[
            { title: "Perplexity Analysis",  desc: "Measures word choice predictability — AI uses statistically safe, generic words.", color: "#6366F1" },
            { title: "Burstiness Detection", desc: "Analyses sentence length variance — AI writes with unnaturally uniform structure.", color: "#10B981" },
            { title: "Vocabulary Richness",  desc: "Evaluates type-token ratio — AI uses artificially balanced, repetitive vocabulary.", color: "#F59E0B" },
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
