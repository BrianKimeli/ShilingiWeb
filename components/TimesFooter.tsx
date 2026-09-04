import Link from "next/link";
import { APP_NAME, SITE_NAME } from "@/lib/site";

export default function TimesFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="times-masthead text-xl font-bold tracking-tight text-slate-900">
              {SITE_NAME}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Tech, business, market analysis, policy intelligence, and wealth strategies.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Editorial Beats
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              <li>
                <Link href="/times/category/tech" className="hover:text-[#008060]">
                  Tech & Innovation
                </Link>
              </li>
              <li>
                <Link href="/times/category/business" className="hover:text-[#008060]">
                  Business & Enterprise
                </Link>
              </li>
              <li>
                <Link href="/times/category/markets" className="hover:text-[#008060]">
                  Markets & Finance
                </Link>
              </li>
              <li>
                <Link href="/times/category/wealth" className="hover:text-[#008060]">
                  Wealth & Savings
                </Link>
              </li>
              <li>
                <Link href="/times/category/policy" className="hover:text-[#008060]">
                  Policy & Regulation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Editors & Writers
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              <li>
                <Link href="/times/writers/steve-sumbi" className="hover:text-[#008060]">
                  Steve Sumbi (Lead Writer & Editor)
                </Link>
              </li>
              <li>
                <Link href="/times/writers/finesse" className="hover:text-[#008060]">
                  Finesse (Writer & Tech Lead)
                </Link>
              </li>
              <li>
                <Link href="/times/writers/felix-omariba" className="hover:text-[#008060]">
                  Felix Omariba (Growth Lead & Writer)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Ecosystem
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              <li>
                <a
                  href="https://shilingiapp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#008060] hover:underline"
                >
                  Download {APP_NAME} App
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>Global Financial & Tech Media Property.</p>
        </div>
      </div>
    </footer>
  );
}
