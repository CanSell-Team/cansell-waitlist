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
  title: {
    default:
      "CanSell - Second-hand and New Book Marketplace | Buy & Sell Books Online",
    template: "%s | CanSell",
  },
  description:
    "CanSell is Iran's premier marketplace for second-hand and new books. Buy and sell books online with ease. Currently rebuilding with enhanced features - join our waitlist!",
  keywords: [
    "book marketplace",
    "second-hand books",
    "new books",
    "buy books online",
    "sell books",
    "Iran books",
    "book trading",
    "online bookstore",
    "کتاب دست دوم",
    "کتاب نو",
    "خرید کتاب",
    "فروش کتاب",
    "بازارچه کتاب",
    "کنسل",
  ],
  authors: [{ name: "CanSell Team" }],
  creator: "CanSell",
  publisher: "CanSell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cansell.store"),
  alternates: {
    canonical: "/",
    languages: {
      fa: "/",
      en: "/",
    },
  },
  openGraph: {
    title: "CanSell - Second-hand and New Book Marketplace",
    description:
      "Iran's premier marketplace for second-hand and new books. Buy and sell books online with ease.",
    url: "https://cansell.store",
    siteName: "CanSell",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CanSell Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanSell - Second-hand and New Book Marketplace",
    description:
      "Iran's premier marketplace for second-hand and new books. Buy and sell books online with ease.",
    images: ["/logo.png"],
    creator: "@cansell",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#22C55E" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CanSell" />
        <meta name="application-name" content="CanSell" />
        <meta name="msapplication-TileColor" content="#22C55E" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
