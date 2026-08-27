"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const googleFaqsDefault = [
  {
    question: "What is Google Ads?",
    answer: "Google Ads is a digital advertising platform that allows businesses to run targeted, pay-per-click campaigns across Google Search, Display, YouTube, and Shopping networks to reach potential customers."
  },
  {
    question: "How does Google Ads work?",
    answer: "Google Ads operates on an auction model where advertisers bid on keywords. Ads appear in search results or on partner websites when users search for or view relevant topics."
  },
  {
    question: "What types of ads can I run on Google Ads?",
    answer: "You can run Search ads, Display network ads, Video ads (YouTube), Shopping ads, App promotion ads, and Performance Max multi-channel campaigns."
  },
  {
    question: "Can Google Ads improve website traffic?",
    answer: "Yes, Google Ads places your website at the top of search engine results pages and targeted web properties, driving immediate high-intent traffic to your landing pages."
  },
  {
    question: "Is Google Ads cost-effective?",
    answer: "Yes, Google Ads uses a pay-per-click model, meaning you only pay when users click your ad. You have full control over daily budgets and bidding limits."
  },
  {
    question: "Can I track my Google Ads performance?",
    answer: "Yes, Google Ads provides detailed reporting tools and conversion tracking metrics to monitor clicks, impressions, conversion rates, cost-per-acquisition (CPA), and overall ROI."
  }
];

export default function GoogleFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "googlefaq");

  const faqs = googleFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "googlefaq"),
    answer: getCmsVal(cmsContent, item.answer, "googlefaq"),
  }));

  return (
    <div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {googleFaqsDefault.map((item, idx) => (
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
