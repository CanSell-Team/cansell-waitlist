"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Image from "next/image";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  borderWidth,
  transition,
} from "@/design-tokens";

export default function Home() {
  const { language, isRTL } = useLanguage();

  const content = {
    en: {
      title: "CanSell, Second-hand and New Book Marketplace",
      subtitle:
        "Unfortunately, CanSell has been inactive since September 2025 and buying and selling is not possible. We hope to return as soon as possible with better features and a better application.",
      description:
        "Enter your phone number or email to be informed about the new version",
      socialText:
        "Join our community and be the first to know when we're back!",
      contactPlaceholder: "Your email or phone number",
      buttonText: "Notify Me When We're Back",
    },
    fa: {
      title: "کنسل، بازارچه کتاب دست دوم و نو",
      subtitle:
        "متاسفانه کنسل از اول مهرماه ۱۴۰۴ غیرفعال شده و امکان خرید و فروش وجود نداره. امیدواریم که بتونیم هر چه زودتر با امکانات بهتر و اپلیکیشن بهتری برگردیم",
      description: "برای اطلاع از نسخه جدید شماره یا ایمیل خودتون رو وارد کنین",
      socialText:
        "به جامعه ما بپیوندید و اولین کسی باشید که از بازگشت ما باخبر میشه!",
      contactPlaceholder: "ایمیل یا شماره تلفن شما",
      buttonText: "وقتی برمی‌گردیم بهم خبر بده",
    },
  };

  const currentContent = content[language];

  return (
    <div
      className={`min-h-screen flex ${
        isRTL ? "font-vazirmatn" : "font-geist-sans"
      }`}
      style={{
        fontFamily: isRTL
          ? typography.fontFamily.farsi
          : typography.fontFamily.sans,
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <LanguageToggle />

      {/* Logo - Top Center */}
      <div
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10"
        style={{
          border: `${borderWidth.normal} solid white`,
          borderRadius: borderRadius.full,
          padding: spacing.sm,
          backgroundColor: colors.background.card,
        }}
      >
        <Image
          src="/logo.png"
          alt="CanSell Logo"
          width={180}
          height={180}
          className="object-contain rounded-full"
          priority
        />
      </div>

      {/* Left Half - New Image */}
      <div
        className="w-1/2 flex items-center justify-center p-8 pt-24"
        style={{ backgroundColor: colors.background.lighter }}
      >
        <div
          className="relative w-full max-w-sm overflow-hidden"
          style={{
            borderRadius: borderRadius.md,
            height: "auto",
            aspectRatio: "1/1",
          }}
        >
          <Image
            src="/socialsight-ai-4352b418-98c6-45f5-ac01-f6e3e98ee190.png"
            alt="CanSell illustration"
            width={320}
            height={320}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Right Half - Coming Soon Content */}
      <div
        className="w-1/2 flex items-center justify-center p-8 pt-24"
        style={{ backgroundColor: colors.background.primary }}
      >
        <div className="w-full max-w-md">
          <h1
            className="mb-4 text-center font-bold whitespace-nowrap"
            style={{
              fontSize: typography.fontSize["3xl"],
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            {currentContent.title}
          </h1>
          <p
            className="mb-8 text-center"
            style={{
              fontSize: typography.fontSize.lg,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.normal,
            }}
          >
            {currentContent.subtitle}
          </p>

          {/* Notification Form */}
          <div className="space-y-4">
            {/* Email Notification Form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder={currentContent.contactPlaceholder}
                className="w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.background.cardBorder,
                  color: colors.text.primary,
                  fontSize: typography.fontSize.base,
                  borderRadius: borderRadius.lg,
                  transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.brand.primary;
                  e.target.style.boxShadow = `0 0 0 2px ${colors.brand.accent}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.background.cardBorder;
                  e.target.style.boxShadow = "none";
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  // Smart validation: detect if it's email or phone
                  const isEmail = value.includes("@") && value.includes(".");
                  const isPhone = /^[\+]?[0-9\s\-\(\)]{10,}$/.test(
                    value.replace(/\s/g, "")
                  );

                  if (isEmail) {
                    e.target.type = "email";
                  } else if (isPhone) {
                    e.target.type = "tel";
                  } else {
                    e.target.type = "text";
                  }
                }}
              />
              <button
                className="w-full px-4 py-3 text-white font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor: colors.brand.primary,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium,
                  borderRadius: borderRadius.lg,
                  transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    colors.brand.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.brand.primary;
                }}
              >
                {currentContent.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 py-4">
        <div className="text-center space-y-3">
          <p
            className="text-sm"
            style={{
              color: colors.text.secondary,
              fontSize: typography.fontSize.sm,
            }}
          >
            {currentContent.socialText}
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="px-4 py-2 border rounded-lg transition-colors hover:scale-105"
              style={{
                borderColor: colors.text.muted,
                backgroundColor: "transparent",
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: borderRadius.lg,
                transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.social.instagram;
                e.currentTarget.style.backgroundColor = colors.social.instagram;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.text.muted;
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.text.secondary;
              }}
            >
              Instagram
            </a>
            <a
              href="#"
              className="px-4 py-2 border rounded-lg transition-colors hover:scale-105"
              style={{
                borderColor: colors.text.muted,
                backgroundColor: "transparent",
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: borderRadius.lg,
                transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.social.linkedin;
                e.currentTarget.style.backgroundColor = colors.social.linkedin;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.text.muted;
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.text.secondary;
              }}
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="px-4 py-2 border rounded-lg transition-colors hover:scale-105"
              style={{
                borderColor: colors.text.muted,
                backgroundColor: "transparent",
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: borderRadius.lg,
                transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.brand.primary;
                e.currentTarget.style.backgroundColor = colors.brand.primary;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.text.muted;
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.text.secondary;
              }}
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
