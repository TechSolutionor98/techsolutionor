import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const flutterKeyFeaturesDefault = [
  {
    title: "Single Codebase",
    desc: "Write once and deploy everywhere. Flutter enables code reuse across platforms, reducing development time and effort while maintaining consistent functionality.",
  },
  {
    title: "Rich Widget Library",
    desc: "Flutter provides a wide range of customizable widgets, making it easy to build native interfaces quickly and efficiently.",
  },
  {
    title: "Hot Reload",
    desc: "Instantly see changes in your app as you code. Hot reload accelerates the development process and simplifies UI testing.",
  },
  {
    title: "Performance",
    desc: "Flutter’s architecture ensures high-performance applications, handling platform differences in scrolling, navigation, icons, and fonts seamlessly.",
  },
];

const FlutterCards = ({ cmsContent }) => {
  const cards = flutterKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "fluttercards"),
    desc: getCmsVal(cmsContent, item.desc, "fluttercards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default FlutterCards;
