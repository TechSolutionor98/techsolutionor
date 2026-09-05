import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const cssKeyFeaturesDefault = [
  {
    title: "Responsive Design",
    desc: "CSS allows websites to adapt gracefully to different screen sizes and resolutions, ensuring an optimal experience on mobile, tablet, and desktop devices.",
  },
  {
    title: "Advanced Styling",
    desc: "From animations, gradients, and custom fonts to interactive visual effects, CSS enables deep customization for unique and engaging designs.",
  },
  {
    title: "Cross-Browser Compatibility",
    desc: "CSS ensures websites maintain a consistent look and feel across all major browsers, improving accessibility and usability.",
  },
  {
    title: "Grid and Flexbox Layouts",
    desc: "Powerful layout tools like Flexbox and Grid simplify complex designs, making layouts easier to implement, maintain, and scale.",
  },
];

const CssCards = ({ cmsContent }) => {
  const cards = cssKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "csscards"),
    desc: getCmsVal(cmsContent, item.desc, "csscards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default CssCards;
