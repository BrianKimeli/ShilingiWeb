import Link from "next/link";
import GooglePlayButton from "./GooglePlayButton";
import ShilingiLogo from "./ShilingiLogo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <ShilingiLogo size={48} framed />
            <span className="text-lg font-semibold">Shilingi</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            A simple app for tracking spend and saving together. Built for Africa, open to anyone
            who uses mobile money.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-emerald-400">Links</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/#features" className="hover:text-white">
                What it does
              </Link>
            </li>
            <li>
              <Link href="/times" className="hover:text-white">
                The Shilingi Times
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-emerald-400">Get the app</p>
          <GooglePlayButton variant="light" />
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Shilingi
      </div>
    </footer>
  );
}
