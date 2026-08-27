"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const htmlFaqsDefault = [
  {
    question: "What is HTML used for?",
    answer: "HTML (HyperText Markup Language) is used to structure and display content on the web, providing the foundation for web pages and web applications."
  },
  {
    question: "Why is HTML important for websites?",
    answer: "HTML forms the core backbone of web development, defining page elements, hierarchy, text formatting, media embedding, and structural layout."
  },
  {
    question: "What are the main features of HTML5?",
    answer: "HTML5 introduced semantic tags (header, footer, nav, article), native audio/video support, responsive canvas elements, offline storage, and improved web forms."
  },
  {
    question: "How does HTML affect SEO?",
    answer: "Proper semantic HTML tags, heading hierarchies, meta tags, and alt attributes help search engine crawlers understand and index web content effectively."
  },
  {
    question: "Is HTML beginner-friendly?",
    answer: "Yes, HTML features straightforward human-readable syntax and tag structures, making it the easiest entry point for learning web development."
  },
  {
    question: "Can HTML work with CSS and JavaScript?",
    answer: "Yes, HTML provides the structure, CSS styles the appearance, and JavaScript adds interactivity, working together seamlessly as the web core stack."
  },
  {
    question: "Is HTML accessible for all users?",
    answer: "Yes, structured semantic HTML and ARIA attributes ensure screen readers and assistive devices can accurately interpret page content for all users."
  },
  {
    question: "Can HTML create forms and navigation?",
    answer: "Yes, HTML provides rich form controls (inputs, dropdowns, checkboxes) and anchor tags for structured navigation menus and user input."
  }
];

export default function HtmlFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "htmlfaq");

  const faqs = htmlFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "htmlfaq"),
    answer: getCmsVal(cmsContent, item.answer, "htmlfaq"),
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
