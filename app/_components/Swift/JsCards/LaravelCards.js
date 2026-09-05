import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const swiftKeyFeaturesDefault = [
  {
    title: "Safety & Performance",
    desc: "Swift’s built-in safety features reduce coding errors while ensuring fast and reliable app performance.",
  },
  {
    title: "Modern Syntax",
    desc: "Swift’s clean and concise syntax makes code easier to read, write, and maintain, speeding up the development process.",
  },
  {
    title: "Interoperability",
    desc: "Swift integrates seamlessly with existing Objective-C codebases, allowing developers to leverage legacy apps and frameworks.",
  },
  {
    title: "Swift Playgrounds",
    desc: "Interactive learning and experimentation environment that allows developers to test code and explore Swift concepts in real time.",
  },
];

const SwiftCards = ({ cmsContent }) => {
  const cards = swiftKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "swiftcards"),
    desc: getCmsVal(cmsContent, item.desc, "swiftcards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default SwiftCards;
