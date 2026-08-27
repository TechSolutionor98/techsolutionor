"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

// Props: faqs = array of {question, answer}, title = string
const Faq = ({ faqs, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {title && (
          <h2 className="text-3xl md:text-3xl font-bold text-left mb-12 text-gray-900">
            {title}
          </h2>
        )}

        {/* FAQ LIST */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center gap-4 p-2 text-left focus:outline-none"
              >
                {/* PLUS / MINUS ICON */}
                <span className="text-xl">
                  {activeIndex === index ? (
                    <FiMinus className="text-gray-900" /> // ✅ minus ka alag color
                  ) : (
                    <FiPlus className="text-[#41B349]" /> // plus ka original color
                  )}
                </span>

                {/* QUESTION TEXT */}
                <span
                  className={`text-lg font-semibold ${
                    activeIndex === index ? "text-gray-900" : "text-[#41B349]"
                  }`}
                >
                  {faq.question}
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out transform ${
                  activeIndex === index
                    ? "max-h-96 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-1"
                }`}
              >
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
