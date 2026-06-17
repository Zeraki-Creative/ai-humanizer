"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Sparkles, Copy, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import TextInputPanel from "@/components/TextInputPanel";

const MODES = [
  { id: "standard", label: "Standard", desc: "Natural human tone — great for everyday use" },
  { id: "enhanced", label: "Enhanced", desc: "Strong authentic voice — ideal for academic writing" },
  { id: "creative", label: "Creative", desc: "Vivid, distinct personality for creative content" },
];

export default function HumanizerPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("standard");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const wordCount = (t: string) => t.trim() ? t.trim().split(/\s+/).length : 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowModeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleHumanize = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;
    setError("");
    setOutputText("");
    setIsLoading(true);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json();
        throw new Error(data.error || "Failed to humanize text");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            let parsed: { error?: string; text?: string };
            try { parsed = JSON.parse(data); } catch { continue; }
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) setOutputText((p) => p + parsed.text);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError")
        setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText, mode, isLoading]);

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (outputRef.current && outputText)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [outputText]);

  const selectedMode = MODES.find((m) => m.id === mode)!;

  return (
    <ToolLayout>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="text-center">
            <span className="badge badge-primary mb-4 inline-flex">
              <Sparkles className="w-3 h-3" /> AI Humanizer
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
              Humanize AI Text Instantly
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Convert AI-generated text into natural, undetectable human writing.
              Bypasses Turnitin, GPTZero, Copyleaks — completely free, no limits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode selector */}
        <div className="flex justify-center mb-7">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowModeDropdown(!showModeDropdown)}
              className="flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition-all min-w-[240px]"
              style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-white text-sm font-semibold">{selectedMode.label} Mode</div>
                <div className="text-slate-500 text-xs truncate max-w-[180px]">{selectedMode.desc}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${showModeDropdown ? "rotate-180" : ""}`} />
            </button>

            {showModeDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full z-30 rounded-xl overflow-hidden shadow-2xl shadow-black/40"
                style={{ background: "#111128", border: "1px solid rgba(255,255,255,0.1)" }}>
                {MODES.map((m) => (
                  <button key={m.id}
                    onClick={() => { setMode(m.id); setShowModeDropdown(false); }}
                    className={`w-full text-left px-5 py-4 transition-colors ${mode === m.id ? "bg-indigo-500/12 text-indigo-400" : "text-slate-300 hover:bg-white/5"}`}>
                    <div className="font-semibold text-sm">{m.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input panel */}
          <TextInputPanel
            value={inputText}
            onChange={setInputText}
            label="AI-Generated Text"
            minHeight={360}
            onError={setError}
          />

          {/* Output panel */}
          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <div className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-sm font-semibold text-slate-300">Humanized Text</span>
              <div className="flex items-center gap-3">
                {outputText && <span className="word-count">{wordCount(outputText)} words</span>}
                {outputText && (
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
                    {copied
                      ? <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                      : <><Copy className="w-3.5 h-3.5" />Copy</>}
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 relative">
              {isLoading && !outputText && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                  <p className="text-slate-400 text-sm">Analysing and humanizing your text...</p>
                  <p className="text-slate-600 text-xs">This may take a few seconds for longer texts</p>
                </div>
              )}
              <textarea
                ref={outputRef}
                value={outputText}
                readOnly
                placeholder="Your humanized text will stream here..."
                className="tool-textarea w-full h-full min-h-[420px] p-5"
                style={{ borderRadius: 0, border: "none", background: "transparent" }}
              />
              {isLoading && outputText && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-2 h-5 bg-indigo-400 animate-pulse rounded-sm" />
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-400 rounded-xl px-4 py-3"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          {isLoading ? (
            <button onClick={() => { abortRef.current?.abort(); setIsLoading(false); }} className="btn-ghost gap-2 px-8 py-3.5">
              Stop Generating
            </button>
          ) : (
            <button onClick={handleHumanize} disabled={!inputText.trim()}
              className="btn-cta gap-2 px-10 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed">
              <Sparkles className="w-5 h-5" />
              Humanize Text
            </button>
          )}
          {outputText && !isLoading && (
            <button onClick={handleCopy} className="btn-primary gap-2 px-8 py-3.5">
              {copied ? <><CheckCircle className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy Result</>}
            </button>
          )}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {[
            { title: "Bypass Turnitin", desc: "Advanced humanization patterns engineered to fool Turnitin's AI detection model.", color: "#6366F1" },
            { title: "Natural Voice", desc: "Text reads authentically human — varied structure, contractions, and real personality.", color: "#10B981" },
            { title: "No Limits", desc: "Process essays, articles, full dissertations — any length, completely free.", color: "#F59E0B" },
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
