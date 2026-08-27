"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const shopifyFaqsDefault = [
  {
    question: "What is Shopify used for?",
    answer: "Shopify is used to create and manage online stores, enabling businesses to sell products across websites, social media, marketplaces, and in-person with a POS system."
  },
  {
    question: "Is Shopify beginner-friendly?",
    answer: "Yes, Shopify provides a drag-and-drop store builder, intuitive product dashboards, and comprehensive guides designed for non-technical users."
  },
  {
    question: "Can Shopify handle large online stores?",
    answer: "Yes, Shopify Plus powers high-volume enterprise merchants with unlimited bandwidth, custom checkout scripts, and advanced B2B ecommerce tools."
  },
  {
    question: "Does Shopify support mobile shopping?",
    answer: "Yes, all Shopify themes are mobile-first responsive with built-in Apple Pay, Google Pay, and Shop Pay for frictionless mobile checkout."
  },
  {
    question: "How secure is Shopify?",
    answer: "Shopify is Level 1 PCI DSS compliant with 256-bit SSL encryption, automated backups, and 99.99% server uptime security."
  },
  {
    question: "What features does Shopify offer for inventory management?",
    answer: "Shopify provides real-time stock tracking, variant management, automated low-stock alerts, multi-location inventory syncing, and barcode scanning."
  },
  {
    question: "Can Shopify integrate with other sales channels?",
    answer: "Yes, Shopify seamlessly integrates with Instagram, Facebook, TikTok, Amazon, eBay, Pinterest, and Google Shopping."
  }
];

export default function ShopifyFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "shopifyfaq");

  const faqs = shopifyFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "shopifyfaq"),
    answer: getCmsVal(cmsContent, item.answer, "shopifyfaq"),
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
