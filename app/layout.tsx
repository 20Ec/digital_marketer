import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rajaduraiannadurai.com"),
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  openGraph: {
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    siteName: portfolio.personal.name,
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-900">{children}</body>
    </html>
  );
}
