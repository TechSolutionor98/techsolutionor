"use client";

import React from "react";
import Faq from "@/components/Faq/Faq";

export const serviceFaqsData = {
  "graphic-design": [
    {
      question: "What graphic design services do you offer in Dubai and globally?",
      answer: "We offer comprehensive creative design services including brand identity and logo design, marketing collateral (brochures, flyers, business cards), social media graphics, digital banner ads, product packaging, UI/UX design, and corporate presentation decks.",
    },
    {
      question: "Do you create custom, original logo and brand designs?",
      answer: "Yes, 100% of our design work is custom-crafted from scratch based on thorough market research, competitor benchmarking, and your brand's unique positioning. We never use generic templates.",
    },
    {
      question: "What file formats will I receive upon project completion?",
      answer: "You receive industry-standard vector and raster files suitable for both print and digital use, including AI, EPS, SVG, PDF, high-res PNG, JPG, and web-optimized formats with full commercial ownership rights.",
    },
    {
      question: "How many design revisions are included in a project?",
      answer: "We provide structured iterative revision rounds (typically 3 to unlimited depending on package) to ensure the final creative deliverables exceed your expectations before final handover.",
    },
    {
      question: "Can you redesign our existing company branding?",
      answer: "Yes, we specialize in brand modernization and complete rebranding. We refresh outdated visual identities while preserving core brand equity and recognition.",
    },
    {
      question: "How long does a branding or graphic design project typically take?",
      answer: "Logo and basic brand identity packages typically take 5 to 7 business days, while comprehensive corporate branding or packaging suites take 2 to 3 weeks.",
    },
    {
      question: "Do you design UI/UX for websites and mobile applications?",
      answer: "Yes, our product designers create responsive wireframes, interactive Figma prototypes, design systems, and developer-ready UI kits for mobile apps and web platforms.",
    },
    {
      question: "How do we get started with a graphic design project?",
      answer: "Reach out via our quote modal or contact form with your design requirements. We'll schedule a discovery call and deliver a tailored creative brief and proposal.",
    },
  ],
  "social-media": [
    {
      question: "Which social media platforms do you manage?",
      answer: "We manage and grow business profiles across all major platforms, including LinkedIn, Instagram, Facebook, TikTok, X (Twitter), YouTube, and Pinterest.",
    },
    {
      question: "Do you create custom content, graphics, and videos for our posts?",
      answer: "Yes, our team creates engaging visual content, high-converting copy, carousel graphics, reels, short-form videos, and stories customized to your brand voice and platform algorithms.",
    },
    {
      question: "Can you handle both organic management and paid social ads?",
      answer: "Yes, we offer full-funnel social media marketing combining organic community building, daily engagement, and targeted paid advertising campaigns (Meta Ads, LinkedIn Ads, TikTok Ads).",
    },
    {
      question: "How do you track and report social media performance?",
      answer: "We provide detailed monthly analytics dashboards reporting reach, engagement rate, follower growth, click-through rates, lead generation, and ROAS with actionable strategic insights.",
    },
    {
      question: "Do you handle community management and comment replies?",
      answer: "Yes, our team actively monitors notifications, responds to customer comments, manages direct messages, and routes inquiries directly to your sales team.",
    },
    {
      question: "How frequently will you post content on our social channels?",
      answer: "Posting schedules are tailored to your industry and platform best practices, typically ranging from 3 to 7 posts per week including reels, carousels, and stories.",
    },
    {
      question: "How quickly can we expect to see social media growth?",
      answer: "Organic engagement and follower gains usually accelerate within 30 to 60 days, while paid advertising campaigns generate immediate impressions, clicks, and qualified leads within days.",
    },
  ],
  "hire-us": [
    {
      question: "How quickly can I hire and onboard dedicated developers?",
      answer: "We can deploy pre-vetted senior software engineers, frontend/backend developers, and mobile specialists to your project within 48 to 72 hours.",
    },
    {
      question: "What hiring and engagement models do you offer?",
      answer: "We offer flexible models including full-time dedicated talent, part-time staff augmentation, and fixed-price project teams tailored to your timeline and budget.",
    },
    {
      question: "Are your dedicated developers timezone-aligned?",
      answer: "Yes, our remote engineering teams work aligned with UAE (GST), European (CET), UK (GMT), and US (EST/PST) business hours with daily standups and instant Slack sync.",
    },
    {
      question: "How do you guarantee code quality and intellectual property protection?",
      answer: "All engagements include strict non-disclosure agreements (NDAs) and full IP ownership transfer to you. Our engineers adhere to enterprise coding standards and automated CI/CD code reviews.",
    },
    {
      question: "Can I scale the team up or down during the project?",
      answer: "Yes, our agile talent model allows you to scale team size up or down with standard 2-week notice, eliminating hiring overheads and long-term payroll liabilities.",
    },
  ],
};

export default function CommonFAQ({
  serviceKey = "graphic-design",
  title = "Frequently Asked Questions (FAQs)",
  faqs,
}) {
  const displayFaqs = faqs || serviceFaqsData[serviceKey] || serviceFaqsData["graphic-design"];
  return <Faq title={title} faqs={displayFaqs} />;
}
