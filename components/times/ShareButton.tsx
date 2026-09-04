"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, MessageCircle, Twitter, Linkedin } from "lucide-react";

type ShareProps = {
  title: string;
};

export default function ShareButton({ title }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleNativeShare = async () => {
    const url = getUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  const shareToWhatsApp = () => {
    const url = getUrl();
    const text = encodeURIComponent(`${title} — Read on The Shilingi Times: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const shareToTwitter = () => {
    const url = getUrl();
    const text = encodeURIComponent(`${title} via @shilingiapp`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
  };

  const shareToLinkedIn = () => {
    const url = getUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="hidden sm:inline text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
        Share:
      </span>

      {/* WhatsApp (Primary viral channel in Africa) */}
      <button
        type="button"
        onClick={shareToWhatsApp}
        className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition"
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      {/* X (Twitter) */}
      <button
        type="button"
        onClick={shareToTwitter}
        className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
        title="Share on X"
      >
        <Twitter className="h-3.5 w-3.5 text-slate-700" />
        <span className="hidden sm:inline">X</span>
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={shareToLinkedIn}
        className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-100 transition"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5 text-blue-700" />
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
          copied
            ? "border-emerald-500 bg-emerald-50 text-[#008060]"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
        }`}
        title="Copy article link"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
      </button>

      {/* Native Web Share fallback for mobile */}
      <button
        type="button"
        onClick={handleNativeShare}
        className="sm:hidden rounded-full border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100"
        aria-label="More share options"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
