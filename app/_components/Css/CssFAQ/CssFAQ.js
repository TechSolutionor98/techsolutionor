"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const cssFaqsDefault = [
  {
    question: "What is CSS used for?",
    answer: "CSS (Cascading Style Sheets) is used to style and design websites, controlling layouts, colors, typography, animations, and responsive behavior across devices."
  },
  {
    question: "Why is CSS important for web design?",
    answer: "CSS separates website presentation from structural content, enabling responsive layouts, visual design consistency, and faster page load speeds."
  },
  {
    question: "What are CSS Grid and Flexbox?",
    answer: "Flexbox is a one-dimensional layout system ideal for alignment along rows or columns, while CSS Grid is a two-dimensional layout engine for complex page layouts."
  },
  {
    question: "Is CSS responsive?",
    answer: "Yes, CSS uses media queries, fluid units (rem, %, vh/vw), and modern layout modules to create responsive designs for screens of all sizes."
  },
  {
    question: "Can CSS animations be used in websites?",
    answer: "Yes, CSS supports transitions and keyframe animations for smooth, hardware-accelerated visual effects without JavaScript."
  },
  {
    question: "Does CSS work across all browsers?",
    answer: "Yes, modern CSS features are universally supported by modern browsers (Chrome, Safari, Firefox, Edge)."
  }
];

export default function CssFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "cssfaq");

  const faqs = cssFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "cssfaq"),
    answer: getCmsVal(cmsContent, item.answer, "cssfaq"),
  }));

  return (
    <div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
      <Faq title={sectionTitle} faqs={faqs} />
    </div>
  );
}
