import AppNavbar from "@/components/AppNavbar";
import Hero from "@/components/Hero";
import TimesPreview from "@/components/TimesPreview";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AppNavbar />
      <Hero />
      <TimesPreview />
      <SiteFooter />
    </div>
  );
}
