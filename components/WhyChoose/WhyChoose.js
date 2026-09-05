"use client";
import React from 'react';
import Image from 'next/image';

const HandDrawnOval = () => (
  <svg
    className="absolute -inset-x-3.5 -inset-y-2 w-[calc(100%+28px)] h-[calc(100%+16px)] pointer-events-none select-none"
    viewBox="0 0 170 56"
    fill="none"
    preserveAspectRatio="none"
  >
    {/* First Loop */}
    <path
      d="M 18 28 C 14 13, 50 5, 96 6 C 144 7, 164 17, 160 31 C 155 45, 115 52, 66 51 C 26 50, 6 41, 17 25 C 22 17, 56 8, 102 7"
      stroke="#41B349"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-95"
    />
    {/* Subtle second sketch trace for organic hand-drawn feel */}
    <path
      d="M 22 26 C 28 11, 68 5, 110 7 C 150 9, 162 20, 155 33 C 148 44, 106 50, 60 49 C 20 48, 10 39, 19 26"
      stroke="#41B349"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-50"
    />
  </svg>
);

/**
 * Reusable WhyChoose Component for all Technology pages
 * 
 * Props:
 * - highlightText: Text inside the green hand-drawn oval (default: "Why Choose")
 * - titleRest: Text following the circled accent (e.g. "Laravel Framework?", "React JS?")
 * - leadText: Optional bold phrase leading the first paragraph
 * - paragraph: Single string or CMS formatted value
 * - paragraphs: Array of strings or JSX paragraphs
 * - bullets: Array of strings for checkmark bullet lists (e.g. .NET)
 * - image: Next.js StaticImageData object or string image URL
 * - imageAlt: Alt text for visual element
 * - imageFit: 'cover' (full bleed showcase) | 'contain' (clean studio card for icons)
 * - children: Custom JSX if needed for specialized copy
 * - hiddenContent: Hidden JSX elements preserving SEO / CMS indexing keys
 */
const WhyChoose = ({
  highlightText = "Why Choose",
  titleRest = "",
  leadText = null,
  paragraph = null,
  paragraphs = null,
  bullets = null,
  image = null,
  imageAlt = "Technology Visual",
  imageFit = "contain",
  children = null,
  hiddenContent = null,
}) => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 md:py-24 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading with Hand-Drawn Circled Accent Word */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-[#111827] mb-10 sm:mb-14 leading-tight"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="relative inline-block px-4 py-1 text-[#41B349] mr-2 font-black">
            {highlightText}
            <HandDrawnOval />
          </span>
          {titleRest}
        </h2>

        {/* Main Card Container with green border & generous rounded corners */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border-2 border-[#41B349] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Formatted copy */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {children ? (
              children
            ) : paragraphs && Array.isArray(paragraphs) ? (
              paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[15px] sm:text-base md:text-[16.5px] text-[#2d3748] leading-relaxed font-normal"
                >
                  {p}
                </p>
              ))
            ) : (
              <>
                {paragraph && (
                  <p className="text-[15px] sm:text-base md:text-[16.5px] text-[#2d3748] leading-relaxed font-normal">
                    {leadText ? (
                      <>
                        <strong className="font-bold text-[#111827]">{leadText}</strong>
                        {typeof leadText === 'string' && (leadText.endsWith('.') || leadText.endsWith('!') || leadText.endsWith('?')) ? ' ' : ' — '}
                        {paragraph}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                )}
              </>
            )}

            {bullets && Array.isArray(bullets) && bullets.length > 0 && (
              <ul className="space-y-2.5 sm:space-y-3 pt-2">
                {bullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14.5px] sm:text-[15.5px] text-[#2d3748] leading-relaxed">
                    <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-[#41B349]/15 text-[#41B349] flex items-center justify-center font-bold">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column: Framed visual card with rounded corners & soft shadow */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-black/10 border border-gray-150 relative group flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
              {image && (
                imageFit === "cover" ? (
                  <Image
                    src={image}
                    alt={imageAlt}
                    priority
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6 sm:p-8">
                    {typeof image === 'string' ? (
                      <img
                        src={image}
                        alt={imageAlt}
                        className="max-h-[140px] md:max-h-[170px] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                      />
                    ) : (
                      <Image
                        src={image}
                        alt={imageAlt}
                        width={400}
                        height={400}
                        className="max-h-[140px] md:max-h-[170px] max-w-[80%] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Retain hidden SEO / CMS elements if provided */}
        {hiddenContent && (
          <div className="hidden" aria-hidden="true">
            {hiddenContent}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChoose;
