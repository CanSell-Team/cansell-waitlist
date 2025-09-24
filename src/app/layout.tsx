import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title:
    "CanSell - Second-hand and New Book Marketplace | Buy & Sell Books Online",
  description:
    "CanSell is Iran's premier marketplace for second-hand and new books. Buy and sell books online with ease. Currently rebuilding with enhanced features - join our waitlist!",
  keywords:
    "book marketplace, second-hand books, new books, buy books online, sell books, Iran books, کتاب دست دوم, کتاب نو, خرید کتاب, فروش کتاب",
  openGraph: {
    title: "CanSell - Second-hand and New Book Marketplace",
    description:
      "Iran's premier marketplace for second-hand and new books. Buy and sell books online with ease.",
    type: "website",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CanSell - Second-hand and New Book Marketplace",
    description:
      "Iran's premier marketplace for second-hand and new books. Buy and sell books online with ease.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
