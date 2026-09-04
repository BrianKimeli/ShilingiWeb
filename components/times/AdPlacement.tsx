import React from "react";
import { Sparkles, ExternalLink, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

type AdPlacementProps = {
  type?: "leaderboard" | "rectangle" | "sponsored" | "in-article";
  slotId?: string;
  title?: string;
  description?: string;
  sponsorName?: string;
  sponsorUrl?: string;
  className?: string;
};

export default function AdPlacement({
  type = "rectangle",
  slotId,
  title = "Compare Regulated Money Market Funds",
  description = "Earn 11% to 14% annual compound yields with regulated daily-accruing cash funds across Kenya and East Africa.",
  sponsorName = "Shilingi Wealth Intelligence",
  sponsorUrl = "https://shilingiapp.vercel.app",
  className = "",
}: AdPlacementProps) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // 1. Production Google AdSense Unit (if client ID is supplied)
  if (adClientId && slotId) {
    return (
      <aside
        aria-label="Advertisement"
        className={`my-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 text-center shadow-xs ${className}`}
      >
        <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          Advertisement
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // 2. Leaderboard Banner (728x90 desktop / 320x100 mobile)
  if (type === "leaderboard") {
    return (
      <aside
        aria-label="Sponsored Partner"
        className={`my-8 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-4 sm:p-5 text-white shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#008060] text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  Featured Partner
                </span>
                <span className="text-[11px] text-slate-400">High-Yield Wealth</span>
              </div>
              <h4 className="times-headline mt-1 text-sm sm:text-base font-bold text-white">
                Compare High-Yield Money Market Funds (MMFs)
              </h4>
              <p className="text-xs text-slate-300 hidden sm:block">
                Beat inflation with regulated daily compounding funds. Liquid M-Pesa withdrawals anytime.
              </p>
            </div>
          </div>

          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#008060] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#006b4f]"
          >
            <span>Explore Yields</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </aside>
    );
  }

  // 3. In-Article Native Sponsor Unit (Mid-story placement)
  if (type === "in-article") {
    return (
      <aside
        aria-label="Sponsored Insight"
        className={`my-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-xs transition hover:border-[#008060]/40 ${className}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 text-xs text-slate-500">
          <span className="font-bold uppercase tracking-wider text-[#008060] flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Recommended Financial Tool
          </span>
          <span className="text-[11px]">Sponsor Spotlight</span>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="times-headline text-base font-bold text-slate-900">
              {title}
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Learn More <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </aside>
    );
  }

  // 4. Sponsored Story Card
  if (type === "sponsored") {
    return (
      <div
        className={`my-8 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-50/40 to-amber-500/5 p-6 shadow-xs ${className}`}
      >
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-amber-800">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Sponsored Partner
          </span>
          <span className="font-bold">{sponsorName}</span>
        </div>
        <h4 className="times-headline mt-2.5 text-lg font-bold text-slate-900">{title}</h4>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{description}</p>
        <a
          href={sponsorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-[#008060] hover:underline"
        >
          Explore Solution <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    );
  }

  // 5. Medium Rectangle (300x250) for sidebars or grid interrupters
  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/90 p-5 text-center shadow-xs transition hover:border-slate-300 ${className}`}
    >
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Partner Spotlight
        </span>
        <h4 className="times-headline mt-2 text-sm font-bold text-slate-900">
          Diaspora Remittances & FX
        </h4>
        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
          Send money from US, UK & Europe to Kenya & East Africa at zero hidden fees with direct M-Pesa payouts.
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60">
        <a
          href="https://shilingiapp.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl bg-[#008060] py-2 text-xs font-bold text-white hover:bg-[#006b4f] transition"
        >
          Compare FX Rates
        </a>
      </div>
    </aside>
  );
}
