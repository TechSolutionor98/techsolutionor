"use client";

import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";

const benefits = [
  {
    title: "Identify Hidden SEO Issues",
    desc: "Uncover technical errors, crawl problems, indexing gaps, and on-page weaknesses that may be silently limiting your rankings in Dubai, across the UAE, and global search results.",
  },
  {
    title: "Boost Your Search Rankings",
    desc: "Improve your visibility on Google UAE and international search engines by optimizing key ranking factors that directly impact your traffic and online authority.",
  },
  {
    title: "Increase Traffic & Analyze Competitors",
    desc: "Attract high-intent visitors while discovering what top competitors in your industry are doing right, and where you can gain a strategic advantage.",
  },
  {
    title: "Clear Actionable Insights",
    desc: "Receive a step-by-step SEO roadmap tailored to your business goals, designed to turn your website into a consistent lead-generating and revenue-driving asset.",
  },
];

const SeoAuditBenefits = () => {
  return (
    <KeyFeatures
      title="BENEFITS OF A"
      subtitle="FREE SEO AUDIT."
      columns={["Technical", "Rankings", "Traffic", "Actionable", "Growth"]}
      features={benefits}
    />
  );
};

export default SeoAuditBenefits;
