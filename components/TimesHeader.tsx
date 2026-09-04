"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Rss } from "lucide-react";
import { APP_NAME } from "@/lib/site";
import { categoriesList } from "@/lib/articles";
import SearchModal from "./times/SearchModal";

export default function TimesHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        // Scrolling down -> Hide header for maximum screen reading space
        setIsVisible(false);
      } else {
        // Scrolling up -> Reveal header
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-slate-200/80 bg-white/98 backdrop-blur-md transition-transform duration-300 ${
          isVisible ? "translate-y-0 shadow-xs" : "-translate-y-full shadow-none"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Top Utility Bar */}
          <div className="flex items-center justify-between py-2 text-xs text-slate-500 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <time dateTime={new Date().toISOString().split("T")[0]}>{today}</time>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#008060]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#008060] animate-pulse" />
                Daily Edition
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-[#008060] transition"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-[10px] font-mono text-slate-500">
                  ⌘K
                </kbd>
              </button>

              <span className="text-slate-300">|</span>

              <Link
                href="/feed.xml"
                target="_blank"
                className="hidden sm:flex items-center gap-1 font-semibold text-slate-600 hover:text-[#008060] transition"
              >
                <Rss className="h-3.5 w-3.5 text-amber-600" />
                <span>RSS Feed</span>
              </Link>

              <a
                href="https://shilingiapp.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#008060] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#006b4f]"
              >
                {APP_NAME} App
              </a>
            </div>
          </div>

          {/* High-Impact Centered Masthead & Subtitle */}
          <div className="pb-4 pt-3.5 text-center">
            <Link href="/times" className="inline-block group">
              <div className="flex items-center justify-center gap-3">
                <span className="times-masthead text-3xl sm:text-5xl font-extrabold italic tracking-tight text-slate-900 group-hover:text-[#008060] transition-colors">
                  The Shilingi Times
                </span>
              </div>
            </Link>
            <div className="mx-auto mt-2 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#008060] to-transparent" />
            <p className="mt-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#008060]">
              Your Financial Daily
            </p>
          </div>

          {/* Scalable Category Beats Bar */}
          <div className="border-t border-slate-100 py-2 overflow-x-auto scrollbar-none">
            <nav className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600 shrink-0">
              <Link
                href="/times"
                className="rounded-lg px-3 py-1 font-semibold text-slate-900 hover:bg-slate-100 transition"
              >
                Top Stories
              </Link>
              {categoriesList.map((cat) => (
                <Link
                  key={cat}
                  href={`/times/category/${encodeURIComponent(cat.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}`}
                  className="whitespace-nowrap rounded-lg px-3 py-1 transition hover:bg-slate-100 hover:text-[#008060]"
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
