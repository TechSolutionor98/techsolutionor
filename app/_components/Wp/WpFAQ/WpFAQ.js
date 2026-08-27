"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const wpFaqsDefault = [
  {
    question: "What is WordPress used for?",
    answer: "WordPress is used to create websites and manage content, ranging from blogs and portfolios to e-commerce stores and enterprise websites."
  },
  {
    question: "Why is WordPress so popular?",
    answer: "WordPress powers over 40% of the web due to its user-friendly dashboard, open-source ecosystem, vast library of themes/plugins, and active community."
  },
  {
    question: "Can WordPress be used for e-commerce websites?",
    answer: "Yes, using plugins like WooCommerce, WordPress transforms into a full-featured e-commerce platform for selling physical and digital products."
  },
  {
    question: "Is WordPress beginner-friendly?",
    answer: "Yes, WordPress features an intuitive block editor (Gutenberg) that allows anyone to publish content and customize layouts without writing code."
  },
  {
    question: "How secure is WordPress?",
    answer: "WordPress core receives constant security updates, and when paired with SSL, strong hosting, and top security plugins, it is enterprise-grade secure."
  },
  {
    question: "What are WordPress themes and plugins?",
    answer: "Themes control your website's visual design and layout, while plugins add functional features like SEO tools, contact forms, and security shields."
  },
  {
    question: "Can WordPress handle large websites?",
    answer: "Yes, major enterprise media and corporate sites (like Sony Music, BBC America, and TechCrunch) run on scaled WordPress infrastructure."
  }
];

export default function WpFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "wpfaq");

  const faqs = wpFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "wpfaq"),
    answer: getCmsVal(cmsContent, item.answer, "wpfaq"),
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
