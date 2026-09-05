import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const htmlKeyFeaturesDefault = [
  {
    title: "Structure",
    desc: "HTML provides a clear structure to web content using elements like headings, paragraphs, lists, and tables, making information organized and easy to navigate.",
  },
  {
    title: "Semantics",
    desc: "HTML5 introduced semantic elements such as header, footer, article, and section, improving the clarity, accessibility, and SEO value of web content.",
  },
  {
    title: "Accessibility",
    desc: "Proper use of HTML tags and attributes ensures web content is accessible to users with disabilities, supporting assistive technologies like screen readers.",
  },
  {
    title: "SEO-Friendly",
    desc: "HTML tags communicate the structure and importance of content to search engines, helping improve website visibility and rankings.",
  },
];

const HtmlCards = ({ cmsContent }) => {
  const cards = htmlKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "htmlcards"),
    desc: getCmsVal(cmsContent, item.desc, "htmlcards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default HtmlCards;
