"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import WordpressIcon from "../../../../../components/Images/wordpressIcon.png";
import Flutter from "../../../../../components/Images/flutterIcon2.png";
import ReactIcon from "../../../../../components/Images/reactIcon.png";
import Laravel from "../../../../../components/Images/Laravalicon-1.png";
import JS from "../../../../../components/Images/jsic.png";

const iconsList = [
  { img: Laravel, name: "Laravel" },
  { img: WordpressIcon, name: "WordPress" },
  { img: JS, name: "JavaScript" },
  { img: Flutter, name: "Flutter" },
  { img: ReactIcon, name: "React" },
];

const SliderIcon = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeText, setFadeText] = useState(false);

  useEffect(() => {
    setFadeText(true);
  }, []);

  const moveTo = (index) => {
    setActiveIndex(index);
  };

  // Get exactly 4 visible icons starting from activeIndex
  const visibleIcons = Array.from({ length: 4 }, (_, i) => {
    return iconsList[(activeIndex + i) % iconsList.length];
  });

  return (
    <section className="bg-gradient-to-r from-[#f5f2f9] via-[#eeedf5] to-[#eae8f4] w-full py-12 md:py-16 font-sans overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">

        {/* HEADING */}
        <div className="mb-8 md:mb-12">
          <p
            className={`text-[#41b349] text-[15px] sm:text-[17px] font-medium transform transition-all duration-700 ${
              fadeText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            We are best
          </p>
          <h2
            className={`uppercase text-[26px] sm:text-[34px] md:text-[38px] text-[#1a1a1a] font-extrabold tracking-tight mt-1 transform transition-all duration-700 delay-200 ${
              fadeText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            TECHNOLOGIES WE USE
          </h2>
        </div>

        {/* EXACTLY 4 VISIBLE ICONS IN A SINGLE ROW */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-4 items-center justify-items-center">
          {visibleIcons.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center justify-center p-2 transition-all duration-500 hover:scale-105"
            >
              <Image
                src={item.img}
                alt={item.name}
                className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[165px] md:h-[165px] lg:w-[185px] lg:h-[185px] object-contain flex-shrink-0 drop-shadow-md"
                priority
              />
            </div>
          ))}
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex justify-center items-center gap-2.5 mt-8 md:mt-12">
          {iconsList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => moveTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "bg-[#181818] w-2.5 h-2.5 scale-125"
                  : "bg-gray-400/60 hover:bg-gray-600 w-2 h-2"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SliderIcon;
