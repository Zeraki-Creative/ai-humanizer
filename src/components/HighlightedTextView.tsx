"use client";

import React from "react";

export interface TextMark {
  text: string;
  bg: string;
  label?: string;
}

interface Span {
  text: string;
  mark?: TextMark;
}

function buildSpans(fullText: string, marks: TextMark[]): Span[] {
  const positions: { start: number; end: number; mark: TextMark }[] = [];

  for (const m of marks) {
    if (!m.text.trim()) continue;
    let idx = 0;
    while (idx < fullText.length) {
      const pos = fullText.indexOf(m.text, idx);
      if (pos === -1) break;
      positions.push({ start: pos, end: pos + m.text.length, mark: m });
      idx = pos + 1;
    }
  }

  positions.sort((a, b) => a.start - b.start);

  const spans: Span[] = [];
  let cursor = 0;

  for (const p of positions) {
    if (p.start < cursor) continue;
    if (p.start > cursor) spans.push({ text: fullText.slice(cursor, p.start) });
    spans.push({ text: fullText.slice(p.start, p.end), mark: p.mark });
    cursor = p.end;
  }

  if (cursor < fullText.length) spans.push({ text: fullText.slice(cursor) });

  return spans;
}

interface LegendItem { color: string; label: string }

interface Props {
  text: string;
  marks: TextMark[];
  title: string;
  legend?: LegendItem[];
  maxHeight?: number;
  emptyState?: React.ReactNode;
  className?: string;
}

export default function HighlightedTextView({ text, marks, title, legend, maxHeight = 340, emptyState, className = "" }: Props) {
  const spans = buildSpans(text, marks);
  const hasHighlights = marks.some((m) => text.includes(m.text));
  const isEmpty = !text;

  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col ${className}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="text-sm font-semibold text-slate-300">{title}</span>
        {legend && hasHighlights && (
          <div className="flex items-center gap-3">
            {legend.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      {isEmpty && emptyState ? (
        <div className="flex flex-col items-center justify-center" style={{ minHeight: maxHeight }}>{emptyState}</div>
      ) : (
        <div className="p-5 overflow-y-auto" style={{ maxHeight }}>
          {!hasHighlights && text && (
            <p className="text-xs text-slate-500 mb-3 italic">
              No flagged content found — the text appears clean.
            </p>
          )}
          <p className="text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
            {spans.map((span, i) =>
              span.mark ? (
                <mark
                  key={i}
                  title={span.mark.label}
                  style={{
                    background: span.mark.bg,
                    color: "#fff",
                    borderRadius: 3,
                    padding: "1px 3px",
                    cursor: span.mark.label ? "help" : "default",
                  }}
                >
                  {span.text}
                </mark>
              ) : (
                <span key={i}>{span.text}</span>
              )
            )}
          </p>
        </div>
      )}
    </div>
  );
}
