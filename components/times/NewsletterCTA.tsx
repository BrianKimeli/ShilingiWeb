"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">New posts by email</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-600">
        One email when we publish. No daily spam.
      </p>

      {done ? (
        <p className="mt-4 text-base text-[#008060]">Thanks. We&apos;ll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#008060] px-5 py-3 text-base font-semibold text-white hover:bg-[#006b4f]"
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}
