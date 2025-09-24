"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  colors,
  typography,
  borderRadius,
  transition,
  zIndex,
} from "@/design-tokens";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-32 left-1/2 transform -translate-x-1/2 backdrop-blur-sm border rounded-lg transition-colors"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.background.cardBorder,
        color: colors.text.secondary,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        borderRadius: borderRadius.lg,
        padding: "0.5rem 0.75rem",
        zIndex: zIndex.fixed,
        transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.background.secondary;
        e.currentTarget.style.color = colors.text.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.background.card;
        e.currentTarget.style.color = colors.text.secondary;
      }}
    >
      {language === "en" ? "فا" : "EN"}
    </button>
  );
}
