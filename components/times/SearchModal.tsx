"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, User, Clock } from "lucide-react";
import { getAllArticles } from "@/lib/cms";
import { Article } from "@/lib/articles";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    setAllArticles(getAllArticles());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isOpen)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.description.toLowerCase().includes(query.toLowerCase()) ||
          a.author.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-100 px-4 py-3.5">
          <Search className="h-5 w-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search stories, topics, authors (e.g. M-Pesa, Steve Sumbi, Markets)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-medium text-slate-900 placeholder-slate-400 outline-hidden"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Type keywords above or press <kbd className="rounded-md border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd> to exit.
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                Found {results.length} Stories
              </p>
              {results.map((article) => (
                <Link
                  key={article.slug}
                  href={`/times/${article.slug}`}
                  onClick={onClose}
                  className="group flex items-start justify-between rounded-xl p-3 hover:bg-slate-50 transition"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#008060]">
                      {article.category}
                    </span>
                    <h4 className="times-headline text-sm font-bold text-slate-900 group-hover:text-[#008060] line-clamp-1">
                      {article.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                      {article.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-[#008060] mt-1" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching stories found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
