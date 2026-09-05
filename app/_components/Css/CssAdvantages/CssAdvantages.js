import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const cssAdvantagesDefault = [
  {
    title: "Efficiency",
    desc: "By separating content from design, CSS reduces redundancy and makes site management faster and more efficient.",
  },
  {
    title: "Consistency",
    desc: "CSS stylesheets help maintain uniform design across multiple pages and platforms, ensuring a cohesive brand experience.",
  },
  {
    title: "Community Support",
    desc: "A large global CSS community provides tutorials, resources, and updates, fostering continuous innovation in web design.",
  },
];

const CssAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "cssadvantages");

  const advantagesData = cssAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "cssadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "cssadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Crafting modular, fluid, and visually stunning digital aesthetics across every device viewport."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default CssAdvantages;
