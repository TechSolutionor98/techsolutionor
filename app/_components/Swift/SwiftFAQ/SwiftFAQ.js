"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const swiftFaqsDefault = [
  {
    question: "What is Swift used for?",
    answer: "Swift is used to develop apps across Apple platforms, including iOS, macOS, watchOS, and tvOS. It is ideal for building high-performance, secure, and modern applications."
  },
  {
    question: "Why should I use Swift for iOS development?",
    answer: "Swift offers high performance, modern syntax, memory safety, and native integration with Apple APIs, making it the best choice for iOS app development."
  },
  {
    question: "Is Swift beginner-friendly?",
    answer: "Yes, Swift was designed to be easy to learn with clean syntax, interactive Swift Playgrounds, and clear error feedback for new developers."
  },
  {
    question: "Can Swift be used with Objective-C code?",
    answer: "Yes, Swift offers seamless two-way interoperability with Objective-C, allowing developers to integrate Swift into existing codebases gradually."
  },
  {
    question: "Is Swift safe for production apps?",
    answer: "Yes, Swift includes modern memory management, optionals, and strong static typing to prevent runtime crashes and ensure enterprise-grade stability."
  },
  {
    question: "Can Swift be used for macOS, watchOS, and tvOS apps?",
    answer: "Yes, Swift supports cross-platform Apple development, enabling unified codebases for iOS, macOS, watchOS, tvOS, and visionOS."
  },
  {
    question: "How does Swift improve development efficiency?",
    answer: "Swift’s concise syntax, fast compilation, rich Apple frameworks, and Xcode tooling significantly reduce code footprint and speed up development."
  },
  {
    question: "Does Swift have strong community support?",
    answer: "Yes, Swift is open-source with an active global community, rich third-party library ecosystem (Swift Package Manager), and extensive documentation."
  }
];

export default function SwiftFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "swiftfaq");

  const faqs = swiftFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "swiftfaq"),
    answer: getCmsVal(cmsContent, item.answer, "swiftfaq"),
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
