"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  borderWidth,
  transition,
} from "@/design-tokens";

export default function NotFound() {
  const { language, isRTL } = useLanguage();

  const content = {
    en: {
      title: "404",
      subtitle: "Page Not Found",
      description: "Sorry, we couldn't find the page you're looking for.",
      buttonText: "Return to Home",
      socialLinks: {
        instagram: "Instagram",
        linkedin: "LinkedIn",
        telegram: "Telegram",
      },
    },
    fa: {
      title: "۴۰۴",
      subtitle: "صفحه یافت نشد",
      description: "متاسفانه صفحه‌ای که دنبالش می‌گردید پیدا نشد.",
      buttonText: "بازگشت به خانه",
      socialLinks: {
        instagram: "اینستاگرام",
        linkedin: "لینکدین",
        telegram: "تلگرام",
      },
    },
  };

  const currentContent = content[language];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isRTL ? "font-vazirmatn" : "font-geist-sans"
      }`}
      style={{
        fontFamily: isRTL
          ? typography.fontFamily.farsi
          : typography.fontFamily.sans,
        backgroundColor: colors.background.primary,
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header - Logo */}
      <header className="flex justify-center items-center pt-8 pb-4 md:pt-12 md:pb-8">
        <div
          style={{
            border: `${borderWidth.normal} solid white`,
            borderRadius: borderRadius.full,
            padding: spacing.xs,
            backgroundColor: colors.background.card,
          }}
        >
          <Image
            src="/logo.png"
            alt="CanSell Logo"
            width={120}
            height={120}
            className="object-contain rounded-full md:w-[180px] md:h-[180px]"
            priority
          />
        </div>
      </header>

      {/* Main Content - 404 Error */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md text-center">
          <h1
            className="mb-3 md:mb-4 font-bold text-6xl md:text-7xl"
            style={{
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            {currentContent.title}
          </h1>
          <h2
            className="mb-3 md:mb-4 font-semibold text-xl md:text-2xl"
            style={{
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            {currentContent.subtitle}
          </h2>
          <p
            className="mb-6 md:mb-8 text-sm md:text-lg px-4 md:px-0"
            style={{
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.normal,
            }}
          >
            {currentContent.description}
          </p>

          {/* Return Home Button */}
          <Link
            href="/"
            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 text-white font-medium rounded-lg transition-colors text-sm md:text-base"
            style={{
              backgroundColor: colors.brand.primary,
              fontWeight: typography.fontWeight.medium,
              borderRadius: borderRadius.lg,
              transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.brand.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.brand.primary;
            }}
          >
            {currentContent.buttonText}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 md:py-6">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-4 md:space-x-6">
            <a
              href="https://www.instagram.com/cansell_info/"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-sm border rounded-lg transition-colors px-3 py-1"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.background.cardBorder,
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: borderRadius.lg,
                transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
              }}
            >
              {currentContent.socialLinks.instagram}
            </a>
            <a
              href="https://www.linkedin.com/company/cansell-info"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-sm border rounded-lg transition-colors px-3 py-1"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.background.cardBorder,
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: borderRadius.lg,
                transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
              }}
            >
              {currentContent.socialLinks.linkedin}
            </a>
            <a
              href="https://t.me/cansell_support"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-sm border rounded-lg transition-colors px-3 py-1"
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.background.cardBorder,
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: borderRadius.lg,
                transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
              }}
            >
              {currentContent.socialLinks.telegram}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
