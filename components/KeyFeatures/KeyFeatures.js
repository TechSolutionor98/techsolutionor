"use client";
import React from "react";

/**
 * Reusable KeyFeatures Component (Table-Style Layout matching reference design)
 * Props:
 * - title: string (e.g. "Key Features" or "NO RISK.")
 * - subtitle: string (e.g. "ONLY RESULTS.")
 * - columns: array of column names (defaults to ['Speed', 'Flexible', 'Quality', 'Scalable', 'Cost-Effective'])
 * - features: array of { title, desc, checks? }
 */
const KeyFeatures = ({
  title = "NO RISK.",
  subtitle = "ONLY RESULTS.",
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
          <span className="block">NO RISK.</span>
          <span className="block">ONLY RESULTS.</span>
        </>
      );
    }
    return (
      <>
        <span className="block">{title}</span>
        {subtitle && <span className="block">{subtitle}</span>}
      </>
    );
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Two-Line Header */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-[#164326] uppercase leading-[1.1] mb-10 sm:mb-14"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {formatTitle()}
        </h2>

        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[680px] md:min-w-0">
            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-2 px-6 sm:px-8 pb-3 items-end">
              {/* Left empty space above feature titles */}
              <div className="col-span-6 sm:col-span-6" />

              {/* 5 Column Metric Headers in Script / Italic */}
              <div className="col-span-6 sm:col-span-6 grid grid-cols-5 text-center">
                {columns.map((col, idx) => (
                  <span
                    key={idx}
                    className="italic font-serif text-[12.5px] sm:text-[14px] font-medium text-[#1b4e2c] tracking-wide"
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
                        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide leading-tight">
                          {item.title}
                        </h3>
                        {item.desc && (
                          <p className="text-xs sm:text-sm text-white/90 font-normal mt-1 leading-relaxed max-w-sm">
                            {item.desc}
                          </p>
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
                      <h3 className="text-base sm:text-lg font-black uppercase text-[#1b4e2c] tracking-wide leading-tight">
                        {item.title}
                      </h3>
                      {item.desc && (
                        <p className="text-xs sm:text-sm text-[#4B5563] font-normal mt-1 leading-relaxed max-w-sm">
                          {item.desc}
                        </p>
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
