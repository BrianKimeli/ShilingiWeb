"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ExternalLink, Smartphone, Download, Loader2 } from "lucide-react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.finesse.shilingi";

function JoinContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // 1. Target deep link URL
    const appDeepLink = code
      ? `shilingi://join?code=${encodeURIComponent(code)}`
      : "shilingi://open";

    // 2. Attempt to open installed app
    window.location.href = appDeepLink;

    // 3. Fallback to Google Play Store after 2 seconds if app is not installed
    const timer = setTimeout(() => {
      window.location.href = PLAY_STORE_URL;
    }, 2000);

    return () => clearTimeout(timer);
  }, [code]);

  const appDeepLink = code
    ? `shilingi://join?code=${encodeURIComponent(code)}`
    : "shilingi://open";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf8] px-4 py-12 text-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        {/* App Brand Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#008060] shadow-md">
          <div className="text-3xl font-bold text-white">S</div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008060]">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Opening Shilingi</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl font-serif">
          Joining Shilingi Chama...
        </h1>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Connecting you to your savings group. We are opening the Shilingi app on your phone, or taking you to Google Play if you don't have it installed yet.
        </p>

        {code && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-mono font-semibold text-slate-800">
            <span>Invite Code:</span>
            <span className="text-[#008060] font-bold">{code}</span>
          </div>
        )}

        {/* Manual Action Buttons if browser blocks automatic custom scheme */}
        <div className="mt-8 space-y-3">
          <a
            href={appDeepLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008060] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#006b4f]"
          >
            <Smartphone className="h-4 w-4" />
            <span>Open in Shilingi App</span>
          </a>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Download className="h-4 w-4 text-[#008060]" />
            <span>Install from Google Play</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>

        <p className="mt-6 text-[11px] text-slate-400">
          Shilingi · Group Savings & Financial Intelligence
        </p>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fafaf8]">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#008060]" />
            <p className="mt-3 text-sm font-medium text-slate-600">Connecting to Shilingi...</p>
          </div>
        </div>
      }
    >
      <JoinContent />
    </Suspense>
  );
}
