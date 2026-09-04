"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section className="my-12 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 text-white shadow-lg sm:p-10">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008060] text-white shadow-md">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="times-headline text-2xl font-bold tracking-tight sm:text-3xl text-white">
          The Shilingi Morning Brief
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
          Get plain-English Kenyan money breakdowns, T-bill yield alerts, and chama tips delivered to your inbox every Tuesday morning.
        </p>

        {submitted ? (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#008060]/20 p-4 text-emerald-300 border border-[#008060]/40">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold">You're subscribed! Check your inbox for Tuesday's edition.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3.5 text-sm text-white placeholder-slate-400 outline-hidden transition focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/40"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#008060] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#006b4f] active:scale-95"
            >
              Subscribe Free <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-slate-400">
          Join 8,400+ smart savers in Nairobi & across East Africa. No spam, un-subscribe anytime.
        </p>
      </div>
    </section>
  );
}
