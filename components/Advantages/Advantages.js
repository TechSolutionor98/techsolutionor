"use client";
import React from "react";

// Sparkle Star 4-point SVG path generator
const SparkleStar = ({ cx, cy, r, className = "" }) => (
  <path
    d={`M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`}
    fill="#F9B800"
    className={className}
  />
);

// Illustration 1: Ticket / Badge with circular green backdrop & sparkle stars
const GraphicOne = () => (
  <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm select-none">
      {/* Background Circle */}
      <circle cx="80" cy="80" r="48" fill="#41B349" />

      {/* Golden Sparkles */}
      <SparkleStar cx={26} cy={26} r={15} />
      <SparkleStar cx={136} cy={122} r={8} />

      {/* Tilted Ticket */}
      <g transform="rotate(-10 80 80)">
        {/* Left Stub with Jagged Edge */}
        <path
          d="M 22 54 L 19 58 L 22 62 L 19 66 L 22 70 L 19 74 L 22 78 L 19 82 L 22 86 L 19 90 L 22 94 L 19 98 L 22 102 L 19 106 H 52 V 54 Z"
          fill="#164326"
          stroke="#164326"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Vertical Number on Stub */}
        <text
          x="-80"
          y="39"
          transform="rotate(-90)"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="11"
          fill="#FFFFFF"
          letterSpacing="1.5"
        >
          3499
        </text>

        {/* Right Ticket Body */}
        <path
          d="M 52 54 H 137 L 140 58 L 137 62 L 140 66 L 137 70 L 140 74 L 137 78 L 140 82 L 137 86 L 140 90 L 137 94 L 140 98 L 137 102 L 140 106 H 52 Z"
          fill="#FFFFFF"
          stroke="#164326"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Perforated Separator Line */}
        <line
          x1="52"
          y1="54"
          x2="52"
          y2="106"
          stroke="#164326"
          strokeWidth="2"
          strokeDasharray="3 3"
        />

        {/* Script Brand Text */}
        <text
          x="95"
          y="77"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="16"
          fill="#164326"
        >
          Reely
        </text>

        {/* 5 Rating Stars */}
        <text
          x="95"
          y="93"
          textAnchor="middle"
          fontSize="10"
          fill="#F9B800"
          letterSpacing="2.5"
        >
          ★★★★★
        </text>
      </g>
    </svg>
  </div>
);

// Illustration 2: Clapperboard / Execution Slate with striped stick
const GraphicTwo = () => (
  <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm select-none">
      <defs>
        {/* Striped Pattern for Clapper sticks */}
        <pattern id="clapperStripes" width="16" height="16" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="16" stroke="#164326" strokeWidth="8" />
          <line x1="8" y1="0" x2="8" y2="16" stroke="#FFFFFF" strokeWidth="8" />
        </pattern>
      </defs>

      {/* Background Circle */}
      <circle cx="80" cy="80" r="48" fill="#41B349" />

      {/* Golden Sparkles */}
      <SparkleStar cx={26} cy={24} r={15} />
      <SparkleStar cx={136} cy={122} r={8} />

      {/* Tilted Clapperboard Group */}
      <g transform="rotate(10 80 80)">
        {/* Open Top Angled Clapper Stick */}
        <g transform="rotate(-16 35 55)">
          <rect
            x="34"
            y="42"
            width="92"
            height="13"
            rx="2"
            fill="url(#clapperStripes)"
            stroke="#164326"
            strokeWidth="2"
          />
        </g>

        {/* Slate Bottom Body */}
        <rect
          x="34"
          y="62"
          width="92"
          height="50"
          rx="3"
          fill="#FFFFFF"
          stroke="#164326"
          strokeWidth="2.5"
        />

        {/* Lower Clapper Striped Bar */}
        <rect
          x="34"
          y="55"
          width="92"
          height="11"
          rx="1"
          fill="url(#clapperStripes)"
          stroke="#164326"
          strokeWidth="2"
        />

        {/* Pivot Hinge Pin */}
        <circle cx="38" cy="58" r="2.5" fill="#164326" />

        {/* ACTION! Text */}
        <text
          x="80"
          y="90"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="14"
          fill="#164326"
          letterSpacing="1.5"
        >
          ACTION!
        </text>

        {/* Sub-line underneath ACTION */}
        <line
          x1="58"
          y1="96"
          x2="102"
          y2="96"
          stroke="#41B349"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  </div>
);

