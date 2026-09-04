import WriterDashboard from "@/components/times/WriterDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writer Studio & Editorial Desk | The Shilingi Times",
  description: "Compose, format, and publish articles for The Shilingi Times.",
  robots: { index: false, follow: false },
};

export default function WriterAdminPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <WriterDashboard />
    </main>
  );
}
