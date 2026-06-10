"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ShilingiLogo from "./ShilingiLogo";
import GooglePlayButton from "./GooglePlayButton";

export default function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-[#008060]/95 py-3 shadow-lg backdrop-blur" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 text-white">
          <ShilingiLogo size={40} priority framed />
          <span className="text-lg font-semibold tracking-tight">Shilingi</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="/times" className="hover:text-white">
            The Shilingi Times
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/times"
            className="hidden rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:inline-block"
          >
            The Times
          </Link>
          <GooglePlayButton variant="light" className="!px-4 !py-2.5 !text-sm" />
        </div>
      </div>
    </header>
  );
}
