import Link from "next/link";
import { APP_NAME } from "@/lib/site";

export default function TimesHeader() {
  const today = new Date().toLocaleDateString("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl px-5">
        <div className="flex items-center justify-between py-3 text-sm text-slate-500">
          <time dateTime={new Date().toISOString().split("T")[0]}>{today}</time>
          <a
            href="https://shilingiapp.vercel.app"
            className="rounded-lg bg-[#008060] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#006b4f]"
          >
            {APP_NAME} App
          </a>
        </div>

        <div className="pb-6 pt-1 text-center">
          <Link href="/times" className="inline-block">
            <h1 className="times-masthead text-4xl font-bold italic text-slate-900 sm:text-[2.65rem]">
              The Shilingi Times
            </h1>
          </Link>
          <div className="mx-auto mt-2.5 h-px w-[7.5rem] bg-slate-800" />
          <p className="mt-2.5 text-xs font-semibold tracking-wide text-[#008060]">
            Your Financial Daily
          </p>
        </div>
      </div>
    </header>
  );
}
