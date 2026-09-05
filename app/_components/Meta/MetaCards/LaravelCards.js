import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const metaKeyFeaturesDefault = [
  {
    title: "Social Connectivity",
    desc: "Meta’s platforms provide seamless ways for users to connect, communicate, and share content globally, fostering stronger personal and professional networks.",
  },
  {
    title: "Metaverse Development",
    desc: "Meta is pioneering immersive digital experiences through VR and AR, leading the way in metaverse technology and virtual interactions.",
  },
  {
    title: "Business Tools and Advertising",
    desc: "Meta offers businesses advanced marketing tools, ad targeting, and analytics, helping brands reach the right audience and grow effectively online.",
  },
  {
    title: "Innovation in VR and AR",
    desc: "Through Meta Quest and other initiatives, Meta is redefining how people experience virtual environments, gaming, and social interactions.",
  },
];

const MetaCards = ({ cmsContent }) => {
  const cards = metaKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "metacards"),
    desc: getCmsVal(cmsContent, item.desc, "metacards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default MetaCards;
