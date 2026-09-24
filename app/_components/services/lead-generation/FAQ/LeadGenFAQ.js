"use client";

import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const defaultLeadGenFaqs = [
  {
    question: "What makes a modern lead generation strategy truly successful?",
    answer: "A modern lead generation strategy does not rely on a single channel or flood your inbox with low-intent contact lists. Real commercial success requires a synchronized multi-channel ecosystem where Search, Paid Ads, Social Outreach, and Direct WhatsApp chat drive prospects into conversion-optimized landing pages, followed by automated BANT qualification and multi-touch nurturing. This ensures your sales team receives verified, sales-ready buyers rather than passive researchers."
  },
  {
    question: "How do you qualify leads before sending them to our sales team?",
    answer: "We implement the proven BANT qualification framework: Budget verification, Authority confirmation (economic decision-makers), Need validation (commercial pain points), and Timeline urgency. In addition, our automated WhatsApp and interactive questionnaire funnels screen each prospect in real time. Only leads meeting your pre-defined qualification threshold are tagged as Sales-Qualified Leads (SQLs) and routed to your sales reps or CRM."
  },
  {
    question: "Can you generate qualified leads for both B2B and B2C businesses?",
    answer: "Yes. For B2B enterprises and SaaS companies, we deploy targeted LinkedIn Sales Navigator prospecting, high-authority Google search ads, and personalized cold email sequences targeting C-level decision-makers. For B2C and high-ticket consumer services (real estate, private healthcare, legal, luxury services), we leverage Meta lead gen forms, localized Google Map Pack ads, and instant WhatsApp click-to-chat funnels."
  },
  {
    question: "How do WhatsApp and Push Notification marketing work together?",
    answer: "WhatsApp delivers an unbeatable 98% open rate and conversational immediacy. When a visitor submits an inquiry or taps a WhatsApp ad, an automated chatbot instantly confirms their request and qualifies them in seconds. Web and mobile push notifications work synergistically by re-engaging visitors who abandoned a form or announced an urgent service offer with a single tap, bringing warm buyers back into the active funnel."
  },
  {
    question: "What is the difference between local and global lead generation campaigns?",
    answer: "Local lead generation focuses on a defined city, metro area, or radius. It prioritizes Google Business Profile top-3 map pack rankings, localized 'near me' search terms, local community trust, and direct phone/WhatsApp calls. Global lead generation expands across international borders with multi-lingual ad copy, dynamic multi-currency landing pages, automated 24/7 timezone routing, and enterprise LinkedIn account-based marketing."
  },
  {
    question: "How quickly can we expect to start receiving qualified leads?",
    answer: "Paid advertising (Google Ads, Meta, LinkedIn) and WhatsApp direct-response funnels typically begin generating inbound inquiries within 3 to 7 business days of launch after initial tracking and ad approval. Organic search rankings (SEO) build compounding monthly pipeline over 60 to 90 days. We provide real-time dashboard analytics so you can track impressions, CPL, MQLs, and SQLs from day one."
  },
  {
    question: "Can you integrate leads directly with our CRM system?",
    answer: "Yes, we integrate seamlessly with HubSpot, Salesforce, Zoho, ActiveCampaign, Pipedrive, and custom ERP systems. New leads are synced in real time with complete attribution data, lead scores, and communication logs, enabling automated instant sales rep assignment via round-robin routing."
  },
  {
    question: "What kind of reporting and attribution do you provide?",
    answer: "We provide comprehensive real-time dashboards and weekly reports tracking key commercial performance indicators, including Cost Per Lead (CPL), Marketing Qualified Leads (MQLs), Sales Qualified Leads (SQLs), appointment attendance rates, and return on ad spend (ROAS), giving leadership total visibility."
  }
];

export default function LeadGenFAQ({ cmsContent }) {
  const title = getCmsVal(cmsContent, "Frequently Asked Questions (FAQs)", "leadgenfaq");
  const faqs = defaultLeadGenFaqs.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "leadgenfaq"),
    answer: getCmsVal(cmsContent, item.answer, "leadgenfaq"),
  }));

  return <Faq title={title} faqs={faqs} />;
}
