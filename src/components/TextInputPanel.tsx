"use client";

import { useRef, useState } from "react";
import { Trash2, Clipboard, Upload, Loader2 } from "lucide-react";

const TEXT_EXTS = new Set(["txt", "md", "csv"]);
const BINARY_EXTS = new Set(["pdf", "doc", "docx", "ppt", "pptx", "odt", "odp", "ods"]);

const ACCEPT = [
  ".txt", ".md", ".csv",
  ".pdf",
  ".doc", ".docx",
  ".ppt", ".pptx",
  ".odt", ".odp", ".ods",
].join(",");

interface TextInputPanelProps {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  label: string;
  minHeight?: number;
  onError?: (msg: string) => void;
}

export default function TextInputPanel({
  value,
  onChange,
  onClear,
  label,
  minHeight = 380,
  onError,
}: TextInputPanelProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [parsing, setParsing] = useState(false);
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text);
    } catch {
      onError?.("Clipboard access denied. Use Ctrl+V / Cmd+V to paste directly instead.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

    if (TEXT_EXTS.has(ext)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        if (text) onChange(text);
      };
      reader.readAsText(file);
      return;
    }

    if (BINARY_EXTS.has(ext)) {
      setParsing(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/parse-file", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to read file");
        onChange(data.text);
      } catch (err) {
        onError?.(err instanceof Error ? err.message : "Failed to read file.");
      } finally {
        setParsing(false);
      }
      return;
    }

    onError?.("Unsupported file type. Please upload a Word, PDF, PowerPoint, or text file.");
  };

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="text-sm font-semibold text-slate-300">{label}</span>
        <div className="flex items-center gap-3">
          <span className="word-count">{wordCount} words</span>
          {value && (
            <button
              onClick={onClear ?? (() => onChange(""))}
              className="text-slate-600 hover:text-slate-300 transition-colors cursor-pointer"
              aria-label="Clear input"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1" style={{ minHeight }}>
        {/* Centered empty state */}
        {!value && !parsing && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
            style={{ zIndex: 2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
              <button
                onClick={handlePaste}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all cursor-pointer group"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Clipboard className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">Paste text</span>
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all cursor-pointer group"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Upload className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">Upload file</span>
              </button>
            </div>
            <p className="text-slate-600 text-xs pointer-events-none">
              .pdf, .docx, .pptx, .odt, .txt &nbsp;·&nbsp; or type directly below
            </p>
          </div>
        )}

        {/* File parsing spinner */}
        {parsing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ zIndex: 3, background: "rgba(7,7,26,0.7)" }}>
            <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
            <p className="text-slate-400 text-sm">Reading file...</p>
          </div>
        )}

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=""
          className="tool-textarea absolute inset-0 w-full h-full p-5 resize-none"
          style={{ borderRadius: 0, border: "none", background: "transparent", zIndex: 1 }}
        />

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
