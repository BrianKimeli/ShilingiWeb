import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, TrendingUp, Users, Zap } from "lucide-react";
import GooglePlayButton from "./GooglePlayButton";
import ShilingiLogo from "./ShilingiLogo";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#008060] px-6 pb-24 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.1),transparent_45%)]" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-base text-emerald-100">Track your money. Keep more of it.</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Know where every shilling goes.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-emerald-50/95">
              Shilingi App reads your mobile money activity, sorts it into categories, and helps you
              save with your people, on your phone.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GooglePlayButton variant="light" />
              <Link
                href="/times"
                className="rounded-xl border border-white/50 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10"
              >
                The Shilingi Times
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ShilingiLogo size={220} priority framed className="shadow-2xl" />
          </div>
        </div>
      </section>

      <section id="features" className="relative -mt-10 px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-amber-500" />}
            title="Tracks for you"
            desc="Pulls in mobile money texts so you don't type every payment."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-emerald-600" />}
            title="Stays private"
            desc="PIN and fingerprint lock on your device."
          />
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6 text-sky-600" />}
            title="Shows the split"
            desc="Food, transport, bills. See what actually adds up."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-violet-600" />}
            title="Group savings"
            desc="Chama contributions and goals in one place."
          />
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3">{icon}</div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}
