"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const magentoFaqsDefault = [
  {
    question: "What is Magento used for?",
    answer: "Magento is used to build and manage e-commerce websites, especially for businesses that need customizable, scalable online stores."
  },
  {
    question: "Why choose Magento for e-commerce?",
    answer: "Magento offers unmatched flexibility, open-source customization, multi-store management, and enterprise-level scalability for complex online stores."
  },
  {
    question: "Can Magento handle multiple storefronts?",
    answer: "Yes, Magento allows you to manage multiple online stores, brands, and international domains from a single admin panel."
  },
  {
    question: "Is Magento mobile-friendly?",
    answer: "Yes, Magento includes responsive themes, Progressive Web App (PWA) Studio, and touch-optimized mobile checkout capabilities."
  },
  {
    question: "Does Magento support third-party integrations?",
    answer: "Yes, Magento provides extensive APIs (REST and GraphQL) to seamlessly connect with ERP, CRM, payment gateways, and shipping services."
  },
  {
    question: "How scalable is Magento?",
    answer: "Magento easily scales to support thousands of transactions per hour, millions of SKUs, and heavy peak traffic spikes."
  },
  {
    question: "Does Magento have strong community support?",
    answer: "Yes, Magento has a global ecosystem of thousands of certified developers, agency partners, and extensive extension marketplaces."
  }
];

export default function MagentoFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "magentofaq");

  const faqs = magentoFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "magentofaq"),
    answer: getCmsVal(cmsContent, item.answer, "magentofaq"),
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