// Illustration 3: Film Strip / Countdown Reel Frame
const GraphicThree = () => (
  <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm select-none">
      {/* Background Circle */}
      <circle cx="80" cy="80" r="48" fill="#41B349" />

      {/* Golden Sparkles */}
      <SparkleStar cx={24} cy={26} r={15} />
      <SparkleStar cx={135} cy={116} r={9} />
      <SparkleStar cx={144} cy={126} r={5} />

      {/* Film Strip Frame */}
      <g>
        {/* Main Reel Card */}
        <rect
          x="32"
          y="42"
          width="96"
          height="76"
          rx="4"
          fill="#FFFFFF"
          stroke="#164326"
          strokeWidth="2.5"
        />

        {/* Left Track Divider */}
        <line x1="44" y1="42" x2="44" y2="118" stroke="#164326" strokeWidth="1.5" />
        {/* Left Perforations */}
        <rect x="35" y="47" width="6" height="5" rx="1" fill="#164326" />
        <rect x="35" y="59" width="6" height="5" rx="1" fill="#164326" />
        <rect x="35" y="71" width="6" height="5" rx="1" fill="#164326" />
        <rect x="35" y="83" width="6" height="5" rx="1" fill="#164326" />
        <rect x="35" y="95" width="6" height="5" rx="1" fill="#164326" />
        <rect x="35" y="107" width="6" height="5" rx="1" fill="#164326" />

        {/* Right Track Divider */}
        <line x1="116" y1="42" x2="116" y2="118" stroke="#164326" strokeWidth="1.5" />
        {/* Right Perforations */}
        <rect x="119" y="47" width="6" height="5" rx="1" fill="#164326" />
        <rect x="119" y="59" width="6" height="5" rx="1" fill="#164326" />
        <rect x="119" y="71" width="6" height="5" rx="1" fill="#164326" />
        <rect x="119" y="83" width="6" height="5" rx="1" fill="#164326" />
        <rect x="119" y="95" width="6" height="5" rx="1" fill="#164326" />
        <rect x="119" y="107" width="6" height="5" rx="1" fill="#164326" />

        {/* Countdown Center Circle Leader */}
        <circle cx="80" cy="80" r="24" fill="none" stroke="#164326" strokeWidth="1.8" />
        <line x1="80" y1="52" x2="80" y2="108" stroke="#164326" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="52" y1="80" x2="108" y2="80" stroke="#164326" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="80" cy="80" r="16" fill="none" stroke="#164326" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="10" fill="#164326" />
        <text
          x="80"
          y="84.5"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="12"
          fill="#FFFFFF"
        >
          1
        </text>
      </g>
    </svg>
  </div>
);

const graphics = [GraphicOne, GraphicTwo, GraphicThree];

/**
 * Reusable Advantages Component
 * Matching reference layout: 3-column illustrated vertical stack with circular backdrops,
 * clean typography, and zero boxy container borders.
 */
const Advantages = ({
  title = "Advantages",
  subtitle = "Delivering the flexibility, performance, and engineering reliability that modern enterprises need to scale.",
  items = [],
}) => {
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-[#164326] uppercase leading-[1.1]"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#4B5563] text-center max-w-xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        )}

        {/* 3-Column Illustrated Stack */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {list.map((item, index) => {
            const GraphicComponent = graphics[index % graphics.length];

            return (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Top Illustration with Circle & Sparkles */}
                <GraphicComponent />

                {/* Advantage Title */}
                <h3 className="mt-6 sm:mt-8 text-base sm:text-lg font-black text-[#111827] uppercase tracking-wide">
                  {item.title}
                </h3>

                {/* Advantage Description */}
                {item.desc && (
                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-[280px] mx-auto font-normal">
                    {item.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
