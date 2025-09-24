// Design Tokens for CanSell Platform
export const designTokens = {
  // Colors
  colors: {
    // Background Colors
    background: {
      primary: "#E6E7D5", // Main background color
      secondary: "#F5F5F0", // Secondary background
      lighter: "#F0F1E8", // Lighter background for left half
      card: "rgba(255, 255, 255, 0.2)", // Glass card background
      cardBorder: "rgba(255, 255, 255, 0.3)", // Card border
    },

    // Text Colors
    text: {
      primary: "#2D2D2D", // Main text color
      secondary: "#6B7280", // Secondary text
      muted: "#9CA3AF", // Muted text
      placeholder: "#9CA3AF", // Input placeholder
    },

    // Brand Colors
    brand: {
      primary: "#22C55E", // Green primary (matching logo)
      primaryHover: "#16A34A", // Green hover (darker shade)
      accent: "#4ADE80", // Light green accent
    },

    // Status Colors
    status: {
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },

    // Social Media Colors
    social: {
      tiktok: "#000000",
      instagram: "#E4405F",
      twitter: "#1DA1F2",
      facebook: "#1877F2",
      youtube: "#FF0000",
      linkedin: "#0A66C2",
    },
  },

  // Typography
  typography: {
    // Font Families
    fontFamily: {
      sans: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
      farsi: "var(--font-vazirmatn)",
    },

    // Font Sizes
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },

    // Font Weights
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },

    // Line Heights
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
    "4xl": "6rem", // 96px
  },

  // Border Radius
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Border Width
  borderWidth: {
    thin: "1px",
    normal: "2px",
    thick: "3px",
    thicker: "4px",
  },

  // Shadows
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Transitions
  transition: {
    duration: {
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-Index
  zIndex: {
    dropdown: "1000",
    sticky: "1020",
    fixed: "1030",
    modal: "1040",
    popover: "1050",
    tooltip: "1060",
  },
} as const;

// Helper function to get CSS custom properties
export const getCSSVariables = () => {
  const cssVars: Record<string, string> = {};

  // Flatten nested objects and create CSS custom properties
  const flattenObject = (obj: any, prefix = "--") => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], `${prefix}${key}-`);
      } else {
        cssVars[`${prefix}${key}`] = obj[key];
      }
    }
  };

  flattenObject(designTokens);
  return cssVars;
};

// Export individual token categories for easier imports
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const borderWidth = designTokens.borderWidth;
export const boxShadow = designTokens.boxShadow;
export const transition = designTokens.transition;
export const breakpoints = designTokens.breakpoints;
export const zIndex = designTokens.zIndex;
