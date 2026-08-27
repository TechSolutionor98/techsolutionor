"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";

const ecommerceFaqs = [
  {
    question: "What ecommerce development services do you offer?",
    answer: "We offer end-to-end ecommerce development services including custom ecommerce platforms, online store design, payment gateway integration, shopping cart development, SEO-optimized product pages and ongoing maintenance, all tailored for businesses in the UAE and worldwide."
  },
  {
    question: "Which ecommerce platforms do you work with?",
    answer: "Our team builds ecommerce solutions on popular platforms such as Shopify, WooCommerce, Magento, Wix, BigCommerce and custom PHP or framework‑based stores, depending on your needs, budget and scalability goals."
  },
  {
    question: "Can you integrate secure payment gateways?",
    answer: "Yes, we integrate secure and reliable payment gateways like Stripe, PayPal, Telr, Network International, PayTabs and others to ensure safe, smooth transaction processing."
  },
  {
    question: "How long does it take to build an ecommerce store?",
    answer: "The timeline depends on project complexity and requirements. A standard store can take 2-4 weeks, while complex enterprise platforms may take 6-12 weeks."
  },
  {
    question: "Do you provide ecommerce SEO services?",
    answer: "Yes, all our ecommerce development packages include SEO best practices, structured data, optimized product descriptions and metadata to help your store rank higher on Google."
  },
  {
    question: "Will the ecommerce website be mobile responsive?",
    answer: "Absolutely. Every ecommerce store we build is fully responsive, optimized for mobile devices, tablets and desktops to deliver a seamless shopping experience everywhere."
  },
  {
    question: "Can you help with migration from one ecommerce platform to another?",
    answer: "Yes, we provide complete platform migration services, securely transferring your products, customer data, order history and SEO rankings without downtime."
  },
  {
    question: "Do you provide post‑launch support and maintenance?",
    answer: "Yes, we offer ongoing maintenance, security updates, feature additions and 24/7 technical support to keep your store running efficiently."
  },
  {
    question: "What makes your ecommerce development services unique?",
    answer: "We combine custom UX design, high-converting checkout flows, agile delivery and localized UAE market expertise with transparent pricing and dedicated long-term support."
  },
  {
    question: "How much does ecommerce development cost?",
    answer: "Costs vary based on features, platform choice and custom functionality. Contact us for a free quote tailored to your specific requirements."
  }
];

export default function EcommerceFAQ() {
  return <Faq title="Frequently Asked Questions (FAQs)" faqs={ecommerceFaqs} />;
}
