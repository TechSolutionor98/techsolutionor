"use client";

import React from "react";
import HireUs from "@/app/_components/services/eCommerce-developement/HireUs/HireUs";

export const servicesHireUsData = {
  "web-development": {
    badge: "READY TO SCALE YOUR BUSINESS?",
    line1: "Ready to scale your digital presence?",
    line2: "Hire the TechSolutionor team to handle your project.",
    buttonText: "Hire Us",
  },
  "app-development": {
    badge: "READY TO BUILD YOUR NEXT MOBILE APP?",
    line1: "Ready to scale your mobile presence in Dubai and across the UAE?",
    line2: "Hire Tech Solutionor to take your app from concept to launch.",
    buttonText: "Hire Us",
  },
  "software-development": {
    badge: "ENTERPRISE SOFTWARE ENGINEERING",
    line1: "Ready to engineer custom software for your enterprise?",
    line2: "Hire Tech Solutionor for scalable, mission-critical systems.",
    buttonText: "Hire Us",
  },
  "ecommerce-development": {
    badge: "SCALE YOUR ONLINE REVENUE",
    line1: "Ready to launch or scale your high-converting eCommerce store?",
    line2: "Hire Tech Solutionor for omnichannel commerce that drives sales.",
    buttonText: "Hire Us",
  },
  "graphic-design": {
    badge: "TRANSFORM YOUR BRAND IDENTITY",
    line1: "Ready to elevate your brand with world-class creative design?",
    line2: "Hire Tech Solutionor's design team for logos, branding, and UI/UX.",
    buttonText: "Hire Us",
  },
  "social-media": {
    badge: "AMPLIFY YOUR SOCIAL REACH",
    line1: "Ready to scale your brand across social media platforms?",
    line2: "Hire Tech Solutionor for data-driven creative campaigns that convert.",
    buttonText: "Hire Us",
  },
  "digital-marketing": {
    badge: "ACCELERATE YOUR BUSINESS GROWTH",
    line1: "Ready to dominate search rankings and capture qualified leads?",
    line2: "Hire Tech Solutionor's digital marketing team for full-funnel ROI.",
    buttonText: "Hire Us",
  },
  "ppc-amazon-ads": {
    badge: "MAXIMIZE YOUR ADVERTISING ROI",
    line1: "Ready to scale your Google, Meta, and Amazon Ad campaigns?",
    line2: "Hire Tech Solutionor's performance marketing experts today.",
    buttonText: "Hire Us",
  },
  "search-engine-optimization": {
    badge: "DOMINATE ORGANIC SEARCH RANKINGS",
    line1: "Ready to outrank competitors and drive sustainable organic traffic?",
    line2: "Hire Tech Solutionor's SEO specialists for proven ranking growth.",
    buttonText: "Hire Us",
  },
  "content-writing": {
    badge: "HIGH-IMPACT CONTENT COPYWRITING",
    line1: "Ready to engage your audience with compelling, SEO-optimized content?",
    line2: "Hire Tech Solutionor's seasoned copywriters and content strategists.",
    buttonText: "Hire Us",
  },
  "call-center": {
    badge: "24/7 CUSTOMER EXPERIENCE SUPPORT",
    line1: "Ready to elevate customer satisfaction with 24/7 omnichannel support?",
    line2: "Hire Tech Solutionor's professional inbound and outbound support team.",
    buttonText: "Hire Us",
  },
  "hire-us": {
    badge: "SCALE YOUR ENGINEERING TEAM TODAY",
    line1: "Ready to onboard pre-vetted senior software engineers in 48 hours?",
    line2: "Hire dedicated developer teams with zero hiring overheads.",
    buttonText: "Get In Touch",
  },
};

/**
 * Reusable CommonHireUs Component
 * Renders the exact same HireUs CTA card UI, styling, and animations as WebHireUs
 * with tailored, service-specific copy across all Service pages.
 *
 * @param {string} serviceKey - Service identifier (e.g., 'web-development', 'app-development', etc.)
 * @param {string} badge - Optional badge override
 * @param {string} line1 - Optional first headline line override
 * @param {string} line2 - Optional second headline line override (highlighted in green)
 * @param {string} buttonText - Optional button text override
 */
export default function CommonHireUs({
  serviceKey = "web-development",
  badge,
  line1,
  line2,
  buttonText,
}) {
  const config = servicesHireUsData[serviceKey] || servicesHireUsData["web-development"];

  const displayBadge = badge || config.badge;
  const displayLine1 = line1 || config.line1;
  const displayLine2 = line2 || config.line2;
  const displayButtonText = buttonText || config.buttonText;

  return (
    <HireUs
      badge={displayBadge}
      line1={displayLine1}
      line2={displayLine2}
      buttonText={displayButtonText}
    />
  );
}
