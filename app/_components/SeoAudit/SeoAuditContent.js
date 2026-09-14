"use client";

import React from "react";
import SeoAuditMatterImg from "@/components/Images/seo-audit-matter.png";
import WhyChoose from "@/components/WhyChoose/WhyChoose";

const SeoAuditContent = () => {
  return (
    <WhyChoose
      highlightText="Why SEO Audit"
      titleRest="Matters"
      image={SeoAuditMatterImg}
      imageAlt="Why SEO Audit Matters Illustration"
      imageFit="contain"
      paragraphs={[
        <span key="title" className="block text-xl sm:text-2xl font-bold text-[#111827] mb-2 leading-snug">
          Maximize Your Website Potential with a Professional SEO Audit
        </span>,
        <span key="desc" className="block text-[15px] sm:text-base md:text-[16.5px] text-[#2d3748] leading-relaxed font-normal">
          A strategic SEO audit is the foundation of sustainable online growth. For businesses in Dubai, across the UAE, and competing globally, it reveals hidden technical issues, search intent gaps, and missed keyword opportunities. By improving site performance, mobile experience, and search visibility, you position your website to attract more qualified traffic, generate consistent leads, and increase revenue.
        </span>
      ]}
    />
  );
};

export default SeoAuditContent;
