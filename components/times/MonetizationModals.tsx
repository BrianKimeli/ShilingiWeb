"use client";

import React, { useState } from "react";
import {
  Coffee,
  CheckCircle,
  Sparkles,
  X,
  Smartphone,
  CreditCard,
  Globe,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Writer } from "@/lib/writers";

type TipModalProps = {
  writer: Writer;
  isOpen: boolean;
  onClose: () => void;
};

export function TipWriterModal({ writer, isOpen, onClose }: TipModalProps) {
  const [rail, setRail] = useState<"mpesa" | "global">("mpesa");
  const [kesAmount, setKesAmount] = useState<number>(100);
  const [usdAmount, setUsdAmount] = useState<number>(5);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#008060]">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="times-headline text-xl font-bold text-slate-900">
              {rail === "mpesa" ? "M-Pesa STK Push Sent!" : "Payment Confirmed!"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {rail === "mpesa" ? (
                <>
                  Please check your phone (<strong>{phone || "07XX XXX XXX"}</strong>) and enter your M-Pesa PIN to complete your tip of{" "}
                  <strong className="text-slate-900">KES {kesAmount}</strong> to {writer.name}.
                </>
              ) : (
                <>
                  Thank you for backing independent journalism! Your international tip of{" "}
                  <strong className="text-slate-900">${usdAmount} USD</strong> has been received for {writer.name}.
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSent(false);
                onClose();
              }}
              className="mt-6 w-full rounded-xl bg-[#008060] py-3 text-sm font-semibold text-white transition hover:bg-[#006b4f]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Coffee className="h-6 w-6" />
              </div>
              <div>
                <h3 className="times-headline text-lg font-bold text-slate-900">
                  Tip {writer.name}
                </h3>
                <p className="text-xs text-slate-500">{writer.role}</p>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Support independent African and global financial journalism. 100% of your tip goes directly to the writer.
            </p>

            {/* Payment Rail Toggle (Kenyan M-Pesa vs Global Card) */}
            <div className="mt-4 flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setRail("mpesa")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
                  rail === "mpesa"
                    ? "bg-white text-[#008060] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>M-Pesa (Kenya)</span>
              </button>
              <button
                type="button"
                onClick={() => setRail("global")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
                  rail === "global"
                    ? "bg-white text-[#008060] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Global / Card</span>
              </button>
            </div>

            <form onSubmit={handleTipSubmit} className="mt-5 space-y-4">
              {rail === "mpesa" ? (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Select Amount (KES)
                    </label>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {[50, 100, 250, 500].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setKesAmount(val)}
                          className={`rounded-lg py-2 text-sm font-semibold border transition ${
                            kesAmount === val
                              ? "border-[#008060] bg-[#008060]/10 text-[#008060]"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          KES {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      M-Pesa Mobile Number
                    </label>
                    <div className="mt-1.5 flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus-within:border-[#008060] focus-within:ring-2 focus-within:ring-[#008060]/20">
                      <Smartphone className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
                      <input
                        type="tel"
                        required
                        placeholder="0712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-sm text-slate-900 outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#008060] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#006b4f] disabled:opacity-50"
                  >
                    {loading ? "Triggering M-Pesa..." : `Send KES ${kesAmount} Tip via M-Pesa`}
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Select Amount (USD)
                    </label>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {[3, 5, 10, 25].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setUsdAmount(val)}
                          className={`rounded-lg py-2 text-sm font-semibold border transition ${
                            usdAmount === val
                              ? "border-[#008060] bg-[#008060]/10 text-[#008060]"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email for Receipt
                    </label>
                    <div className="mt-1.5 flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus-within:border-[#008060] focus-within:ring-2 focus-within:ring-[#008060]/20">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm text-slate-900 outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    <CreditCard className="h-4 w-4 text-emerald-400" />
                    <span>{loading ? "Processing..." : `Send $${usdAmount} Tip (Card / Apple Pay)`}</span>
                  </button>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function SubscribeInsiderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      // Save locally to subscribers list
      try {
        const raw = localStorage.getItem("shilingi_newsletter_subscribers");
        const list = raw ? JSON.parse(raw) : [];
        if (!list.includes(email)) {
          list.push(email);
          localStorage.setItem("shilingi_newsletter_subscribers", JSON.stringify(list));
        }
      } catch (err) {
        // ignore
      }

      setLoading(false);
      setSubscribed(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {subscribed ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#008060]">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="times-headline text-2xl font-bold text-slate-900">
              You're on the Inside!
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Welcome to <strong>The Shilingi Times Daily Dispatch</strong>. We've added <strong>{email}</strong> to our priority morning briefing.
            </p>
            <button
              onClick={() => {
                setSubscribed(false);
                onClose();
              }}
              className="mt-6 w-full rounded-xl bg-[#008060] py-3 text-sm font-semibold text-white transition hover:bg-[#006b4f]"
            >
              Continue Reading
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-[#008060]">
                Daily Morning Briefing
              </span>
              <span className="text-xs text-slate-400">• Free Forever</span>
            </div>

            <h3 className="times-headline mt-3 text-2xl font-bold text-slate-900">
              The Shilingi Times Dispatch
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Curated market yield updates, fintech intelligence, and plain-English wealth strategies delivered to your inbox every weekday at 6:30 AM.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Your Email Address
                </label>
                <div className="mt-1.5 flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus-within:border-[#008060] focus-within:ring-2 focus-within:ring-[#008060]/20">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm text-slate-900 outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#008060] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#006b4f] disabled:opacity-50"
              >
                <span>{loading ? "Joining..." : "Get Free Daily Briefing"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Zero spam. One-click unsubscribe anytime.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
