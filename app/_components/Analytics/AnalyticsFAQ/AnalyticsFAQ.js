"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const analyticsFaqsDefault = [
  {
    question: "What is Google Analytics?",
    answer: "Google Analytics is a web analytics tool that provides insights into website traffic, user behavior, and marketing performance to help businesses make data-driven decisions."
  },
  {
    question: "How does Google Analytics track website visitors?",
    answer: "Google Analytics tracks visitors by inserting a small JavaScript tracking code into web pages, which collects user interaction data and transmits it to Google servers."
  },
  {
    question: "Can Google Analytics help improve website performance?",
    answer: "Yes, by analyzing bounce rates, page load speeds, exit pages, and user navigation paths, businesses can identify friction points and optimize site performance."
  },
  {
    question: "What is conversion tracking in Google Analytics?",
    answer: "Conversion tracking measures specific user actions, such as form submissions, product purchases, downloads, or sign-ups, evaluating campaign effectiveness and ROI."
  },
  {
    question: "Does Google Analytics integrate with Google Ads?",
    answer: "Yes, Google Analytics integrates seamlessly with Google Ads to share audience lists, track post-click ad performance, and optimize ad spend efficiency."
  },
  {
    question: "Is Google Analytics free to use?",
    answer: "Yes, standard Google Analytics (GA4) is free for all website owners, while Google Analytics 360 is available for large enterprise data volume requirements."
  }
];

export default function AnalyticsFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "analyticsfaq");

  const faqs = analyticsFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "analyticsfaq"),
    answer: getCmsVal(cmsContent, item.answer, "analyticsfaq"),
  }));

  return (
    <div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {analyticsFaqsDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
      <Faq title={sectionTitle} faqs={faqs} />
    </div>
  );
}
