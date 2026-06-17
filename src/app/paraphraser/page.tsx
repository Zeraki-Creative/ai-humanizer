"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Zap, Copy, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import TextInputPanel from "@/components/TextInputPanel";

const MODES = [
  { id: "standard", label: "Standard", color: "#6366F1" },
  { id: "fluency", label: "Fluency", color: "#10B981" },
  { id: "formal", label: "Formal", color: "#818CF8" },
  { id: "simple", label: "Simple", color: "#F59E0B" },
  { id: "creative", label: "Creative", color: "#EC4899" },
];

export default function ParaphraserPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("standard");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = (t: string) => t.trim() ? t.trim().split(/\s+/).length : 0;

  const handleParaphrase = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;
    setError("");
    setOutputText("");
    setIsLoading(true);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json();
        throw new Error(data.error || "Failed to paraphrase");
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
        setError(err.message || "Something went wrong.");
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

  const activeMode = MODES.find((m) => m.id === mode)!;

  return (
    <ToolLayout>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg, rgba(129,140,248,0.06) 0%, transparent 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
          <span className="badge badge-primary mb-4 inline-flex">
            <Zap className="w-3 h-3" /> Paraphraser
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Paraphrase Any Text Instantly
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Rewrite sentences, paragraphs, or entire documents with fresh wording.
            Five style modes — 100% free, no word limits.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-7">
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              className={`tab-button ${mode === m.id ? "active" : ""}`}
              style={mode === m.id ? { background: `${m.color}18`, color: m.color, borderColor: `${m.color}30` } : {}}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInputPanel
            value={inputText}
            onChange={setInputText}
            label="Original Text"
            minHeight={360}
            onError={setError}
          />

          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <div className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-sm font-semibold text-slate-300">Paraphrased Text</span>
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
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: activeMode.color }} />
                  <p className="text-slate-400 text-sm">Paraphrasing your text...</p>
                </div>
              )}
              <textarea ref={outputRef} value={outputText} readOnly
                placeholder="Your paraphrased text will stream here..."
                className="tool-textarea w-full h-full min-h-[420px] p-5"
                style={{ borderRadius: 0, border: "none", background: "transparent" }}
              />
              {isLoading && outputText && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-2 h-5 animate-pulse rounded-sm" style={{ background: activeMode.color }} />
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          {isLoading ? (
            <button onClick={() => { abortRef.current?.abort(); setIsLoading(false); }} className="btn-ghost gap-2 px-8 py-3.5">
              Stop Generating
            </button>
          ) : (
            <button onClick={handleParaphrase} disabled={!inputText.trim()}
              className="btn-cta gap-2 px-10 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed">
              <Zap className="w-5 h-5" />
              Paraphrase Now
            </button>
          )}
          {outputText && !isLoading && (
            <button onClick={handleCopy} className="btn-primary gap-2 px-8 py-3.5">
              {copied ? <><CheckCircle className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy Result</>}
            </button>
          )}
        </div>

        {/* Mode cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12">
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              className="p-4 rounded-xl text-left transition-all cursor-pointer"
              style={{
                background: mode === m.id ? `${m.color}10` : "rgba(255,255,255,0.04)",
                border: `1px solid ${mode === m.id ? `${m.color}35` : "rgba(255,255,255,0.08)"}`,
              }}>
              <div className="w-6 h-1 rounded-full mb-2.5" style={{ background: m.color }} />
              <div className="text-white font-semibold text-sm">{m.label}</div>
            </button>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
