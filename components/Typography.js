import React from "react";

/**
 * Reusable Typography System for Tech Solutionor
 * Derived directly from the Hero Section Design Language:
 *
 * 1. Headings:
 *    - Font: .font-display (Anton / Montserrat / Outfit)
 *    - Case: UPPERCASE tracking-tight
 *    - High-impact word-focused contrast (primary dark #0D0F12 or white, with emerald #41B349 italic accent)
 *
 * 2. Paragraphs / Body:
 *    - Font: .font-jakarta (Plus Jakarta Sans)
 *    - Weights: font-normal sm:font-medium (400-500)
 *    - Line height: leading-relaxed md:leading-[1.65]
 *    - Letter spacing: tracking-[-0.01em]
 *    - Colors: #4A5568 (light background) / #94A3B8 or #D1D5DB (dark background)
 *
 * 3. Buttons:
 *    - Font: .font-jakarta font-semibold tracking-[-0.01em]
 *    - Clean Title Case
 *
 * 4. Eyebrows / Badges:
 *    - Font: .font-display uppercase tracking-wider
 *    - Vibrant emerald & champagne gold accents
 */

/**
 * Section Badge / Eyebrow Pill
 * Refined with modern, clean typography (Plus Jakarta Sans)
 * and balanced spacing, alignment, and subtle status indicator.
 */
export const SectionBadge = ({
  as: Component = "div",
  children,
  icon = null,
  className = "",
  variant = "light", // 'light' (on white bg), 'dark' (on dark bg), 'pill' (solid green)
  pulse = true,
  ...props
}) => {
  const variantStyles = {
    light:
      "bg-[#41B349]/[0.08] border border-[#41B349]/25 text-[#2C9434] shadow-[0_1px_4px_rgba(65,179,73,0.06)]",
    dark:
      "bg-[#41B349]/[0.12] border border-[#41B349]/30 text-[#41B349] shadow-[0_0_15px_rgba(65,179,73,0.08)]",
    pill:
      "bg-[#41B349] text-white border border-[#FFE7A8]/50 shadow-[0_4px_16px_rgba(65,179,73,0.25)]",
  };

  // Only show pulsing dot if no explicit custom icon is provided
  const showPulse = pulse && !icon;

  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full font-jakarta font-semibold uppercase tracking-[0.14em] text-[11px] sm:text-xs select-none leading-none transition-all duration-200 ${variantStyles[variant] || variantStyles.light
        } ${className}`}
      {...props}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${variant === "pill" ? "bg-white" : "bg-[#41B349]"
              }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${variant === "pill" ? "bg-white" : "bg-[#41B349]"
              }`}
          />
        </span>
      )}
      {icon && (
        <span className="shrink-0 inline-flex items-center justify-center text-current" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5 shrink-0">{children}</span>
    </Component>
  );
};

/**
 * Section Heading (H2, H3, etc.)
 */
export const SectionHeading = ({
  as: Component = "h2",
  size = "section", // 'hero' | 'section' | 'md' | 'sm'
  theme = "dark",   // 'dark' (#0D0F12) | 'light' (white)
  className = "",
  children,
  ...props
}) => {
  const sizeStyles = {
    hero: "text-3xl min-[360px]:text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[1.05] sm:leading-[0.98]",
    section: "text-2xl sm:text-3xl md:text-5xl lg:text-[52px] leading-[1.08] sm:leading-[1.02]",
    md: "text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight sm:leading-snug",
    sm: "text-lg sm:text-xl md:text-2xl leading-snug",
  };

  const themeStyles = {
    dark: "text-[#0D0F12]",
    light: "text-white",
  };

  return (
    <Component
      className={`font-display uppercase tracking-tight ${sizeStyles[size] || sizeStyles.section
        } ${themeStyles[theme] || themeStyles.dark} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Word Highlight (emerald italic accent like in hero title)
 */
export const HighlightWord = ({
  as: Component = "span",
  className = "",
  children,
  ...props
}) => {
  return (
    <Component
      className={`text-[#41B349] italic font-display inline-block ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Section Paragraph / Narrative description
 */
export const SectionParagraph = ({
  as: Component = "p",
  theme = "slate", // 'slate' (#4A5568) | 'light' (#D1D5DB / #94A3B8)
  size = "md",     // 'lg' | 'md' | 'sm'
  className = "",
  children,
  ...props
}) => {
  const sizeStyles = {
    lg: "text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-relaxed md:leading-[1.65]",
    md: "text-sm sm:text-base md:text-lg leading-relaxed",
    sm: "text-xs sm:text-sm md:text-base leading-relaxed",
  };

  const themeStyles = {
    slate: "text-[#4A5568]",
    light: "text-gray-300",
  };

  return (
    <Component
      className={`font-jakarta font-normal sm:font-medium tracking-[-0.01em] ${sizeStyles[size] || sizeStyles.md
        } ${themeStyles[theme] || themeStyles.slate} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Card / Feature Heading
 */
export const CardHeading = ({
  as: Component = "h3",
  size = "md",     // 'lg' | 'md' | 'sm'
  theme = "dark",   // 'dark' | 'light' | 'inherit'
  className = "",
  children,
  ...props
}) => {
  const sizeStyles = {
    lg: "text-xl min-[390px]:text-2xl sm:text-3xl font-display uppercase tracking-tight leading-snug",
    md: "text-lg sm:text-xl md:text-2xl font-display uppercase tracking-tight leading-snug",
    sm: "text-base sm:text-lg md:text-xl font-display uppercase tracking-tight leading-snug",
  };

  const themeStyles = {
    dark: "text-[#0D0F12]",
    light: "text-white",
    green: "text-[#2C9434]",
    inherit: "",
  };

  return (
    <Component
      className={`${sizeStyles[size] || sizeStyles.md} ${themeStyles[theme] !== undefined ? themeStyles[theme] : themeStyles.dark
        } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Card Paragraph / Feature Description
 */
export const CardParagraph = ({
  as: Component = "p",
  theme = "slate", // 'slate' | 'light' | 'inherit'
  size = "sm",     // 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  className = "",
  children,
  ...props
}) => {
  const sizeStyles = {
    xl: "text-[15px] sm:text-[15.5px] md:text-base lg:text-[16.5px] leading-[1.72] sm:leading-[1.75] md:leading-[1.8] text-pretty",
    lg: "text-[15px] sm:text-[15.5px] md:text-base leading-[1.75] md:leading-[1.8] text-pretty",
    md: "text-sm sm:text-base leading-relaxed",
    sm: "text-xs min-[390px]:text-sm sm:text-base leading-relaxed",
    xs: "text-xs sm:text-sm leading-relaxed",
  };

  const themeStyles = {
    slate: "text-[#4B5563]",
    light: "text-[#94A3B8]",
    inherit: "",
  };

  return (
    <Component
      className={`font-jakarta font-normal tracking-[-0.01em] ${sizeStyles[size] || sizeStyles.sm
        } ${themeStyles[theme] !== undefined ? themeStyles[theme] : themeStyles.slate} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Button Text Typography
 */
export const ButtonText = ({
  as: Component = "span",
  className = "",
  children,
  ...props
}) => {
  return (
    <Component
      className={`font-jakarta font-semibold tracking-[-0.01em] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
  ButtonText,
};
