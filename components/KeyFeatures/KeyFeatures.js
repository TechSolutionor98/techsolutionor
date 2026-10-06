"use client";
import React from "react";
import { SectionBadge, SectionHeading, HighlightWord, CardHeading, CardParagraph } from "@/components/Typography";

/**
 * Reusable KeyFeatures Component (Table-Style Layout matching reference design)
 * Props:
 * - title: string (e.g. "Key Features" or "NO RISK.")
 * - subtitle: string (e.g. "ONLY RESULTS.")
 * - badge: string (e.g. "HOW WE DELIVER")
 * - columns: array of column names (defaults to ['Speed', 'Flexible', 'Quality', 'Scalable', 'Cost-Effective'])
 * - features: array of { title, desc, checks? }
 */
const KeyFeatures = ({
  title = "NO RISK.",
  subtitle = "ONLY RESULTS.",
  badge = "HOW WE DELIVER",
  columns = ["Speed", "Flexible", "Quality", "Scalable", "Cost-Effective"],
  features = [],
}) => {
  const list = Array.isArray(features) ? features : [];
  if (list.length === 0) return null;

  // Pattern of checks and crosses exactly matching the reference screenshot:
  // Row 1 (Winner/Featured): All checks
  // Row 2: ✕, ✕, ✓, ✓, ✕
  // Row 3: ✕, ✕, ✓, ✓, ✕
  // Row 4: ✕, ✕, ✓, ✓, ✓
  const defaultPattern = [
    [true, true, true, true, true],
    [false, false, true, true, false],
    [false, false, true, true, false],
    [false, false, true, true, true],
  ];

  const getRowChecks = (item, index) => {
    if (Array.isArray(item.checks)) return item.checks;
    return defaultPattern[index % defaultPattern.length] || [true, true, true, true, true];
  };

  const formatTitle = () => {
    if (!title || title.trim().toLowerCase() === "key features") {
      return (
        <>
          <span className="block text-[#0D0F12]">NO RISK.</span>
          <HighlightWord className="block">ONLY RESULTS.</HighlightWord>
        </>
      );
    }
    return (
      <>
        <span className="block text-[#0D0F12]">{title}</span>
        {subtitle && <HighlightWord className="block">{subtitle}</HighlightWord>}
      </>
    );
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Pill Badge */}
        {badge && (
          <div className="flex justify-center mb-3">
            <SectionBadge variant="light">
              {badge}
            </SectionBadge>
          </div>
        )}

        {/* Centered Two-Line Header */}
        <SectionHeading
          as="h2"
          size="section"
          className="text-center mb-10 sm:mb-14"
        >
          {formatTitle()}
        </SectionHeading>

        {/* Responsive Table Wrapper */}
        <div 
          className="w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="min-w-[680px] md:min-w-0">
            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-2 px-6 sm:px-8 pb-3 items-end">
              {/* Left empty space above feature titles */}
              <div className="col-span-6 sm:col-span-6" />

              {/* 5 Column Metric Headers */}
              <div className="col-span-6 sm:col-span-6 grid grid-cols-5 text-center">
                {columns.map((col, idx) => (
                  <span
                    key={idx}
                    className="font-jakarta text-[12.5px] sm:text-[14px] font-semibold text-[#164326] uppercase tracking-wider whitespace-nowrap block"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {list.map((item, index) => {
                const isFeatured = index === 0;
                const rowChecks = getRowChecks(item, index);

                if (isFeatured) {
                  // Top Row (Dark Green Capsule Banner)
                  return (
                    <div
                      key={index}
                      className="bg-[#1b4e2c] text-white rounded-[16px] sm:rounded-[20px] px-6 sm:px-8 py-5 sm:py-6 shadow-md grid grid-cols-12 gap-2 items-center mb-1"
                    >
                      {/* Left: Feature Title & Description */}
                      <div className="col-span-6 sm:col-span-6 pr-4">
                        <CardHeading
                          as="h3"
                          size="md"
                          theme="light"
                          className="text-[19px] sm:text-[21px] md:text-[22px] font-display uppercase tracking-tight text-white leading-snug"
                        >
                          {item.title}
                        </CardHeading>
                        {item.desc && (
                          <CardParagraph
                            size="sm"
                            theme="light"
                            className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-white/95 mt-2 leading-relaxed max-w-xl font-jakarta font-normal tracking-[-0.01em]"
                          >
                            {item.desc}
                          </CardParagraph>
                        )}
                      </div>

                      {/* Right: 5 Checkmarks */}
                      <div className="col-span-6 sm:col-span-6 grid grid-cols-5 text-center items-center">
                        {columns.map((_, colIdx) => (
                          <div key={colIdx} className="flex items-center justify-center">
                            {rowChecks[colIdx] ? (
                              <svg
                                className="w-5 h-5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 text-white/80"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Subsequent Rows (Clean White Background with Divider)
                return (
                  <div
                    key={index}
                    className="border-b border-gray-200/80 px-6 sm:px-8 py-5 sm:py-6 grid grid-cols-12 gap-2 items-center bg-white transition-colors duration-150 hover:bg-[#F9FAF9]"
                  >
                    {/* Left: Feature Title & Description */}
                    <div className="col-span-6 sm:col-span-6 pr-4">
                      <CardHeading
                        as="h3"
                        size="sm"
                        theme="dark"
                        className="text-[17px] sm:text-[19px] md:text-[20px] font-display uppercase tracking-tight text-[#164326] leading-snug"
                      >
                        {item.title}
                      </CardHeading>
                      {item.desc && (
                        <CardParagraph
                          size="sm"
                          theme="slate"
                          className="text-[13.5px] sm:text-[14.5px] md:text-[15px] text-[#4A5568] mt-2 leading-relaxed max-w-xl font-jakarta font-normal tracking-[-0.01em]"
                        >
                          {item.desc}
                        </CardParagraph>
                      )}
                    </div>

                    {/* Right: Checkmarks / Crosses */}
                    <div className="col-span-6 sm:col-span-6 grid grid-cols-5 text-center items-center">
                      {columns.map((_, colIdx) => {
                        const isChecked = rowChecks[colIdx];

                        return (
                          <div key={colIdx} className="flex items-center justify-center">
                            {isChecked ? (
                              <svg
                                className="w-5 h-5 text-[#1b4e2c]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 text-[#1b4e2c]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
