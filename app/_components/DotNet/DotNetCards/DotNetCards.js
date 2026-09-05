import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const dotNetKeyFeaturesDefault = [
  {
    title: "Multi-Language Support",
    desc: ".NET allows development in C#, F#, and VB.NET, giving developers flexibility to choose the best language for each project. Our team leverages these languages to build high-performance, maintainable applications.",
  },
  {
    title: "Cross-Platform Framework",
    desc: "With .NET Core and .NET MAUI, applications run seamlessly across Windows, Linux, macOS, iOS, and Android, enabling businesses to reach broader audiences efficiently.",
  },
  {
    title: "Advanced Security Features",
    desc: "Built-in authentication, authorization, and data protection make .NET ideal for enterprise-grade applications. We integrate these features in every solution to ensure data integrity and compliance.",
  },
  {
    title: "Rich Ecosystem & Libraries",
    desc: ".NET provides extensive libraries, APIs, and development tools, reducing time-to-market while improving functionality. Our developers leverage this ecosystem to deliver scalable and feature-rich applications.",
  },
];

const DotNetCards = ({ cmsContent }) => {
  const cards = dotNetKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "dotnetcards"),
    desc: getCmsVal(cmsContent, item.desc, "dotnetcards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default DotNetCards;
