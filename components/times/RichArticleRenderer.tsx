"use client";

import React, { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, Quote } from "lucide-react";

function parseInlineBoldAndItalics(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold **text**
      parts.push(
        <strong key={key++} className="font-semibold text-slate-900">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic *text*
      parts.push(
        <em key={key++} className="italic text-slate-800">
          {match[3]}
        </em>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : [text];
}

type Props = {
  content: string;
  className?: string;
};

export default function RichArticleRenderer({ content, className = "" }: Props) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let currentCalloutType: "NOTE" | "TIP" | "WARNING" | null = null;
  let calloutLines: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={key++} className="my-6 list-disc space-y-2.5 pl-6 text-slate-700 leading-relaxed">
        {listItems.map((item, i) => (
          <li key={i}>{parseInlineBoldAndItalics(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushCallout = () => {
    if (!currentCalloutType || calloutLines.length === 0) return;

    let icon = <Info className="h-5 w-5 shrink-0 text-emerald-600" />;
    let bgClass = "bg-emerald-50/80 border-emerald-500/30 text-emerald-950";

    if (currentCalloutType === "TIP") {
      icon = <Lightbulb className="h-5 w-5 shrink-0 text-amber-600" />;
      bgClass = "bg-amber-50/80 border-amber-500/30 text-amber-950";
    } else if (currentCalloutType === "WARNING") {
      icon = <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600" />;
      bgClass = "bg-rose-50/80 border-rose-500/30 text-rose-950";
    }

    blocks.push(
      <div
        key={key++}
        className={`my-8 flex gap-3.5 rounded-xl border p-4 sm:p-5 shadow-xs transition-all ${bgClass}`}
      >
        <div className="pt-0.5">{icon}</div>
        <div className="text-sm leading-relaxed sm:text-base">
          {calloutLines.map((line, idx) => (
            <p key={idx} className={idx > 0 ? "mt-2" : ""}>
              {parseInlineBoldAndItalics(line)}
            </p>
          ))}
        </div>
      </div>
    );

    currentCalloutType = null;
    calloutLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check Callout Start
    if (trimmed.startsWith("> [!NOTE]")) {
      flushList();
      flushCallout();
      currentCalloutType = "NOTE";
      const rest = trimmed.replace("> [!NOTE]", "").trim();
      if (rest) calloutLines.push(rest);
      continue;
    }
    if (trimmed.startsWith("> [!TIP]")) {
      flushList();
      flushCallout();
      currentCalloutType = "TIP";
      const rest = trimmed.replace("> [!TIP]", "").trim();
      if (rest) calloutLines.push(rest);
      continue;
    }
    if (trimmed.startsWith("> [!WARNING]")) {
      flushList();
      flushCallout();
      currentCalloutType = "WARNING";
      const rest = trimmed.replace("> [!WARNING]", "").trim();
      if (rest) calloutLines.push(rest);
      continue;
    }

    // Inside Callout
    if (currentCalloutType && trimmed.startsWith(">")) {
      calloutLines.push(trimmed.replace(/^>\s?/, ""));
      continue;
    } else if (currentCalloutType) {
      flushCallout();
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      flushList();
      const quoteText = trimmed.replace(/^>\s?/, "");
      blocks.push(
        <blockquote
          key={key++}
          className="my-8 flex gap-3 border-l-4 border-[#008060] bg-slate-50 py-3.5 pl-4 pr-5 text-slate-700 italic rounded-r-lg"
        >
          <Quote className="h-6 w-6 shrink-0 text-[#008060]/40" />
          <div>{parseInlineBoldAndItalics(quoteText)}</div>
        </blockquote>
      );
      continue;
    }

    // List items
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();

    // Headings
    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3
          key={key++}
          className="times-headline mt-10 mb-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2
          key={key++}
          className="times-headline mt-12 mb-4 border-b border-slate-100 pb-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      blocks.push(
        <h1
          key={key++}
          className="times-headline mt-12 mb-4 text-3xl font-bold text-slate-900 sm:text-4xl"
        >
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed === "") {
      continue;
    } else {
      blocks.push(
        <p key={key++} className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700 font-serif">
          {parseInlineBoldAndItalics(line)}
        </p>
      );
    }
  }

  flushList();
  flushCallout();

  return <div className={`space-y-2 ${className}`}>{blocks}</div>;
}
