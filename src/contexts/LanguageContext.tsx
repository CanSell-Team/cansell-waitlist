"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fa";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fa");

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fa")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "fa" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const isRTL = language === "fa";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
