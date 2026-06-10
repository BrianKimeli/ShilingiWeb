import AppNavbar from "@/components/AppNavbar";
import SiteFooter from "@/components/SiteFooter";
import TermsSection from "@/components/TermsSection";
import { termsSection } from "@/lib/terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Shilingi Terms of Service - Our terms and conditions",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AppNavbar />
      <main className="mx-auto max-w-2xl space-y-8 px-5 pb-20 pt-32">
        <div className="space-y-3 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-bold text-[#003322]">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: June 10, 2026</p>
        </div>

        <div className="space-y-10">
          {termsSection.map((section, index) => (
            <TermsSection key={index} title={section.title} content={section.content} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
