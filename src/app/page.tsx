"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  borderWidth,
  transition,
} from "@/design-tokens";

export default function Home() {
  const { language, isRTL, toggleLanguage } = useLanguage();

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/socialsight-ai-4352b418-98c6-45f5-ac01-f6e3e98ee190.png",
    "/socialsight-ai-7e281a4d-9b14-465e-93de-963c27ea4011.png",
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const content = {
    en: {
      title: "CanSell",
      subtitle:
        "Unfortunately, CanSell has been inactive since September 2025 and buying and selling is not possible. We hope to return as soon as possible with better features and a better application.",
      description:
        "Enter your phone number or email to be informed about the new version",
      socialText:
        "Join our community and be the first to know when we're back!",
      contactPlaceholder: "Your email or phone number",
      buttonText: "Notify Me When We're Back",
      socialLinks: {
        instagram: "Instagram",
        linkedin: "LinkedIn",
        email: "Email",
      },
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
      socialLinks: {
        instagram: "اینستاگرام",
        linkedin: "لینکدین",
        email: "ایمیل",
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
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Half - Full Height (Hidden on Mobile) */}
        <div
          className="hidden md:flex flex-col w-1/2"
          style={{ backgroundColor: colors.background.lighter }}
        >
          {/* Main Content - Image Carousel */}
          <main className="flex-1 flex items-center justify-center">
            <div
              className="relative w-full max-w-sm overflow-hidden"
              style={{
                borderRadius: borderRadius.md,
                height: "auto",
                aspectRatio: "1/1",
              }}
            >
              {images.map((imageSrc, index) => (
                <Image
                  key={imageSrc}
                  src={imageSrc}
                  alt="CanSell illustration"
                  width={320}
                  height={320}
                  className={`object-contain w-full h-full absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>
          </main>
        </div>

        {/* Right Half - Full Height (Full Width on Mobile) */}
        <div
          className="w-full md:w-1/2 flex flex-col"
          style={{ backgroundColor: colors.background.primary }}
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
          {/* Main Content - Coming Soon */}
          <main className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md">
              <h1
                className="mb-3 md:mb-4 text-center font-bold whitespace-nowrap text-2xl md:text-3xl"
                style={{
                  color: colors.text.primary,
                  lineHeight: typography.lineHeight.tight,
                }}
              >
                {currentContent.title}
              </h1>
              <p
                className="mb-6 md:mb-8 text-center text-sm md:text-lg px-4 md:px-0"
                style={{
                  color: colors.text.secondary,
                  lineHeight: typography.lineHeight.normal,
                }}
              >
                {currentContent.subtitle}
              </p>

              {/* Notification Form */}
              <div className="space-y-3 md:space-y-4 px-4 md:px-0">
                {/* Email Notification Form */}
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={currentContent.contactPlaceholder}
                    className="w-full px-3 md:px-4 py-2 md:py-3 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                    style={{
                      backgroundColor: colors.background.card,
                      borderColor: colors.background.cardBorder,
                      color: colors.text.primary,
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
                      const isEmail =
                        value.includes("@") && value.includes(".");
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
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-white font-medium rounded-lg transition-colors text-sm md:text-base"
                    style={{
                      backgroundColor: colors.brand.primary,
                      fontWeight: typography.fontWeight.medium,
                      borderRadius: borderRadius.lg,
                      transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.brand.primaryHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.brand.primary;
                    }}
                  >
                    {currentContent.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="py-4 md:py-6">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 md:space-x-6">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
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
                  {language === "en" ? "فا" : "EN"}
                </button>
                <a
                  href="#"
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
                  href="#"
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
                  href="#"
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
                  {currentContent.socialLinks.email}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
