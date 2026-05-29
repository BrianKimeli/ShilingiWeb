"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="rounded-full p-2 text-[#008060] transition hover:bg-[#008060]/10"
      aria-label="Share article"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
}
