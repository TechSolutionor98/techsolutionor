import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const pythonKeyFeaturesDefault = [
  {
    title: "Interpreted Language",
    desc: "Python executes code line by line, simplifying debugging and development while allowing immediate feedback and rapid iteration.",
  },
  {
    title: "Dynamic Typing",
    desc: "Python uses dynamic typing, meaning developers do not need to declare variable types explicitly, increasing flexibility and reducing boilerplate code.",
  },
  {
    title: "High-Level Language",
    desc: "Python abstracts complex hardware details, enabling developers to focus on programming logic and application design instead of low-level implementation.",
  },
  {
    title: "Integration Capabilities",
    desc: "Python integrates seamlessly with other technologies, frameworks, and languages like Java, .NET, C++, and various APIs, making it suitable for diverse applications.",
  },
];

const PythonCards = ({ cmsContent }) => {
  const cards = pythonKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "pythoncards"),
    desc: getCmsVal(cmsContent, item.desc, "pythoncards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default PythonCards;
