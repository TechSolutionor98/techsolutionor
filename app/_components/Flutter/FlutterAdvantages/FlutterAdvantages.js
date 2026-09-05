import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const flutterAdvantagesDefault = [
  {
    title: "Design Flexibility",
    desc: "Flutter’s layered architecture allows developers to fully control the UI, enabling intricate and highly customized designs.",
  },
  {
    title: "Community and Support",
    desc: "Supported by a strong global community, Flutter offers extensive documentation, forums, and third-party plugins for development assistance.",
  },
  {
    title: "Integration and Scalability",
    desc: "Flutter integrates easily with existing code and Firebase services, making it scalable for complex, feature-rich applications.",
  },
];

const FlutterAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "flutteradvantages");

  const advantagesData = flutterAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "flutteradvantages"),
    desc: getCmsVal(cmsContent, item.desc, "flutteradvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Unleashing expressive, multi-platform native experiences with single codebase agility."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default FlutterAdvantages;
