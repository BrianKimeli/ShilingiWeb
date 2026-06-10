import AppNavbar from "@/components/AppNavbar";
import SiteFooter from "@/components/SiteFooter";
import PrivacySection from "@/components/PrivacySection";
import { privacySections } from "@/lib/privacy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Shilingi Privacy Policy - How we protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AppNavbar />
      <main className="mx-auto max-w-2xl space-y-8 px-5 pb-20 pt-32">
        <div className="space-y-3 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-bold text-[#003322]">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="space-y-10">
          {privacySections.map((section, index) => (
            <PrivacySection key={index} title={section.title} content={section.content} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
