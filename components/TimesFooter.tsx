import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function TimesFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-2xl px-5 py-10 text-center">
        <Link href="/times" className="times-masthead text-xl italic text-slate-400 hover:text-slate-600">
          {SITE_NAME}
        </Link>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Money stories you can actually use. More voices coming as we grow.
        </p>
        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
