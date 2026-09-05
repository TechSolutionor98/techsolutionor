import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const figmaAdvantagesDefault = [
  {
    title: "Seamless Collaboration",
    desc: "Figma fosters teamwork and communication, allowing designers, developers, and stakeholders to work together in real-time.",
  },
  {
    title: "Unified Design and Prototyping",
    desc: "With design and prototyping in one platform, Figma simplifies workflows and eliminates the need for multiple tools.",
  },
  {
    title: "Scalable for Teams",
    desc: "Whether for small teams or large organizations, Figma’s robust systems, plugins, and libraries make it scalable for any design project.",
  },
];

const FigmaAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "figmaadvantages");

  const advantagesData = figmaAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "figmaadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "figmaadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Unifying cross-functional design systems, rapid prototyping, and real-time collaboration."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default FigmaAdvantages;
