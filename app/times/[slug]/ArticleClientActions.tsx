"use client";

import React, { useState } from "react";
import { Heart, Coffee, MessageSquare, Send, Type, Check, Share2 } from "lucide-react";
import { Writer } from "@/lib/writers";
import { TipWriterModal } from "@/components/times/MonetizationModals";

type Props = {
  writer: Writer;
  initialLikes?: number;
  onFontSizeChange?: (size: "normal" | "large" | "xlarge") => void;
};

export default function ArticleClientActions({ writer, initialLikes = 84, onFontSizeChange }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [tipModalOpen, setTipModalOpen] = useState(false);

  const [comments, setComments] = useState<string[]>([
    "Great article breakdown! Shared this with our investment circle.",
    "Very practical advice on float management and automated category tracking.",
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleFontSize = (size: "normal" | "large" | "xlarge") => {
    setFontSize(size);
    if (onFontSizeChange) onFontSizeChange(size);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [newComment.trim(), ...prev]);
    setNewComment("");
  };

  return (
    <div className="my-10 border-t border-b border-slate-200 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Like & Font Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border transition ${
              hasLiked
                ? "border-rose-300 bg-rose-50 text-rose-600"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            <Heart className={`h-4 w-4 ${hasLiked ? "fill-rose-600 text-rose-600" : ""}`} />
            <span>{likes} Helpful</span>
          </button>

          {/* Font Sizing Control */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => handleFontSize("normal")}
              className={`px-2.5 py-1 rounded-lg transition ${fontSize === "normal" ? "bg-slate-100 font-bold text-slate-900" : "hover:text-slate-900"}`}
            >
              A
            </button>
            <button
              onClick={() => handleFontSize("large")}
              className={`px-2.5 py-1 rounded-lg transition ${fontSize === "large" ? "bg-slate-100 font-bold text-slate-900" : "hover:text-slate-900"}`}
            >
              A+
            </button>
          </div>
        </div>

        {/* Tip Writer Button */}
        <button
          onClick={() => setTipModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-xs transition hover:bg-amber-600"
        >
          <Coffee className="h-4 w-4" /> Tip {writer.name} via M-Pesa
        </button>
      </div>

      {/* Reader Discussion / Comments */}
      <div className="mt-8">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800">
          <MessageSquare className="h-4 w-4 text-[#008060]" />
          <span>Reader Discussion ({comments.length})</span>
        </div>

        <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Share your thoughts on this story..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-hidden focus:border-[#008060]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[#008060] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#006b4f]"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 space-y-2">
          {comments.map((comment, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Reader: </span>
              {comment}
            </div>
          ))}
        </div>
      </div>

      <TipWriterModal
        writer={writer}
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
      />
    </div>
  );
}
