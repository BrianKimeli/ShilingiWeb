import type { Metadata } from "next";
import TimesHeader from "@/components/TimesHeader";
import TimesFooter from "@/components/TimesFooter";
import { timesHomeMetadata } from "@/lib/seo";

export const metadata: Metadata = timesHomeMetadata;

export default function TimesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <TimesHeader />
      {children}
      <TimesFooter />
    </div>
  );
}
