import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const wpKeyFeaturesDefault = [
  {
    title: "Themes and Design",
    desc: "Choose from thousands of pre-designed themes or create a custom website design to match your brand identity.",
  },
  {
    title: "Plugins",
    desc: "Extend website functionality with plugins for SEO, security, e-commerce, analytics, and more, allowing tailored solutions for any business need.",
  },
  {
    title: "Content Management",
    desc: "WordPress offers an intuitive editor that allows users to easily create, edit, and manage content without technical expertise.",
  },
  {
    title: "Security",
    desc: "With regular updates and security-focused plugins, WordPress ensures your website remains protected against vulnerabilities.",
  },
];

const WpCards = ({ cmsContent }) => {
  const cards = wpKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "wpcards"),
    desc: getCmsVal(cmsContent, item.desc, "wpcards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default WpCards;
