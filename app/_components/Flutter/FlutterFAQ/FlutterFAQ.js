"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const flutterFaqsDefault = [
  {
    question: "What is Flutter used for?",
    answer: "Flutter is used to develop cross-platform applications for mobile, web, and desktop using a single codebase, saving time and effort."
  },
  {
    question: "Why choose Flutter for app development?",
    answer: "Flutter delivers native-like performance, fast development cycles with Hot Reload, beautiful customizable UIs, and cost efficiency across iOS and Android."
  },
  {
    question: "Does Flutter support hot reload?",
    answer: "Yes, Flutter supports Hot Reload, allowing developers to immediately see code changes reflected on emulators or real devices without losing application state."
  },
  {
    question: "Can Flutter handle complex UI designs?",
    answer: "Yes, Flutter's layered rendering engine and rich widget ecosystem enable intricate, animated, and fully customized design interfaces."
  },
  {
    question: "Is Flutter suitable for both mobile and web apps?",
    answer: "Yes, Flutter compiles code into native machine code for iOS, Android, web browsers, and desktop platforms seamlessly."
  },
  {
    question: "How scalable is Flutter for large projects?",
    answer: "Flutter is highly scalable and widely used by tech leaders like Google, Alibaba, and eBay to power enterprise applications serving millions of users."
  }
];

export default function FlutterFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "flutterfaq");

  const faqs = flutterFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "flutterfaq"),
    answer: getCmsVal(cmsContent, item.answer, "flutterfaq"),
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
