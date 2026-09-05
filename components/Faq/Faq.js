"use client";
import React, { useState } from "react";

// Props: faqs = array of {question, answer}, title = string
const Faq = ({ faqs = [], title }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const list = Array.isArray(faqs) ? faqs : [];
  if (list.length === 0) return null;

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const mid = Math.ceil(list.length / 2);
  const leftFaqs = list.slice(0, mid);
  const rightFaqs = list.slice(mid);

  const formatTitle = () => {
    if (!title) {
      return (
        <>
          <span className="block">FREQUENTLY ASKED</span>
          <span className="block">QUESTIONS</span>
        </>
      );
    }
    const cleanTitle = title.replace(/\(FAQs\)/i, "").trim();
    if (cleanTitle.toLowerCase().includes("frequently asked questions")) {
      return (
        <>
          <span className="block">FREQUENTLY ASKED</span>
          <span className="block">QUESTIONS</span>
        </>
      );
    }
    return <span className="block uppercase">{title}</span>;
  };

  const renderFaqItem = (faq, index) => {
    const isOpen = openIndex === index;

    return (
      <div key={index} className="flex flex-col w-full">
        {/* Question Pill/Box */}
        <button
          type="button"
          onClick={() => toggleFAQ(index)}
          className={`w-full min-h-[54px] sm:min-h-[58px] flex items-center justify-between px-5 sm:px-6 py-3.5 rounded-[14px] sm:rounded-[16px] border-[1.5px] bg-white text-left transition-all duration-200 cursor-pointer ${
            isOpen
              ? "border-[#41B349] shadow-xs"
              : "border-[#1e4a2d] hover:border-[#41B349]"
          }`}
          aria-expanded={isOpen}
        >
          <span className="text-[13px] sm:text-[14px] md:text-[14.5px] font-medium sm:font-semibold text-[#1b4e2c] pr-3 leading-snug">
            {faq.question}
          </span>
          <span
            className={`text-lg sm:text-xl font-light text-[#1b4e2c] shrink-0 leading-none select-none transition-transform duration-300 ${
              isOpen ? "rotate-45 text-[#41B349]" : ""
            }`}
          >
            +
          </span>
        </button>

        {/* Answer (Appears Directly Underneath the Selected Box) */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[600px] opacity-100 py-3.5 px-5 sm:px-6 mb-1"
              : "max-h-0 opacity-0 py-0 px-5 sm:px-6 pointer-events-none"
          }`}
        >
          <p className="text-[13px] sm:text-[13.5px] md:text-[14px] text-[#2d4736] leading-relaxed font-normal">
            {faq.answer}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white select-none">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        {/* Centered Two-Line Header */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-[#164326] leading-[1.1] mb-10 sm:mb-14"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {formatTitle()}
        </h2>

        {/* 2-Column FAQ Grid (Left & Right Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {leftFaqs.map((faq, idx) => renderFaqItem(faq, idx))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {rightFaqs.map((faq, idx) => renderFaqItem(faq, mid + idx))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
