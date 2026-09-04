import React from "react";
import ShilingiLogo from "../ShilingiLogo";
import GooglePlayButton from "../GooglePlayButton";

export default function AppConversionCard() {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#008060]/10 via-[#008060]/5 to-emerald-50/50 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left justify-between gap-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className="shrink-0 rounded-2xl bg-[#008060] p-3 shadow-md">
            <ShilingiLogo size={44} priority framed />
          </div>
          <div>
            <span className="inline-block rounded-full bg-[#008060]/10 px-3 py-1 text-xs font-semibold text-[#008060]">
              Official Financial Tracker App
            </span>
            <h3 className="times-headline mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
              Master Your M-Pesa & Bank Cashflow
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-lg">
              Stop guessing where your money goes. Track Paybills, Tills, Chama pools, and budget categories automatically with 100% privacy.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center sm:items-end justify-center">
          <GooglePlayButton variant="dark" className="!px-5 !py-3" />
          <p className="mt-2 text-xs font-medium text-slate-500">
            Free Download · 4.9★ Rating
          </p>
        </div>
      </div>
    </div>
  );
}
