import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#003322",
  colorScheme: "light",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shilingi | Smart money across Africa",
    template: "%s | Shilingi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "personal finance Africa",
    "mobile money",
    "The Shilingi Times",
    "budgeting",
    "savings",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: "/shilingi-icon.png", width: 512, height: 512, alt: "Shilingi" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/shilingi-icon.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/shilingi-icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/shilingi-icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-[#fafaf8] text-slate-900">{children}</body>
    </html>
  );
}
