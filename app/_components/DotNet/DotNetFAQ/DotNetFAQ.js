"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const dotNetFaqsDefault = [
  {
    question: "What makes .NET suitable for enterprise applications?",
    answer: ".NET provides enterprise-grade security, high scalability, robust memory management, and long-term support from Microsoft, making it ideal for mission-critical business software."
  },
  {
    question: "Can .NET be used for mobile app development?",
    answer: "Yes, using .NET MAUI (Multi-platform App UI) and Xamarin, developers can build cross-platform native mobile applications for iOS and Android from a single C# codebase."
  },
  {
    question: "Is .NET cost-effective for SMEs and startups?",
    answer: "Absolutely. Reusable libraries, cross-platform capabilities, and rapid development reduce both time and cost."
  },
  {
    question: "How secure are .NET applications?",
    answer: ".NET includes built-in protection against cross-site scripting (XSS), SQL injection, CSRF, and data tampering, alongside role-based access control and strong encryption protocols."
  },
  {
    question: "Can your team develop custom .NET solutions for UAE businesses?",
    answer: "Yes, TechSolutionor builds custom, high-performance .NET applications tailored for UAE businesses and global enterprises, adhering to local compliance and security standards."
  }
];

export default function DotNetFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "netfaq");

  const faqs = dotNetFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "netfaq"),
    answer: getCmsVal(cmsContent, item.answer, "netfaq"),
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
