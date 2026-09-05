import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const figmaKeyFeaturesDefault = [
  {
    title: "Real-Time Collaboration",
    desc: "Multiple users can design, edit, and comment on the same project simultaneously, speeding up feedback and iterations.",
  },
  {
    title: "Cross-Platform Support",
    desc: "Being cloud-based, Figma works across all devices and operating systems, making it accessible from anywhere.",
  },
  {
    title: "Prototyping Tools",
    desc: "Figma’s built-in prototyping features allow designers to simulate the user experience, making it easy to present interactive designs to clients or teams.",
  },
  {
    title: "Design Systems and Libraries",
    desc: "Supports reusable components and design libraries, ensuring consistency, efficiency, and scalability across projects.",
  },
];

const FigmaCards = ({ cmsContent }) => {
  const cards = figmaKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "figmacards"),
    desc: getCmsVal(cmsContent, item.desc, "figmacards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default FigmaCards;
