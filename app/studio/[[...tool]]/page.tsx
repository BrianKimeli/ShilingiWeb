import Link from "next/link";
import { LayoutGrid, ExternalLink, PenSquare, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity.io Studio Workspace | The Shilingi Times",
  description: "Writer studio workspace and content management setup for The Shilingi Times.",
};

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not Configured (Using Local Dataset)";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 sm:p-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/times"
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to The Shilingi Times
        </Link>

        <div className="mt-6 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008060] text-white shadow-md">
              <LayoutGrid className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                Headless CMS Studio Workspace
              </span>
              <h1 className="times-headline mt-1 text-3xl font-bold sm:text-4xl text-white">
                Sanity.io Publishing Desk
              </h1>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-2xl">
            This workspace links your editorial workflow directly to Sanity Content Lake for multi-writer collaboration across Tech, Business, Markets, Wealth, and Policy beats.
          </p>
        </div>

        {/* Configuration Status Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Sanity Connection Status
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Project ID:</span>
                <span className="font-mono font-semibold text-emerald-400">{projectId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Dataset:</span>
                <span className="font-mono text-white">{dataset}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Fallback Engine:</span>
                <span className="font-semibold text-emerald-400">Active & Preserved</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Writer Actions
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href="https://sanity.io/manage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-[#008060] p-3 text-xs font-semibold text-white transition hover:bg-[#006b4f]"
              >
                <span>Launch Sanity Cloud Manage Studio</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                href="/times/admin"
                className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                <span>Open Built-in Writer Studio Desk</span>
                <PenSquare className="h-4 w-4 text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Schemas Overview */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-800/30 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
            Active Schemas & Primary Beats
          </h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
              <p className="font-bold text-white">Post Schema</p>
              <p className="mt-1 text-slate-400">Headline, Slug, Excerpt, Body, Read Time, Lead Story, Trending, Sub-tags.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
              <p className="font-bold text-white">Author Schema</p>
              <p className="mt-1 text-slate-400">Writer Name, Role, Avatar, Bio, Social Handles (X, LinkedIn).</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
              <p className="font-bold text-white">Category Beats</p>
              <p className="mt-1 text-slate-400">Tech, Business, Markets, Wealth, Policy, Money.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
